import React, { useEffect, useState } from 'react';
import { updateAcceptOrRejectApplication } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import profile from '../images/profile.png';

const ApplicationUserCard = ({ user }) => {

    const [userAccepted, setUserAccepted] = useState();
    const [userRejected, setUserRejected] = useState();

    useEffect(() => {
        setUserAccepted(user.isUserAccepted);
        setUserRejected(user.isUserRejected);
    }, [user])


    const { email } = useSelector(store => ({
        email: store.email
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
            //history.push(`/job-application/${email}//basvurular`);
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
            //history.push(`/job-application/${email}/${user.jobPostingid}`);
            setUserRejected(true);
        } catch(error) {
            toast.error("Beklenmedik bir hata oluştu.");
        }
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
                <p className="card-text text-muted fst-italic">{user.gsm === 'string' ? 'Kayıtlı Bir Numara Bulunamadı' : user.gsm}</p>
                <p className="card-text text-end text-muted fst-italic">{user.genderName}</p>
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