const express = require('express');
const app = express();

app.get('/getBeneficiosData', (req, res) => {
    // Datos ficticios
    let data = [
        { latitud: -33.45, longitud: -70.65, S_persona: 12 }, // Santiago, Caja Escolar
        { latitud: -33.43, longitud: -70.62, S_persona: 6 },  // Santiago, Primera Caja
        { latitud: -33.42, longitud: -70.63, S_persona: 10 }, // Santiago, PSP Farmacias
        { latitud: -33.44, longitud: -70.64, S_persona: 7 },  // Santiago, Bodas de Plata
        { latitud: -33.44, longitud: -70.66, S_persona: 20 }, // Santiago, Beneficio Dental60
        { latitud: -41.1374, longitud: -73.1449, S_persona: 12 }, // Frutillar, Caja Escolar
        { latitud: -38.7362, longitud: -72.5904, S_persona: 20 }, // Temuco, Beneficio Dental60
    ];

    res.json(data);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
