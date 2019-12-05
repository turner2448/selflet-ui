
import React from "react";
import { connect } from 'react-redux';
import {login} from "actions/authAction";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.jsx";
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'

class Profile extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      edit_form: false,
      /*
      Component state for changes in profile form.
      */
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      id: ""
    };

    this.editUser.bind(this);
    //this.toggleEditForm.bind(this);
  }

  componentDidMount() {
    //populate component state with redux state
    this.setState({
      username: this.props.keycloak.idTokenParsed.preferred_username, email: this.props.keycloak.idTokenParsed.email,
      firstName: this.props.keycloak.idTokenParsed.given_name, lastName: this.props.keycloak.idTokenParsed.family_name,
      id: this.props.keycloak.subject
    });
  }

  editUser(e) {
    e.preventDefault(); 
      let url = 'http://localhost:8081/user/users';
      let req = new XMLHttpRequest();
      req.open('PUT', url, true);
      req.setRequestHeader('Accept', 'application/json');
      req.setRequestHeader('Content-type', 'application/json');
      req.setRequestHeader('Access-Control-Allow-Origin', true)
   
     req.onreadystatechange = () => {
      //if (req.readyState == 4) {
        if (req.status == 204) {
          this.onEditFormSuccess();
        } else {
          this.onEditFormFailure();
        }
      //}
    }
    
    //build json payload
    let payload = {};
    payload.token = localStorage.getItem("react-token")
    payload.id = this.state.id;
    payload.username = this.state.username;
    payload.email = this.state.email;
    payload.firstName = this.state.firstName;
    payload.lastName = this.state.lastName;
    payload.agency = this.props.keycloak.idTokenParsed.agency;
    payload.landlord = this.props.keycloak.idTokenParsed.landlord;
    payload.tenant = this.props.keycloak.idTokenParsed.tenant;
    payload.agencyId = this.props.keycloak.idTokenParsed.agencyId;
  
    req.send(JSON.stringify(payload));
    
  }

  onEditFormSuccess() {
    //this.dialog.showAlert('User added')
    this.dialog.show({
      title: 'User operation',
      body: 'Profile Amended',
      actions: [
        Dialog.OKAction(() => {
          this.setState({edit_form: false});
          this.props.keycloak.idTokenParsed.email = this.state.email;
          this.props.keycloak.idTokenParsed.preferred_username = this.state.username;
          this.props.keycloak.idTokenParsed.family_name = this.state.lastName;
          this.props.keycloak.idTokenParsed.given_name = this.state.firstName;
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  }

  onEditFormFailure() {
    alert("failue");
    this.dialog.show({
      title: 'User operation',
      body: 'Error amending profile',
      actions: [
        Dialog.OKAction(() => {
          this.setState({edit_form: false});
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  }

  toggle = () => {
    let toggle = this.state.edit_form;
    if (toggle == true) {
      this.setState({edit_form: false});
    } 
    if (toggle == false) {
      this.setState({edit_form: true});
    }
  }

  handleUsername = e => {
    this.setState({username: e.target.value});
  }

  handleEmail = e => {
    this.setState({email: e.target.value});
    this.setState({username: e.target.value});
  }

  handleFirstName = e => {
    this.setState({firstName: e.target.value});
  }

  handleLastName = e => {
    this.setState({lastName: e.target.value});
  }

  render() {
    let value = this.props.keycloak.idTokenParsed.preferred_username
    if (this.state.edit_form) {
    return (
      <>
      <Dialog ref={(component) => { this.dialog = component }} />
        <UserHeader {...this.props}/>
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            {/*
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/team-4-800x800.jpg")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div>
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      Jessica Jones
                      <span className="font-weight-light">, 27</span>
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div>
                    <hr className="my-4" />
                    <p>
                      Ryan — the name taken by Melbourne-raised, Brooklyn-based
                      Nick Murphy — writes, performs and records all of his own
                      music.
                    </p>
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a>
                  </div>
                </CardBody>
              </Card>
            </Col>
        {*/}
        
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.toggle}
                        size="sm"
                      >
                        Close Edit
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={e => this.editUser(e)}>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                              <Form.Group controlId="formBasicLastName">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                  className="form-control-alternative"
                                  //defaultValue="lucky.jesse"
                                  ref="username"
                                  placeholder={this.state.username}
                                  value={this.state.username}
                                  onChange={this.handleUsername}
                                  type="text"
                                  disabled
                                  
                              />
                              </Form.Group>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              ref="input-email"
                              placeholder={this.state.email}
                              value={this.state.email}
                              onChange={this.handleEmail}
                              type="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                                       
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              className="form-control-alternative"
                              ref="input-first-name"
                              placeholder={this.state.firstName}
                              value={this.state.firstName}
                              onChange={this.handleFirstName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        
                        <Col lg="6">
                          <FormGroup>
                           <Form.Label>Last Name</Form.Label>
                            <Input
                              className="form-control-alternative"
                              ref="input-last-name"
                              placeholder={this.state.lastName}
                              value={this.state.lastName}
                              onChange={this.handleLastName}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                    <hr className="my-4" />
                    {/* Address */}
                    {/*}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="New York"
                              id="input-city"
                              placeholder="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
      {*/}
                    {/*}
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
    
                      </FormGroup>
                    </div>
                    {*/}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
    } else {
      return (
        <>
          <UserHeader {...this.props}/>
          {/* Page content */}
          <Container className="mt--7" fluid>
            <Row>
              {/*
              <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
                <Card className="card-profile shadow">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                  </Row>
                  <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                    <div className="d-flex justify-content-between">
                      <Button
                        className="mr-4"
                        color="info"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Connect
                      </Button>
                      <Button
                        className="float-right"
                        color="default"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                  <CardBody className="pt-0 pt-md-4">
                    <Row>
                      <div className="col">
                        <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                          <div>
                            <span className="heading">22</span>
                            <span className="description">Friends</span>
                          </div>
                          <div>
                            <span className="heading">10</span>
                            <span className="description">Photos</span>
                          </div>
                          <div>
                            <span className="heading">89</span>
                            <span className="description">Comments</span>
                          </div>
                        </div>
                      </div>
                    </Row>
                    <div className="text-center">
                      <h3>
                        Jessica Jones
                        <span className="font-weight-light">, 27</span>
                      </h3>
                      <div className="h5 font-weight-300">
                        <i className="ni location_pin mr-2" />
                        Bucharest, Romania
                      </div>
                      <div className="h5 mt-4">
                        <i className="ni business_briefcase-24 mr-2" />
                        Solution Manager - Creative Tim Officer
                      </div>
                      <div>
                        <i className="ni education_hat mr-2" />
                        University of Computer Science
                      </div>
                      <hr className="my-4" />
                      <p>
                        Ryan — the name taken by Melbourne-raised, Brooklyn-based
                        Nick Murphy — writes, performs and records all of his own
                        music.
                      </p>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Show more
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Col>
          {*/}
          
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                      <Col xs="8">
                        <h3 className="mb-0">My account</h3>
                      </Col>
                      <Col className="text-right" xs="4">
                          <Button
                          color="primary"
                          href="#pablo"
                          onClick={this.toggle}
                          size="sm"
                        >
                          Edit Profile
                        </Button>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={e => this.editUser(e)}>
                      <h6 className="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                                <Form.Group controlId="formBasicLastName">
                                  <Form.Label>Username</Form.Label>
                                  <Form.Control
                                    className="form-control-alternative"
                                    //defaultValue="lucky.jesse"
                                    ref="input-username"
                                    //placeholder="Username"
                                    value={this.props.keycloak.idTokenParsed.preferred_username}
                                    //onChange={this.handleUsername}
                                    type="text"
                                    disabled
                                />
                                </Form.Group>
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                              <FormGroup>
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                className="form-control-alternative"
                                ref="input-email"
                                //placeholder="jesse@example.com"
                                type="email"
                                value={this.props.keycloak.idTokenParsed.email}
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                                         
                        <Row>
                          <Col lg="6">
                              <FormGroup>
                              <Form.Label>First Name</Form.Label>
                              <Form.Control
                                className="form-control-alternative"
                                ref="input-first-name"
                                //placeholder="First name"
                                value={this.props.keycloak.idTokenParsed.given_name}
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                          
                          <Col lg="6">
                              <FormGroup>
                              <Form.Label>Last Name</Form.Label>
                              <Input
                                className="form-control-alternative"
                                ref="input-last-name"
                                //placeholder="Last name"
                                value={this.props.keycloak.idTokenParsed.family_name}
                                type="text"
                                disabled
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                      <hr className="my-4" />
                      {/* Address */}
                      {/*}
                      <h6 className="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div className="pl-lg-4">
                        <Row>
                          <Col md="12">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-address"
                              >
                                Address
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                                id="input-address"
                                placeholder="Home Address"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                City
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="New York"
                                id="input-city"
                                placeholder="City"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Country
                              </label>
                              <Input
                                className="form-control-alternative"
                                defaultValue="United States"
                                id="input-country"
                                placeholder="Country"
                                type="text"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Postal code
                              </label>
                              <Input
                                className="form-control-alternative"
                                id="input-postal-code"
                                placeholder="Postal code"
                                type="number"
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
        {*/}
                      {/*}
                      <hr className="my-4" />
                      <h6 className="heading-small text-muted mb-4">About me</h6>
                      <div className="pl-lg-4">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            className="form-control-alternative"
                            placeholder="A few words about you ..."
                            rows="4"
                            defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                            Open Source."
                            type="textarea"
                          />
      
                        </FormGroup>
                      </div>
                      {*/}
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authReducer.authenticated,
    username: state.authReducer.username,
    keycloak: state.authReducer.keycloak,
  };
};

function mapDispatchToProps(dispatch){
  return {
    listUsers: payload => {
      dispatch(login(payload))
  }
}
}

//export default ListUser;
export default connect(mapStateToProps, mapDispatchToProps) (Profile)

