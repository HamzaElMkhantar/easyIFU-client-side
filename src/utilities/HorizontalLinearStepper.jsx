import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ["Step1", "Step2", "Step3", "Step4", "Step5", "Step6", "Step7", "Step8"];

export default function ResponsiveStepper({ step }) {
  const activeStep = Math.min(step, steps.length - 1);

  return (
 
    <Box className="container" style={{
        backgroundColor: "#fff",
        padding: "30px 10px 15px 10px",
        borderRadius: "6px",
        color:"#fff",
        width:'100%',
        overflowX: 'scroll'
    }} sx={{ width: '100%' }}>
      <Stepper style={{color:"#fff"}} activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel sx={{color: '#fff'}} ><div style={{color:"#fff !important"}}>{label}</div></StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}