import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBarComponent from "./components/navbar/NavBarComponent";
import HeaderComponent from "./components/header/HeaderComponent";
import ProfileComponent from "./components/landing/Profile/ProfileComponent";
import ExperienceComponent from "./components/landing/Experience/ExperienceComponent";
import ProjectsComponent from "./components/landing/Projects/ProjectsComponent";
import FooterComponent from "./components/footer/FooterComponent";

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div className="background">
          <Container fluid>
            <NavBarComponent />
            <div className="alignCenter">
              <Switch>
                <Route exact path="/" component={HeaderComponent} />
                <Route path="/profile" component={ProfileComponent} />
                <Route path="/experience" component={ExperienceComponent} />
                <Route path="/projects" component={ProjectsComponent} />
              </Switch>
            </div>
            <div className="alignFooter">
              <FooterComponent />
            </div>
          </Container>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
