import React, { useState } from 'react';
import './AdvertisementProceduresPage.css';
import Input from '../../Components/Input';
import { useSelector } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CreatedJobPosting = () => {

    const [createdTitle, setCreatedTitle] = useState();
    const [createdDescription, setCreatedDescription] = useState();
    const [createdTotalSalary, setCreatedTotalSalary] = useState();
    const [createdWorkPerHour, setCreatedWorkPerHour] = useState();
    const [createdCity, setCreatedCity] = useState();
    const [createdDistrict, setCreatedDistrict] = useState();
    const [createdStreet, setCreatedStreet] = useState();
    const [createdEducationLevelName, setCreatedEducationLevelName] = useState();
    const [createdEmploymentName, setCreatedEmploymentName] = useState();
    const [createdExperienceLevelName, setCreatedExperienceLevelName] = useState();
    const [createdExperienceYears, setCreatedExperienceYears] = useState();

    const [advert, setAdvert] = useState();
    const [error, setError] = useState({});

    const { companyId, logoPath } = useSelector(store => ({
        companyId: store.id,
        logoPath: store.logoPath
    }));

    const pendingApiCall = false;

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        const errorCopy = {... error};

        if(name == "createTitle") {
            setCreatedTitle(value);
            errorCopy['title'] = undefined;
        }
        if(name == "createDescription") {
            setCreatedDescription(value);
            errorCopy['description'] = undefined;
        }
        if(name == "createTotalSalary") {
            setCreatedTotalSalary(value);
            errorCopy['totalSalary'] = undefined;
        }
        if(name == "createWorkPerHour") {
            setCreatedWorkPerHour(value);
            errorCopy['workPerHour'] = undefined;
        }
        if(name == "createCity") {
            setCreatedCity(value);
            errorCopy['city'] = undefined;
        }
        if(name == "createDistrict") {
            setCreatedDistrict(value);
            errorCopy['district'] = undefined;
        }
        if(name == "createStreet") {
            setCreatedStreet(value);
            errorCopy['street'] = undefined;
        }
        if(name == "createEducationLevelName") {
            setCreatedEducationLevelName(value);
            errorCopy['educationLevelName'] = undefined;
        }
        if(name == "createEmploymentName") {
            setCreatedEmploymentName(value);
            errorCopy['employmentName'] = undefined;
        }
        if(name == "createExperienceLevelName") {
            setCreatedExperienceLevelName(value);
            errorCopy['experienceLevelName'] = undefined;
        }
        if(name == "createExperienceYears") {
            setCreatedExperienceYears(value);
            errorCopy['experienceYears'] = undefined;
        }

    }

    const onClickSave = () => {

    }

    return (
        <div className="container mt-4 mb-4">
            <div className="card text-center h-100 border rounded-3 shadow mb-5">
                <div className="card-header">
                    <img
                        className={"rounded-circle shadow"} 
                        width={200} height={200}
                        alt={"company image"} src={'https://cdn.colaksoft.online/' + logoPath}>
                    </img>
                </div>
                <div className="card-body ps-5 pe-5">
                    <Input name="createTitle" label="Başlığı Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan Başlığı"/>

                    <Input name="createDescription" label="Açıklamayı Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan Açıklaması"/>

                    <Input name="createTotalSalary" label="Maaşı Değiştir (₺)" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışanın Aylık Maaşı"/>

                    <Input name="createWorkPerHour" label="Saatlik Ücreti Değiştir (₺)" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışanın Saatlik Ücreti"/>

                    <Input name="createCity" label="Şehri Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İş Adresi"/>

                    <Input name="createDistrict" label="İlçeyi Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İş Adresi"/>

                    <Input name="createStreet" label="Sokağı Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İş Adresi"/>

                    <Input name="createEducationLevelName" label="Eğitim Seviyesini Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Eğtim Seviyesi"/>

                    <Input name="createEmploymentName" label="Çalışma Şeklini Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışma Şekli"/>

                    <Input name="createExperienceLevelName" label="Deneyim Seviyesini Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Deneyim Seviyesi"/>

                    <Input name="createExperienceYears" label="Deneyim Yılını Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Deneyim Yılı"/>

                    <div>
                                    
                        <button className="btn btn-primary d-inline-flex"
                                onClick={onClickSave}
                                disabled = {pendingApiCall}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                            Kaydet
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatedJobPosting;