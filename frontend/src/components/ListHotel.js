// import React from 'react';
// import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
// import './ListHotel.css';
// import { AiFillEnvironment } from 'react-icons/ai';

// function ListHotel() {
//   const hotels = [
//     {
//       id: 1,
//       name: 'The Fullerton Hotel Singapore',
//       rating: 4.5,
//       reviews: 543,
//       price: 380,
//       imageUrl: '/placeholder.jpg',
//       location: 'Singapore',
//       description: 'Descriptive details about the hotel may include the amenities.',
//     },{
//       id: 2,
//       name: 'Marina Bay Sands',
//       rating: 4.5,
//       reviews: 543,
//       price: 380,
//       imageUrl: '/placeholder.jpg',
//       location: 'Singapore',
//       description: 'Descriptive details about the hotel may include the amenities.',
//     },{
//       id: 3,
//       name: 'Hotel 81',
//       rating: 3.1,
//       reviews: 183,
//       price: 85,
//       imageUrl: '/placeholder.jpg',
//       location: 'Singapore',
//       description: 'Descriptive details about the hotel may include the amenities.',
//     },
//   ];

//   return (
//     <div className="list-hotel-container">
//       {hotels.map((hotel) => (
//         <Card key={hotel.id} className="hotel-card">
          
//           <CardMedia
//             component="img"
//             height="200"
//             image={hotel.imageUrl}
//             alt={hotel.name}
//             className="hotel-image"
//           />

//           <CardContent>
//             <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
//               {hotel.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
//               <AiFillEnvironment /> {hotel.location}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
//               {hotel.description}
//             </Typography>
//             <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02'}}>
//               {hotel.price} SGD <small>Taxes incl.</small>
//             </Typography>
//           </CardContent>
          
//           <CardActions>
//             <Button size="small" color="primary" variant="contained" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
//               Select
//             </Button>
//           </CardActions>
//         </Card>
//       ))}
//     </div>
//   );
// }

// export default ListHotel;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import { AiFillEnvironment } from 'react-icons/ai';
import './ListHotel.css';

function ListHotel({ filter }) {
  const [filteredHotels, setFilteredHotels] = useState([]);

  const hotels = [
    {
      id: 1,
      name: 'The Fullerton Hotel Singapore',
      rating: 4.5,
      reviews: 543,
      price: 380,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
    {
      id: 2,
      name: 'Marina Bay Sands',
      rating: 4.5,
      reviews: 543,
      price: 380,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
    {
      id: 3,
      name: 'Hotel 81',
      rating: 3.1,
      reviews: 183,
      price: 85,
      imageUrl: '/placeholder.jpg',
      location: 'Singapore',
      description: 'Descriptive details about the hotel may include the amenities.',
    },
  ];

  useEffect(() => {
    if (filter && filter.length === 0) {
      setFilteredHotels(hotels);
    } else {
      const filtered = hotels.filter(hotel =>
        filter.some(range => hotel.price >= range.min && hotel.price <= range.max)
      );
      setFilteredHotels(filtered);
    }
  }, [filter]);

  return (
    <div className="list-hotel-container">
      {filteredHotels.map((hotel) => (
        <Card key={hotel.id} className="hotel-card">
          <CardMedia
            component="img"
            height="200"
            image={hotel.imageUrl}
            alt={hotel.name}
            className="hotel-image"
          />
          <CardContent>
            <Typography variant="h5" component="div" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
              {hotel.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
              <AiFillEnvironment /> {hotel.location}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'Inter'}}>
              {hotel.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" style={{ fontWeight: 'bold', fontFamily: 'Inter', color: '#FEBB02'}}>
              {hotel.price} SGD <small>Taxes incl.</small>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="contained" style={{ fontWeight: 'bold', fontFamily: 'Inter' }}>
              Select
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}

export default ListHotel;