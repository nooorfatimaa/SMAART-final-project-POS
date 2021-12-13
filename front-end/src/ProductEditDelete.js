import {Jumbotron, Row, Col, Button, Form, FormGroup, Label, Input} from 'reactstrap';
import './ProductEditDelete.css'
import React, { useState , useEffect } from 'react';
import { BsPencil } from "react-icons/bs";
import { FiDelete } from "react-icons/fi";
import { Table } from 'reactstrap';
import {NavbarCustom} from './Navbar.js';
import { Link, useLocation } from 'react-router-dom';
import auth from './authentication'
import axios from 'axios';
// import { useState, useEffect } from 'react';

var options = auth()

function ProductEdit(){

    // const [prodID, setprodID] = useState()
    const [prodData, setprodData] = useState({})
    const [catName, setCatName] = useState('')
    const [disabledCheck, setdisabledCheck] = useState(true)
    const location = useLocation()
    const {_id}  = location.state

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails=()=>{
        axios.get(`http://localhost:5000/products/${_id}`,options).then((response) => {
        const data = response.data;
        setprodData(data);
        //console.log(data)
        }).catch(() => {console.log('unable to receive data'); console.log(options)
        });
    }

    // const handleSubmit=()=>{
    //     data = {
    //     }
    //     axios.put(`http://localhost:5000/categories/edit/${_id}`, data, options).then((response)=>{
    //         alert("Data Modified Successfully")
    //     }).catch((err)=>{console.log(err)})
    // }
    
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
                            <h3 id="addproductheading" className="text-muted mt-1">
                                PRODUCT DETAILS
                            </h3>
                        </Col>
                        <Col sm='12' md='4' id="buttonCols">
                            <Button id ="editbutton" className="topbutton" onClick={()=>{disabledCheck==true?setdisabledCheck(false):setdisabledCheck(true)}}>
                                <span className="mr-2"><BsPencil/></span>Edit
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Row>
                    <Col md='6' className="mt-5 offset-2" >
                    <Form enctype="multipart/form-data" > 
                        <Row>
                            <Col sm='8'>
                                <FormGroup>
                                        <Label for="productnamel">Product Name</Label>
                                        <Input type="text" name="productname"  value={prodData.name} disabled/>
                                    
                                </FormGroup>
                            </Col>
                            <Col sm='4' id="categorycolumn">
                                <FormGroup>
                                    <Label for="categ">Category</Label>
                                    {/*  change to .category.name */}
                                    <Input type="text" name="category" id = 'categ' value={prodData.category} disabled/>
                                            
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <FormGroup>
                                <Label for="desc">Description</Label>
                                    <Input type="textarea" name="text" id="desc" value = {prodData.description} disabled />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="quantity">Quantity</Label>
                                    <Input type="number" name="quantity" id="exampleEmail" value={prodData.quantity} disabled={disabledCheck}/>
                                </FormGroup>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="price">Price</Label>
                                    <Input type="number" name="price" id="exampleEmail" value={prodData.price} disabled={disabledCheck}/>
                                </FormGroup>
                            </Col>
                        </Row>
                       
                        <Row>
                            <Col sm='12' className='mt-4' id="bottomcolumn">
                                <Button id="bottombutton"  >Modify Product</Button>
                            </Col>
                        </Row>
                    </Form>


                        {/* <Table  responsive>
                            
                            <tbody>
                                <tr>
                                    <th scope="row">Product Name</th>
                                    <td>{prodData.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Category</th>
                                    <td>{catName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Quantity</th>
                                    <td>{prodData.quantity}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Price</th>
                                    <td>{prodData.price}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Description</th>
                                    <td>{prodData.description}</td>
                                </tr>
                            </tbody>
                        </Table> */}
                    </Col>
                    <Col md='3' className="mt-5 offset-1">
                        <br/> <br/> <br/> <br/>
                        <img src={`http://localhost:5000/prodImagesFolder/${_id}.png`}  height={250}></img>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default ProductEdit;