import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import Footer from './Footer';

const Advert = (props) => {

  const { title, company, workType, positionLevel, department, image, details, experience, educationLevel, location, workingHours } = props;

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
              <Card.Img variant="top" src={image} alt={`${title} Image`} className="img-fluid"/>
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
                  <strong>Pozisyon:</strong> {positionLevel} {title}
                </Card.Text>
                <Card.Text>
                  <strong>Departman:</strong> {department}
                </Card.Text>
                <Card.Text>
                  <strong>Çalışma Şekli:</strong> {workType}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button variant="primary" className="me-2">
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
                  <strong>Tecrübe:</strong> {experience}
                </Card.Text>
                <Card.Text>
                  <strong>Eğitim Seviyesi:</strong> {educationLevel}
                </Card.Text>
                <Card.Text>
                  <strong>Adres:</strong> {location}
                </Card.Text>
                <Card.Text>
                  <strong>Çalışma Aralığı:</strong> {workingHours}
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
