import React, { useEffect, useState } from 'react';
import Input from './Input';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteJobPosting, getJobPosting, updateJobPosting } from '../api/apiCalls';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { useApiProgress } from '../shared/ApiProgress';
import { Spinner } from 'react-bootstrap';

const AdvertAdminCard = ({ jobId }) => {

    const [logoPath, setLogoPath] = useState();
    const [updatedTitle, setUpdatedTitle] = useState();
    const [updatedDescription, setUpdatedDescription] = useState();
    const [updatedTotalSalary, setUpdatedTotalSalary] = useState();
    const [updatedWorkPerHour, setUpdatedWorkPerHour] = useState();
    const [updatedAdress, setUpdatedAdress] = useState();
    const [updatedEducationLevel, setUpdatedEducationLevel] = useState();
    const [updatedEmploymentType, setUpdatedEmploymentType] = useState();
    const [updatedExperienceLevel, setUpdatedExperienceLevel] = useState();
    const [updatedExperienceYears, setUpdatedExperienceYears] = useState();
    const [updatedWorkModel, setUpdatedWorkModel] = useState();
    const [updatedStartAt, setUpdatedStartAt] = useState();
    const [updatedEndAt, setUpdatedEndAt] = useState();
    const [updatedStartAtConvert, setUpdatedStartAtConvert] = useState();
    const [updatedEndAtConvert, setUpdatedEndAtConvert] = useState();

    const [error, setError] = useState({});

    const history = useHistory();
    const pendingApiCallUpdate = useApiProgress('put','/api/v1/JobPosting');
    const pendingApiCallDelete = useApiProgress('patch','/api/v1/JobPosting');
    const pendingApiCallList = useApiProgress('get','/api/v1/JobPosting');

    const { id, email } = useSelector(store => ({
        id: store.id,
        email: store.email
    }));

    const getAdvertDetail = async (advertId) => {
        try {
            if(advertId != "ilan-paneli") {
                const response = await getJobPosting(advertId);
                setLogoPath(response.data.data.logo_path);
                setUpdatedTitle(response.data.data.title);
                setUpdatedDescription(response.data.data.description);
                setUpdatedTotalSalary(response.data.data.total_salary);
                setUpdatedWorkPerHour(response.data.data.work_per_hour);
                setUpdatedAdress(response.data.data.adress);
                setUpdatedEducationLevel(response.data.data.education_level);
                setUpdatedEmploymentType(response.data.data.employment_type);
                setUpdatedExperienceLevel(response.data.data.experience_level);
                setUpdatedExperienceYears(response.data.data.experience_years);
                setUpdatedWorkModel(response.data.data.work_model);
                setUpdatedStartAt(response.data.data.start_at);
                setUpdatedEndAt(response.data.data.end_at);

                let tentativeStartDate = new Date(response.data.data.start_at);
                let tentativeEndDate = new Date(response.data.data.end_at);
                const formattedStartDate = format(new Date(tentativeStartDate), 'yyyy-MM-dd');
                const formattedEndDate = format(new Date(tentativeEndDate), 'yyyy-MM-dd');
                setUpdatedStartAtConvert(formattedStartDate);
                setUpdatedEndAtConvert(formattedEndDate);
            }
        } catch(error) {
            
        }
    }

    useEffect(() => {
        getAdvertDetail(jobId);
    }, [jobId]);

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
        if(name == 'changeAdress') {
            setUpdatedAdress(value);
            errorCopy['adress'] = undefined;
        }
        if(name == 'changeEducationLevel') {
            setUpdatedEducationLevel(value);
            errorCopy['educationLevelName'] = undefined;
        }
        if(name == 'changeEmploymentType') {
            setUpdatedEmploymentType(value);
            errorCopy['employmentName'] = undefined;
        }
        if(name == 'changeWorkModel') {
            setUpdatedWorkModel(value);
            errorCopy['workModel'] = undefined;
        }
        if(name == 'changeExperienceLevel') {
            setUpdatedExperienceLevel(value);
            errorCopy['experienceLevelName'] = undefined;
        }
        if(name == 'changeExperienceYears') {
            setUpdatedExperienceYears(value);
            errorCopy['experienceYears'] = undefined;
        }
        if(name == 'changeStartAt') {
            setUpdatedStartAt(value);
            errorCopy['startAt'] = undefined;
        }
        if(name == 'changeEndAt') {
            setUpdatedEndAt(value);
            errorCopy['endAt'] = undefined;
        }

        setError(errorCopy);
    }

    const onClickSave = async () => {

        const body = {
            job_postingid: jobId,
            companyid: id,
            employment_type: updatedEmploymentType,
            education_level: updatedEducationLevel,
            experience_level: updatedExperienceLevel,
            experience_years: updatedExperienceYears,
            work_model: updatedWorkModel,
            work_per_hour: updatedWorkPerHour,
            total_salary: updatedTotalSalary,
            title: updatedTitle,
            description: updatedDescription,
            adress: updatedAdress,
            is_active: true,
            start_at: updatedStartAt,
            end_at: updatedEndAt
        }

        try {
            await updateJobPosting(body);
            history.push(`/jobadvert/${jobId}`);
        } catch(error) {

        }
    }

    const onClickDelete = async () => {
        const body = [
            {
              "operationType": 0,
              "path": "/is_active",
              "op": "replace",
              "from": "string",
              "value": false
            }
        ]

        try {
            const response = await deleteJobPosting(jobId, body);
            history.push("/profile/" + email);
        } catch(error) {

        }
    }

    if(pendingApiCallList) {
        return(
            <div className="text-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="card text-center h-100 border rounded-3 shadow mb-5">
            <div className="card-header">
                <img
                    className={"rounded-circle shadow"} 
                    width={200} height={200}
                    alt={updatedTitle} src={'https://cdn.colaksoft.online/' + logoPath}>
                </img>
            </div>
            <div className="card-body">
                <Input name="changeTitle" label="Başlığı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={updatedTitle} error={error.title}/>

                <Input name="changeDescription" label="Açıklamayı Değiştir" type="text" onChangeVeriables={onChange} defaultValue={updatedDescription} error={error.description}/>

                <Input name="changeTotalSalary" label="Maaşı Değiştir (₺)" type="text" onChangeVeriables={onChange} defaultValue={updatedTotalSalary} error={error.totalSalary}/>

                <Input name="changeWorkPerHour" label="Saatlik Ücreti Değiştir (₺)" type="text" onChangeVeriables={onChange} defaultValue={updatedWorkPerHour} error={error.name}/>

                <Input name="changeAdress" label="Adresi Değiştir" type="text" onChangeVeriables={onChange} defaultValue={updatedAdress} error={error.adress}/>

                <div className="mb-3">
                    <label className="form-label">Eğitim Seviyesini Değiştir</label>
                    <select id="comboBox1" className="form-select" name="changeEducationLevel" onChange={onChange} value={updatedEducationLevel}>
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
                    <label className="form-label">Çalışma Şeklini Değiştir</label>
                    <select id="comboBox3" className="form-select" name="changeEmploymentType" onChange={onChange} value={updatedEmploymentType}>
                        <option value="1">Tam Zamanlı Çalışma</option>
                        <option value="2">Yarı Zamanlı Çalışma</option>
                        <option value="3">Sözleşmeli Çalışma</option>
                        <option value="4">Sezonluk / Dönemlik</option>
                        <option value="5">Stajyerlik</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">İş Modelini Değiştir</label>
                    <select id="comboBox3" className="form-select" name="changeWorkModel" onChange={onChange} value={updatedWorkModel}>
                        <option value="1">Uzaktan</option>
                        <option value="2">Hibrit</option>
                        <option value="3">Ofis</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Deneyim Seviyesini Değiştir</label>
                    <select id="comboBox4" className="form-select" name="changeExperienceLevel" onChange={onChange} value={updatedExperienceLevel}>
                        <option value="1">Giriş Seviyesi</option>
                        <option value="2">Orta Seviye</option>
                        <option value="3">Üst Düzey</option>
                        <option value="4">Uzman</option>
                    </select>
                </div>

                <Input name="changeExperienceYears" label="Deneyim Yılını Değiştir" type="text" onChangeVeriables={onChange} defaultValue={updatedExperienceYears} error={error.experienceYears}/>

                <Input name="changeStartAt" label="İş Başlangıç Tarihini Değiştir" onChangeVeriables={onChange} defaultValue={updatedStartAtConvert} error={error.start_at} type="date"/>

                <Input name="changeEndAt" label="İş Bitiş Tarihini Değiştir" onChangeVeriables={onChange} defaultValue={updatedEndAtConvert} error={error.end_at} type="date"/>

                <div>
                                
                    <button className="btn btn-primary d-inline-flex" onClick={onClickSave} disabled = {pendingApiCallUpdate}>
                        {pendingApiCallUpdate ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                        Güncelle
                    </button>

                    <button className="btn btn-danger d-inline-flex ms-1" onClick={onClickDelete} disabled={pendingApiCallDelete}>
                        {pendingApiCallDelete ? <span className="spinner-border spinner-border-sm"></span> : ''}
                        <FontAwesomeIcon icon={faTimes} className="pe-2 pt-1" />
                        Sil
                    </button>

                </div>
            </div>
        </div>
    );
};

export default AdvertAdminCard;