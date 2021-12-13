import "./Invoice.css"
import React, { useState } from 'react';
import {Table, Col, Row, Button} from "react-bootstrap";
import {useLocation, Link} from 'react-router-dom'
import Stripe from './StripeFrontend'


export default function Invoice(){
    const location = useLocation()
    const [details, setDetails] = useState(location.state.renderedCart[0])
    return(
        <div>
            <Col md='12' className="topcol" >
                <Row>
                <Col xs='12' md='6'>
                    <h2 className="mt-5">Invoice</h2>
                </Col>
                <Col xs ='12' md='6' style={{textAlign:"right"}}>
                    <h4 className="paras mt-4" >SMAART</h4>
                    <h5 className="paras mt-3" >Islamabad</h5>
                    <h5 className="paras mt-3" >Pakistan</h5>
                </Col>
                </Row>
                <br/>
            </Col>
            <Col md='12'>
                <Row>
                <Col md='6'>
                    <h4 className="bottomTopheadings mt-4">
                        Name
                    </h4>
                    <h5 className="bottomTopdata text-muted">{details.name}</h5>
                    <h4 className="bottomTopheadings mt-2">
                        Address
                    </h4>
                    <h5 className="bottomTopdata text-muted">Street 123</h5>
                    <h4 className="bottomTopheadings mt-2">
                        City
                    </h4>
                    <h5 className="bottomTopdata text-muted">Islamabad</h5>
                
                </Col>
                <Col md='6' style={{textAlign:"right"}}>
                <h4 className="bottomTopheadings mt-4">Invoice#</h4>
                <h5 className="bottomTopdata text-muted">{details._id}</h5>
                <h4 className="bottomTopheadings" >Date</h4>
                <h5 className="bottomTopdata text-muted">{new Date().toString()}</h5>
                <h4 className="bottomTopheadings" >Invoice Due Date</h4>
                <h5 className="bottomTopdata text-muted">{new Date().toString()}</h5>
                </Col>
                </Row>
            </Col>
            <hr/>
            <Col sm="12" >
                <Table borderless>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Tax</th>
                        <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.cart.items.map(one => {
                        return (
                        <tr key={one._id}>
                        <td scope="row">{one.productId.name}.tostr</td>
                        <td>{one.productId.description}</td>
                        <td>{one.quantity}</td>
                        <td>0%</td>
                        <td>{one.productId.price}</td>
                        </tr>
                        )
                        })}
                    </tbody>
                </Table>
            </Col>
            <hr/>
            <Col sm='12'>
                <Row>
                <Col className="finalamountcol" sm="8">
                <h4 className="bottomTopheadings mt-3">Note</h4>
                <h4 className="bottomTopheadings mt-2 text-muted">
                    Product of SMAART. All rights reserved.
                </h4>
                </Col>
                <Col sm="4" style={{textAlign:"right",backgroundColor:"rgb(100,41,117)", color:"white"}}>
                    <h4 className="bottomTopheadings mt-5">Total</h4>
                    <h2 >{details.cart.totalPrice}</h2>
                </Col>
                </Row>
            </Col>
            <Link to="/pos">
                <Button className="dark">Done</Button>
            </Link>
            <Link to={{
                pathname: '/pos/checkout/payment',
                state: {price: details.cart.totalPrice}
            }}>
            <Button style={{marginLeft: "85%"}} onClick={() => <Stripe />}>Pay through Stripe</Button>
            </Link>
        </div>
    )
}
