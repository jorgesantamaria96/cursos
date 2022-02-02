import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const DishDetail = (props) => {
  const RenderDish = (dish) => {
    if (dish != null) {
      return (
        <Card>
          <CardImg top src={dish.dish.image} alt={dish.dish.name} />
          <CardBody>
            <CardTitle>{dish.dish.name}</CardTitle>
            <CardText>{dish.dish.description}</CardText>
          </CardBody>
        </Card>
      );
    }
  };

  const RenderComments = (comments) => {
    if (comments != null) {
      const comentarios = comments.dish.map((comment) => {
        return (
          <div key={comment.id}>
            <CardText>{comment.comment}</CardText>
            <CardText>
              -- {comment.author}, {comment.date}
            </CardText>
            <br />
          </div>
        );
      });

      return (
        <Card className="mb-5 ">
          <CardBody>
            <CardTitle>Comments</CardTitle>
            {comentarios}
          </CardBody>
        </Card>
      );
    }
    return <div />;
  };

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments dish={props.comments} />
        </div>
      </div>
    </div>
  );
};

export default DishDetail;
