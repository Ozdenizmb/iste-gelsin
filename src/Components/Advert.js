import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

const JobAdvert = (props) => {
  const {
    title,
    company,
    workType,
    positionLevel,
    department,
    image,
    details,
    experience,
    educationLevel,
    address,
    workingHours,
  } = props;

  return (
    <Row className="job-advert-row">
      <Col md={6}>
        <Card className="job-advert-card">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              <strong>Şirket:</strong> {company}
            </Card.Text>
            <Card.Text>
              <strong>Çalışma Şekli:</strong> {workType}
            </Card.Text>
            <Card.Text>
              <strong>Pozisyon Seviyesi:</strong> {positionLevel}
            </Card.Text>
            <Card.Text>
              <strong>Departman:</strong> {department}
            </Card.Text>
            <div className="d-flex justify-content-end">
              <Button variant="primary" className="me-2">
                Başvur
              </Button>
              <Button variant="secondary">Kaydet</Button>
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6}>
        <Card className="job-advert-card">
          <Card.Img variant="top" src={image} alt={`${title} Image`} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{details}</Card.Text>
          </Card.Body>
        </Card>
      </Col>

      <Col md={12} lg={12}>
        <Card className="job-advert-card">
          <Card.Body>
            <Card.Title>İlan Detayları</Card.Title>
            <Card.Text>
              <strong>Tecrübe:</strong> {experience}
            </Card.Text>
            <Card.Text>
              <strong>Eğitim Seviyesi:</strong> {educationLevel}
            </Card.Text>
            <Card.Text>
              <strong>Adres:</strong> {address}
            </Card.Text>
            <Card.Text>
              <strong>Çalışma Aralığı:</strong> {workingHours}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default JobAdvert;
