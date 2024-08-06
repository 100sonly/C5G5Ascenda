import React from "react"; 
import './index.css'

function Cancel() { 
  return ( 
    <> 
      <div className="transaction-container"> 
        <h4>Oops! Your payment was unsuccessful.</h4> 
        <p> 
          We appreciate your business! To get assisted for your order, please reach out to us at: 
          <a href="mailto:orders@example.com">orders@example.com</a>. 
        </p> 
        <div> 
          <button> Go to Home page</button> 
        </div> 
      </div>
    </> 
  ); 
} 
 
export default Cancel; 