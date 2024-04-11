
/*
  --------------------------------------------------------------------------------------
  Função para criar uma conta de acesso
  --------------------------------------------------------------------------------------
*/

function criarConta() {
  // Captura os valores dos campos do formulário
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;
  var confirmarSenha = document.getElementById('confirmar_senha').value;

  // Função para ocultar a mensagem de erro ao clicar no campo de confirmação de senha
  document.getElementById('confirmar_senha').addEventListener('click', function() {
  document.getElementById('erro_senha').style.display = 'none';
});

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
    // Exibe a mensagem de erro
    document.getElementById('erro_senha').style.display = 'block';
    return;
}


  // Cria um objeto para representar a conta
  var conta = {
      nome: nome,
      email: email,
      senha: senha
  };

  // Armazena os dados da conta no localStorage (ou sessionStorage)
  localStorage.setItem('conta', JSON.stringify(conta));

  // Redireciona para a próxima página
  window.location.href = 'login.html';

}

/*
  --------------------------------------------------------------------------------------
  Função para fazer login
  --------------------------------------------------------------------------------------
*/

function login() {
  // Captura os valores dos campos de e-mail e senha
  var email = document.getElementById('email').value;
  var senha = document.getElementById('senha').value;

  // Função para ocultar a mensagem de erro ao clicar no campo de confirmação de senha
  document.getElementById('senha').addEventListener('click', function() {
  document.getElementById('erro_senha').style.display = 'none';
  });

  // Recupera os dados da conta armazenados no localStorage
  var contaArmazenada = localStorage.getItem('conta');

  // Verifica se há uma conta armazenada
  if (contaArmazenada) {
    // Converte os dados da conta para um objeto JavaScript
    var conta = JSON.parse(contaArmazenada);

    // Verifica se o e-mail e a senha correspondem aos da conta armazenada
    if (email === conta.email && senha === conta.senha) {
        // Login bem-sucedido, redireciona para a página de sucesso
        window.location.href = 'home.html';
    } else {
        // Credenciais inválidas, exibe a mensagem de erro
        document.getElementById('erro_senha').style.display = 'block';
    }
  } else {
    // Não há conta armazenada, exibe a mensagem de erro
    document.getElementById('erro_senha').style.display = 'block';
  }
}






















/* ############################################################ */

/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/postagens';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.postagens.forEach(item => insertList(item.nome, item.comentario))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

/*
  --------------------------------------------------------------------------------------
  Função para colocar uma postagem na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (nome, comentario) => {
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('comentario', comentario);

  let url = 'http://127.0.0.1:5000/postagem';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada postagem da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover uma postagem da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar uma postagem da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/postagem?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova postagem com nome e comentario 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputNome = document.getElementById("nome").value;
  let inputComentario = document.getElementById("comentario").value;

  if (inputNome === '') {
    alert("Escreva seu nome!");
  } else if (inputComentario === '') {
    alert("Deixe um comentário sobre o vídeo!");
  } else {
    insertList(inputNome, inputComentario)
    postItem(inputNome, inputComentario)
    alert("Postagem adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (nome, comentario) => {
  var item = [nome, comentario]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("nome").value = "";
  document.getElementById("comentario").value = "";

  removeElement()
}