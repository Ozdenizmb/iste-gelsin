import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getJobApplicationUseTheByCompany, getJobPosting, putWorkAttendance } from '../api/apiCalls';
import profile from '../images/profile.png';
import '../css/Component.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const WorkAttendanceConfirm = () => {

    const [otpCode, setOtpCode] = useState();
    const [userInfo, setUserInfo] = useState({});
    const [jobInfo, setJobInfo] = useState({});
    const [isConfirm, setIsConfirm] = useState(false);

    const { jobId, userId } = useParams();

    const getUserInfo = async (jobId, userId) => {
        const response = await getJobApplicationUseTheByCompany(jobId, userId);
        setUserInfo(response.data.data);
    }

    const getJobInfo = async (id) => {
        const response = await getJobPosting(id);
        setJobInfo(response.data.data);
    }

    useEffect(() => {
        window.scrollTo(1000, 1000);
        getUserInfo(jobId, userId);
        getJobInfo(jobId);
    }, [jobId, userId])

    const onChangeTextBox = (event) => {

        const value = event.target.value;
        const name = event.target.name;

        if(name === "otpInput") {
            setOtpCode(value);
        }
    }

    const onClickConfirm = async () => {
        try {
            await putWorkAttendance(jobId, userId, otpCode);
            setIsConfirm(true);
        } catch(error) {
            setIsConfirm(false);
            toast.error("Yanlış Otp Kodu Girildi.");
        }
    }

    let jobCardType = (
        <div className="card h-100 border rounded-3 shadow advert-card" style={{ maxWidth: '40vw' }}>
            <div className="card-link nav-link d-flex">
                <div className="work-attendance-comfirm-job-image">
                <img src={'https://cdn.colaksoft.online/' + jobInfo.logo_path} className="card-img-top rounded-2 img-fluid" alt={jobInfo.title} />
                </div>
                <div className="card-body pb-0">
                <h5 className="card-title">{jobInfo.title}</h5>
                <p className="card-text mb-0 text-muted fst-italic">{jobInfo.adress}</p>
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
                <h1 className="display-4">Gelecek birlikte daha parlak</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20vh' }}>
                <input type="text" name="otpInput" style={{ width: '50%', fontSize: '20px', padding: '10px' }} placeholder="Buraya Onaylamak İstediğini OTP kodunu giriniz..." onChange={onChangeTextBox}/>
                
            </div>
            <div className="text-center mt-3">
                    <button className="btn btn-primary btn-block" style={{ width: '20%' }} onClick={onClickConfirm}>
                        Onayla
                    </button>
            </div>

            {!isConfirm &&
                (
                    <div className="d-flex justify-content-center mt-5 mb-5">
                        <div className="me-5">
                            {jobCardType}
                        </div>
                        <div className="ms-5">
                            {userCardType}
                        </div>
                    </div>
                )
            }
            {isConfirm && (
                <div className="mt-5 mb-5 text-center">
                    <h1 className="text-success">
                        <FontAwesomeIcon icon={faCheckSquare} className="pe-2 pt-1" />
                        ONAYLANDI
                    </h1>
                </div>
            )}

            <ToastContainer />

        </div>
    );
};

export default WorkAttendanceConfirm;