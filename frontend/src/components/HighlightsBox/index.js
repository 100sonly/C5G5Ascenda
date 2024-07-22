import React from 'react';
import { Card, Typography } from '@mui/material';
import './index.css';

const Highlights = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <Card className="highlights-box">
        <Typography variant="h6" component="div" style={{ fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '16px' }}>
          Highlights
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No ratings available
        </Typography>
      </Card>
    );
  }

  return (
    <Card className="highlights-box">
      <Typography variant="h6" component="div" style={{ fontFamily: 'Inter', fontWeight: 'bold', marginBottom: '16px' }}>
        Highlights
      </Typography>
      {ratings.map((rating, index) => (
        <div key={index} className="highlight-item">
          <Typography variant="subtitle1" component="div">
            {rating.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Score: {rating.score}
          </Typography>
        </div>
      ))}
    </Card>
  );
};

export default Highlights;
