import React, { useEffect, useState } from 'react';
import Input from './Input';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AdvertAdminCard = ({advert}) => {

    const [error, setError] = useState({});

    const pendingApiCall = false;

    useEffect(() => {
        console.log(advert);
    }, []);

    const onChange = () => {

    }

    const onClickSave = () => {

    }

    const onClickDelete = () => {

    }

    return (
        <div className="card text-center h-100 border rounded-3 shadow">
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

                <Input name="changeStreet" label="İlçeyi Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.districtName} error={error.name}/>

                <Input name="changeStreetName" label="Sokağı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={advert.streetName} error={error.name}/>

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