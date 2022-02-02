import React from "react";
import "./header.css";
import { Container } from "react-bootstrap";
import { FcMultipleDevices, FcReadingEbook } from "react-icons/fc";

const HeaderComponent: React.FunctionComponent = () => {
  return (
    <Container fluid>
      <div className="headerContent">
        <h1 className="name">JORGE SANTAMARIA</h1>
        <h4 className="subtitle">
          <FcReadingEbook fontSize={30} /> Full Stack Developer{" "}
          <FcMultipleDevices fontSize={30} />
        </h4>
      </div>
    </Container>
  );
};

export default HeaderComponent;
