import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

// MUI Components
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TimelineIcon from '@mui/icons-material/Timeline';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const SimpleBottomNavigation = () => {
  const [value, setValue] = useState(2);

  useEffect(() => {
    // Add padding to the bottom of the body to prevent content from being covered by the fixed BottomNavigation
    document.body.style.paddingBottom = '60px'; // Adjust the padding as needed
    return () => {
      // Reset padding when the component unmounts
      document.body.style.paddingBottom = 0;
    };
  }, []);

  return (
    <Box sx={{
        width: '100%',
        position: "fixed", 
        bottom: 0, 
        zIndex: 100
      }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{ paddingY: '10px'}}
      >
        <BottomNavigationAction 
            label="Progress" 
            icon={<TimelineIcon />}
            to="/progress" 
            LinkComponent={Link}
        />
        <BottomNavigationAction 
            label="History" 
            icon={<HistoryIcon />}
            to="/history" 
            LinkComponent={Link}
        />
        <BottomNavigationAction 
            label="Create" 
            icon={<AddIcon />}
            to="/create" 
            LinkComponent={Link}
        />
        <BottomNavigationAction 
            label="Excercises" 
            icon={<FitnessCenterIcon />} 
            to="/excercises" 
            LinkComponent={Link}
        />
      </BottomNavigation>
    </Box>
  );
}

export default SimpleBottomNavigation