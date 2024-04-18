import React, { useState } from 'react';
import './AdvertisementProceduresPage.css';
import Input from '../../Components/Input';
import { useSelector } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { insertJobPosting } from '../../api/apiCalls';

const CreatedJobPosting = (props) => {

    const [createdTitle, setCreatedTitle] = useState();
    const [createdDescription, setCreatedDescription] = useState();
    const [createdTotalSalary, setCreatedTotalSalary] = useState();
    const [createdWorkPerHour, setCreatedWorkPerHour] = useState();
    const [createdAdress, setCreatedAdress] = useState();
    const [createdEducationLevel, setCreatedEducationLevel] = useState();
    const [createdEmploymentType, setCreatedEmploymentType] = useState();
    const [createdExperienceLevel, setCreatedExperienceLevel] = useState();
    const [createdExperienceYears, setCreatedExperienceYears] = useState();
    const [createdWorkModel, setCreatedWorkModel] = useState();
    const [createdStartAt, setCreatedStartAt] = useState();
    const [createdEndAt, setCreatedEndAt] = useState();

    const [advert, setAdvert] = useState();
    const [error, setError] = useState({});

    const { companyId, email, logoPath } = useSelector(store => ({
        companyId: store.id,
        email: store.email,
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
        if(name == "createAdress") {
            setCreatedAdress(value);
            errorCopy['adress'] = undefined;
        }
        if(name == "createEducationLevel") {
            setCreatedEducationLevel(value);
            errorCopy['educationLevel'] = undefined;
        }
        if(name == "createWorkModel") {
            setCreatedWorkModel(value);
            errorCopy['workModel'] = undefined;
        }
        if(name == "createEmploymentType") {
            setCreatedEmploymentType(value);
            errorCopy['employmentType'] = undefined;
        }
        if(name == "createExperienceLevel") {
            setCreatedExperienceLevel(value);
            errorCopy['experienceLevel'] = undefined;
        }
        if(name == "createExperienceYears") {
            setCreatedExperienceYears(value);
            errorCopy['experienceYears'] = undefined;
        }
        if(name == "createStartAt") {
            setCreatedStartAt(value);
            errorCopy['startAt'] = undefined;
        }
        if(name == "createEndAt") {
            setCreatedEndAt(value);
            errorCopy['endAt'] = undefined;
        }

    }

    const onClickSave = async (event) => {
        event.preventDefault();

        const body = {
            companyid: companyId,
            employment_type: createdEmploymentType,
            education_level: createdEducationLevel,
            experience_level: createdExperienceLevel,
            experience_years: createdExperienceYears,
            work_model: createdWorkModel,
            work_per_hour: createdWorkPerHour,
            total_salary: createdTotalSalary,
            title: createdTitle,
            description: createdDescription,
            adress: createdAdress,
            is_active: true,
            start_at: createdStartAt,
            end_at: createdEndAt
        }

        try {
            await insertJobPosting(body);
            props.history.push(`/procedures/${email}/ilan-paneli`);
        } catch(error) {
            
        }
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
                    <Input name="createTitle" label="Başlığı Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan Başlığı"/>

                    <Input name="createDescription" label="Açıklamayı Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan Açıklaması"/>

                    <Input name="createTotalSalary" label="Maaşı Gir (₺)" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışanın Aylık Maaşı"/>

                    <Input name="createWorkPerHour" label="Saatlik Ücreti Gir (₺)" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışanın Saatlik Ücreti"/>

                    <Input name="createAdress" label="Adresi Değiştir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İş Adresi"/>

                    <Input name="createEducationLevel" label="Eğitim Seviyesini Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Eğtim Seviyesi"/>

                    <Input name="createWorkModel" label="Çalışma Modelini Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışma Modelini"/>

                    <Input name="createEmploymentType" label="Çalışma Şeklini Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="Çalışma Şekli"/>

                    <Input name="createExperienceLevel" label="Deneyim Seviyesini Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Deneyim Seviyesi"/>

                    <Input name="createExperienceYears" label="Deneyim Yılını Gir" type="text" onChangeVeriables={onChange} error={error.name} placeholder="İlan İçin Gerekli Deneyim Yılı"/>

                    <Input name="createStartAt" label="İş Başlangıç Tarihini Gir" onChangeVeriables={onChange} error={error.birthday} type="date"/>

                    <Input name="createEndAt" label="İş Bitiş Tarihini Gir" onChangeVeriables={onChange} error={error.birthday} type="date"/>

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