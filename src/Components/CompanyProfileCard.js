import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import Input from './Input';
import { updateCompany, getCompany } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { updateUserSuccess } from '../redux/authActions';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompanyProfileCard = (props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedCompanyName, setUpdatedCompanyName] = useState();
    const [updatedFax, setUpdatedFax] = useState();
    const [updatedPassword, setUpdatedPassword] = useState();
    const [updatedPhone, setUpdatedPhone] = useState();
    const [updatedAdress, setUpdatedAdress] = useState();
    const [UpdatedLogoFile, setUpdatedLogoFile] = useState();
    const { email, logoPath } = useSelector((store) => ({
        email: store.email,
        logoPath: store.logoPath
    }));
    const routeParams = useParams();
    const [user, setUser] = useState({});
    const [newImage, setNewImage] = useState();
    const [error, setError] = useState({});
    const dispatch = useDispatch();

    const userForImage = {
        image : logoPath
    };

    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    const pathEmail = routeParams.email;
    const loggedInEmail = email;
    const editable = pathEmail === loggedInEmail;

    const onChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        const errorCopy = {... error};

        if(name == 'changeCompanyName') {
            setUpdatedCompanyName(value);
            errorCopy['name'] = undefined;
        }
        if(name == 'changeFax') {
            setUpdatedFax(value);
            errorCopy['surname'] = undefined;
        }
        if(name == 'changeAdress') {
            setUpdatedAdress(value);
            errorCopy['adres'] = undefined;
        }
        if(name == 'changePassword') {
            setUpdatedPassword(value);
            errorCopy['password'] = undefined;
        }
        if(name == 'changePhone') {
            setUpdatedPhone(value);
            errorCopy['gsm'] = undefined;
        }

        setError(errorCopy);
    }

    const onClickEdit = () => {
        setInEditMode(true);
        setUpdatedCompanyName(user.company_name);
        setUpdatedFax(user.fax);
        setUpdatedPassword(user.password);
        setUpdatedPhone(user.phone);
    }

    const onClickSave = async () => {

        const formData = new FormData();
        formData.append('companyid', user.companyid);
        formData.append('company_name', updatedCompanyName);
        formData.append('email', user.email);
        formData.append('password', updatedPassword);
        formData.append('fax', updatedFax);
        formData.append('phone', updatedPhone);
        formData.append('adress', updatedAdress);
        formData.append('is_active', user.is_active);
        formData.append('logo_file', UpdatedLogoFile);

        try {
            await updateCompany(formData);
            const response = await getCompany();
            setUser(response.data.data);
            setInEditMode(false);
            dispatch(updateUserSuccess(response.data.data));
        }
        catch(error) {
            setError(error.response.data.validationErrors);
        }
    }

    const onClickClose = () => {
        setInEditMode(false);
        setUpdatedCompanyName(undefined);
        setUpdatedFax(undefined);
        setUpdatedPassword(undefined);
        setUpdatedPhone(undefined);
        setNewImage(undefined);
        setUpdatedLogoFile(null);
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1) {
            return;
        }
        
        const file = event.target.files[0];
        setUpdatedLogoFile(event.target.files[0]);

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setNewImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);

        const errorCopy = {... error};
        errorCopy['image'] = undefined;
        setError(errorCopy);
    }

    const pendingApiCall = useApiProgress('put', '/api/v1/Company');
            
    return (
        <div className="card text-center">
            <div className="card-header">
                <ProfileImage user={userForImage} width={"200"} height={"200"} tempImage={newImage} imageCss="shadow" />
            </div>
            <div className="card-body">
                {!inEditMode &&
                    (
                    <div>
                        <h3>
                            {email}
                        </h3>
                        {editable && <button className="btn btn-success d-inline-flex" onClick={onClickEdit}>
                            {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                            <FontAwesomeIcon icon={faEdit} className="pe-2 pt-1" />
                            Güncelle
                        </button>}
                    </div>
                    )
                }
                {inEditMode &&
                    (
                        <div>

                            <Input name="changeCompanyName" label="Change Name" type="text" onChangeVeriables={onChange} defaultValue={user.company_name} error={error.companyName}/>

                            <Input name="changeFax" label="Change Fax" onChangeVeriables={onChange} defaultValue={user.fax === 'string' ? '' : user.fax} error={error.fax} />

                            <Input name="changeAdress" label="Change Address" onChangeVeriables={onChange} defaultValue={user.adress === 'string' ? '' : user.adress} error={error.adress} />

                            <Input name="changePassword" label="Change Password" onChangeVeriables={onChange} defaultValue={user.password} error={error.password} type="password" />

                            <Input name="changePhone" label="Change Phone Number" onChangeVeriables={onChange} defaultValue={user.phone} error={error.phone} />

                            <Input type="file" onChangeVeriables={onChangeFile} error={error.image}/>
                            
                            <div>
                                
                                <button className="btn btn-primary d-inline-flex"
                                        onClick={onClickSave}
                                        disabled = {pendingApiCall}>
                                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                    <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                                    Kaydet
                                </button>

                                <button className="btn btn-danger d-inline-flex ms-1"
                                        onClick={onClickClose}>
                                    <FontAwesomeIcon icon={faTimes} className="pe-2 pt-1" />
                                    Geri Dön
                                </button>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );

};

export default CompanyProfileCard;