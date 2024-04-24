import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Footer from './Footer';
import { useSelector } from 'react-redux';
import { postJobApplication } from '../api/apiCalls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Advert = (props) => {

  const { id, companyId, employmentType, educationLevel, experienceLevel, experienceYears, workModel, workPerHour, totalSalary, title, description, logoPath, adress, isActive, startAt, endAt, companyName, employmentName, educationLevelName, experienceLevelName, workModelName  } = props;

  const { userId, statuses } = useSelector(store => ({
    userId: store.id,
    statuses: store.statuses
  }));

  const [applicationChecked, setApplicationChecked] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickJobApplication = async (event) => {
    event.preventDefault();

    const body = {
      job_postingid: id,
      userid: userId,
      is_user_accepted: true
    }
    console.log(body);

    try {
      const response = await postJobApplication(body);
      setApplicationChecked(true);
    } catch(error) {
      if (error.response.data.message === "Bu bilgilere ait bir kayit bulundu!") {
        toast.error("Bu ilana zaten başvurdunuz!");
        setApplicationChecked(true);
      } else {
        console.log("Başka bir hata")
      }
    }

  }

  return (
    <div className="advert-page">
      <div className="container">
        <Row>
          <Col md={12}>
            <h1 className="text-center mt-4">{title}</h1>
            <hr className="flex-grow-1 mb-4" />
          </Col>
        </Row>
        <Row className="job-advert-row d-flex">

          <Col md={6} lg={6} className="flex-grow-1">
            <Card className="job-advert-card shadow">
              <Card.Img variant="top" src={'https://cdn.colaksoft.online/' + logoPath} alt={`${title} Image`} className="img-fluid" />
              <Card.Body>
                <Card.Title>{title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={4} className="flex-grow-1">
            <Card className="job-advert-card shadow">
              <Card.Body>
                <Card.Title>{companyName}</Card.Title>
                <hr className="flex-grow-1" />
                <Card.Text>
                  <strong>İş Tanımı:</strong> {description}
                </Card.Text>
                <Card.Text>
                  <strong>Maaş:</strong> {totalSalary} ₺
                </Card.Text>
                <Card.Text>
                  <strong>İş Modeli:</strong> {workModelName}
                </Card.Text>
                {
                  statuses == "user" &&
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" className="me-2" onClick={onClickJobApplication}>
                      { applicationChecked && <FontAwesomeIcon icon={faCheck} className="me-2" /> }
                      Başvur
                    </Button>

                    <Button variant="secondary">Kaydet</Button>
                  </div>
                }
                {
                  statuses == "company" &&
                  <div className="d-flex justify-content-end">
                    <Button variant="primary" className="me-2" onClick={() => { window.scrollTo(0, 0); }}>
                      Başvuruları Görüntüle
                    </Button>
                  </div>
                }
              </Card.Body>
            </Card>
            <Card className="job-advert-card mt-2 shadow">
              <Card.Body>
                <Card.Title>İlan Detayları</Card.Title>
                <hr className="flex-grow-1" />
                <Card.Text>
                  <strong>Tecrübe:</strong> {experienceLevelName} / {experienceYears} Yıl
                </Card.Text>
                <Card.Text>
                  <strong>Eğitim Seviyesi:</strong> {educationLevelName}
                </Card.Text>
                <Card.Text>
                  <strong>Adres:</strong> {adress}
                </Card.Text>
                <Card.Text>
                  <strong>Haftalık Çalışma Saati:</strong> {workPerHour}
                </Card.Text>
                <Card.Text>
                  <strong>Çalışma Şekli:</strong> {employmentName}
                </Card.Text>
                <Card.Text>
                  <strong>İş Başlangıç Tarihi:</strong> {startAt}
                </Card.Text>
                <Card.Text>
                  <strong>İş Bitiş Tarihi:</strong> {endAt}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ToastContainer />
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Advert;
