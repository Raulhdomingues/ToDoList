const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  descricao: String,
  feito: Boolean,
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
