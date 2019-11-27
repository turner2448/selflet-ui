import React from "react";
import ReactTable from 'react-table'

import 'react-table/react-table.css'

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
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup
} from "reactstrap";

class ListUser extends React.Component {

  constructor(props) {
    super(props)
    this.state = {users: ""};
  }

  componentDidMount() {
    const that = this;

    let url = 'http://localhost:8080/auth/admin/realms/selflet/users';

    let req = new XMLHttpRequest();
    //req.withCredentials = true;
    req.open('GET', url, true);
    req.setRequestHeader('Accept', 'application/json');
    req.setRequestHeader('Content-type', 'application/json');
    req.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("react-token"));

    req.onreadystatechange = () => {
      if (req.readyState == 4) {
          if (req.status == 200) {
              //alert(req.response);
              this.setState({ users: req.response })
          } else if (req.status == 403) {
              alert('Forbidden');
          }
      }
  }
        
    //alert(JSON.stringify({"username":"this.refs.email.value"}));
    req.send();

  }
  

  listUsers = (data) => {
    let payload = {};
    //console.log(data);
    //this.setState.users = data;
    /*for (var i = 0; i < arr.length; i++){
      var obj = arr[i];
      for (var key in obj){
          var attrName = key;
          var attrValue = obj[key];
      }
  }*/
  }

render() {
  alert(this.state.users);
  {/*
    const data = [{
    name: 'Tanner Linsley',
    age: 26,
    friend: {
      name: 'Jason Maurer',
      age: 23,
    }
  }] */}

  const data = [{"id":"b0918642-0e1b-476a-8fc9-bc891512cda0","createdTimestamp":1571053167269}]
  
  const columns = [{
    Header: 'id',
    accessor: 'id' // String-based value accessors!
  }, {
    Header: 'createdTimestamp',
    accessor: 'createdTimestamp',
    Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
  },
  {
    Header: 'userename',
    accessor: 'username' // String-based value accessors!
  },
  {
    Header: 'enabled',
    accessor: 'enabled' // String-based value accessors!
  },
  {
    Header: 'totp',
    accessor: 'totp' // String-based value accessors!
  },
  {
    Header: 'emailVerified',
    accessor: 'emailVerified' // String-based value accessors!
  },
  {
    Header: 'disableableCredentialTypes',
    accessor: 'disableableCredentialTypes' // String-based value accessors!
  },
  {
    Header: 'requiredActions',
    accessor: 'requiredActions' // String-based value accessors!
  },
  {
    Header: 'notBefore',
    accessor: 'notBefore' // String-based value accessors!
  },
  {
    Header: 'access',
    accessor: 'access' // String-based value accessors!
  },
  {
    Header: 'manageGroupMembership',
    accessor: 'manageGroupMembership' // String-based value accessors!
  },
  {
    Header: 'view',
    accessor: 'view' // String-based value accessors!
  },
  {
    Header: 'mapRoles',
    accessor: 'mapRoles' // String-based value accessors!
  },
  {
    Header: 'impersonate',
    accessor: 'impersonate' // String-based value accessors!
  },
  {
    Header: 'manage',
    accessor: 'manage' // String-based value accessors!
  }
]
    
  return (
      <>
  <ReactTable
    data={data}
    columns={columns}
    filterable={true}
  />



</>
);
}
}

export default ListUser;