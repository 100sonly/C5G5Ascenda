import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 
import { useLocation, useSearchParams } from "react-router-dom";


const PUB_KEY = "pk_test_51PiA322N4766J9DW5Q3mhcIzmbKgz7MQIhY0G33eFYsY6yRFehmsJZkagjofzb5jLergWoofsCrCZKYBBgbQNF2000c7M34kK9"

 
function StripePayment() { 
  const stripeinfo = useLocation();
  console.log(stripeinfo);
  const [product, setProduct] = useState({ 
    name: stripeinfo.state.roomName, 
    price: stripeinfo.state.roomPrice,  
    description: 
      "This is a sample room", 
    quantity: 1, 
  });

  const makePayment = async () => { 
    const stripe = await loadStripe(PUB_KEY); 
    const body = { product }; 
    const headers = { 
      "Content-Type": "application/json", 
    }; 
 
    const response = await fetch( 
      "http://localhost:3000/payment/api/create-checkout-session", 
      { 
        method: "POST", 
        headers: headers, 
        body: JSON.stringify(body), 
      } 
    ); 
 
    const session = await response.json(); 
 
    const result = stripe.redirectToCheckout({ 
      sessionId: session.id, 
    }); 
 
    if (result.error) { 
      console.log(result.error); 
    } 
  }; 
 
  return ( 
    <Card style={{ width: "20rem" }}> 
      <Card.Img 
        variant="top" src="https://images.pexels.com/photos/12428359/pexels-photo-12428359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
      /> 
      <Card.Body> 
        <Card.Title>{product.name}</Card.Title> 
        <Card.Text>{product.description}</Card.Text> 
        <Button variant="primary" onClick={makePayment}> 
          Buy Now for {product.price} 
        </Button> 
      </Card.Body> 
    </Card> 
  ); 
}  
export default StripePayment; 