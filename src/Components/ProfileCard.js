import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileImage from './ProfileImage';
import { useTranslation } from 'react-i18next';
import Input from './Input';
//import { updateUser } from '../api/apiCalls';
//import { useApiProgress } from '../shared/ApiProgress';
import { updateSuccess } from '../redux/authActions';
import { faEdit, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileCard = (props) => {

    const [inEditMode, setInEditMode] = useState(false);
    const [updatedDisplayName, setUpdatedDisplayName] = useState();
    const { email, name, surname } = useSelector((store) => ({
        email: store.email,
        name: store.name,
        surname: store.surname
    }));
    const routeParams = useParams();
    const [user, setUser] = useState({});
    const [newImage, setNewImage] = useState();
    const [error, setError] = useState({});
    const dispatch = useDispatch();

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

        if(name == 'changeDisplayName') {
            setUpdatedDisplayName(value);
            errorCopy['displayName'] = undefined;
        }

        setError(errorCopy);
    }

    const onClickEdit = () => {
        setInEditMode(true);
        setUpdatedDisplayName(user.displayName);
    }

    const onClickSave = async () => {

        let image;
        if(newImage) {
            image = newImage.split(',')[1]
        }

        const body = {
            displayName : updatedDisplayName,
            image : image
        }

        try {
            //const response = await updateUser(user.username, body);
            //setUser(response.data);
            setInEditMode(false);
            //dispatch(updateSuccess(response.data));
        }
        catch(error) {
            setError(error.response.data.validationErrors);
        }
    }

    const onClickClose = () => {
        setInEditMode(false);
        setUpdatedDisplayName(undefined);
        setNewImage(undefined);
    }

    const onChangeFile = (event) => {
        if(event.target.files.length < 1) {
            return;
        }
        
        const file = event.target.files[0];

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
                <ProfileImage user={user} width={"200"} height={"200"} tempImage={newImage} imageCss="shadow" />
            </div>
            <div className="card-body">
                {!inEditMode &&
                    (
                    <div>
                        <h3>
                            {/*{user.displayName}@{user.username}*/}
                            {user.name} {user.surname}
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

                            <Input name="changeDisplayName" label={t("Change Display Name")} type="text" onChangeVeriables={onChange} defaultValue={user.displayName} error={error.displayName}/>

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

export default ProfileCard;