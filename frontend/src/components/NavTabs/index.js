import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function samePageLinkNavigation(event) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

function LinkTab(props) {
  const handleClick = (event) => {
    if (samePageLinkNavigation(event)) {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <Tab
      component="a"
      onClick={handleClick}
      aria-current={props.selected && 'page'}
      {...props}
      sx={{ 
        textTransform: 'none', 
        fontWeight: 'bold', 
        color: 'gray', 
        fontFamily: 'Inter, sans-serif !important', 
        fontSize: '16px !important', 
        '&.Mui-selected': { 
          color: 'primary.main', 
        },
        '&:hover': {
          color: 'primary.main',
        }
      }}
    />
  );
}

LinkTab.propTypes = {
  selected: PropTypes.bool,
};

export default function NavTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' && samePageLinkNavigation(event))
    ) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
        role="navigation"
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
          },
          fontFamily: 'Inter, sans-serif', 
          fontSize: '16px', 
          '& .MuiTab-root': {
            fontFamily: 'Inter, sans-serif !important', 
            fontSize: '16px !important', 
          },
        }}
      >
        <LinkTab label="Overview" href="#overview" />
        <LinkTab label="Amenities" href="#amenities" />
        <LinkTab label="Rooms" href="#rooms" />
        <LinkTab label="Location" href="#location" />
      </Tabs>
    </Box>
  );
}
