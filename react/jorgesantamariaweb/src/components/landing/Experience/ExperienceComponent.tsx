import React from "react";
import { Container, Row } from "react-bootstrap";
import "./experience.css";
import CardExperience from "../../common/cardExperience/CardExperience";

const ExperienceComponent: React.FunctionComponent = () => {
  return (
    <div className="experienceContent">
      <Container>
        <Row className="alignItems">
          <h1 className="title">My work experience!</h1>
        </Row>
        <CardExperience
          lat={-32.95652973568112}
          long={-60.627492742743804}
          positionGoogle={
            "https://www.google.com/maps/place/Servintweb+S.r.l/@-32.9567008,-60.629778,17z/data=!4m12!1m6!3m5!1s0x95b7aafe112b267d:0xb97d774c59112013!2sServintweb+S.r.l!8m2!3d-32.9567008!4d-60.6275893!3m4!1s0x95b7aafe112b267d:0xb97d774c59112013!8m2!3d-32.9567008!4d-60.6275893"
          }
          text="My first job as a developer was at Servintweb S.R.L. (Colón 1450, Rosario, Santa Fe, Argentina; phone: +54 9 341 2810714 / 0341-4214411 / 0341-4211980, email: administracion@e-carga.com.ar) where I worked as a mobile developer from November 2019 to August 2020."
        />
        <CardExperience
          lat={-32.95652973568112}
          long={-60.627492742743804}
          positionGoogle={
            "https://www.google.com/maps/place/Servintweb+S.r.l/@-32.9567008,-60.629778,17z/data=!4m12!1m6!3m5!1s0x95b7aafe112b267d:0xb97d774c59112013!2sServintweb+S.r.l!8m2!3d-32.9567008!4d-60.6275893!3m4!1s0x95b7aafe112b267d:0xb97d774c59112013!8m2!3d-32.9567008!4d-60.6275893"
          }
          text="In addition, from March 2020 to June 2020, I worked on a project as a freelancer together with Germán Bibel as project leader (+5493413064018) creating a Mobile app for Fundación Tercer Tiempo Rosario in our free time."
        />
        <CardExperience
          lat={-34.60304778504552}
          long={-58.37033073714459}
          positionGoogle={
            "https://www.google.com/maps/place/Zennovia+SRL/@-34.6031891,-58.3728413,17z/data=!3m1!4b1!4m5!3m4!1s0x95a335017ab7ef49:0xb1cac8202ba75d02!8m2!3d-34.6031418!4d-58.3706575"
          }
          text="Currently, I am working as a full stack developer in Zennovia (Av. Corrientes 222, Buenos Aires, Argentina; phone: +54 11 5263 0870 int. 211; email: portiz@zennovia.com; web: www.zennovia.com) de remotely, since September 2020."
        />
      </Container>
    </div>
  );
};

export default ExperienceComponent;
