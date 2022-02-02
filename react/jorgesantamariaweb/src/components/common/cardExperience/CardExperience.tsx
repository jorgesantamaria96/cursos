import React from "react";
import "./cardExperience.css";
import { Row, Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Props {
  text: string;
  lat: number;
  long: number;
  positionGoogle: string;
}

const CardExperience: React.FunctionComponent<Props> = ({
  text,
  lat,
  long,
  positionGoogle,
}) => {
  return (
    <div className="cardContent">
      <Container fluid>
        <Row>
          <div className="imageContent col">
            <MapContainer
              center={[lat, long]}
              zoom={16}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, long]}>
                <Popup>
                  <a href={positionGoogle}>Open to Google Maps</a>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
          <div className="alignItems col">
            <div className="textExperience">{text}</div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default CardExperience;
