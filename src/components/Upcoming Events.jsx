import React, { useState, useEffect } from 'react';
import { Card, CardContent, List, ListItem, ListItemText, useTheme } from '@mui/material';
import { tokens } from '../theme';
import axios from 'axios'; // Import Axios
import databaseURL from 'database_url';

function EventsList() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const fetchEvents = () => {
    axios
      .get(`${databaseURL}/calendar/calendar`)
      .then((response) => {
        // Filter out events that are past the current date
        const filteredEvents = response.data.filter((event) => new Date(event.date) >= new Date());
        // Assuming the response data is an array, you can sort it by date
        const sortedEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        setCurrentEvents(sortedEvents);
      })
      .catch((error) => {
        console.error('Error fetching events data:', error);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Card sx={{ backgroundColor: colors.blueAccent[900], height: 400 }}>
      <CardContent>
        <List>
          {currentEvents.map((event) => (
            <ListItem key={event.id}>
              <ListItemText primary={event.title} secondary={`Date: ${event.date}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

export default EventsList;
