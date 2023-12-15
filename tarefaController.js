const Tarefa = require('../model/tarefa');

exports.adicionarTarefa = async (req, res) => {
    const { descricao } = req.body;
  
    try {
      const novaTarefa = new Tarefa({ descricao });
      await novaTarefa.save();
      res.status(201).json(novaTarefa);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };