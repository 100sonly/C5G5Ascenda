import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './index.css';

const Highlights = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="highlights-box">
        <Typography variant="h6" component="div">
          Highlights
        </Typography>
        <Typography variant="body2" color="textSecondary">
          No ratings available
        </Typography>
      </div>
    );
  }

  return (
    <div className="highlights-box">
      <Typography variant="h6" component="div" style={{ marginBottom: '16px' }}>
        Highlights
      </Typography>
      {ratings.map((rating, index) => (
        <Card key={index} style={{ marginBottom: '8px' }}>
          <CardContent>
            <Typography variant="subtitle1" component="div">
              {rating.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Score: {rating.score}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Highlights;
