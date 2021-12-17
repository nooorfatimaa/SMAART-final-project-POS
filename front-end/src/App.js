import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Dashboard from './DashboardAdmin.js';
import AddProduct from './Addproduct.js';
import ProductEdit from './ProductEditDelete.js';
import Cashier from './Cashier.js';
import Product from './ProductMain.js';
import AddCashier from "./AddCashier.js";
import AddCategory from "./AddCategory.js";
import ViewCashier from "./ViewCashier.js";
import SalesAnalysis from "./Reports.js";
import CustomerInfo from "./CustomerInfo.js";
import Main from "./MainAppScreen.js";
import Invoice from "./Invoice.js";
import Axios from "axios";
import Stripe from './StripeFrontend'
import Unauthorized from './Unauth'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main}/>
        <Route path="/admin/dashboard" exact component={Dashboard}/>
        <Route path="/admin/sales" exact component={SalesAnalysis}/>
        <Route path="/admin/merchandise" exact component={Product}/>
        <Route path="/admin/merchandise/product/:id" exact component={ProductEdit}/>
        <Route path="/admin/merchandise/addproduct" exact component={AddProduct}/>
        <Route path="/admin/merchandise/addcategory" exact component={AddCategory}/>
        <Route path="/admin/customer" exact component={CustomerInfo}/>
        <Route path="/admin/pos" exact component={Cashier}/>
        <Route path="/admin/cashier" exact component={ViewCashier}/>
        <Route path="/admin/cashier/addcashier" exact component={AddCashier}/>
        <Route path="/pos" exact component={Cashier}/>
        <Route path="/pos/checkout" exact component={Invoice}/>
        <Route path="/pos/checkout/payment" exact component={Stripe}/>
        <Route path="/unauthorized" exact component={Unauthorized}/>
      </Switch>
    </Router>
    
  );
}

export default App;
