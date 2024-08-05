import React from 'react';
import { Card, Typography } from '@mui/material';
import './index.css';

const getScoreColor = (score) => {
  if (score >= 80) return '#229935';
  if (score >= 60) return '#f0ad4e'; 
  return '#d9534f'; 
};

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
      <div className="highlight-grid">
        {ratings.map((rating, index) => (
          <div key={index} className="highlight-item">
            <div
              className="score-box"
              style={{ backgroundColor: getScoreColor(rating.score) }}
            >
              {rating.score}
            </div>
            <div>
              <Typography variant="subtitle1" style={{ fontFamily: 'Inter' }} component="div">
                {rating.name}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default Highlights;
