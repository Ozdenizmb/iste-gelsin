import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import Input from './Input';
import { updateUser, getUser } from '../api/apiCalls';
import { useApiProgress } from '../shared/ApiProgress';
import { updateUserSuccess } from '../redux/authActions';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';

const UserProfileCard = (props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedName, setUpdatedName] = useState();
    const [updatedSurname, setUpdatedSurname] = useState();
    const [updatedPassword, setUpdatedPassword] = useState();
    const [updatedGsm, setUpdatedGsm] = useState();
    const [updatedGenderType, setUpdatedGenderType] = useState();
    const [updatedBirthDay, setUpdatedBirthDay] = useState();
    const [updatedBirthDayConvert, setUpdatedBirthDayConvert] = useState();
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

        if(name == 'changeName') {
            setUpdatedName(value);
            errorCopy['name'] = undefined;
        }
        if(name == 'changeSurname') {
            setUpdatedSurname(value);
            errorCopy['surname'] = undefined;
        }
        if(name == 'changePassword') {
            setUpdatedPassword(value);
            errorCopy['password'] = undefined;
        }
        if(name == 'changeGsm') {
            setUpdatedGsm(value);
            errorCopy['gsm'] = undefined;
        }
        if(name == 'changeGenderType') {
            if(value == 'male') {
                setUpdatedGenderType(2);
            }
            else {
                setUpdatedGenderType(3);
            }
            errorCopy['genderType'] = undefined;
        }
        if(name == 'changeBirthDay') {
            setUpdatedBirthDay(value)
            errorCopy['birthday'] = undefined;
        }

        setError(errorCopy);
    }

    const onClickEdit = () => {
        setInEditMode(true);
        setUpdatedName(user.name);
        setUpdatedSurname(user.surname);
        setUpdatedPassword(user.password);
        setUpdatedGsm(user.gsm);
        setUpdatedGenderType(user.gender_type);
        setUpdatedBirthDay(user.birthday);
        let tentativeDate = new Date(user.birthday);
        const formattedDate = format(new Date(tentativeDate), 'yyyy-MM-dd');
        setUpdatedBirthDayConvert(formattedDate);
    }

    const onClickSave = async () => {

        let image;
        if(newImage) {
            image = newImage.split(',')[1]
        }

        const formData = new FormData();
        formData.append('userid', user.userid);
        formData.append('name', updatedName);
        formData.append('surname', updatedSurname);
        formData.append('id_no', user.id_no);
        formData.append('email', user.email);
        formData.append('password', updatedPassword);
        formData.append('gsm', updatedGsm);
        formData.append('gender_type', updatedGenderType);
        formData.append('bank_account_code', user.bank_account_code);
        formData.append('working_with_bankid', user.working_with_bankid);
        formData.append('iban', user.iban);
        formData.append('is_active', user.is_active);
        formData.append('birthday', updatedBirthDay);
        formData.append('created_at', user.created_at);
        formData.append('logo_file', UpdatedLogoFile);

        try {
            await updateUser(formData);
            const response = await getUser();
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
        setUpdatedName(undefined);
        setUpdatedSurname(undefined);
        setUpdatedPassword(undefined);
        setUpdatedGsm(undefined);
        setUpdatedGenderType(undefined);
        setUpdatedBirthDay(undefined);
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

    const pendingApiCall = useApiProgress('put', '/api/v1/User');
            
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
                            {user.name} {user.surname}
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

                            <Input name="changeName" label="Change Name" type="text" onChangeVeriables={onChange} defaultValue={user.name} error={error.name}/>

                            <Input name="changeSurname" label="Change Surname" onChangeVeriables={onChange} defaultValue={user.surname} error={error.surname} />

                            <Input name="changePassword" label="Change Password" onChangeVeriables={onChange} defaultValue={user.password} error={error.password} type="password" />

                            <Input name="changeGsm" label="Change Phone Number" onChangeVeriables={onChange} defaultValue={user.gsm === 'string' ? '' : user.gsm} error={error.gsm} />

                            <div className="mb-3">
                                <label className="form-label me-4">Change Gender Type:</label>

                                <input type="radio" name="changeGenderType" value="male" checked={updatedGenderType === 2} onChange={onChange} className="form-check-input" id="maleRadio"/>
                                <label className="form-check-label ms-1 me-3" htmlFor="maleRadio">Erkek</label>

                                <input type="radio" name="changeGenderType" value="female" checked={updatedGenderType === 3} onChange={onChange} className="form-check-input" id="femaleRadio"/>
                                <label className="form-check-label ms-1 me-3" htmlFor="femaleRadio">Kadın</label>
                            </div>

                            <Input name="changeBirthDay" label="Change Birth Day" onChangeVeriables={onChange} defaultValue={updatedBirthDayConvert} error={error.birthday} type="date"/>

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

export default UserProfileCard;