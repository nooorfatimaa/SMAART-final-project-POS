import './AddCashier.css';
import { Row,Col,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavbarCustom} from './Navbar.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddCashier(){
    return(
        <div>
            <NavbarCustom title="Cashier Registration" dd1="Dashboard" dd1Route="dashboard" dd2="POS" dd2Route="pos" dd3="Merchandise Management" dd3Route="merchandise" dd4="Customer Details" dd4Route="customer" dd5="Sales Analysis" dd5Route="sales"/>
            <div className="container-fluid">
                <Row sm='12'>
                    <Col sm='2'>
                        <Link to="/admin/cashier">
                            <Button id ="buto" as="input" type="submit" className="topbutton">
                                Back
                            </Button>
                        </Link>
                    </Col>
                </Row>
                <Row sm='12'>
                    <Col id="headingColumn">
                        <div className="text-muted">Add Shopkeeper Details Here</div>
                    </Col>
                </Row>
                <Col sm='12'>
                    <Form>
                        <Row>
                            <Col sm='8'>
                                <FormGroup>
                                        <Label for="productnamel">Cashier Name</Label>
                                        <Input type="text" name="productname" id="exampleEmail" placeholder="Enter name here" />
                                </FormGroup>
                            </Col>
                            <Col sm='4' id="categorycolumn">
                                <FormGroup>
                                    <Label for="exampleSelect">Counter number</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>Counter 1</option>
                                        <option>Counter 2</option>
                                        <option>Counter 3</option>
                                        <option>Counter 4</option>
                                        <option>Counter 5</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                <Label for="exampleText">Address</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="number">Contact Number</Label>
                                    <Input type="text" name="number" id="exampleEmail"/>
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="dob">Date of Birth</Label>
                                    <Input type="date" name="dob" id="exampleEmail"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="exampleEmail"/>
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="exampleEmail"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                <Label for="exampleFile">Upload Image</Label>
                                <br/>
                                <Input type="file" name="file" id="exampleFile" />
                                {/* <FormText color="muted">
                                This is some placeholder block-level help text for the above input.
                                It's a bit lighter and easily wraps to a new line.
                                </FormText> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12' className='mt-4' id="bottomcolumn">
                                <Button id="bottombutton">Add Cashier</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </div>
        </div>
    )
}

export default AddCashier