import React, { useState } from 'react';
import Input from '../../Components/Input';
import Button from 'react-bootstrap/Button';
import Advert from '../../Components/Advert';
import ÖrnekİşİlanıResmi from '../../images/ÖrnekİşİlanıResmi.png'
import Footer from '../../Components/Footer';
import './Home.css';
import { useDispatch } from "react-redux";
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const HomePage = () => {

    const dispatch = useDispatch();

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
                                <input type="text" className="form-control hover-success-border" placeholder="Meslek Ara" style={{ height: '4rem' }} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="input-group mb-3" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                                <input type="text" className="form-control hover-success-border" placeholder="Şehir veya İlçe Ara" style={{ height: '4rem' }} />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <button className="btn btn-primary btn-lg" style={{ height: '4rem', fontSize: "1rem" , backgroundColor:  'green'}}>İŞTE GELSİN</button>

                        </div>
                    </div>
                </div>

                {/* Silinecek kısım */}
                {/* <div className="card mt-5 p-5 bg-primary d-flex justify-content-between align-items-center">
                    <h3 className="text-center mb-4 text-white" style={{ fontSize: '1.5em' }}>Uzaktan Çalışmaya Ne Dersin</h3>
                    <div className="ml-auto d-flex justify-content-center align-items-center">
                        <button
                        className="btn btn-sm btn-dark"
                        style={{ height: '4rem', fontSize: "1rem" }}
                        onClick={onClickProduct1}>
                            Hemen Başvur
                            </button>
                    </div>
                </div> */}
                {/* Silinecek kısım sonu */}

            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <div className="w-75 h-100">

                    <AdvertCardFeed />

                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>

        </div>
    );
};

export default HomePage;
