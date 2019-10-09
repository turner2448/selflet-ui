import React from "react";
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

  constructor() {
    super()

    this.addUser.bind(this);
  }

  addUser(e) {
    e.preventDefault();
    let url = 'http://localhost:8080/auth/admin/realms/selflet/users';

    let req = new XMLHttpRequest();
    //req.withCredentials = true;
    req.open('POST', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("react-token"));
    //alert(this.refs.email.value);
    //req.setRequestHeader('Access-Control-Allow-Origin', true)
    let data = new FormData();
    data.append('username', this.refs.email.value);

    alert(this.refs.email.value);

    req.onreadystatechange = function () {
        if (req.readyState == 4) {
            if (req.status == 200) {
                alert('Success');
            } else if (req.status == 403) {
                alert('Forbidden');
            }
        }
    }
    alert(JSON.stringify({"username":"this.refs.email.value"}));
    req.send(JSON.stringify({"username":this.refs.email.value}));

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
    <Form.Control type="email" ref="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
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

export default CreateUser;