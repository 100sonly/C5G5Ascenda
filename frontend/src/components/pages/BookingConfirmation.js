import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import ConfirmationHotelCard from '../ConfirmationHotelCard/index.js';
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { loadStripe } from "@stripe/stripe-js"; 
import {useLocation} from "react-router-dom";
const PUB_KEY = "pk_test_51PiA322N4766J9DW5Q3mhcIzmbKgz7MQIhY0G33eFYsY6yRFehmsJZkagjofzb5jLergWoofsCrCZKYBBgbQNF2000c7M34kK9"




function BookingConfirmation() {
    // State for managing checkbox and form values
    const [sameAsPersonalInfo, setSameAsPersonalInfo] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: ''
    });
    const [billingInfo, setBillingInfo] = useState({
        billingFirstName: '',
        billingLastName: '',
        billingPhoneNumber: '',
        billingEmailAddress: '',
        billingCountry: '',
        billingState: '',
        billingPostalCode: ''
    });

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle input changes for personal info
    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    // Handle input changes for billing info
    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle checkbox change
    const handleCheckboxChange = () => {
        setSameAsPersonalInfo(!sameAsPersonalInfo);

        if (!sameAsPersonalInfo) {
            // Set billing info to match personal info
            setBillingInfo({
                billingFirstName: personalInfo.firstName,
                billingLastName: personalInfo.lastName,
                billingPhoneNumber: personalInfo.phoneNumber,
                billingEmailAddress: personalInfo.emailAddress,
                billingCountry: '',
                billingState: '',
                billingPostalCode: ''
            });
        } else {
            // Clear billing info when unchecked
            setBillingInfo({
                billingFirstName: '',
                billingLastName: '',
                billingPhoneNumber: '',
                billingEmailAddress: '',
                billingCountry: '',
                billingState: '',
                billingPostalCode: ''
            });
        }
    };

    const query = new URLSearchParams(document.location.search);
    const location = useLocation();
    //params={[nights,hotelId,destID,rating,address,booking_id,name,formatDate(startDate),formatDate(endDate),image_details,amenities] }
    const hotelName = location.state.params.params[6]
    const hotel_id = location.state.params.params[1]
    const dest_id = location.state.params.params[2]
    const roomName = query.get("roomName");
    const hotelRating = parseFloat(location.state.params.params[3]);
    const hotelAddress = location.state.params.params[4]
    const nights = location.state.params.params[0];
    const price = query.get("price");
    const bookingId=location.state.params.params[5];
    const strt=location.state.params.params[7];
    const end=location.state.params.params[8];
    const img = location.state.params.params[9];
    const amenitiesArray=location.state.params.params[10];
    console.log(hotelName,roomName,hotelRating,hotelAddress,nights,price,bookingId,strt,end,img,amenitiesArray)

    const heroImage = `${img.prefix}${0}${img.suffix}`;

    console.log('Amenities Array:', amenitiesArray); 

    const limitedAmenitiesArray = amenitiesArray.slice(0, 4);
    
    const amenities = {};
    limitedAmenitiesArray.forEach(item => amenities[item] = true);
    console.log('Amenities Object:', amenities); 

    const hotelData = {
        heroImage: heroImage,
        hotelName: hotelName,
        hotelRating: hotelRating,
        hotelAddress: hotelAddress,
        hotelAmenities: amenities
    };

    const formatDateTime = (datetime) => {
        const [date, time] = datetime.split('#');
        return { date, time };
    };

    const checkIn = formatDateTime(strt);
    const checkOut = formatDateTime(end);

    console.log(price);
    const [product, setProduct] = useState({
        name: roomName,
        price: price
    });
    const [customer, setCustomer] = useState({
        email: personalInfo.emailAddress,
        custFirstName: personalInfo.firstName,
        custLastName: personalInfo.lastName
    });
    const [destInfo, setDestInfo] = useState({
        dest_id: dest_id,
        hotel_id: hotel_id
    });

    const makePayment = async () => { 
        const stripe = await loadStripe(PUB_KEY); 
        setCustomer({
            email: personalInfo.emailAddress,
            custFirstName: personalInfo.firstName,
            custLastName: personalInfo.lastName
        });
        const body = { product, customer, destInfo }; 
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
        <>
            <div className="container-booking-confirmation">
                <h1 className='bookingConfirmation' style={{ color: '#282c34' }}>Confirm Booking</h1>
                <div className='elements'>
                    <div className='container-forms'>
                    <div className="container-personal-details">
                        <h4>Your details</h4>
                        <div className="name-labels">
                            <p>First Name <span className="required-asterisk">*</span></p>
                            <p>Last Name <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="name-fields">
                            <input
                                type="text"
                                name="firstName"
                                value={personalInfo.firstName}
                                onChange={handlePersonalInfoChange}
                            />
                            <input
                                type="text"
                                name="lastName"
                                value={personalInfo.lastName}
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                        <div className="contact-labels">
                            <p>Phone Number <span className="required-asterisk">*</span></p>
                            <p>Email Address <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="contact-fields">
                            <input
                                type="text"
                                name="phoneNumber"
                                value={personalInfo.phoneNumber}
                                onChange={handlePersonalInfoChange}
                            />
                            <input
                                type="text"
                                name="emailAddress"
                                value={personalInfo.emailAddress}
                                onChange={handlePersonalInfoChange}
                            />
                        </div>
                        <div className="salutation-labels">
                            <p>Salutation</p>
                        </div>
                        <div className="salutation-fields">
                            <input type="text" />
                        </div>
                        <div className="requests-labels">
                            <p>Special requests to hotel</p>
                        </div>
                        <div className="requests-fields">
                            <textarea />
                        </div>
                    </div>
                    
                    {/* <div className="container-payment-details">
                        <h4>Payment Information</h4>
                        <div className="name-labels">
                            <p>Name on card <span className="required-asterisk">*</span></p>
                            <p>Credit Card Number <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="name-fields">
                            <input type="text" />
                            <input type="text" />
                        </div>
                        <div className="contact-labels">
                            <p>Expiration Date <span className="required-asterisk">*</span></p>
                            <p>CVV/CVC <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="contact-fields">
                            <input type="text" />
                            <input type="text" />
                        </div>
                        <h4>Billing Address</h4>
                        <div className="name-labels">
                            <p>First Name <span className="required-asterisk">*</span></p>
                            <p>Last Name <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="name-fields">
                            <input
                                type="text"
                                name="billingFirstName"
                                value={billingInfo.billingFirstName}
                                onChange={handleBillingInfoChange}
                                disabled={sameAsPersonalInfo}
                            />
                            <input
                                type="text"
                                name="billingLastName"
                                value={billingInfo.billingLastName}
                                onChange={handleBillingInfoChange}
                                disabled={sameAsPersonalInfo}
                            />
                        </div>
                        <div className="contact-labels">
                            <p>Phone Number <span className="required-asterisk">*</span></p>
                            <p>Email Address <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="contact-fields">
                            <input
                                type="text"
                                name="billingPhoneNumber"
                                value={billingInfo.billingPhoneNumber}
                                onChange={handleBillingInfoChange}
                                disabled={sameAsPersonalInfo}
                            />
                            <input
                                type="text"
                                name="billingEmailAddress"
                                value={billingInfo.billingEmailAddress}
                                onChange={handleBillingInfoChange}
                                disabled={sameAsPersonalInfo}
                            />
                        </div>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                id="sameAsPersonalInfo"
                                checked={sameAsPersonalInfo}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="sameAsPersonalInfo">Same as personal information</label>
                        </div>
                        <div className="area-labels">
                            <p>Country <span className="required-asterisk">*</span></p>
                            <p>State/Province <span className="required-asterisk">*</span></p>
                            <p>Postal (ZIP) Code <span className="required-asterisk">*</span></p>
                        </div>
                        <div className="area-fields">
                            <input
                                type="text"
                                name="billingCountry"
                                value={billingInfo.billingCountry}
                                onChange={handleBillingInfoChange}
                            />
                            <input
                                type="text"
                                name="billingState"
                                value={billingInfo.billingState}
                                onChange={handleBillingInfoChange}
                            />
                            <input
                                type="text"
                                name="billingPostalCode"
                                value={billingInfo.billingPostalCode}
                                onChange={handleBillingInfoChange}
                            />
                        </div>
                    </div> */}
 
                    </div>
                    <div className="container-booking-details">
                        <ConfirmationHotelCard
                            heroImage={hotelData.heroImage}
                            hotelName={hotelData.hotelName}
                            hotelRating={hotelData.hotelRating}
                            hotelAddress={hotelData.hotelAddress}
                            hotelAmenities={hotelData.hotelAmenities}
                        />
                        <div className="booking-details-card">
                            <h3>Your Booking Details</h3>
                            <div className="checkin-checkout-info">
                                <div className="checkin-column">
                                    <p className="section-title">Check-in</p>
                                    <p className="date-info">{checkIn.date}</p>
                                    <p className="time-info">{checkIn.time}</p>
                                </div>
                                <div className="checkout-column">
                                    <p className="section-title">Check-out</p>
                                    <p className="date-info">{checkOut.date}</p>
                                    <p className="time-info">{checkOut.time}</p>
                                </div>
                            </div>
                            <p>{roomName}</p>
                            <p>{nights} nights</p>
                        </div>
                        <div className="booking-pricing-card">
                            <h3>Pricing Summary</h3>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
                <div className="confirm-button-container">
                    <button onClick={makePayment}
                        className="confirm-button"
                    >
                        Confirm & Proceed
                    </button>
                </div>
            </div>
        </>
    );
}

export default BookingConfirmation;
