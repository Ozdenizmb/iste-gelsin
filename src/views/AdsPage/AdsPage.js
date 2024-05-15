import React, { useState } from 'react';
import Input from '../../Components/Input';
import './AdsPage.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import Footer from '../../Components/Footer';

const AdsPage = () => {

    const [workModel, setWorkModel] = useState("0");

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        if(name === "calisma_modeli") {
            if(value === "hepsi") {
                setWorkModel("0");
            }
            else if(value === "uzaktan") {
                setWorkModel("1");
            }
            else if(value === "hibrit") {
                setWorkModel("2");
            }
            else if(value === "ofis") {
                setWorkModel("3");
            }
            
        }
    }

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
                                            <input type="radio" name="calisma_modeli" id="uzaktan" value="hepsi" className="form-check-input" onChange={onChange} checked={workModel === "0"} />
                                            <span className="form-check-label">Hepsi</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="calisma_modeli" id="uzaktan" value="uzaktan" className="form-check-input" onChange={onChange} checked={workModel === "1"} />
                                            <span className="form-check-label">Uzaktan</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="calisma_modeli" id="hibrit" value="hibrit" className="form-check-input" onChange={onChange} checked={workModel === "2"} />
                                            <span className="form-check-label">Hibrit</span>
                                        </label>
                                        <label for="" className="form-check mb-2">
                                            <input type="radio" name="calisma_modeli" id="ofis" value="ofis" className="form-check-input" onChange={onChange} checked={workModel === "3"} />
                                            <span className="form-check-label" >Ofis</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-9">
                        <AdvertCardFeed feedsLocation={"AdsPage"} workModel={workModel} />
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