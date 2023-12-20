const input = document.querySelector('#projectName');
const listaContainer = document.querySelector('#projectList');
const botaoAdicionar = document.querySelector('#adicionar');
const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  //validação para não incluir tarefa já existente (NÃO CONCLUÍDO)
  if(input.value !== '') {
    const itensExistentes = Array.from(listaContainer.querySelectorAll('.textoItem'));
    const valorJaExiste = itensExistentes.some(item => item.textContent === input.value);
    if (valorJaExiste) {
      alert('Este valor já existe na lista!');
    }
    
    try {
      const data = { descricao: input.value };

      await fetch('/api/criar-registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Erro:', error);
      alert('Ocorreu um erro ao salvar a tarefa');
    }

    const novoItem = `<li class="project">
    <span class="textoItem">${input.value}</span>
    <button onclick='editar()'>Editar</button>
    <button onclick='feito()'>Feito</button>
    <button onclick='remover()' class="removeButton">Remover</button>
    </li>`
    
    listaContainer.innerHTML += novoItem;
    
    input.value = '';
  } else {
    alert('Porfavor, insira uma tarefa!')
  }
});



const carregarTarefas = async () => {
  try {
    const response = await fetch('/api/tarefas');
    if (!response.ok) {
      throw new Error('Erro ao buscar as tarefas:', response.status);
    }
    const tarefas = await response.json();
    // // Limpa a lista antes de adicionar os novos itens
    // listaContainer.innerHTML = '';
    
    // Adiciona os itens da lista à interface
    tarefas.forEach(tarefa => {
      const novoItem = `<li class="project" data-id="${tarefa._id}">
        <span class="textoItem">${tarefa.descricao}</span>
        <button onclick='editar()'>Editar</button>
        <button onclick='feito()'>Feito</button>
        <button onclick='remover()' class="removeButton">Remover</button>
      </li>`;
      listaContainer.innerHTML += novoItem;
    });
  } catch (error) {
    console.error('Erro:', error.message);
    alert('Ocorreu um erro ao buscar as tarefas');
  }
};

// Chama a função para carregar as tarefas assim que a página é carregada
document.addEventListener('DOMContentLoaded', carregarTarefas);




function editar() {
  const { value: text } = Swal.fire({
    input: "text",
    inputLabel: "Edição de Tarefa",
    inputPlaceholder: "Digite sua nova tarefa...",
    inputAttributes: {
      "aria-label": "Type your message here"
    },
    showCancelButton: true,
    customClass: {
      container: 'larger-modal'
    }
  });
  if (text) {
    Swal.fire(text);
  }  

  const inputEdicao = document.querySelector('#swal2-input');
  const botaoOK = document.querySelector('.swal2-confirm');

  botaoOK.addEventListener('click', () => {
    if(inputEdicao.value !== '') {
      document.querySelector('.textoItem').textContent = inputEdicao.value;
    }
  })
}

// function remover(event) {
//   const id = event.target.closest('.project').dataset.id;
// }















