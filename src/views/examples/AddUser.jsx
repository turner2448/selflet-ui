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
  UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

class AddUserForm extends React.Component {
	render() {
  	return (
    	<form>
          <input 
          name="user"
          type="text" 
          placeholder="Enter Company Name" 
          required 
        />
        <button>Go!</button>
    	</form>
    );
  }
}

export default AddUserForm;