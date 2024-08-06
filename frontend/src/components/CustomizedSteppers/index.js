import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import HotelIcon from '@mui/icons-material/HotelRounded';
import InfoIcon from '@mui/icons-material/InfoRounded';
import PaymentIcon from '@mui/icons-material/PaymentRounded';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

// Custom connector for the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      animation: 'fill 1.7s forwards',
      backgroundImage: 'linear-gradient(95deg, #1a1e43 0%, #2b2f5c 50%, #3c459b 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: 'linear-gradient(95deg, #1a1e43 0%, #2b2f5c 50%, #3c459b 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

// Keyframes for progress bar animation
const keyframes = `
  @keyframes fill {
    from { width: 0; }
    to { width: 100%; }
  }
`;

// Inject keyframes into the document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = keyframes;
document.head.appendChild(styleSheet);

// Custom step icon for the stepper
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  position: 'relative',
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient(136deg, #1a1e43 0%, #2b2f5c 50%, #3c3f7b 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient(136deg, #1a1e43 0%, #2b2f5c 50%, #3c3f7b 100%)',
  }),
  ...(ownerState.next && {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[600] : '#e0e0e0',
    color: theme.palette.mode === 'dark' ? theme.palette.grey[400] : '#9e9e9e',
  }),
  '& svg': {
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeDasharray: '100',
    strokeDashoffset: '100',
    animation: 'trace 1s forwards',
  },
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const stepIcons = {
    1: <HotelIcon />,
    2: <InfoIcon />,
    3: <PaymentIcon />,
  };

  // Determine if the step is the next one
  const isNext = !active && !completed && props.icon === (props.index + 1);

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, next: isNext }} className={className}>
      {completed ? <Check /> : stepIcons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.number.isRequired,
};

// Steps labels
const steps = ['Your Selection', 'Your Details', 'Make Payment'];

// Main component for the customized steppers
export default function CustomizedSteppers({ activeStep }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label, index) => (
          <Step key={label} completed={activeStep > index}>
            <StepLabel StepIconComponent={(props) => <ColorlibStepIcon {...props} icon={index + 1} index={index} />}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}

CustomizedSteppers.propTypes = {
  activeStep: PropTypes.number.isRequired,
};
