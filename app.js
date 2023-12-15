const express = require('express');
const mongoose = require('mongoose');
const tarefaController = require('./controllers/tarefaController');
const Tarefa = require('./model/tarefa');
require('dotenv').config();

const app = express();

app.use(express.static('view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect(`mongodb+srv://raulhdomingues:fVtzfR1MdbZHnTSJ@cluster0.oplbk5c.mongodb.net/?retryWrites=true&w=majority`)
.then(console.log('Conectado ao Mongo'));


//Rotas'
app.get('/api/recuperar-registros', (req, res) => {
    res.status(200).send('deu bom');
})

app.post('/api/criar-registro', async (req, res) => {
    try {
        const novaTarefa = new Tarefa({
            descricao: req.body.descricao,
            feito: req.body.feito,
        });
        await novaTarefa.save();
        res.status(200).send('Tarefa salva com sucesso');
    } catch (error) {
        console.error('Erro ao salvar os dados', error);
        res.status(500).send('Ocorreu um erro ao salvar os dados');
    }
})

//iniciando o servidor...
const PORT = 5000;

app.listen(PORT, () => {
    console.log('Conectado ao servidor!');
})
