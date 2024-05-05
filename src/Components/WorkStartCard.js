import React, { useEffect, useState } from 'react';
import { getJobPosting, getWorkAttendance, postWorkAttendance } from '../api/apiCalls';
import { faTimes, faKey, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { useApiProgress } from '../shared/ApiProgress';
import { useHistory } from 'react-router-dom';

const WorkStartCard = ({ jobId }) => {

    const [advert, setAdvert] = useState({});
    const [otpKey, setOtpKey] = useState({});
    const [isOtpConfirm, setIsOtpConfirm] = useState({});
    const [didApply, setDidApply] = useState(false);

    const { userId } = useSelector(store => ({
        userId: store.id
    }));

    const pendingApiCallPost = useApiProgress('post','/api/v1/WorkAttendance');
    const pendingApiCallGet = useApiProgress('get','/api/v1/WorkAttendance');

    const history = useHistory();

    const getJobDetail = async (id) => {
        const response = await getJobPosting(id);
        setAdvert(response.data.data);
        try {
            const responseConfirm = await getWorkAttendance(response.data.data.job_postingid, userId);
            setIsOtpConfirm(responseConfirm.data.data);
        } catch(error) {
            setIsOtpConfirm({});
        }
    }

    useEffect(() => {
        getJobDetail(jobId);
        setDidApply(false);
    }, [jobId]);

    const onClickOpen = async () => {

        const body = {
            job_postingid: advert.job_postingid,
            userid: userId,
            otp: "",
            is_otp_verified: false
        }

        try {
            await postWorkAttendance(body);
            const response = await getWorkAttendance(advert.job_postingid, userId);
            setOtpKey(response.data.data);
            setIsOtpConfirm(response.data.data);
            setDidApply(true);
        } catch(error) {
            try {
                const response = await getWorkAttendance(advert.job_postingid, userId);
                setOtpKey(response.data.data);
                setDidApply(true);
            } catch(error) {

            }
        }
    }

    const onClickClose = () => {
        setDidApply(false);
        setOtpKey({});
    }

    const onClickFeedBack = () => {
        history.push(`/feedback/${advert.job_postingid}/${userId}`);
    }

    return (
        <div className="card text-center">
            <div className="card-header">
                <img src={'https://cdn.colaksoft.online/' + advert.logo_path} className="rounded-circle shadow" alt={advert.title} width={200} height={200} />
            </div>
            <div className="card-body">
                {!didApply &&
                    (
                    <div>
                        <h3>
                            {advert.title}
                        </h3>
                        <p className="">{advert.company_name}</p>
                        <p>
                            <span className="fw-bold">İş Açıklaması: </span>
                            <span className="card-text fst-italic text-muted mb-0">{advert.description}</span>
                        </p>
                        <p>
                            <span className="fw-bold">Adres: </span>
                            <span className="card-text fst-italic text-muted mb-4">{advert.adress}</span>
                        </p>
                        <button className="btn btn-success d-inline-flex" onClick={onClickOpen}>
                            {(pendingApiCallPost || pendingApiCallGet) ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faKey} className="pe-2 pt-1" />
                            İşe Başlamak İçin Kod Al
                        </button>
                        {isOtpConfirm.is_otp_verified && (
                            <div>
                                <hr></hr>
                                <p className="card-text text-muted mt-3">
                                    Tebrikler, OTP Kodunuz İşveren Tarafından Onaylandı!
                                </p>
                                <p className="card-text text-muted fst-italic">
                                    Çalışma Sürecinin Nasıl Geçtiğini Değerlendirerek, Diğer Kullanıcılara Çalıştığınız İşveren Hakkında Bilgi Sağlayabilirsiniz..
                                </p>
                                <button className="btn btn-warning d-inline-flex mt-1 align-items-center" onClick={onClickFeedBack}>
                                    {(pendingApiCallPost || pendingApiCallGet) ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                    <FontAwesomeIcon icon={faCommentAlt} className="pe-2 pt-1" />
                                    Şimdi Değerlendir
                                </button>
                            </div>
                        )}
                    </div>
                    )
                }
                {didApply &&
                    (
                        <div>
                            <h3>
                                {advert.title}
                            </h3>
                            <p className="">{advert.company_name}</p>
                            <p>
                                <span className="fw-bold">İş Açıklaması: </span>
                                <span className="card-text fst-italic text-muted mb-0">{advert.description}</span>
                            </p>
                            <p>
                                <span className="fw-bold">Adres: </span>
                                <span className="card-text fst-italic text-muted mb-4">{advert.adress}</span>
                            </p>
                            <h1 className="mt-2">{otpKey.otp}</h1>
                            <div>
                                
                                <button className="btn btn-danger d-inline-flex ms-1"
                                        onClick={onClickClose}>
                                    <FontAwesomeIcon icon={faTimes} className="pe-2 pt-1" />
                                    Geri Dön
                                </button>

                            </div>
                        </div>
                        
                    )
                }
            </div>
        </div>
    );
};

export default WorkStartCard;