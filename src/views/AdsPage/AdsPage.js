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
                                    <a href="#collapse_box1" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Marka
                                    </a>
                                </div>
                                <div id="collapse_box1" className="collapse show">
                                    <div className="card-body">
                                        <ul className="menu scroll">
                                            <li><a href="">Lenovo</a></li>
                                            <li><a href="">Asus</a></li>
                                            <li><a href="">Dell</a></li>
                                            <li><a href="">Hp</a></li>
                                            <li><a href="">MSI</a></li>
                                            <li><a href="">Samsung</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box2" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Fiyat
                                    </a>
                                </div>
                                <div id="collapse_box2" className="collapse show">
                                    <div className="card-body">
                                        <div className="row mb-3">
                                            <div className="col-6">
                                                <Input label="En az" type="number" id="enaz" name="enaz" placeholder="5.000 TL"/>
                                            </div>
                                            <div className="col-6">
                                                <Input label="En çok" type="number" id="encok" name="encok" placeholder="10.000 TL" className="form-control" />
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
                                        Ekran Boyutu
                                    </a>
                                </div>
                                <div id="collapse_box3" className="collapse show">
                                    <div className="card-body">
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">13.3 inç</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">14 inç</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">15 inç</span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light">17 inç</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box4" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Ram Kapasitesi
                                    </a>
                                </div>
                                <div id="collapse_box4" className="collapse show">
                                    <div className="card-body">
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="16gb" id="16gb" className="form-check-input" />
                                            <span className="form-check-label">16 GB</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="32gb" id="32gb" className="form-check-input" />
                                            <span className="form-check-label">32 GB</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="64gb" id="64gb" className="form-check-input" />
                                            <span className="form-check-label">64 GB</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="checkbox" name="128gb" id="128gb" className="form-check-input" />
                                            <span className="form-check-label">128 GB</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="filter-box">
                                <div className="card-header">
                                    <a href="#collapse_box5" data-bs-toggle="collapse" aria-expanded="false" className="collapsed">
                                        <FontAwesomeIcon icon={faChevronDown} />
                                        Ürün Modeli
                                    </a>
                                </div>
                                <div id="collapse_box5" className="collapse show">
                                    <div className="card-body">
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="oyun_bilgisayari" className="form-check-input" />
                                            <span className="form-check-label">Oyun Bilgisayarı</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="notebook" className="form-check-input" />
                                            <span className="form-check-label">Notebook</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="urun_modeli" id="ultrabook" className="form-check-input" />
                                            <span className="form-check-label">Ultrabook</span>
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