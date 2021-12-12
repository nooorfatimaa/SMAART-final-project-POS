import './MainAppScreen.css';
import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Lock, People } from 'react-bootstrap-icons';
import {Row, Col, Container, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Main() {
  const[username,setUsername] = useState("");
  const[password,setPassword] = useState("");
  const[token, settoken] = useState("");
  
  const[path,setPath] = useState("/");
  const [UnameError, setUNameError] = useState("");
  const history = useHistory();

  const submitHandle=(e)=>{

    e.preventDefault();
    
    const data = {
      "username":username,
      "password":password
    }
  
    axios.post('http://localhost:5000/user/login', data).then(response=>{
    
    alert("loged in successfully");
    
    localStorage.setItem('id_token', JSON.stringify(response.data.token))
    localStorage.setItem('user', response.data.user.username)
    // console.log(response.data.token,  response.data.user)
    console.log(localStorage.getItem('id_token'));
    console.log(response)  
  
  if(response.data.user.admin){
    history.push("/admin/dashboard");
  }else{
    history.push("/pos");
  }
  
  }).catch((res)=>{
    console.log(res)
  })
 

  }


  const validate = (event) => {
    var val = event.target.value;
    setUNameError("");
    setPath("/");
    let error = "";
    if (!val) {
      setUNameError("Username cannot be blank");
    }
    else if(error){
      setUNameError(error);
    }
    setUsername(val);
    if(username.includes("admin")){
      setPath("/admin/dashboard");
    }
    else if(username.includes("cashier")) {
      setPath("/pos");
    }
    return true;
  }

  const reset =() => {
    // setPath("/");
    setUsername("");
    setPassword("");
  }


  return (
    <Container className="bg">
      <Row className="box">
        <Col className="brand" md={8} xs={6}>
          <Row>
            <Col className="text1">
            SMAART
            <p className="text11">Smart Mirror Automated Augmented Reality based Try-on</p>
            </Col>
          </Row>
        </Col>
        <Col className="login" md={4} xs={6}>
          <Row>
            <Col className="text2">
              LOGIN
            </Col>
          </Row>
          <form >
            <Row className="rowss">
              <People color="rgb(100, 41, 117)" size={20} />
              <input type='text' placeholder='Enter username' name='username' value ={username} onChange={(e)=>{validate(e)}}/>
              <div style={{color:"red"}}>{UnameError}</div>
            </Row> 
            <Row className="rowss">
              <Lock color="rgb(100, 41, 117)" size={20} />
              <input type='password' placeholder='Enter password' value={password} name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </Row>
            <Row className="rowss">
              {/* <Link to={path}> */}
                <Button id="but" as="input" type="submit" value="Continue            >" onClick={(e)=>{submitHandle(e)}}/>{' '}
              {/* </Link> */}
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

//   return (
//     <Container className="bg">
//       <Row className="box">
//         <Col className="brand" md={8} xs={6}>
//           <Row>
//             <Col className="text1">
//             SMAART
//             <p className="text11">Smart Mirror Automated Augmented Reality based Try-on</p>
//             </Col>
//           </Row>
//         </Col>
//         <Col className="login" md={4} xs={6}>
//           <Row>
//             <Col className="text2">
//               LOGIN
//             </Col>
//           </Row>
//           <form >
//             <Row className="rowss">
//               <People color="rgb(100, 41, 117)" size={20} />
//               <input type='text' placeholder='Enter username' name='username' value ={username} onChange={(e)=>{validate(e)}}/>
//               <div style={{color:"red"}}>{UnameError}</div>
//             </Row> 
//             <Row className="rowss">
//               <Lock color="rgb(100, 41, 117)" size={20} />
//               <input type='password' placeholder='Enter password' value={password} name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
//             </Row>
//             <Row className="rowss">
//               <Link to={path}>
//                 <Button id="but" as="input" type="submit" value="Continue            >" onClick={(e)=>{submitHandle(e)}}onClick={()=>{reset()}}/>{' '}
//               </Link>
//             </Row>
//           </form>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

export default Main;
