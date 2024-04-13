import React, { useEffect, useState } from 'react';
import Input from './Input';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteJobPosting } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const AdvertAdminCard = ({ advert }) => {

    const [updatedTitle, setUpdatedTitle] = useState(advert.title);
    const [updatedDescription, setUpdatedDescription] = useState(advert.description);
    const [updatedTotalSalary, setUpdatedTotalSalary] = useState(advert.totalSalary);
    const [updatedWorkPerHour, setUpdatedWorkPerHour] = useState(advert.workPerHour);
    const [updatedCity, setUpdatedCity] = useState(advert.cityName);
    const [updatedDistrict, setUpdatedDistrict] = useState(advert.districtName);
    const [updatedStreet, setUpdatedStreet] = useState(advert.streetName);
    const [updatedEducationLevelName, setUpdatedEducationLevelName] = useState(advert.educationLevelName);
    const [updatedEmploymentName, setUpdatedEmploymentName] = useState(advert.employmentName);
    const [updatedExperienceLevelName, setUpdatedExperienceLevelName] = useState(advert.experienceLevelName);
    const [updatedExperienceYears, setUpdatedExperienceYears] = useState(advert.experienceYears);

    const [error, setError] = useState({});

    const history = useHistory();
    const pendingApiCall = false;

    const { email } = useSelector(store => ({
        email: store.email
    }));

    useEffect(() => {
        console.log(advert);
    }, []);

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        const errorCopy = {... error};

        if(name == 'changeTitle') {
            setUpdatedTitle(value);
            errorCopy['title'] = undefined;
        }
        if(name == 'changeDescription') {
            setUpdatedDescription(value);
            errorCopy['description'] = undefined;
        }
        if(name == 'changeTotalSalary') {
            setUpdatedTotalSalary(value);
            errorCopy['totalSalary'] = undefined;
        }
        if(name == 'changeWorkPerHour') {
            setUpdatedWorkPerHour(value);
            errorCopy['workPerHour'] = undefined;
        }
        if(name == 'changeCity') {
            setUpdatedCity(value);
            errorCopy['city'] = undefined;
        }
        if(name == 'changeDistrict') {
            setUpdatedDistrict(value);
            errorCopy['district'] = undefined;
        }
        if(name == 'changeStreet') {
            setUpdatedStreet(value);
            errorCopy['street'] = undefined;
        }
        if(name == 'changeEducationLevelName') {
            setUpdatedEducationLevelName(value);
            errorCopy['educationLevelName'] = undefined;
        }
        if(name == 'changeEmploymentName') {
            setUpdatedEmploymentName(value);
            errorCopy['employmentName'] = undefined;
        }
        if(name == 'changeExperienceLevelName') {
            setUpdatedExperienceLevelName(value);
            errorCopy['experienceLevelName'] = undefined;
        }
        if(name == 'changeExperienceYears') {
            setUpdatedExperienceYears(value);
            errorCopy['experienceYears'] = undefined;
        }

        setError(errorCopy);
    }

    const onClickSave = () => {
        console.log(updatedTitle);
        console.log(updatedDescription);
        console.log(updatedTotalSalary);
        console.log(updatedWorkPerHour);
        console.log(updatedCity);
        console.log(updatedDistrict);
        console.log(updatedStreet);
        console.log(updatedEducationLevelName);
        console.log(updatedEmploymentName);
        console.log(updatedExperienceLevelName);
        console.log(updatedExperienceYears);
    }

    const onClickDelete = async () => {
        const body = [
            {
              "operationType": 0,
              "path": "/IsActive",
              "op": "replace",
              "from": "string",
              "value": false
            }
        ]

        try {
            const response = await deleteJobPosting(advert.jobPostingId, body);
            history.push("/profile/" + email);
        } catch(error) {

        }
    }

    return (
        <div className="card text-center h-100 border rounded-3 shadow mb-5">
            <div className="card-header">
                <img
                    className={"rounded-circle shadow"} 
                    width={200} height={200}
                    alt={advert.title} src={'https://cdn.colaksoft.online/' + advert.logoPath}>
                </img>
            </div>
            <div className="card-body">
                <Input name="changeTitle" label="Başlığı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.title} error={error.name}/>

                <Input name="changeDescription" label="Açıklamayı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.description} error={error.name}/>

                <Input name="changeTotalSalary" label="Maaşı Değiştir (₺)" type="text" onChangeVeriables={onChange} defaultValue={advert.totalSalary} error={error.name}/>

                <Input name="changeWorkPerHour" label="Saatlik Ücreti Değiştir (₺)" type="text" onChangeVeriables={onChange} defaultValue={advert.workPerHour} error={error.name}/>

                <Input name="changeCity" label="Şehri Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.cityName} error={error.name}/>

                <Input name="changeDistrict" label="İlçeyi Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.districtName} error={error.name}/>

                <Input name="changeStreet" label="Sokağı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.streetName} error={error.name}/>

                <Input name="changeEducationLevelName" label="Eğitim Seviyesini Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.educationLevelName} error={error.name}/>

                <Input name="changeEmploymentName" label="Çalışma Şeklini Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.employmentName} error={error.name}/>

                <Input name="changeExperienceLevelName" label="Deneyim Seviyesini Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.experienceLevelName} error={error.name}/>

                <Input name="changeExperienceYears" label="Deneyim Yılını Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.experienceYears} error={error.name}/>

                <div>
                                
                    <button className="btn btn-primary d-inline-flex"
                            onClick={onClickSave}
                            disabled = {pendingApiCall}>
                        {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                        Güncelle
                    </button>

                    <button className="btn btn-danger d-inline-flex ms-1"
                        onClick={onClickDelete}>
                        <FontAwesomeIcon icon={faTimes} className="pe-2 pt-1" />
                        Sil
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AdvertAdminCard;