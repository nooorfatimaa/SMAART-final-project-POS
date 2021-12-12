import React, { useEffect, useState } from "react";
import { Dropdown, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import "./Cashier.css";
import { Link } from "react-router-dom";
import Invoice from "./Invoice.js";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { HiCash } from "react-icons/hi";
import { AiFillBank } from "react-icons/ai";
import { NavbarCashier } from "./Navbar.js";
import axios from "axios";

const CreditCard = () => {
  const [expiry, setExpiry] = useState("");
  const [number, setNumber] = useState("");
  const [cvc, Setcvc] = useState("");
  const [focus, setFocus] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="mt-5">
      <Cards
        number={number}
        name={name}
        expiry={expiry}
        cvc={cvc}
        focused={focus}
      />
      <Form>
        <InputGroup.Number
          type="number"
          name="number"
          placeholder="Card Number"
          value={number}
          onfocus={(event) => setFocus(event.target.name)}
          onchange={(event) => setNumber(event.target.value)}
        />
        <InputGroup.Text
          className="mt-2"
          type="text"
          name="name"
          placeholder="Name"
          value={name}
          onfocus={(event) => setFocus(event.target.name)}
          onchange={(event) => setName(event.target.value)}
        />
        <InputGroup
          className="mt-2"
          name="chrome-autofill-dummy2"
          style={{ display: "none" }}
          disabled
        />
        <Row>
          <Col md="6">
            <InputGroup.Text
              className="mt-2"
              type="number"
              name="expiry"
              placeholder="MM/YY Expiry"
              value={expiry}
              onfocus={(event) => setFocus(event.target.name)}
              onchange={(event) => setExpiry(event.target.value)}
            />
          </Col>
          <Col md="6">
            <InputGroup.Text
              className="mt-2"
              type="number"
              name="cvc"
              placeholder="CVC"
              value={cvc}
              onfocus={(event) => setFocus(event.target.name)}
              onchange={(event) => Setcvc(event.target.value)}
            />
          </Col>
        </Row>
        {/* <Button className="mt-2" className="btn btn-info">Pay</Button> */}
        <FaCcMastercard
          size={30}
          color={"red"}
          style={{ direction: "flex", float: "right" }}
        />
        <FaCcVisa
          className="mr-2"
          size={30}
          color={"blue"}
          style={{ direction: "flex", float: "right" }}
        />
      </Form>
    </div>
  );
};

