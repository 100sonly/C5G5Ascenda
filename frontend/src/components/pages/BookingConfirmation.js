import React from 'react';
import '../../App.css';


function BookingConfirmation() {
    const query = new URLSearchParams(document.location.search);

    const hotelName=query.get("name");
    const roomName=query.get("roomName");
    //check url or hotelinformation.js for param fields
    return (
        <>
            <h1 className='bookingConfirmation' style={{color: '#282c34'}}>Page 4 here</h1>
            <div>
                {hotelName}
            </div>
            <div>
                {roomName}
            </div>
        </>
    );
}

export default BookingConfirmation;