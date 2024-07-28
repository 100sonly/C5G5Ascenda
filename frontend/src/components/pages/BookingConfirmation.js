import React from 'react';
import './BookingConfirmation.css';
import ConfirmationHotelCard from '../ConfirmationHotelCard/index.js';

function BookingConfirmation() {
    const query = new URLSearchParams(document.location.search);

    const hotelName = query.get("name");
    const roomName = query.get("roomName");
    const hotelRating = parseFloat(query.get("rating"));
    const hotelAddress = query.get("address");
    const nights = query.get("nights");
    const price = query.get("price");

    const hotelData = {
        heroImage: "bg.png",
        hotelName: hotelName || "Sample Hotel",
        hotelRating: hotelRating,
        hotelAddress: hotelAddress,
        hotelAmenities: ["Free Wi-Fi", "Parking", "Breakfast Included", "Pool"]
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
                                <p>First Name *</p>
                                <p>Last Name *</p>
                            </div>
                            <div className="name-fields">
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <div className="contact-labels">
                                <p>Phone Number *</p>
                                <p>Email Address *</p>
                            </div>
                            <div className="contact-fields">
                                <input type="text" />
                                <input type="text" />
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
                        <div className="container-payment-details">
                            <h4>Payment Information</h4>
                            <div className="name-labels">
                                <p>Name on card *</p>
                                <p>Credit Card Number *</p>
                            </div>
                            <div className="name-fields">
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <div className="contact-labels">
                                <p>Expiration Date *</p>
                                <p>CVV/CVC *</p>
                            </div>
                            <div className="contact-fields">
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <h4>Billing Address</h4>
                            <div className="name-labels">
                                <p>First Name </p>
                                <p>Last Name </p>
                            </div>
                            <div className="name-fields">
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <div className="contact-labels">
                                <p>Phone Number </p>
                                <p>Email Address </p>
                            </div>
                            <div className="contact-fields">
                                <input type="text" />
                                <input type="text" />
                            </div>
                            <div className="checkbox-container">
                                <input type="checkbox" id="sameAsPersonalInfo" />
                                <label htmlFor="sameAsPersonalInfo">Same as personal information</label>
                            </div>
                            <div className="contact-labels">
                                <p>Country </p>
                                <p>State/Province </p>
                                <p>Postal (ZIP) Code</p>
                            </div>
                            <div className="contact-fields">
                                <input type="text" />
                                <input type="text" />
                                <input type="text" />
                            </div>
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
                                    <p className="date-info">[Check-in Date]</p>
                                    <p className="time-info">[Time]</p>
                                </div>
                                <div className="separator">|</div>
                                <div className="checkout-column">
                                    <p className="section-title">Check-out</p>
                                    <p className="date-info">[Check-out Date]</p>
                                    <p className="time-info">[Time]</p>
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
                    <button
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
