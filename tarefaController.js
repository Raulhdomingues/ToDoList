const Tarefa = require('../model/tarefa.js');

const tarefaController = {
  adicionarTarefa: async (req, res) => {
    try {
      const novaTarefa = await Tarefa.create(req.body);
      res.status(201).json(novaTarefa);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = tarefaController;
