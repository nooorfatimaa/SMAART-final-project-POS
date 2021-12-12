import "./Reports.css";
import { Table, Col, Row } from "reactstrap";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { NavbarCustom } from "./Navbar.js";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, ComposedChart, Tooltip, Legend, Area, Bar, Scatter, CartesianGrid, Pie, PieChart } from "recharts";
import axios from "axios";
import { useEffect, useState } from "react";
const DailySale = () => {
  const [dailyCart, setDailyCart] = useState([]);
  const todaysale = async () => {
    try {
      let response = await axios.get("/carts");
      response.data.map(one => {
        let dateFromCart = one.createdAt.split("-")[2].slice(0, 2);
        let todayDate = new Date();
        let thisDate = todayDate.toUTCString().split(" ")[1]
        if (thisDate === dateFromCart) {
          setDailyCart(prev => [...prev, one])
        }
      })
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    todaysale()
  },[]);
  return (
    <>
      <Row className="mt-5">
        <Col className="mt-3 ml-5 mr-5">
          <Table hover>
            <thead>
              <tr>
                <th>Time</th>
                <th>Customers</th>
                <th>Products</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="row">09:00 AM</td>
                <td>Moin</td>
                <td>Shirt</td>
                <td>3</td>
                <td>400$</td>
              </tr>
              <tr>
                <td scope="row">09:00 AM</td>
                <td>Zahid</td>
                <td>Shirt</td>
                <td>1</td>
                <td>20$</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
      <div>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={dailyCart.map(singleCart => singleCart)}>
            <XAxis />
            <YAxis />
            <Line dataKey="cart.totalPrice" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <ComposedChart height={500} width={400} margin={{top:20, right:20, left:20, bottom:20}} data={dailyCart.map(singleCart => singleCart)}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cart.totalPrice" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="cart.totalPrice" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="cart.totalPrice" stroke="#ff7300" />
          <Scatter dataKey="cart.totalPrice" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <PieChart>
            <Pie dataKey="cart.totalPrice" data={dailyCart.map(singleCart => singleCart)} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const WeeklySale = () => {
  return (
    <Row className="mt-5">
      <Col className="mx-auto" sm="6">
        <Table hover>
          <thead>
            <tr>
              <th>Days</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Monday</td>
              <td>620$</td>
            </tr>
            <tr>
              <td scope="row">Tuesday</td>
              <td>1110$</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

const MonthlySale = () => {
  const [monthlyCart, setMonthlyCart] = useState([])
  const monthlySale = async () => {
    try {
      let res = await axios.get('/carts')
      res.data.map(single => {
        let monthFromCart = single.createdAt.split("-")[1]
        let thisDate = new Date()
        let thisMonth = thisDate.getMonth() + 1
        if (thisMonth == monthFromCart) {
          setMonthlyCart(prev => [...prev, single])
          
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    monthlySale()
  }, [])
  return (
    <>
    <Row className="mt-5">
      <Col id="monthlysalecol" className="mx-auto" sm="6">
        <Table hover>
          <thead>
            <tr>
              <th>Month</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Januaury</td>
              <td>1000$</td>
            </tr>
            <tr>
              <td scope="row">Feburary</td>
              <td>200$</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
    <div>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart data={monthlyCart.map(singleCart => singleCart)}>
            <XAxis />
            <YAxis />
            <Line dataKey="cart.totalPrice" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <ComposedChart height={500} width={400} margin={{top:20, right:20, left:20, bottom:20}} data={monthlyCart.map(singleCart => singleCart)}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cart.totalPrice" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="cart.totalPrice" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="cart.totalPrice" stroke="#ff7300" />
          <Scatter dataKey="cart.totalPrice" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <PieChart>
            <Pie dataKey="cart.totalPrice" data={monthlyCart.map(singleCart => singleCart)} fill="#8884d8" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

const TopProduct = () => {
  return (
    <Row className="mt-5">
      <Col className="mt-3 ml-5 mr-5">
        <Table hover>
          <thead>
            <tr>
              <th>Total</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">120$</td>
              <td>Rainbow Shirt</td>
              <td>10</td>
              <td>6000$</td>
            </tr>
            <tr>
              <td scope="row">100$</td>
              <td>Browny</td>
              <td>15</td>
              <td>2000$</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

function SalesAnalysis() {
  return (
    <div>
      <NavbarCustom
        title="Sales Analysis"
        dd1="Dashboard"
        dd1Route="Dashboard"
        dd2="POS"
        dd2Route="POS"
        dd3="Merchandise Management"
        dd3Route="merchandise"
        dd4="Customer Details"
        dd4Route="customer"
        dd5="Cashier Registration"
        dd5Route="cashier"
      />
      <Tabs
        defaultActiveKey="Daily Sales"
        transition={false}
        id="noanim-tab-example"
        className="mt-5"
      >
        <Tab
          eventKey="Daily Sales"
          title="Daily Sales"
          tabClassName="tab-title"
        >
          <DailySale />
        </Tab>
        <Tab
          eventKey="Weekly Sales"
          title="Weekly Sales"
          tabClassName="tab-title"
        >
          <WeeklySale />
        </Tab>
        <Tab
          eventKey="Monthly Sales"
          title="Monthly Sales"
          tabClassName="tab-title"
        >
          <MonthlySale />
        </Tab>
        <Tab
          eventKey="Top Products"
          title="Top Products"
          tabClassName="tab-title"
        >
          <TopProduct />
        </Tab>
      </Tabs>
    </div>
  );
}

export default SalesAnalysis;
