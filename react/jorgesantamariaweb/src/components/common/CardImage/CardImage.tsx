import React from "react";
import { Row, Image, Col } from "react-bootstrap";
import "./cardImage.css";

interface CardImageInterface {
  image: string;
  title: string;
  text: string;
  link?: string;
}

const CardImage: React.FunctionComponent<CardImageInterface> = ({
  image,
  title,
  text,
  link,
}) => {
  return (
    <div className="cardImageContent">
      <Row className="alignItems">
        <div className="cardContainer">
          <Col>
            <div className="cardImageContent">
              <Image src={image} className="cardImage" roundedCircle />
            </div>
          </Col>
          <Col>
            <div className="titleCardImage">{title}</div>
            <div className="textCardImage">{text}</div>
            {link ? (
              <div className="textCardImage">
                <a href={link}>Open in Play Store</a>
              </div>
            ) : (
              <div></div>
            )}
          </Col>
        </div>
      </Row>
    </div>
  );
};

export default CardImage;
