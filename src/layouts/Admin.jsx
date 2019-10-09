/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Keycloak from 'keycloak-js';


import routes from "routes.js";

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
    this.state.username = null;
  }



  componentDidUpdate() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }

  componentDidMount() {
    //keycloak init options
    let initOptions = {
      'url': 'http://localhost:8080/auth', realm: 'selflet', clientId: 'selflet-client', 'public-client': true, onLoad: 'login-required', 'enable-cors': true
      }
      let keycloak = Keycloak(initOptions);
  
    keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {
  
    if (!auth) {
    } else {
      this.setState({ keycloak: keycloak, authenticated: true });
      this.state.username = keycloak.idTokenParsed.preferred_username;
      localStorage.setItem("react-token", keycloak.token);
      localStorage.setItem("react-refresh-token", keycloak.refreshToken);
      let tokenString = JSON.stringify(keycloak.tokenParsed);
    }
    }); 
  }
  

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {
   if (this.state.authenticated) {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        
          <div className="main-content" ref="mainContent">
        
          <Switch>{this.getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>  
        </div>
      </>
    
    );
  }
  return "tony";
}
}

export default Admin;
