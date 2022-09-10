import React from 'react';
import './FootageComponent.scss';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import footage01 from '../asset/videos/footage.mp4';
import footage02 from '../asset/videos/footage-02.mp4';
import footage03 from '../asset/videos/footage-03.mp4';

const CameraComponent = () => {
  const footageList = [footage01, footage02, footage03];

  return (
    <Container className='p-0 h-100 d-flex flex-column overflow-hidden justify-content-center align-items-center camera_component'>
      {footageList?.map((footage, index) => (
        <Row key={index}>
          <Col lg={12}>
            <Card>
              <CardHeader>
                <h4 className="card-title mb-0">Camera {index + 1}</h4>
              </CardHeader>
              <CardBody>
                <div className="footage_container" >
                  <video src={footage}  width="250" height="120" controls muted loop autoPlay />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ))}
    </Container>
  )
}

export default CameraComponent;