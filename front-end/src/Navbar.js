import { NavDropdown, Nav, Navbar,Col} from 'react-bootstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { IoPeople } from "react-icons/io5";
import './Navbar.css';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { MdEmail } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import React, { useState } from 'react';


function NavbarCustom(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    const logoutF=()=>{
        
        localStorage.clear();
      
    }

    return(
        <div>
            <Navbar collapseOnSelect expand="md" sticky="top" className="navbar">
            <Link to ="/admin/dashboard"><Navbar.Brand style={{color:"white"}}>SMAART ADMIN PANEL</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="offset-md-4">
                    <NavDropdown title={props.title} id="collasible-nav-dropdown">
                        <NavDropdown.Item as={Link} to ={`/admin/${props.dd1Route}`} className="navdd">{props.dd1}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to ={`/admin/${props.dd2Route}`} className="navdd">{props.dd2}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to ={`/admin/${props.dd3Route}`} className="navdd">{props.dd3}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to ={`/admin/${props.dd4Route}`} className="navdd">{props.dd4}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to ={`/admin/${props.dd5Route}`} className="navdd">{props.dd5}</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav className="ml-auto">
                    <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span>Admin</span>
                            <IoPeople  style={{color: 'white', marginLeft:'4px'}} size={32}/>
                        </DropdownToggle>
                        <DropdownMenu id="collasible-nav-dropdown2">
                            <DropdownItem >
                                <span className="navdd"><CgProfile/> {localStorage.getItem('user')}</span>
                            </DropdownItem>
                            <NavDropdown.Divider />
                            <DropdownItem >
                                <span className="navdd"><MdEmail/> Details</span>
                            </DropdownItem>
                            <NavDropdown.Divider />
                            <DropdownItem tag={Link} to="/">
                                <span className="navdd" onClick={(e)=>{logoutF()}}><IoMdLogOut/> Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <br/>
        </div>
    );
}

function NavbarCashier(props){
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(!dropdownOpen);

    return(
        <Col>
            <Navbar collapseOnSelect expand="md" sticky="top" className="navbar">
            <Link to ="/pos"><Navbar.Brand style={{color:"white"}}>SMAART POS PANEL</Navbar.Brand></Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle nav>
                            <span>Cashier</span>
                            <IoPeople  style={{color: 'white', marginLeft:'4px'}} size={32}/>
                        </DropdownToggle>
                        <DropdownMenu id="collasible-nav-dropdown2">
                            <DropdownItem >
                                <span className="navdd"><CgProfile/> {localStorage.getItem('user')}</span>
                            </DropdownItem>
                            <NavDropdown.Divider />
                            <DropdownItem >
                                <span className="navdd"><MdEmail/> Details</span>
                            </DropdownItem>
                            <NavDropdown.Divider />
                            <DropdownItem tag={Link} to="/">
                                <span className="navdd"><IoMdLogOut/> Logout</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            <br/>
        </Col>
    );
}

export {NavbarCustom, NavbarCashier };