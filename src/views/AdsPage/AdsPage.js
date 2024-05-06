import React from 'react';
import Input from '../../Components/Input';
import './AdsPage.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import Footer from '../../Components/Footer';

const AdsPage = () => {

    return (
        <div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-3">
                        <div className="card filters">

                            

                        <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box5" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Çalışma Modeli
                                    </a>
                                </div>
                                <div id="collapse_box5" className="collapse show">
                                    <div className="card-body">
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="oyun_bilgisayari" className="form-check-input" />
                                            <span className="form-check-label">Uzaktan</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="notebook" className="form-check-input" />
                                            <span className="form-check-label">Hibrit</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="ultrabook" className="form-check-input" />
                                            <span className="form-check-label">Ofis</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box2" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Maaş
                                    </a>
                                </div>
                                <div id="collapse_box2" className="collapse show">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <Input label="En az" type="number" id="enaz" name="enaz" placeholder="20.000 ₺"/>
                                            </div>
                                            <div className="col-6">
                                                <Input label="En çok" type="number" id="encok" name="encok" placeholder="70.000 ₺" className="form-control" />
                                            </div>
                                        </div>
                                        <button className="btn btn-light w-100"> Uygula</button>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box3" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Eğitim Seviyesi
                                    </a>
                                </div>
                                <div id="collapse_box3" className="collapse show">
                                    <div className="card-body">
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">Ön Lisanas</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">Lisans</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">Yüksek Lisans</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">Doktora</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box4" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Puan
                                    </a>
                                </div>
                                <div id="collapse_box4" className="collapse show">
                                    <div className="card-body">
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="1and2" id="1and2" className="form-check-input" />
                                            <span className="form-check-label">1 - 2</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="3and4" id="3and4" className="form-check-input" />
                                            <span className="form-check-label">3 - 4</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="5and6" id="5and6" className="form-check-input" />
                                            <span className="form-check-label">5 - 6</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="7and8" id="7and8" className="form-check-input" />
                                            <span className="form-check-label">7 - 8</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="9and10" id="9and10" className="form-check-input" />
                                            <span className="form-check-label">9 - 10</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-9">
                        <AdvertCardFeed feedsLocation={"AdsPage"} />
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default AdsPage;