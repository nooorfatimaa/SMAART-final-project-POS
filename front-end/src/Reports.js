import "./Reports.css";
import {Card} from 'react-bootstrap'
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
    <div style={{ display: 'flex'}}>
      <Card border="primary" bg="primary" style={{ width: '18rem', margin: '10px', marginLeft: '250px'}} className="mb-2">
        <Card.Header>Sales</Card.Header>
          <Card.Body>
          <Card.Title>Total Sales {dailyCart.length}</Card.Title>
          <Card.Text>
          Total number of sales done on {new Date().toString()}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card border="success" bg="success" style={{ width: '18rem', margin: '10px', marginLeft: '250px'}} className="mb-2">
        <Card.Header>Amount</Card.Header>
          <Card.Body>
           
          <Card.Title>Total Amount {dailyCart.reduce((sum, item) => sum + item.cart.totalPrice, 0)}</Card.Title>
          <Card.Text>
          Total amount made on {new Date().toString()}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
      <div>
        <ResponsiveContainer width="85%" aspect={3}>
          <LineChart data={dailyCart.map(singleCart => singleCart)} margin={{top: 50, left: 200}}>
            <XAxis />
            <YAxis />
            <Line dataKey="cart.totalPrice" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="85%" aspect={3}>
          <ComposedChart height={500} width={400} margin={{top:20, right:20, left:20, bottom:20}} data={dailyCart.map(singleCart => singleCart)} margin={{top: 50, left: 200}}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cart.totalPrice" fill="#9003fc" stroke="#8884d8" fillOpacity={0.2}/>
          <Bar dataKey="cart.totalPrice" barSize={20} fill="#82ca9d" />
          <Line type="monotone" dataKey="cart.totalPrice" stroke="#ff7300" />
          <Scatter dataKey="cart.totalPrice" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="85%" aspect={3}>
          <PieChart margin={{top: 50, left: 200}}>
            <Pie dataKey="cart.totalPrice" data={dailyCart.map(singleCart => singleCart)} outerRadius={200} innerRadius={120} fill="#9003fc" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
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
    <div style={{ display: 'flex'}}>
      <Card border="primary" bg="primary" style={{ width: '18rem', margin: '10px', marginLeft: '250px'}} className="mb-2">
        <Card.Header>Sales</Card.Header>
          <Card.Body>
          <Card.Title>Total Sales {monthlyCart.length}</Card.Title>
          <Card.Text>
          Total number of sales done in {new Date().toString().slice(3,7)} {new Date().toString().slice(10,15)}
          </Card.Text>
        </Card.Body>
      </Card>
      <Card border="success" bg="success" style={{ width: '18rem', margin: '10px', marginLeft: '250px'}} className="mb-2">
        <Card.Header>Amount</Card.Header>
          <Card.Body>
          <Card.Title>Total Amount {monthlyCart.reduce((sum, item) => sum + item.cart.totalPrice, 0)}</Card.Title>
          <Card.Text>
          Total amount made in {new Date().toString().slice(3,7)} {new Date().toString().slice(10,15)}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    <div>
        <ResponsiveContainer width="85%" aspect={3} >
          <LineChart data={monthlyCart.map(singleCart => singleCart)} margin={{top: 50, left: 200}}>
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis />
            <YAxis />
            <Line dataKey="cart.totalPrice" stroke="#9003fc"/>
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="85%" aspect={3}>
          <ComposedChart height={500} width={400}  data={monthlyCart.map(singleCart => singleCart)} margin={{top: 50, left: 200}}>
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="cart.totalPrice" fill="#9003fc" stroke="#8884d8" fillOpacity={0.2}/>
          <Bar dataKey="cart.totalPrice" barSize={20} fill="#82ca9d" />
          <Line type="monotone" dataKey="cart.totalPrice" stroke="#ff7300" />
          <Scatter dataKey="cart.totalPrice" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="85%" aspect={3}>
          <PieChart margin={{top: 50, left: 200}}>
            <Pie dataKey="cart.totalPrice" data={monthlyCart.map(singleCart => singleCart)} outerRadius={200} innerRadius={120} fill="#9003fc" label />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
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
          eventKey="Monthly Sales"
          title="Monthly Sales"
          tabClassName="tab-title"
        >
          <MonthlySale />
        </Tab>
        
      </Tabs>
    </div>
  );
}

export default SalesAnalysis;
