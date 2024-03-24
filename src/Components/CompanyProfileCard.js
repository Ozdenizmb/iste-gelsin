import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import Input from './Input';
import { updateCompany, getCompany } from '../api/apiCalls';
//import { useApiProgress } from '../shared/ApiProgress';
import { updateUserSuccess } from '../redux/authActions';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CompanyProfileCard = (props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedCompanyName, setUpdatedCompanyName] = useState();
    const [updatedFax, setUpdatedFax] = useState();
    const [updatedPassword, setUpdatedPassword] = useState();
    const [updatedPhone, setUpdatedPhone] = useState();
    const [UpdatedLogoFile, setUpdatedLogoFile] = useState();
    const { email, name, surname, password, logoPath } = useSelector((store) => ({
        email: store.email,
        name: store.name,
        surname: store.surname,
        password: store.password,
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
        setUpdatedCompanyName(user.companyName);
        setUpdatedFax(user.fax);
        setUpdatedPassword(user.password);
        setUpdatedPhone(user.phone);
    }

    const onClickSave = async () => {

        let image;
        if(newImage) {
            image = newImage.split(',')[1]
        }

        const formData = new FormData();
        formData.append('companyId', user.companyId);
        formData.append('companyName', updatedCompanyName);
        formData.append('logoPath', user.logoPath);
        formData.append('isActive', user.isActive);
        formData.append('fax', updatedFax);
        formData.append('phone', updatedPhone);
        formData.append('email', user.email);
        formData.append('countryId', user.countryId);
        formData.append('cityId', user.cityId);
        formData.append('districtId', user.districtId);
        formData.append('streetId', user.streetId);
        formData.append('apartmentNumber', user.apartmentNumber);
        formData.append('username', user.username);
        formData.append('password', updatedPassword);
        formData.append('createdAt', user.createdAt);
        formData.append('logoFile', UpdatedLogoFile);

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

//    const pendingApiCall = useApiProgress('put', '/api/1.0/users/' + username);
    const pendingApiCall = false;
    const { t } = useTranslation();
            
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
                            <FontAwesomeIcon icon={faEdit} className="pe-2 pt-1" />
                            {t("Edit")}
                        </button>}
                    </div>
                    )
                }
                {inEditMode &&
                    (
                        <div>

                            <Input name="changeCompanyName" label="Change Name" type="text" onChangeVeriables={onChange} defaultValue={user.companyName} error={error.companyName}/>

                            <Input name="changeFax" label="Change Fax" onChangeVeriables={onChange} defaultValue={user.fax === 'string' ? '' : user.fax} error={error.fax} />

                            <Input name="changePassword" label="Change Password" onChangeVeriables={onChange} defaultValue={user.password} error={error.password} type="password" />

                            <Input name="changePhone" label="Change Phone Number" onChangeVeriables={onChange} defaultValue={user.phone} error={error.phone} />

                            <Input type="file" onChangeVeriables={onChangeFile} error={error.image}/>
                            
                            <div>
                                
                                <button className="btn btn-primary d-inline-flex"
                                        onClick={onClickSave}
                                        disabled = {pendingApiCall}>
                                    {pendingApiCall ? <span className="spinner-border spinner-border-sm"></span> : ''}
                                    <FontAwesomeIcon icon={faSave} className="pe-2 pt-1" />
                                    {t("Save")}
                                </button>

                                <button className="btn btn-danger d-inline-flex ms-1"
                                        onClick={onClickClose}>
                                    <FontAwesomeIcon icon={faTimes} className="pe-2 pt-1" />
                                    {t("Cancel")}
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