import React from "react";

import { connect } from 'react-redux';
import {createUser} from "actions/userAction";
import { Redirect } from 'react-router-dom'

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
import Dialog from 'react-bootstrap-dialog'

class CreateUser extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      username: "",
      firstName: "",
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
    this.onAddUser = this.onAddUser.bind(this)
  }

  onAddUser() {
    //this.dialog.showAlert('User added')
    this.dialog.show({
      title: 'User operation',
      body: 'User added',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  }

  onAddUserFail(message) {
    //this.dialog.showAlert('User added')
    this.dialog.show({
      title: 'User operation',
      body: message,
      actions: [
        Dialog.OKAction(() => {
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
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
 
   req.onreadystatechange = () => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        this.setState({firstName: ""});
        this.setState({username: ""});
        this.setState({lastName: ""});
        this.onAddUser();
        //this.props.history.push('/admin/index')
      } else if (req.status == 403) {
          this.onAddUserFail("Unauthorised");
      } else if (req.status == 409) {
          this.onAddUserFail("Username exists");
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
  payload.agencyId = this.props.keycloak.idTokenParsed.agencyId;

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

<Dialog ref={(component) => { this.dialog = component }} />

<Container style={{marginTop: 2 + "em"}} fluid>
          <Row>
            <Col className="mb-5 mb-xl-0" xl="8">
             
            <Form onSubmit={e => this.addUser(e)}>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" ref="username" placeholder="Enter email" name="username" value={this.state.username} onChange={this.handleUsername} required/>
  </Form.Group>

  <Form.Group controlId="formBasicFirstName">
    <Form.Label>First Name</Form.Label>
    <Form.Control type="text" ref="firstName" name="firstName" onChange={this.handleFirstName} value={this.state.firstName} required />
  </Form.Group>

  <Form.Group controlId="formBasicLastName">
    <Form.Label>Last Name</Form.Label>
    <Form.Control type="text" ref="lastName" name="lastName" onChange={this.handleLastName} value={this.state.lastName} required />
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

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.authenticated,
    username: state.authReducer.username,
    keycloak: state.authReducer.keycloak
  };
};


export default connect(mapStateToProps) (CreateUser)
