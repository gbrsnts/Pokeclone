const express = require('express');
const router = express.Router();
const db = require('../config/db');

const DEFAULT_HEIGHT_MIN = 20;   // Mínimo padrão para altura
const DEFAULT_HEIGHT_MAX = 880;  // Máximo padrão para altura
const DEFAULT_WEIGHT_MIN = 0.1;    // Mínimo padrão para peso
const DEFAULT_WEIGHT_MAX = 460;   // Máximo padrão para peso

router.get('/name/:name', async (req, res) => {
    const { name } = req.params;

    try{
        const [results] = await db.execute('SELECT * FROM pokemons WHERE name = ?', [name]);

        if (results.length === 0) {
            return res.status(404).json({ message: 'Pokémon não encontrado.' });
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
});

router.get('/colors', async (req, res) => {

    try{
        const [results] = await db.execute('SELECT DISTINCT(color) FROM pokemons ORDER BY 1 ASC');

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhuma cor foi encontrada.' });
        }

        const colors = results.map(row => row.color);

        res.json(colors);
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
});

router.get('/type1', async (req, res) => {

    try{
        const [results] = await db.execute('SELECT DISTINCT(type1) FROM pokemons ORDER BY 1 ASC');

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum tipo foi encontrado.' });
        }

        const types = results.map(row => row.type1);

        res.json(types);
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
});

router.get('/type2', async (req, res) => {

    try{
        const [results] = await db.execute('SELECT DISTINCT(type2) FROM pokemons ORDER BY 1 ASC');

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum tipo encontrado.' });
        }

        const types = results.map(row => row.type2);

        res.json(types);
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
});

router.get('/habitats', async (req, res) => {

    try{
        const [results] = await db.execute('SELECT DISTINCT(habitat) FROM pokemons ORDER BY 1 ASC');

        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum pokémon foi não encontrado.' });
        }

        const habitats = results.map(row => row.habitat);

        res.json(habitats);
    } catch (err) {
        console.error("Erro ao consultar o banco de dados:", err);
        return res.status(500).json({ error: 'Erro ao consultar o banco de dados.' });
    }
})

router.get('/search', async (req, res) => {
    const { color, habitat, stage, minHeight, maxHeight, minWeight, maxWeight, type1, type2 } = req.query;

    let sql = 'SELECT * FROM pokemons WHERE 1=1';
    const params = [];
    if (color) {
        const colors = color.split(',')
        sql += ` AND color IN (${colors.map(() => '?').join(',')})`
        params.push(...colors)
    }

    if (habitat) {
        const habitats = habitat.split(',')
        sql += ` AND habitat IN (${habitats.map(() => '?').join(',')})`
        params.push(...habitats)
    }
    
    if (stage) {
        const stages = stage.split(',')
        sql += ` AND stage IN (${stages.map(() => '?').join(',')})`
        params.push(...stages)
    }

    sql += ' AND height BETWEEN ? AND ?';
    params.push(minHeight || DEFAULT_HEIGHT_MIN, maxHeight || DEFAULT_HEIGHT_MAX);

    sql += ' AND weight BETWEEN ? AND ?';
    params.push(minWeight || DEFAULT_WEIGHT_MIN, maxWeight || DEFAULT_WEIGHT_MAX);

    if (type1){
        const types = type1.split(',')
        sql += ` AND type1 IN (${types.map(() => '?').join(',')})`
        params.push(...types);
    }

    if (type2){
        const types = type2.split(',')
        sql += ` AND type2 IN (${types.map(() => '?').join(',')})`
        params.push(...types);
    }

    try {
        const [results] = await db.execute(sql, params);
        
        if (results.lenght===0) {
            return res.status(404).json({ message: 'Nenhum Pokémon encontrado com esses critérios.' });
        }

        res.json({
            total: results.length,
            pokemons: results
        });
    } catch (err) {
        console.error("Erro ao consultar o banco de dados: ", err);
        return res.status(500).json({error: 'Erro ao consultar o banco de dados.'});
    }
})

router.post('/sugestao', async (req, res) => {
    const { nome , matricula , sugestao } = req.body

    if (!nome || !sugestao){
        return res.status(400).json({ error: 'Por favor, preencha os campos obrigatórios.'})
    }

    try {
        const [result] = await db.execute(
            'INSERT INTO suggestions (nome, matricula, sugestao) VALUES (?, ?, ?)',
            [nome, matricula, sugestao]
        )

        res.status(201).json({
            message: 'Sugestão adicionada com sucesso!',
            suggestionId: result.insertId
        })
    } catch (err) {
        console.error("Erro ao inserir a sugestão no banco de dados:", err)
        return res.status(500).json({ error: 'Erro ao salvar a sugestão no banco de dados.' })
    }
})

module.exports = router;