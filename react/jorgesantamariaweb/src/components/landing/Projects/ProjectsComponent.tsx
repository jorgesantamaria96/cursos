import React from "react";
import { Container } from "react-bootstrap";
import "./projects.css";
import CardImage from "../../common/CardImage/CardImage";
import superpago from "../../../images/projects/superpago.png";
import tercertiempo from "../../../images/projects/tercertiempo.png";
import consumidor from "../../../images/projects/consumidor.png";
import comercio_repartidor from "../../../images/projects/comercio_repartidor.png";
import greco from "../../../images/projects/greco.png";

const ProjectsComponent: React.FunctionComponent = () => {
  return (
    <div className="projectsContent">
      <Container>
        <div className="alignItems">
          <div className="titleProject">Participation in projects!</div>
        </div>
        <CardImage
          image={superpago}
          title="Superpago"
          link={
            "https://play.google.com/store/apps/details?id=com.rnsuperpago&hl=es_419&gl=US"
          }
          text="Superpago is a virtual wallet that is linked to a bluethoot collection device (similar to Mercadopago) that provides different means of collection to small and medium-sized enterprises. The app was developed in React Native and my participation in the project was from November 2019 to August 2020."
        />
        <CardImage
          image={tercertiempo}
          title="Tercer Tiempo"
          link={
            "https://play.google.com/store/apps/details?id=com.fundacion.tercertiempo&hl=en_US&gl=US"
          }
          text="TercerTiempo is a platform for online courses and video playback, developed in React Native during the early days of the pandemic, to carry out training of all kinds. The project was funded by the Tercer Tiempo Rosario foundation, and seeks to promote knowledge of different trades to learn on a day-to-day basis. I did it together with my co-worker at my old job. We carry out the same from March 2020 to June 2020."
        />
        <CardImage
          image={consumidor}
          title="Consumidor | Geoentregas"
          link={
            "https://play.google.com/store/apps/details?id=com.geoentregas.consumidor&hl=en_US&gl=US"
          }
          text="It is an online food store developed in Nativescript with Angular by the company Zennovia, in which I actively participate. Use the GPS to confirm the location of the order and manage its delivery. It was developed to a greater extent for the beach, then some shops in the cities were incorporated. The idea is to continue growing and expanding the business model."
        />
        <CardImage
          image={comercio_repartidor}
          title="Repartidor | Geoentregas"
          link={
            "https://play.google.com/store/apps/details?id=com.geoentregas.repartidor&hl=en_US&gl=US"
          }
          text="It is the application corresponding to the delivery of orders from the previous application (Consumer). Developed in Nativescript with Angular by the company Zennovia, in which I actively participate. It uses google maps integrated in the app to locate the consumer and carry out the delivery of the order. The delivery men currently belong to the trade and in the future it is planned to incorporate user records outside the shops."
        />
        <CardImage
          image={comercio_repartidor}
          title="Comercio | Geoentregas"
          link={
            "https://play.google.com/store/apps/details?id=com.geoentregas.comercio&hl=en_US&gl=US"
          }
          text="Commerce is an application developed in Nativescript with Angular by the company Zennovia in which I actively participate, to manage the orders that arrive from the Consumer app, manage the order statuses and designate the different distributors to finalize the flow. It is still in active development and its objective is to provide the greatest comfort to businesses when interacting with their customers."
        />
        <CardImage
          image={greco}
          title="CINAPP"
          text="It is a virtual wallet developed in Nativescript with Angular by the company Zennovia in which I actively participate, to manage collections, purchases and the money of the clients of a financial company. The app is under active development, both on android and ios, and it consumes the Banco Industrial api, which gives each user a cvu."
        />
      </Container>
    </div>
  );
};

export default ProjectsComponent;