function Cashier() {
  const [cart, setCart] = useState([]);
  const [renderedCart, setRenderedCart] = useState([]);
  const [text, setText] = useState(0);

  useEffect(() => {
    setText(0);
    getcart();
  }, []);

  const options = {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("id_token"))}`,
      responseType: "text",
    },
  };

  const getcart = () => {
    axios
      .get("/customers")
      .then((response) => {
        response.data.map((customer) => {
          if (customer.cart.items.length > 0) {
            setCart((prev) => [...prev, customer]);
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputToAddName = () => {
    if (text == 1) {
      return (
        <Form className="mt-0">
          <InputGroup.Text type="text" placeholder="Enter User Name" />
          <Button
            type="submit"
            className="btn btn-info mt-2"
            style={{ direction: "flex", float: "right" }}
          >
            Add Name
          </Button>
        </Form>
      );
    }
  };

  const displayCart = (recievedCart) => {
    setRenderedCart([recievedCart]);
  };
  const incrementItem = (customerID, productID) => {
    axios
      .post("/carts/increment", {
        customer: customerID,
        productId: productID,
      })
      .then((res) => {
        setRenderedCart([res.data]);
      })
      .catch((err) => console.log(err));
  };
  const decrementItem = (customerID, productID) => {
    axios
      .post("/carts/decrement", {
        customer: customerID,
        productId: productID,
      })
      .then((res) => {
        setRenderedCart([res.data]);
      })
      .catch((err) => console.log(err));
  };

  const removeItem = (customerID, productID) => {
    axios
      .post("/carts/remove", {
        customer: customerID,
        productId: productID,
      })
      .then((res) => {
        setRenderedCart([res.data]);
      })
      .catch((err) => console.log(err));
  };
  const confirmCart = (customerID) => {
    axios
      .post("/carts/confirm", {
        customer: customerID,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <NavbarCashier />
      <Row className="mt-5">
        <Col md="2">
          <Dropdown>
            <Dropdown.Toggle variant="secondary">Cart Queue</Dropdown.Toggle>
            <Dropdown.Menu>
              {cart.map((singleCart, index) => (
                <Dropdown.Item
                  key={singleCart._id}
                  onClick={() => displayCart(singleCart)}
                >
                  cart {index + 1}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col
          md="6"
          style={{
            borderRight: "1px solid silver",
            borderLeft: "1px solid silver",
          }}
        >
          <Row>
            <Col sm="12">
              <h1 className="offset-5 mt-5">Cart</h1>
            </Col>
          </Row>
          <hr />
          <Col sm="12">
            {!!renderedCart.length &&
              renderedCart[0].cart.items.map((prod) => {
                return (
                  <>
                    <h5 className="text-muted">{prod.productId.name}</h5>
                    <span className="text-dark" style={{ fontSize: "17px" }}>
                      {prod.quantity}
                    </span>
                    <Button
                      onClick={() =>
                        incrementItem(renderedCart[0]._id, prod.productId._id)
                      }
                      color="primary"
                      className="btn text-light offset-1"
                    >
                      +
                    </Button>
                    <Button
                      color="primary"
                      className="btn text-light twobuttons"
                      onClick={() =>
                        decrementItem(renderedCart[0]._id, prod.productId._id)
                      }
                    >
                      -
                    </Button>
                    <Button
                      variant="danger"
                      className="btn text-light  twobuttons"
                      onClick={() =>
                        removeItem(renderedCart[0]._id, prod.productId._id)
                      }
                    >
                      Delete
                    </Button>{" "}
                    <hr />
                  </>
                );
              })}

            <span
              className="text-muted"
              style={{
                direction: "flex",
                float: "right",
                fontSize: "17px",
                marginTop: "1em",
              }}
            >
              <h6 style={{ textAlign: "right" }}>
                Total (
                {!!renderedCart.length && renderedCart[0].cart.items.length})
                items
                <br />
                <br />
                Rs. {!!renderedCart.length && renderedCart[0].cart.totalPrice}
              </h6>
              <br />
              <Link
                to={{
                  pathname: "/pos/checkout",
                  state: { renderedCart: renderedCart },
                }}
              >
                <Button onClick={() => confirmCart(renderedCart[0]._id)}>
                  Proceed to checkout
                </Button>
              </Link>
            </span>
          </Col>
        </Col>
        <Col md="4">
          <div
            className="mt-5"
            style={{ direction: "flex", textAlign: "center" }}
          >
            <h4 id="paymentHead">Select Payment Method</h4>
          </div>
          <div
            className="offset-3"
            style={{ direction: "flex", textAlign: "center" }}
          >
            <Link>
              <p className="paymentOptions mt-3">
                Pay with MasterCard
                <FaCcMastercard size={30} color={"red"} className="ml-2" />
              </p>
            </Link>
            <Link>
              <p className="paymentOptions">
                Pay with Visa
                <FaCcVisa size={30} color="blue" className="ml-2" />{" "}
              </p>
            </Link>
            <Link>
              <p className="paymentOptions">
                Pay with Jazz Cash
                <HiCash size={30} color="red" className="ml-2" />
              </p>
            </Link>
            <Link>
              <p className="paymentOptions">
                Cash
                <AiFillBank size={30} color="black" className="ml-2" />
              </p>
            </Link>
          </div>
          <hr />
          <Link>
            <p
              style={{ direction: "flex", textAlign: "center" }}
              onClick={() => {
                setText(1);
              }}
            >
              Click to Add Name
            </p>
          </Link>
          {inputToAddName()}
          {/* <CreditCard/> */}
        </Col>
      </Row>
    </div>
  );
}
export default Cashier;
