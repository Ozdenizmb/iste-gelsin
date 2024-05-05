import React, { useEffect, useState } from 'react';
import { updateAcceptOrRejectApplication, getVerifyStatus, getUserStarForCompany } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import profile from '../images/profile.png';
import {faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApiProgress } from '../shared/ApiProgress';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

const ApplicationUserCard = ({ user, jobId }) => {

    const [userAccepted, setUserAccepted] = useState();
    const [userRejected, setUserRejected] = useState();
    const [isOtpConfirm, setIsOtpConfirm] = useState();
    const [averageUser, setAverageUser] = useState();

    const pendingApiCallVerifyStatus = useApiProgress('get','/api/v1/WorkAttendance/GetVerifyStatus');
    const pendingApiCallApplication = useApiProgress('put','/api/v1/JobApplication');

    const getIsConfirm = async (jobId, userId) => {
        try {
            const responseConfirm = await getVerifyStatus(jobId, userId);
            setIsOtpConfirm(responseConfirm.data.data);
        } catch(error) {
            setIsOtpConfirm({});
        }
    }

    const getUserStar = async (userId) => {
        try {
            const response = await getUserStarForCompany(userId);
          
            const data = response.data.data;
            const feedbackData = data.filter(item => item.is_feedback_for_user === false);
            const scores = feedbackData.map(item => item.question_score);
            
            if(scores.length > 0) {
                const sum = scores.reduce((acc, cur) => acc + cur, 0);
                const average = sum / scores.length;
                setAverageUser(average);
            }
            else {
                setAverageUser(0);
            }
        } catch(error) {
    
        }
      }

    useEffect(() => {
        setUserAccepted(user.isUserAccepted);
        setUserRejected(user.isUserRejected);

        getIsConfirm(jobId, user.userId);
        getUserStar(user.userId);
    }, [user]);

    const history = useHistory();

    const onClickAccepted = async () => {
        const body = {
            job_postingid: user.jobPostingid,
            userid: user.userId,
            is_user_accepted: true,
            is_user_rejected: false
        }

        try {
            await updateAcceptOrRejectApplication(body);
            toast.success("Kullanıcı İşe Kabul Edildi.");
            setUserAccepted(true);
        } catch(error) {
            toast.error("Beklenmedik bir hata oluştu.");
        }
    }

    const onClickReject = async () => {
        const body = {
            job_postingid: user.jobPostingid,
            userid: user.userId,
            is_user_accepted: false,
            is_user_rejected: true
        }

        try {
            await updateAcceptOrRejectApplication(body);
            toast.error("Kullanıcıya ait başvuru reddedildi");
            setUserRejected(true);
        } catch(error) {
            toast.error("Beklenmedik bir hata oluştu.");
        }
    }

    const onClickConfirm = () => {
        history.push(`/confirm/otp-code/${jobId}/${user.userId}`);
    }

    const onClickFeedBack = () => {
        history.push(`/feedback/${jobId}/${user.userId}`);
    }

    let cardType = (
        <div className="card h-100 border rounded-3 shadow advert-card">
          <div className="card-link nav-link d-flex">
            <div className="image-container-for-application">
                <img src={(user.logoPath == "string" ? profile: 'https://cdn.colaksoft.online/' + user.logoPath)} className="card-img-top rounded-2 img-fluid" alt={user.name} />
            </div>
            <div className="card-body pb-2">
                <h5 className="card-title">{user.name} {user.surname}</h5>
                <p className="card-text mb-0 text-muted fst-italic">{user.email}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text text-muted fst-italic">{user.gsm === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : user.gsm}</p>
                    <p className="card-text text-muted fst-italic">{user.genderName}</p>
                </div>
                <div>
                    <div className="d-flex align-items-center">
                        <strong className="me-2">Çalışan Puanı:</strong>
                        {[...Array(10)].map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={index < (averageUser || 0) ? solidStar : regularStar}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '20px',
                                    color: index < (averageUser || 0) ? 'gold' : 'gray',
                                    transition: 'color 0.3s',
                                }}
                                className="me-1"
                            />
                        ))}
                        <p className="mt-3 ms-2">{averageUser != undefined ? averageUser : '0'} Puan</p>
                    </div>
                </div>
                <div className="text-end">
                    {(!userAccepted && !userRejected) && (
                        <div>
                            <button className="btn btn-success me-2" onClick={onClickAccepted}>
                                {pendingApiCallApplication ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                Kabul Et
                            </button>
                            <button className="btn btn-danger" onClick={onClickReject}>
                                {pendingApiCallApplication ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                Reddet
                            </button>
                        </div>
                    )}
                </div>
                <div className="text-end">
                    {(userAccepted || userRejected) && (
                        <div className="fst-italic text-success">
                            Bu başvuru hakkında karar verildi!
                        </div>
                    )}
                    {pendingApiCallVerifyStatus ?
                        <span className="spinner-border spinner-border-lg mt-2"></span> : 
                        <div>
                            {userAccepted && (
                                <button className="btn btn-success mt-2" onClick={onClickConfirm}>
                                    Çalışma Durumunu Onayla
                                </button>
                            )}
                            {(userAccepted && isOtpConfirm) && (
                                <button className="btn btn-warning d-inline-flex mt-2 ms-2 align-items-center" onClick={onClickFeedBack}>
                                    <FontAwesomeIcon icon={faCommentAlt} className="pe-2 pt-1" />
                                    Şimdi Değerlendir
                                </button>
                            )}
                        </div>
                    }
                </div>
            </div>
          </div>
        </div>
    )

    return (
        <div className={`mb-4 card_padding card-for-job`}>
            {cardType}
            <ToastContainer />
        </div>
    );
};

export default ApplicationUserCard;