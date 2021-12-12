import React, {useState, useEffect} from 'react';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Col, Container, Row } from 'react-bootstrap'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './CustomerInfo.css';
import {NavbarCustom} from './Navbar.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table , Button} from 'reactstrap';
import auth from './authentication'


const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 }
]

export default function CustomerInfo() {
    const[customer, setCustomer] = useState([]);

    useEffect(() => {
        getCustomerList();
      
    },[]);

    const options = {
    
        headers: {'content-type':'application/json',
        'Authorization':`Bearer ${JSON.parse(localStorage.getItem('id_token'))}`,
        responseType: 'text'
      }
      };

    const getCustomerList = () => {
        axios.get('http://localhost:5000/customers',options).then((response) => {
        const data = response.data;
        setCustomer(data);
        console.log(data);
        }).catch(() => {console.log('unable to receive data')
        });
    }
    return(
        <div> 
            <NavbarCustom title="Customer Details" dd1="Dashboard" dd1Route="dashboard" dd2="POS" dd2Route="pos" dd3="Merchandise Management" dd3Route="merchandise" dd4="Cashier Registration" dd4Route="cashier" dd5="Sales Analysis" dd5Route="sales"/>
            <br/>
            <Container fluid>
            <div className="container-fluid">
            <Row>
            <Col md='7' className="mt-5 offset-2">
            <Table hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Photo</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customer.map(customers =>{
                        return(
                        <tr>
                        <td><img height = "200px" width="200px" src={customers.picture}></img></td>
                        <th scope="row">{customers.name}</th>
                        <td>{customers.contactNo}</td>      
                        </tr>
                     )})
                        }
                    </tbody>
            </Table>
            </Col>
            </Row>
            </div>

                {/* <Row> */}
                    {/* <Col xs lg={4} className='tab__bar'>
                    <AppBar position="static" color="default">
                        <Tabs variant="fullWidth">
                            <Tab label="find by name" />
                            <Tab label="find by recent" />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews>
                        list goes here
                    </SwipeableViews>
                    </Col> */}


                    {/* <Col xs lg={{ span: 7   , offset: 1}} className='form__info'>
                        <Autocomplete 
                            id="combo-box-demo"
                            options={top100Films}
                            getOptionLabel={(option) => option.title}
                            style={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search Customer" variant="outlined"/>}
                        />
                    
                        <Container fluid>
                            the details of the customer goes here 
                        </Container>
                    </Col> */}
                {/* </Row> */}
            </Container>
        </div>
    )
}