const mongoose = require('mongoose');

const tarefaSchema = new mongoose.Schema({
  descricao: {
    type: String,
    required: true
  },
  feito: {
    type: Boolean,
    default: false
  }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

module.exports = Tarefa;
