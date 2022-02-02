import React from "react";
import "./footer.css";
import { GoMarkGithub } from "react-icons/go";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoCafeSharp,
} from "react-icons/io5";

const FooterComponent: React.FunctionComponent = () => {
  return (
    <div className="footer">
      <div className="footerContent">
        <div className="iconContent">
          <a href="https://github.com/jorgesantamaria96">
            <GoMarkGithub fontSize={40} color="white" />
          </a>
        </div>
        <div className="iconContent">
          <a href="https://www.linkedin.com/in/jorgesantamaria96/">
            <IoLogoLinkedin fontSize={50} color="white" />
          </a>
        </div>
        <div className="iconContent">
          <a href="https://www.facebook.com/jorge.santamaria.94/">
            <IoLogoFacebook fontSize={50} color="white" />
          </a>
        </div>
        <div className="iconContent">
          <a href="https://www.instagram.com/jorgesantamaria80/">
            <IoLogoInstagram fontSize={50} color="white" />
          </a>
        </div>
        <div className="iconContent">
          <a href="https://twitter.com/jsantamaria80">
            <IoLogoTwitter fontSize={50} color="white" />
          </a>
        </div>
        <div className="iconContent">
          <a href="https://cafecito.app/jorgesantamaria">
            <IoCafeSharp fontSize={50} color="white" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
