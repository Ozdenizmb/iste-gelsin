import React, { useEffect, useState } from 'react';
import { updateAcceptOrRejectApplication, getVerifyStatus } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import profile from '../images/profile.png';
import {faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useApiProgress } from '../shared/ApiProgress';
import Spinner from './Spinner';

const ApplicationUserCard = ({ user, jobId }) => {

    const [userAccepted, setUserAccepted] = useState();
    const [userRejected, setUserRejected] = useState();
    const [isOtpConfirm, setIsOtpConfirm] = useState();

    const pendingApiCallVerifyStatus = useApiProgress('get','/api/v1/WorkAttendance/GetVerifyStatus');
    const pendingApiCallApplication = useApiProgress('put','/api/v1/JobApplication');

    useEffect(() => {
        setUserAccepted(user.isUserAccepted);
        setUserRejected(user.isUserRejected);
    }, [user])

    const getIsConfirm = async (jobId, userId) => {
        try {
            const responseConfirm = await getVerifyStatus(jobId, userId);
            setIsOtpConfirm(responseConfirm.data.data);
        } catch(error) {
            setIsOtpConfirm({});
        }
    }

    useEffect(() => {
        getIsConfirm(jobId, user.userId);
    }, [user]);


    const { companyId } = useSelector(store => ({
        companyId: store.id
    }));

    let response;
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
            response = await updateAcceptOrRejectApplication(body);
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
                <div className="text-end">
                    {(!userAccepted && !userRejected) && (
                        <div>
                            <button className="btn btn-success me-2" onClick={onClickAccepted}>Kabul Et</button>
                            <button className="btn btn-danger" onClick={onClickReject}>Reddet</button>
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