const input = document.querySelector('#projectName');
const listaContainer = document.querySelector('#projectList');
const botaoAdicionar = document.querySelector('#adicionar');

botaoAdicionar.addEventListener('submit', (e) => {
  if(input.value !== '') {
    const itensExistentes = Array.from(listaContainer.querySelectorAll('.textoItem'));
    const valorInput = input.value.trim();

    const valorJaExiste = itensExistentes.some(item => item.textContent.trim() === valorInput);

    if (valorJaExiste) {
      alert('Este valor já existe na lista!');
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
    e.preventDefault();
    alert('Porfavor, insira uma tarefa!')
  }
});

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




// editButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     const listItem = button.parentElement;
//     const itemText = listItem.querySelector('.item');
//     const newText = prompt('Editar pendência:', itemText.textContent);
//   });
// });






