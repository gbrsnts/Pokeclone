const express = require('express');
const app = express();
const cors = require('cors');
const pokemonRoutes = require('./routes/pokemon');

app.use(cors());

app.use(express.json());

app.use('/api/pokemon', pokemonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
