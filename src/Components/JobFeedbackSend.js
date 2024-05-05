import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import profile from '../images/profile.png';
import { useSelector } from 'react-redux';
import { getJobApplicationUseTheByCompany, getJobPosting, postJobFeedbackForCompany, postJobFeedbackForUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';

const JobFeedbackSend = () => {

    const [userInfo, setUserInfo] = useState({});
    const [jobInfo, setJobInfo] = useState({});
    const [isSaveFeedBack, setIsSaveFeedback] = useState(false);
    const [rating, setRating] = useState(null);
    const [lastRate, setLastRate] = useState();
    const [isClick, setIsClick] = useState(false);
    const [lastMessage, setLastMessage] = useState();
    const [error, setError] = useState(false);

    const { jobId, userId } = useParams();

    const { id, statuses } = useSelector(store => ({
        id: store.id,
        statuses: store.statuses
    }));

    const pendingApiCall = useApiProgress('post','/api/v1/JobFeedback');

    const getInfoForCompany = async (jobId, userId) => {
        // USER VE JOB BİLGİSİ GELİCEK
        const responseJob = await getJobPosting(jobId);
        setJobInfo(responseJob.data.data);
        const responseUser = await getJobApplicationUseTheByCompany(jobId, userId);
        setUserInfo(responseUser.data.data);
    }

    const getInfoForUser = async (jobId) => {
        // COMPANY VE Job BİLGİSİ GELECEK
        const responseJob = await getJobPosting(jobId);
        setJobInfo(responseJob.data.data);
    }

    useEffect(() => {
        if(statuses === "company") {
            getInfoForCompany(jobId, userId);
        }
        else {
            getInfoForUser(jobId);
        }
    }, [jobId, userId]);

    const handleMouseEnter = (index) => {
        setRating(index + 1);
    };

    const handleMouseLeave = () => {
        if(!isClick) {
            setRating(null);
        }
    };

    const handleClick = (index) => {
        setRating(index + 1);
        setIsClick(true);
    };

    const onClickSaveFeedBack = async () => {

        let body;


        if(statuses == "company") {
            body = {
                job_postingid: jobInfo.job_postingid,
                userid: userInfo.userid,
                companyid: id,
                question_score: rating,
                is_feedback_for_user: false
            }

            try {
                await postJobFeedbackForCompany(body);
                setLastRate(rating);
                setIsSaveFeedback(true);
            } catch(error) {
                setError(true);
                if(rating != null) {
                    setLastMessage("Bu verilerde kayıtlı bir oylama bulundu, oylama tekrar edilemez!");
                }
                else {
                    setLastMessage("Oylayabilmeniz için İlk Önce Bir Puan Vermeniz Gerekmektedir.")
                }
                
                setIsSaveFeedback(true);
            }
        }
        else {
            body = {
                job_postingid: jobInfo.job_postingid,
                userid: id,
                companyid: jobInfo.companyid,
                question_score: rating,
                is_feedback_for_user: true
            }

            try {
                await postJobFeedbackForUser(body);
                setLastRate(rating);
                setIsSaveFeedback(true);
            } catch(error) {
                setError(true);
                if(rating != null) {
                    setLastMessage("Bu verilerde kayıtlı bir oylama bulundu, oylama tekrar edilemez!");
                }
                else {
                    setLastMessage("Oylayabilmeniz için İlk Önce Bir Puan Vermeniz Gerekmektedir.")
                }
                
                setIsSaveFeedback(true);
            }
        }
        
    };

    let jobCardType = (
        <div className="card h-100 border rounded-3 shadow advert-card" style={{ maxWidth: statuses === 'company' ? '40vw' : '80vw' }}>
            <div className="card-link nav-link d-flex">
                <div className="work-attendance-comfirm-job-image">
                    <img src={'https://cdn.colaksoft.online/' + jobInfo.logo_path} className="card-img-top rounded-2 img-fluid" alt={jobInfo.title} />
                </div>
                <div className="card-body pb-0">
                    <h5 className="card-title">{jobInfo.title}</h5>
                    {statuses === "user" && (
                        <div>
                            <p>{jobInfo.description}</p>
                            <h5>{jobInfo.company_name}</h5>
                        </div>
                    )}
                    <p className="card-text mb-0 mt-0 text-muted fst-italic">{jobInfo.adress}</p>
                    <p className="card-text text-end text-muted fst-italic">{jobInfo.total_salary} ₺</p>
                </div>
            </div>
        </div>
    )

    let userCardType = (
        <div className="card h-100 border rounded-3 shadow advert-card" style={{ maxWidth: '40vw' }}>
          <div className="card-link nav-link d-flex">
            <div className="work-attendance-comfirm-job-user-image">
                <img src={(userInfo.logo_path == "string" ? profile: 'https://cdn.colaksoft.online/' + userInfo.logo_path)} className="card-img-top rounded-2 img-fluid" alt={userInfo.name} />
            </div>
            <div className="card-body pb-2">
                <h5 className="card-title">{userInfo.name} {userInfo.surname}</h5>
                <p className="card-text mb-0 text-muted fst-italic">{userInfo.email}</p>
                <div className="d-flex justify-content-between">
                    <p className="card-text text-muted fst-italic">{userInfo.gsm === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : userInfo.gsm}</p>
                    <p className="card-text text-muted fst-italic">{userInfo.gender_name}</p>
                </div>
            </div>
          </div>
        </div>
    )

    return (
        <div>
            
            <div className="text-center mb-4 mt-5">
                <h1 className="display-4">Kariyer Yolculuğuna Oy Ver</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20vh' }}>
                <div className="text-center">
                    <div>
                        {[...Array(10)].map((_, index) => (
                            <FontAwesomeIcon
                                key={index}
                                icon={index < (rating || 0) ? solidStar : regularStar}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleClick(index)}
                                style={{
                                    cursor: 'pointer',
                                    fontSize: '36px',
                                    color: index < (rating || 0) ? 'gold' : 'gray',
                                    transition: 'color 0.3s',
                                }}
                                className="me-1"
                            />
                        ))}
                        <p className="mb-3 mt-2">Değerlendirme: {rating !== null ? rating : '0'}</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-3">
                    <button className="btn btn-primary btn-block" style={{ width: '20%' }} onClick={onClickSaveFeedBack}>
                        {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        Onayla
                    </button>
            </div>

            {!isSaveFeedBack &&
                (
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <div className="me-5">
                            {jobCardType}
                        </div>
                        <div className="ms-5">
                            {statuses == "company" ? userCardType : ""}
                        </div>
                    </div>
                )
            }
            {isSaveFeedBack && (
                <div className="mt-5 mb-5 text-center">
                    {!error && (
                        <div>
                            <h1 className="text-success">
                                <FontAwesomeIcon icon={faCheckSquare} className="pe-2 pt-1" />
                                {lastRate} Puanınız Başarıyla Kaydedilmiştir
                            </h1>
                        </div>
                    )}
                    {error && (
                        <div>
                            <h3 className="text-danger">
                                <FontAwesomeIcon icon={faExclamationCircle} className="pe-2 pt-1" />
                                {lastMessage}
                            </h3>
                        </div>
                    )}
                </div>
            )}

            <ToastContainer />

        </div>
    );
};

export default JobFeedbackSend;