import {Jumbotron, Row, Col, Button} from 'reactstrap';
import './ProductEditDelete.css'
import React, { useState } from 'react';
import { BsPencil } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { Table } from 'reactstrap';
import {NavbarCustom} from './Navbar.js';
import { Link } from 'react-router-dom';
import auth from './authentication'

var options = auth()

function ProductEdit(){
    return(
        <div>            
            <NavbarCustom title="Merchandise Management" dd1="Dashboard" dd1Route="dashboard" dd2="POS" dd2Route="pos" dd3="Cashier Registration" dd3Route="cashier" dd4="Customer Details" dd4Route="customer" dd5="Sales Analysis" dd5Route="sales"/>
            <div className="container-fluid">
                <Col id="col" md='12'>    
                    <Row>
                        <Col id="col" sm='12' md='2'>
                            <Link to="/admin/merchandise">
                                <Button id="buto" as="input" type="submit" className="topbutton">
                                    Back
                                </Button>
                            </Link>
                        </Col>
                        <Col sm='12' md='6'>
                            <h4 id="addproductheading" className="text-muted mt-1">
                                Modify Product
                            </h4>
                        </Col>
                        <Col sm='12' md='4' id="buttonCols">
                            <Button id ="editbutton"as="input" type="submit" className="topbutton" >
                                <span className="mr-2"><BsPencil/></span>Edit
                            </Button>
                            <Button id="deletebutton" as="input" type="submit" className="topbutton" >
                                <span className="mr-2"><FiDelete/></span>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Row>
                    <Col md='6' className="mt-5 offset-3">
                        <Table  responsive>
                            <tbody>
                                <tr>
                                    <th scope="row">Product Name</th>
                                    <td>T-SHIRT</td>
                                </tr>
                                <tr>
                                    <th scope="row">Category</th>
                                    <td>Kids</td>
                                </tr>
                                <tr>
                                    <th scope="row">Quantity</th>
                                    <td>150</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>$2800</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>Kids shirt</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default ProductEdit;