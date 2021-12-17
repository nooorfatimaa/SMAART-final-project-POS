import './AddCashier.css';
import { Row,Col,Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {NavbarCustom} from './Navbar.js';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

function AddCashier(){

    const [cashName, setCashName] = useState('')
    const [counterNo, setCounterNo] = useState('')
    const [address, setAddress] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [Date, setDate] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cashnameerror, setcashnameerror] = useState('')
    const [contactNoerror, setContacterror] = useState('')
    const [usernameerror, setusernameerror] = useState('')
    const [passworderror, setpassworderror] = useState('')


    const submitHandle=(e)=>{

        
        e.preventDefault();
        
        const data = {
            "name": cashName,
            "counterNo": counterNo,
            "address": address,
            "contactNo": contactNo,
            "username": username,
            "password": password
        }

        // alert(password)

        // const data = new FormData()  
        // data.append("name", cashName)
        // data.append("counterNo", counterNo)
        // data.append("address", address)
        // data.append("contactNo", contactNo)
        // data.append("username", username)
        // data.append("password", password)

        console.log(data)
        
        axios.post('http://localhost:5000/user/signup', data).then(response => {
            
            
            Swal.fire(
                'Successfull!',
                'Record added successfully!',
                'success'
              ) 
              
              setCashName('')
              setCounterNo('')
              setAddress('')
              setContactNo('')
              setUsername('')
              setPassword('')

        // alert("User Added Successfully");
            console.log(response.data._id)
          
        }).catch((err)=>{console.log(err)})


    }

    


    
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
                                        <Input type="text" name="productname" id="exampleEmail" value={cashName} placeholder="Enter name here" onChange={(e)=>{setCashName(e.target.value);
                                        (/^[a-zA-Z1-9 ]*$/).test(e.target.value)?setcashnameerror(""):setcashnameerror("Only Alphabets and Numbers are Allowed")
                                        
                                        
                                        }}/>
                                        <span style={{color:"red",fontSize:16}}>{cashnameerror}</span>
                                </FormGroup>
                            </Col>
                            <Col sm='4' id="categorycolumn">
                                <FormGroup>
                                    <Label for="exampleSelect">Counter number</Label>
                                    <Input type="select" name="select" id="exampleSelect" value={counterNo} onChange={(e)=>{setCounterNo(e.target.value)}}>
                                        <option selected>Counter 1</option>
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
                                    <Input type="textarea" name="text" id="exampleText" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="number">Contact Number</Label>
                                    <Input type="text" name="number" id="exampleEmail" value ={contactNo} onChange={(e)=>{setContactNo(e.target.value);
                                     (/^[0-9 ]*$/).test(e.target.value)?setContacterror(""):setContacterror("Only Numbers are Allowed")
                                    
                                    }}/>
                                    
                                </FormGroup>
                                <span style={{color:"red", fontSize:16, fontWeight:"100"}}>{contactNoerror}</span>
                            </Col>
                        </Row>
                        <Row >
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="exampleEmail" value={username} onChange={(e)=>{setUsername(e.target.value);
                                    ((e.target.value.length>2 && e.target.value.length<=30 && (/^[a-zA-z1-9 ]*$/).test(e.target.value)) || (/^[ ]*$/).test(e.target.value))?
                                    setusernameerror(""):
                                    setusernameerror("characters should be between 2 to 30. only number, white spaces and alphabets are allowed")
                                    }}/>
                                </FormGroup>
                                <span style={{color:"red", fontSize:16, fontWeight:"100"}}>{usernameerror}</span>
                            </Col>
                            <Col sm='6'>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="exampleEmail" value={password} onChange={(e)=>{setPassword(e.target.value);
                                    (e.target.value.length>=6 || (/^[ ]*$/).test(e.target.value) )
                                    
                                    ?setpassworderror("")
                                    :setpassworderror("Password should be greater then 6 characters")
                                    
                                    }}/>
                                </FormGroup>
                                <span style={{color:"red", fontSize:16, fontWeight:"100"}}>{passworderror}</span>
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col sm='12' className='mt-4' id="bottomcolumn">
                                <Button id="bottombutton" onClick={(e)=>{submitHandle(e)}}>Add Cashier</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </div>
        </div>
    )
}

export default AddCashier