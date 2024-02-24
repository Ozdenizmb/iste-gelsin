import React, { useState } from 'react';
import Input from '../../Components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Advert from '../../Components/Advert';
import ÖrnekİşİlanıResmi from '../../images/ÖrnekİşİlanıResmi.png'
import Footer from '../../Components/Footer';
import './Home.css';
import { getProduct1 } from '../../api/apiCalls';
import { useDispatch } from "react-redux";
import { getProduct1Handler } from '../../redux/authActions';

const HomePage = () => {

    const dispatch = useDispatch();

    const onClickProduct1 = async (event) => {
        event.preventDefault();
        try {
            await dispatch(getProduct1Handler());
        }
        catch(apiError) {
            console.log("Error: ");
        }
    }

    return (
        <div>
            <div className="container my-4">
                <div className="card bg-light p-4" style={{ width: '100%', marginTop: '2rem' }}>
                    <h1 className="text-left my-4">
                        <span className="fw-bold" style={{ fontSize: '1.1em' }}>İş Fırsatlarını Keşfet</span>
                    </h1>
                    <div className="row mt-3">
                        <div className="col-md-3">
                            <div className="input-group mb-3" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <input type="text" className="form-control hover-blue-border" placeholder="Meslek Ara" style={{ height: '4rem' }} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group mb-3" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <input type="text" className="form-control hover-blue-border" placeholder="Şehir veya İlçe Ara" style={{ height: '4rem' }} />
                            </div>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary btn-lg" style={{ height: '4rem', fontSize: "1rem" }}>İŞTE GELSİN</button>
                        </div>
                    </div>
                </div>

                <div className="card mt-5 p-5 bg-primary d-flex justify-content-between align-items-center">
                    <h3 className="text-center mb-4 text-white" style={{ fontSize: '1.5em' }}>Uzaktan Çalışmaya Ne Dersin</h3>
                    <div className="ml-auto d-flex justify-content-center align-items-center">
                        <button
                        className="btn btn-sm btn-dark"
                        style={{ height: '4rem', fontSize: "1rem" }}
                        onClick={onClickProduct1}>
                            Hemen Başvur
                            </button>
                    </div>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <div className="w-75 h-100">
                    
                    <div>
                        <Advert title={"Rezervasyon Elemanı"} company={"Swandor Hotels & Resorts"} image={ÖrnekİşİlanıResmi} details={"SWANDOR TOPKAPI PALACE otelimizde görevlendirilmek üzere aşağıda belirtilen özelliklere sahip  REZERVASYON ELEMANI takım arkadaşları arıyoruz."} workingHours={"10:00 - 17:00"} department ={"Satış ve Pazarlama"} workType={"Tam Zamanlı"} positionLevel={"Eleman"} address={"Defterdar Mahallesi, Yeni Küşat Sokak, No:12, Eyüpsultan - İstanbul"} experience={"2 yıl deneyim"} educationLevel={"Ön Lisans(Mezun), Üniversite(Öğrenci), Üniversite(Mezun), Yüksek Lisans(Öğrenci), Yüksek Lisans(Mezun)"}/>
                    </div>

                    <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                    <FontAwesomeIcon icon="fa-solid fa-piggy-bank" />
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
            
        </div>
    );
};

export default HomePage;