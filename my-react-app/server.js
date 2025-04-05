import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/api/events', async (req, res) => {
  try {
    const response = await axios.get('https://serpapi.com/search.json', {
      params: {
        engine: 'google_events',
        q: 'Outdoors Events in Vancouver',
        hl: 'en',
        gl: 'ca',
        api_key: '0efa7c4fae942e7cec720c24585d719d89e29fda1f210723a7f5255c64cc068c'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 