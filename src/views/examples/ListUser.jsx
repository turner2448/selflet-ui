import React from "react";
import ReactTable from 'react-table'
import { connect } from 'react-redux';
import {listUsers} from "actions/userAction";
import {Products} from "views/examples/Products.jsx";
import Dialog from 'react-bootstrap-dialog'

import 'react-table/react-table.css'

class ListUser extends React.Component {

  constructor(props) {
    super(props)
    //this.state = {users: ""};
    this.state = {deleted_user: ""}; //local state for delete user operation
    this.deleteUser.bind(this);
  }

  componentDidMount() {
    const that = this;

    let url = 'http://localhost:8081/user/users';

    let req = new XMLHttpRequest();
    //req.withCredentials = true;
    req.open('POST', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', true)
    //req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("react-token"));

    let payload = {};
    payload.token = localStorage.getItem("react-token");
    payload.agencyId = this.props.keycloak.idTokenParsed.agencyId;
  
    req.send(JSON.stringify(payload));

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
          if (req.status == 200) {
              let users = JSON.parse(req.response);
              let filteredUsers = [];
              for (var i = 0; i < users.length; i++) {
                let user = new Object();
                user.id = users[i].id;
                user.username = users[i].username;
                user.firstName = users[i].firstName;
                user.lastName = users[i].lastName;
                user.email = users[i].email;

                //get type of user
                if (users[i].attributes.agency == 'true') {
                  user.type = 'Agency User';
                } else if (users[i].attributes.landlord == 'true') {
                  user.type = "Landlord";
                } else {
                  user.type = "Tenant";
                }

                filteredUsers.push(user);
              }
              //this.setState({ users: JSON.stringify(filteredUsers) })
              this.props.listUsers({ users: JSON.stringify(filteredUsers) });
          } else if (req.status == 403) {
              alert('Forbidden');
          }
      }
  }

  }

  onDeleteUser() {
    //this.dialog.showAlert('User added')
    this.dialog.show({
      title: 'User operation',
      body: 'Delete User?',
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

  onOKDeleteUser() {
    let deletedUser = this.state.deleted_user;
            const users = JSON.parse(this.props.users); 
            let filteredUsers = [];
              for (var i = 0; i < users.length; i++) {           
                if (users[i].id != deletedUser) {
                  filteredUsers.push(users[i]);
                }                 
              }
              this.props.listUsers({ users: JSON.stringify(filteredUsers) });
  }

  deleteUser() {
    let url = 'http://localhost:8081/user/users';

    let req = new XMLHttpRequest();
    req.open('DELETE', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Access-Control-Allow-Origin', true)

    let deletedUser = this.state.deleted_user;

    let payload = {};
    payload.token = localStorage.getItem("react-token");
    payload.agencyId = this.props.keycloak.idTokenParsed.agencyId;
    payload.id = deletedUser;
    req.send(JSON.stringify(payload));
    //this.setState({deleted_user: value.id});

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
          if (req.status == 200 || req.status == 204) {
            this.onOKDeleteUser();
          } else if (req.status == 403) {
              alert('Forbidden');
          }
      }
  }
  }

  deleteUserConfirm(value) {
    this.setState({deleted_user: value.id}); 
    this.dialog.show({
      title: 'User operation',
      body: 'Delete User?',
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          this.deleteUser();
        })
      ],
      bsSize: 'small',
      onHide: (dialog) => {
        dialog.hide()
        console.log('closed by clicking background.')
      }
    })
  }

render() {
  if (this.props.users == "") {
    return "no users";
  } else {

  const data = JSON.parse(this.props.users); 
  
  const columns = [{
    Header: 'username',
    accessor: 'username',
    width: 250
  },
  {
    Header: 'First Name',
    accessor: 'firstName',
    width: 200
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    width: 200
  },
  {
    Header: 'Email',
    accessor: 'email',
    width: 250
  },
  {
    Header: 'Type',
    accessor: 'type',
    width: 150
  },
  {
    Cell: row => (
      <div>
          <button onClick={() => this.deleteUserConfirm(row.original)}>Delete</button>
      </div>
  ),
  width: 100
  }
]
    
  return (
      <>

<Dialog ref={(component) => { this.dialog = component }} />

  <ReactTable
    data={data}
    columns={columns}
    filterable={true}
    className="-striped -highlight"
  />
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
    users: state.userReducer.users
  };
};

function mapDispatchToProps(dispatch){
  return {
    listUsers: payload => {
      dispatch(listUsers(payload))
  }
}
}

//export default ListUser;
export default connect(mapStateToProps, mapDispatchToProps) (ListUser)