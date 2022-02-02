import React from "react";
import "./profile.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import profile from "../../../images/profile.jpg";

const ProfileComponent: React.FunctionComponent = () => {
  return (
    <div className="profileContent">
      <Container>
        <Row className="justify-content-center">
          <Col className="imageContainer">
            <Image src={profile} className="image" />
          </Col>
          <Col className="textStyle">
            Hi! My name is Jorge, I am 25 years old and I am a web and mobile
            (android and ios) developer. I am monotributista. I am in constant
            learning, I am a student of the Systems Engineering career at the
            National University of Rosario. My goals are based on improving
            myself in all aspects of my life, giving the best of myself every
            day, both at work and personally. "If you want things to change in a
            big way, you have to make big changes."
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileComponent;
