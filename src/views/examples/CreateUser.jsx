import React from "react";

import { connect } from 'react-redux';
import {createUser} from "actions/userAction";

// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'

class CreateUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      username: "",
      firstname: "",
      lastName: "",
      agency: true,
      landlord: false,
      tenant: false
    };

    this.addUser.bind(this);
    this.handleAgency.bind(this);
    this.handleUsername.bind(this);
    this.handleFirstName.bind(this);
    this.handleLastName.bind(this);
  }

  addUser(e) {
    e.preventDefault();

    let url = 'http://localhost:8081/user/user';
    let req = new XMLHttpRequest();
    //req.withCredentials = true;
    req.open('POST', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', true)
    //req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("react-token"));

    req.onreadystatechange = function () {
      if (req.readyState == 4) {
          if (req.status == 200) {
              //alert(req.);
          } else if (req.status == 403) {
              alert('Forbidden');
          }
      }
  }
  
  //build json payload
  let payload = {};
  payload.token = localStorage.getItem("react-token")
  payload.username = this.state.username;
  payload.email = this.state.username;
  payload.firstName = this.state.firstName;
  payload.lastName = this.state.lastName;
  payload.agency = this.state.agency;
  payload.landlord = this.state.landlord;
  payload.tenant = this.state.tenant;

  req.send(JSON.stringify(payload));
  }

  handleAgency = e =>
    this.setState({agency: e.target.checked});

  handleLandlord = e =>
    this.setState({landlord: e.target.checked});
  
  handleTenant = e =>
    this.setState({tenant: e.target.checked});
  

  handleUsername = e => {
    this.setState({username: e.target.value});
  }

  handleFirstName = e => {
    this.setState({firstName: e.target.value});
  }

  handleLastName = e => {
    this.setState({lastName: e.target.value});
  }



render() {
    return (
      <>

<Container style={{marginTop: 2 + "em"}} fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
             
            <Form onSubmit={e => this.addUser(e)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" ref="email" placeholder="Enter email" name="email" onChange={this.handleUsername} required/>
  </Form.Group>

  <Form.Group controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" ref="firstName" name="firstName" onChange={this.handleFirstName} required />
  </Form.Group>

  <Form.Group controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" ref="lastName" name="lastName" onChange={this.handleLastName} required />
  </Form.Group>
{/*
  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  */}
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Agency" ref="agency" name="agency" onChange={this.handleAgency} checked={this.state.agency} />
    <Form.Check type="checkbox" label="Landlord" onChange={this.handleLandlord} checked={this.state.landlord}/>
    <Form.Check type="checkbox" label="Tenant" onChange={this.handleTenant} checked={this.state.tenant}/>
  </Form.Group> 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>


            </Col>
            <Col xl="4">

      
            </Col>
          </Row>
          </Container>

</>
);
}
}


export default CreateUser
