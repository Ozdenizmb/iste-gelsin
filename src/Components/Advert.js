import React, { useEffect } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Footer from './Footer';

const Advert = (props) => {

  const { id, company, employmentType, educationLevel, experienceLevel, experienceYears, workModel, workPerHour, totalSalary, title, description, logoPath, adress, isActive, startAt, endAt  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                <Card.Title>{company}</Card.Title>
                <hr className="flex-grow-1" />
                <Card.Text>
                  <strong>İş Tanımı:</strong> {description}
                </Card.Text>
                <Card.Text>
                  <strong>Pozisyon:</strong>
                </Card.Text>
                <Card.Text>
                  <strong>Maaş:</strong> {totalSalary} ₺
                </Card.Text>
                <Card.Text>
                  <strong>İş Modeli:</strong> {workModel}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" className="me-2" onClick={() => { window.scrollTo(0, 0); }}>
                    Başvur
                  </Button>

                  <Button variant="secondary">Kaydet</Button>
                </div>
              </Card.Body>
            </Card>
            <Card className="job-advert-card mt-2 shadow">
              <Card.Body>
                <Card.Title>İlan Detayları</Card.Title>
                <hr className="flex-grow-1" />
                <Card.Text>
                  <strong>Tecrübe:</strong> {experienceLevel} / {experienceYears} Yıl
                </Card.Text>
                <Card.Text>
                  <strong>Eğitim Seviyesi:</strong> {educationLevel}
                </Card.Text>
                <Card.Text>
                  <strong>Adres:</strong> {adress}
                </Card.Text>
                <Card.Text>
                  <strong>Haftalık Çalışma Saati:</strong> {workPerHour}
                </Card.Text>
                <Card.Text>
                  <strong>Çalışma Şekli:</strong> {employmentType}
                </Card.Text>
                <Card.Text>
                  <strong>İlan Süresi:</strong> {startAt} / {endAt}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default Advert;
