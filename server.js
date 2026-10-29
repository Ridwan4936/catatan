require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

app.use('/api/notes', require('./routes/notes'));

// Frontend statis (folder public) dilayani oleh server yang sama
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));
