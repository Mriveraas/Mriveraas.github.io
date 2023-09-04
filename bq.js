const express = require('express');
const {BigQuery} = require('@google-cloud/bigquery');
const path = require('path');

const app = express();
const bigquery = new BigQuery();

app.get('/getBeneficiosData', async (req, res) => {
    const query = `
    SELECT *
    FROM BBSS_MRIVERAS.BENEFICIOS2023
    `;

    const options = {
        query: query,
        location: 'US',
    };

    let data = [];
    try {
        const [rows] = await bigquery.query(options);
        data = rows;
    } catch (error) {
        console.error('Error executing BigQuery', error);
    }

    res.json(data);
});

// Sirve el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
