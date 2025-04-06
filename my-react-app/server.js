import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  try {
    const { type = 'Outdoor', city = 'Vancouver', date = '' } = req.query;
    
    // Construct the query string
    let query = '';
    if (type) {
      query += ` ${type}`;
    }
    query += ` in ${city}`;
    
    // Handle date ranges
    let htichips = '';
    if (date) {
      switch (date) {
        case 'date:today':
          htichips = 'date:today';
          break;
        case 'date:tomorrow':
          htichips = 'date:tomorrow';
          break;
        case 'date:week':
          htichips = 'date:week';
          break;
        case 'date:weekend':
          htichips = 'date:weekend';
          break;
        case 'date:next_week':
          htichips = 'date:next_week';
          break;
        case 'date:month':
          htichips = 'date:month';
          break;
        case 'date:next_month':
          htichips = 'date:next_month';
          break;
        default:
          // If no valid date is selected, don't add anything to the query
          break;
      }
    }

    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_events',
        q: query,
        hl: 'en',
        gl: 'ca',
        htichips: htichips,
        api_key: '0efa7c4fae942e7cec720c24585d719d89e29fda1f210723a7f5255c64cc068c'
      }
    });

    // Validate the response data
    if (!response.data || !response.data.events_results) {
      return res.status(200).json({ events_results: [] });
    }

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 