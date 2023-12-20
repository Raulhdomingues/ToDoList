const express = require('express');
const mongoose = require('mongoose');
const tarefaController = require('./controllers/tarefaController.js');
const Tarefa = require('./model/tarefa');
//require('dotenv').config();

const app = express();

app.use(express.static('view'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 5000;

app.listen(PORT, () => {
    console.log('Conectado ao servidor!');
})

mongoose.connect(`mongodb+srv://raulhdomingues:BXc6Irdktuy2BapR@to-do-list-work.vnvbiaa.mongodb.net/?retryWrites=true&w=majority`)
.then(console.log('Conectado ao Mongo'));


//Rotas'
app.get('/api/tarefas', async (req, res) => {
    try {
        const tarefas = await Tarefa.find();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).send('Ocorreu um erro ao buscar as tarefas');
    }
});

app.post('/api/criar-registro', async (req, res) => {
    try {
        const descricao = req.body;

        const novaTarefa = new Tarefa(descricao);
        await novaTarefa.save();
        res.status(200).send('Tarefa cadastrada com sucesso');
    } catch (error) {
        res.status(500).send('Ocorreu um erro ao salvar os dados');
    }
})

// app.delete('/api/remover-registro', async (req, res) => {
//     try {

//     }
// })
