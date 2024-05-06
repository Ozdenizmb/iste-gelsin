import React, { useState } from 'react';
import Input from './Input';
import { useSelector } from 'react-redux';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { insertJobPosting } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import defaulImage from '../images/profile.png';
import { ToastContainer, toast } from 'react-toastify';

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

    const [error, setError] = useState({});

    const { companyId, email, logoPath, isLoggedIn } = useSelector(store => ({
        companyId: store.id,
        email: store.email,
        logoPath: store.logoPath,
        isLoggedIn: store.isLoggedIn
    }));

    const pendingApiCall = useApiProgress('post','/api/v1/JobPosting');

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
            if(!isLoggedIn) {
                toast.error("İlan Oluşturmak İçin Öncelikle İşveren Olarak Kayıt Olmalısınız!");
            }
            else {
                toast.error("Tüm Bilgileri Eksiksiz Girmeye Dikkat Ediniz!");
            }
        }
    }

    return (
        <div className="container mt-4 mb-4">
            <div className="card text-center h-100 border rounded-3 shadow mb-5">
                <div className="card-header">
                    <img
                        className={"rounded-circle shadow"} 
                        width={200} height={200}
                        alt={"company image"} src={logoPath != null ? 'https://cdn.colaksoft.online/' + logoPath: defaulImage}>
                    </img>
                </div>
                <div className="card-body ps-5 pe-5">
                    <Input name="createTitle" label="Başlığı Gir" type="text" onChangeVeriables={onChange} error={error.title} placeholder="İlan Başlığı"/>

                    <Input name="createDescription" label="Açıklamayı Gir" type="text" onChangeVeriables={onChange} error={error.description} placeholder="İlan Açıklaması"/>

                    <Input name="createTotalSalary" label="Maaşı Gir (₺)" type="text" onChangeVeriables={onChange} error={error.totalSalary} placeholder="Çalışanın Aylık Maaşı"/>

                    <Input name="createWorkPerHour" label="Saatlik Ücreti Gir (₺)" type="text" onChangeVeriables={onChange} error={error.workPerHour} placeholder="Çalışanın Saatlik Ücreti"/>

                    <Input name="createAdress" label="Adresi Değiştir" type="text" onChangeVeriables={onChange} error={error.adress} placeholder="İş Adresi"/>

                    <div className="mb-3">
                        <label className="form-label">Eğitim Seviyesini Gir</label>
                        <select id="comboBox1" className="form-select" name="createEducationLevel" onChange={onChange}>
                            <option value="">Eğitim Seviyesini Seçiniz</option>
                            <option value="1">Lise</option>
                            <option value="2">Ön Lisans</option>
                            <option value="3">Lisans</option>
                            <option value="4">Yüksek Lisans</option>
                            <option value="5">Doktora</option>
                            <option value="6">Post-Doktora</option>
                            <option value="7">Profesyonel Derece</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Çalışma Şeklini Gir</label>
                        <select id="comboBox3" className="form-select" name="createEmploymentType" onChange={onChange}>
                            <option value="">Çalışma Şeklini Seçiniz</option>
                            <option value="1">Tam Zamanlı Çalışma</option>
                            <option value="2">Yarı Zamanlı Çalışma</option>
                            <option value="3">Sözleşmeli Çalışma</option>
                            <option value="4">Sezonluk / Dönemlik</option>
                            <option value="5">Stajyerlik</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Çalışma Modelini Gir</label>
                        <select id="comboBox3" className="form-select" name="createWorkModel" onChange={onChange}>
                            <option value="">Çalışma Modelini Seçiniz</option>
                            <option value="1">Uzaktan</option>
                            <option value="2">Hibrit</option>
                            <option value="3">Ofis</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Deneyim Seviyesini Gir</label>
                        <select id="comboBox4" className="form-select" name="createExperienceLevel" onChange={onChange}>
                            <option value="">Deneyim Seviyesini Seçiniz</option>
                            <option value="1">Giriş Seviyesi</option>
                            <option value="2">Orta Seviye</option>
                            <option value="3">Üst Düzey</option>
                            <option value="4">Uzman</option>
                        </select>
                    </div>

                    <Input name="createExperienceYears" label="Deneyim Yılını Gir" type="text" onChangeVeriables={onChange} error={error.experienceYears} placeholder="İlan İçin Gerekli Deneyim Yılı"/>

                    <Input name="createStartAt" label="İş Başlangıç Tarihini Gir" onChangeVeriables={onChange} error={error.startAt} type="date"/>

                    <Input name="createEndAt" label="İş Bitiş Tarihini Gir" onChangeVeriables={onChange} error={error.endAt} type="date"/>

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
            <ToastContainer />
        </div>
    );
};

export default CreatedJobPosting;