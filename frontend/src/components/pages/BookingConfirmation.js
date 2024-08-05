import React, { useEffect, useState } from 'react';
import './BookingConfirmation.css';
import ConfirmationHotelCard from '../ConfirmationHotelCard/index.js';
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button"; 
import Card from "react-bootstrap/Card"; 
import { Box } from '@mui/material';
import { loadStripe } from "@stripe/stripe-js"; 
import { useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CustomizedSteppers from '../CustomizedSteppers/index.js'; 

const PUB_KEY = "pk_test_51PiA322N4766J9DW5Q3mhcIzmbKgz7MQIhY0G33eFYsY6yRFehmsJZkagjofzb5jLergWoofsCrCZKYBBgbQNF2000c7M34kK9"

function BookingConfirmation() {
    const location = useLocation();
    const query = new URLSearchParams(window.location.search);

    const [bookingData, setBookingData] = useState(null);
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
    const [product, setProduct] = useState({
        name: '',
        price: '',
        email: ''
    });

    useEffect(() => {
        //window.scrollTo(0, 0);

        const params = location.state?.params?.params || [];
        const safeGet = (index, defaultValue = '') => params[index] || defaultValue;

        const newBookingData = {
            hotelName: safeGet(6),
            roomName: query.get("roomName") || '',
            hotelRating: parseFloat(safeGet(3, '0')),
            hotelAddress: safeGet(4),
            nights: safeGet(0),
            price: query.get("price") || '',
            bookingId: safeGet(5),
            numberOfRooms: query.get("roomNum") || '',
            strt: safeGet(7),
            end: safeGet(8),
            img: safeGet(9, { prefix: '', suffix: '' }),
            amenitiesArray: safeGet(10, []),
            //adultchildren: safeGet(11,'0'),
            //@harsh adultchildren has info if u need # of adults and children in format "3,2" (3 adult 2 children e.g)
        };

        setBookingData(newBookingData);
        setProduct(prevProduct => ({
            ...prevProduct,
            name: newBookingData.roomName,
            price: newBookingData.price,
        }));
    }, [location, query]);

    useEffect(() => {
        setProduct(prevProduct => ({
            ...prevProduct,
            email: personalInfo.emailAddress
        }));
    }, [personalInfo.emailAddress]);

    const handlePersonalInfoChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        setErrors(prevState => ({
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
        return Object.values(newErrors).every(error => !error);
    };

    const sendBookingData = async (bookingData) => {
        console.log("here");
        try {
            const response = await fetch('http://localhost:3000/booking/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending booking data:', error);
            throw error;
        }
    };

    const sendEmail = async (bookingData) => {
        try {
            const response = await fetch('http://localhost:3000/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error sending booking data:', error);
            throw error;
        }
    };
    
    const makePayment = async () => { 
        if (!validateForm()) {
            console.log('Validation failed');
            return;
        }
    
        if (!bookingData) {
            console.log('Booking data not available');
            return;
        }

        const formatDateTime = (datetime) => {
            const [date, time] = datetime.split('#');
            return { date, time };
        };

        const checkIn = formatDateTime(bookingData.strt);
        const checkOut = formatDateTime(bookingData.end);

        const heroImage = `${bookingData.img.prefix}${0}${bookingData.img.suffix}`;

        const limitedAmenitiesArray = bookingData.amenitiesArray.slice(0, 4);
        const amenities = {};
        limitedAmenitiesArray.forEach(item => amenities[item] = true);
        
        const hotelData = {
            heroImage: heroImage, 
            hotelName: bookingData.hotelName,
            hotelRating: bookingData.hotelRating,
            hotelAddress: bookingData.hotelAddress,
            hotelAmenities: amenities
        };


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

        // Prepare booking data
        const bookingDataToSend = {
            personalInfo: {
                ...personalInfo,
                salutation: document.querySelector('input[name="salutation"]')?.value || '',
                specialRequests: document.querySelector('textarea[name="specialRequests"]')?.value || ''
            },
            bookingDetails: {
                ...bookingData,
                checkIn,
                checkOut,
                heroImage,
                amenities: bookingData.amenitiesArray,
            },
            hotelData
        };   
        
        // PROBLEM: Email sends before payment is complete
        // Sending confirmation email
        const sendConfirmEmail = await sendEmail(bookingDataToSend);
        console.log(sendConfirmEmail);

        // Send booking data to backend
        const bookingConfirmation = await sendBookingData(bookingDataToSend);
        console.log('Booking confirmed:', bookingConfirmation);




    };

    if (!bookingData) {
        return <div>Loading booking details...</div>;
    }

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
                            heroImage={`${bookingData.img.prefix}${0}${bookingData.img.suffix}`}
                            hotelName={bookingData.hotelName}
                            hotelRating={bookingData.hotelRating}
                            hotelAddress={bookingData.hotelAddress}
                            hotelAmenities={bookingData.amenitiesArray.slice(0, 4).reduce((acc, item) => ({ ...acc, [item]: true }), {})}
                        />
                        <div className="booking-details-card">
                            <h3>Your Booking Details</h3>
                            <div className="checkin-checkout-info">
                                <div className="checkin-column">
                                    <p className="section-title">Check-in</p>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{bookingData.strt.split('#')[0]}</Typography>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: 'gray', marginTop: '2%'}} gutterBottom>{bookingData.strt.split('#')[1]}</Typography>
                                </div>
                                <Divider orientation="vertical" variant="middle" flexItem />
                                <div className="checkout-column">
                                    <p className="section-title">Check-out</p>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{bookingData.end.split('#')[0]}</Typography>
                                    <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: 'gray', marginTop: '2%'}} gutterBottom>{bookingData.end.split('#')[1]}</Typography>
                                </div>
                            </div>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '500', marginTop: '2%'}} gutterBottom>
                                Total length of stay:
                            </Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{bookingData.nights} nights</Typography>
                            <Divider style={{marginTop: '10%', height: '2px'}} gutterBottom/>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '500', marginTop: '2%'}} gutterBottom>
                                You've selected:
                            </Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: 'bold', marginTop: '2%'}} gutterBottom>{bookingData.numberOfRooms} x {bookingData.roomName}</Typography>
                            <Typography variant="body2" style={{fontFamily: 'Inter', fontWeight: '400', color: '#2F80ED', marginTop: '2%'}} component={Link} to="/bookings">
                                    Change your selection
                            </Typography>
                        </div>
                        <div className="booking-pricing-card">
                            <h3>Pricing Summary</h3>
                            <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop:'4%' }}>
                                <Typography variant="h5" style={{fontFamily: 'Inter', fontWeight: 'bold'}} gutterBottom>Total:</Typography>
                                <Typography variant="h5" style={{fontFamily: 'Inter', fontWeight: 'bold', color:"#FEBB02"}} gutterBottom>${bookingData.price}</Typography>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookingConfirmation;