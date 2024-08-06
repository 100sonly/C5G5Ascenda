import React from "react"; 
import './index.css';
import SuccessIcon from "@mui/icons-material/EventAvailableRounded"; 
import CustomizedSteppers from '../CustomizedSteppers'; 

function Success() { 
  return ( 
    <div className="success-page">
      <div className="stepper-container">
        <CustomizedSteppers activeStep={3} /> 
      </div>
      <div className="transaction-container"> 
        <div className="success-icon-container">
          <SuccessIcon className="success-icon" />
        </div>
        <h2>Booking Successful!</h2> 
        <p> 
          Thank you for using our hotel booking service. We have sent you an email with the details of your booking. 
        </p> 
      </div> 
    </div>
  ); 
} 

export default Success; 
