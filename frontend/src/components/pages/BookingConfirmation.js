import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import ConfirmationHotelCard from '../ConfirmationHotelCard/index.js';
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { Box } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js"; 
import {useLocation} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CustomizedSteppers from '../CustomizedSteppers'; 




const PUB_KEY = "pk_test_51PiA322N4766J9DW5Q3mhcIzmbKgz7MQIhY0G33eFYsY6yRFehmsJZkagjofzb5jLergWoofsCrCZKYBBgbQNF2000c7M34kK9"

function BookingConfirmation() {
    const [personalInfo, setPersonalInfo] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        emailAddress: ''
    });

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        phoneNumber: false,
        emailAddress: false
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prevState) => ({
            ...prevState,
            [name]: value
        }));
        setErrors((prevState) => ({
            ...prevState,
            [name]: value.trim() === ''
        }));
    };

    const validateForm = () => {
        const newErrors = {
            firstName: personalInfo.firstName.trim() === '',
            lastName: personalInfo.lastName.trim() === '',
            phoneNumber: personalInfo.phoneNumber.trim() === '',
            emailAddress: personalInfo.emailAddress.trim() === ''
        };
        setErrors(newErrors);
        return Object.values(newErrors).every((error) => !error);
    };

    const query = new URLSearchParams(document.location.search);
    const location = useLocation();
    const hotelName = location.state.params.params[6];
    const roomName = query.get("roomName");
    const hotelRating = parseFloat(location.state.params.params[3]);
    const hotelAddress = location.state.params.params[4];
    const nights = location.state.params.params[0];
    const price = query.get("price");
    const bookingId = location.state.params.params[5];
    const numberOfRooms = query.get("roomNum")
    const strt = location.state.params.params[7];
    const end = location.state.params.params[8];
    const img = location.state.params.params[9];
    const amenitiesArray = location.state.params.params[10];
    console.log(hotelName, roomName, hotelRating, hotelAddress, nights, price, bookingId, strt, end, img, amenitiesArray);

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

    const [product, setProduct] = useState({
        name: roomName,
        price: price,
        email: personalInfo.emailAddress
    });

    const makePayment = async () => { 
        if (!validateForm()) {
            console.log('Validation failed');
            return;
        }

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
        <>
            <div className="container-booking-confirmation">
                <CustomizedSteppers style={{ marginTop: '4%'}}/>
                <h1 className='bookingConfirmation' style={{ marginTop: '2%', color: '#282c34' }}>Confirm Booking</h1>
                <div className='elements'>
                    <div className='container-forms'>
                        <div className="container-personal-details">
                            <h4>Your details</h4>
                            <div className="name-fields">
                                <TextField
                                    label="First Name"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    value={personalInfo.firstName}
                                    onChange={handlePersonalInfoChange}
                                    required
                                    error={errors.firstName}
                                    helperText={errors.firstName ? 'First name is required' : ''}
                                />
                                <TextField
                                    label="Last Name"
                                    name="lastName"
                                    variant="outlined"
                                    fullWidth
                                    value={personalInfo.lastName}
                                    onChange={handlePersonalInfoChange}
                                    required
                                    error={errors.lastName}
                                    helperText={errors.lastName ? 'Last name is required' : ''}
                                />
                            </div>
                            <div className="contact-fields">
                                <TextField
                                    label="Phone Number"
                                    name="phoneNumber"
                                    variant="outlined"
                                    fullWidth
                                    value={personalInfo.phoneNumber}
                                    onChange={handlePersonalInfoChange}
                                    required
                                    error={errors.phoneNumber}
                                    helperText={errors.phoneNumber ? 'Phone number is required' : ''}
                                />
                                <TextField
                                    label="Email Address"
                                    name="emailAddress"
                                    variant="outlined"
                                    fullWidth
                                    value={personalInfo.emailAddress}
                                    onChange={handlePersonalInfoChange}
                                    required
                                    error={errors.emailAddress}
                                    helperText={errors.emailAddress ? 'Email address is required' : ''}
                                />
                            </div>
                            <div className="salutation-fields">
                                <TextField
                                    label="Salutation"
                                    name="salutation"
                                    variant="outlined"
                                    fullWidth
                                />
                            </div>
                            <div className="requests-fields">
                                <TextField
                                    label="Special requests to hotel"
                                    name="specialRequests"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </div>
                        <div className="confirm-button-container">
                            <button onClick={makePayment} className="confirm-button">
                                Confirm & Proceed
                            </button>
                        </div>
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
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{checkIn.date}</Typography>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: 'gray', marginTop: '2%'}} gutterBottom>{checkIn.time}</Typography>
                                </div>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <div className="checkout-column">
                                    <p className="section-title">Check-out</p>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{checkOut.date}</Typography>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: 'gray', marginTop: '2%'}} gutterBottom>{checkOut.time}</Typography>
                                </div>
                            </div>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '500', marginTop: '2%'}} gutterBottom>
                                Total length of stay:
                            </Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{nights} nights</Typography>
                            <Divider style={{marginTop: '10%', height: '2px'}} gutterBottom/>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '500', marginTop: '2%'}} gutterBottom>
                                You've selected:
                            </Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{numberOfRooms} x {roomName}</Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: '#2F80ED', marginTop: '2%'}} component={Link} to="/bookings">
                                    Change your selection
                            </Typography>
                        </div>
                        <div className="booking-pricing-card">
                            <h3>Pricing Summary</h3>
                            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'4%' }}>
                                <Typography variant="h5" style={{fontFamily: 'Inter', fontWeight: 'bold'}} gutterBottom>Total:</Typography>
                                <Typography variant="h5" style={{fontFamily: 'Inter', fontWeight: 'bold', color:"#FEBB02"}} gutterBottom>${price}</Typography>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingConfirmation;
