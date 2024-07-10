import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

const FavoriteCitiesAccordion = ({ favorites, removeFavorite }) => {
  return (
    <div className="flex justify-center items-center">
      <Accordion sx={{ maxWidth: 450, width: '100%' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Favorite Cities</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {favorites.map((city) => (
            <div className="flex justify-between items-center py-2" key={city}>
              <span>{city}</span>
              <Button variant="contained" color="secondary" onClick={() => removeFavorite(city)}>
                Remove
              </Button>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FavoriteCitiesAccordion;
