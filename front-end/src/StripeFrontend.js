import React, { useState } from "react";
import "./App.css";
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios';

const ip = 'http://localhost:5000/'


function Stripe(props){
  console.log(props.history.location.state.price)
  const [prod, setProduct] = useState({
    name:"test product",
    price:props.history.location.state.price,
    productBy:"SMAART"
  })


  const do_payment=(tok)=>{
    const body = {
      tok,
      prod
    }
    const options = {
      "Content-Type": "application/json"
    }
    
    return axios.post(`${ip}stripe/payment`, body).then((res)=>{
        console.log("Response", res)
        console.log("Status",res.status)

    }).catch((err)=>console.log(err))
  }

  return(
    <StripeCheckout
    stripeKey='pk_test_51K4hcKASrElzPBPwVwGOBDflnpnJ2m7yp5aAioycp9YZydVwHCLzmMIEry9MRLrHMiTCEpFf13dokiOaE5mQXZOj00vkHKJgyK'
    token={do_payment} //responsible for firing things
    name="Proceed Now"
    amount={(prod.price*100) / 170}
    >
    <button>Pay Now</button>
    </StripeCheckout>
  )

}

export default Stripe