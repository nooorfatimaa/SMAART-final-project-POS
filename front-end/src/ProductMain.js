import Button from '@material-ui/core/Button';
import {Table,Row,Col,InputGroup, InputGroupAddon, InputGroupText, Input, Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle } from 'reactstrap';
import './ProductMain.css';
import React, { useState, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import {NavbarCustom} from './Navbar.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MdDelete } from "react-icons/md";


function Product(){
  const[products, setProduct] = useState([]);
  const[categories, setCategory] = useState([]);
  const[forsearchingproducts, setsearchingProducts] = useState([]);
  const[forsearchingcategories, setsearchingCategories] = useState([]);
  const [typedproduct, settypedproduct]= useState([]);
  const [typedcategory, settypedcategory]= useState([]);
  const [UnameError, setUNameError] = useState("");



  useEffect(() => {
    getProductList();
    getCategoryList();
  },[]);

  const options = {
    
    headers: {'content-type':'application/json',
    'Authorization':`Bearer ${JSON.parse(localStorage.getItem('id_token'))}`,
    responseType: 'text'
  }
  };

  const getProductList = () => {
  
  console.log(options)
    axios.get('http://localhost:5000/products',options).then((response) => {
      const data = response.data;
      setProduct(data);
      setsearchingProducts(data)
      console.log(data);

    }).catch(() => {console.log('unable to receive data'); console.log(options)
    });
  }

  const getCategoryList = () => {
    axios.get('http://localhost:5000/categories',options).then((response) => {
      const data = response.data;
      setCategory(data);
      setsearchingCategories(data)
      console.log(data);
    }).catch(() => {console.log('unable to receive data')
    });
  }

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/delete/${id}`,options).then((response) => {
      alert('deleted successfully');
      window.location.reload();
    }).catch(() => {console.log('unable to delete product')
    });
  }

  const searchProducts=(e)=>{

    if((/^[a-zA-Z ]*$/).test(e.target.value)){
      settypedproduct(e.target.value)
      setUNameError("")
    }
    else{
      setUNameError("Enter Alphabets only")
      settypedproduct(e.target.value)
    }

    setProduct(forsearchingproducts.filter(val=>val.name.includes((e.target.value).toLowerCase())))


    
  }

  const searchCategory=(e)=>{
 
    if((/^[a-zA-Z ]*$/).test(e.target.value)){
      settypedcategory(e.target.value)
      setUNameError("")
    }
    else{
      setUNameError("Enter Alphabets only")
    }

    settypedcategory(e.target.value)
    setCategory(forsearchingcategories.filter(val=>(val.name.toLowerCase()).includes(e.target.value.toLowerCase())))
    
  }

  const ProductDisplay= ()=>{
    return(
      <Row sm='9' className="mb-5">
        {products.map(product =>{
          return(
            <Col sm='4' className="mb-5">
              <Link to={{pathname:`/admin/merchandise/product/${product._id}`, state:{ _id : product._id } }}>
                <Card className='cards'>
                  <CardImg className='cardsimg' top  width="100%" src={`http://localhost:5000/prodImagesFolder/${product._id}.png`} alt="Card image" />
                  <CardBody body className="text-center">
                    <CardTitle className="cardtitle" tag="h5">{product.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mt-2 mb-2 text-muted">{product.category.name}</CardSubtitle>
                    <CardSubtitle tag="h6" className="mt-2 mb-2 text-muted">{product.price}</CardSubtitle> 
                    <CardSubtitle tag="h6" className="text-right mt-2 mb-2 text-dark"><Link className="text-dark" to="/admin/merchandise"><MdDelete onClick={()=>{deleteProduct(product._id)}} size={25}/></Link></CardSubtitle>   
                  </CardBody>
                </Card>
              </Link>
            </Col>
          )})}
      </Row>      
    )
  }

  return(
    <div >
      <NavbarCustom title="Merchandise Management" dd1="Dashboard" dd1Route="dashboard" dd2="POS" dd2Route="pos" dd3="Cashier Registration" dd3Route="cashier" dd4="Customer Details" dd4Route="customer" dd5="Sales Analysis" dd5Route="sales"/>
      <Tabs defaultActiveKey="Product" transition={false} id="noanim-tab-example">
        <Tab eventKey="Product" title="Product" tabClassName="tab-title">
            <Row className="container-fluid">
                  <Col sm="7">
                    <InputGroup placeholder="he">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><IoMdSearch size={24}/></InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Search Product by Name"  value = {typedproduct} onChange={(e)=>{searchProducts(e)}}/>
                    </InputGroup>
                    <span style={{color:"red", fontSize:"15px"}}>
                    {UnameError}
                    </span>
                    <br/>
                    {/* <InputGroup></InputGroup> */}
                  </Col>
                  <Col sm="5" className="topcolumn">
                    <Link to="/admin/merchandise/addproduct">
                      <Button as="input" type="submit" style={{ color:"white", float:'right', backgroundColor:'rgb(100, 41, 117)', borderRadius:'22px', fontSize:"20px", fontFamily:'Verdana'}}>Add Product</Button>
                    </Link>
                  </Col>
            </Row>
            <div className="container-fluid">
              <Row>
                <Col sm="12">
                  {ProductDisplay()}
                </Col>
              </Row>
            </div>
        </Tab>
        <Tab eventKey="Category" title="Category" tabClassName="tab-title">
            <Row className="container-fluid">
                <Col sm="7">
                  <InputGroup placeholder="he">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText><IoMdSearch size={24}/></InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Search Category" value={typedcategory} onChange={(e)=>{searchCategory(e)}}/>
                  </InputGroup>
                  <span style={{color:"red", fontSize:"15px"}}>
                    {UnameError}
                    </span>
                  <br/>
                  <InputGroup></InputGroup>
                </Col>
                <Col sm="5" className="topcolumn">
                  <Link to="/admin/merchandise/addcategory">
                    <Button as="input" type="submit" style={{ color:"white", float:'right', backgroundColor:'rgb(100, 41, 117)', borderRadius:'22px', fontSize:'20px', fontFamily:'Verdana'}}>Add Category</Button>
                  </Link>
                </Col>
            </Row>
            <div className="container-fluid">
              <Row>
                <Col sm="10" className="offset-1">
                  <Table hover>
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Code</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map(category =>{
                        return(
                          <tr key={category._id}>
                            <td><img height = "200px" width="200px" src={category.picture}></img></td>
                            <td>{category.name}</td>
                            <td>{category.code}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Product;

