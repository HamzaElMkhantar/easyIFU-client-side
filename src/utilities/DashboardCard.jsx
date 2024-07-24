import React from 'react';
import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import './dasboardCard.css'
import CountUp from 'react-countup'; // Import CountUp component

const DashboardCard = ({ icon, title, count, color, bg }) => {

  return (

    <MuiCard className={`col-md-3 col-sm-6 col-xs-12 mb-2 custom-card ${bg}`} sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h5" component="div" color={color}>
          <CountUp end={count} duration={3} /> 
        </Typography>
        <Typography variant="subtitle1" component="div">
          {title}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ fontSize: '3rem', height: '3rem' }}> {/* Adjust size as needed */}
          {icon}
        </div>
      </CardContent>
    </MuiCard>
  );
};

export default DashboardCard;
