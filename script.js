
/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getLista = async () => {
  let url = 'http://127.0.0.1:5000/agendamentos';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.agendamentos.forEach(item => insertLista(item.nome, item.email, item.barbeiro_corte,
        item.data_corte, item.horario_corte, item.tipo_corte, item.valor_corte, ))
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
getLista()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um agendamento na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postitem = async (barbeiro_corte, data_corte, horario_corte, tipo_corte, valor_corte) => {
  const formData = new FormData();
  formData.append('barbeiro_corte', barbeiro_corte);
  formData.append('data_corte', data_corte);
  formData.append('horario_corte', horario_corte);
  formData.append('tipo_corte', tipo_corte);
  formData.append('valor_corte', valor_corte);
  

  let url = 'http://127.0.0.1:5000/agendamento';
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
  Função para criar um botão close para cada agendamento da lista
  --------------------------------------------------------------------------------------
*/
const insertbotao = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um agendamento da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElemento = () => {
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
const deleteitem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/agendamento?nome=' + item;
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
  Função para adicionar um novo agendamento 
  --------------------------------------------------------------------------------------
*/
const newitem = () => {
  let inputBarbeiroCorte = document.getElementById("barbeiro_corte").value;
  let inputDataCorte = document.getElementById("data_corte").value;
  let inputHorarioCorte = document.getElementById("horario_corte").value;
  let inputTipoCorte = document.getElementById("tipo_corte").value;
  let inputValorCorte = document.getElementById("valor_corte").value;

  if (inputBarbeiroCorte === '') {
    alert("Escolha seu barbeiro!");
  } else if (inputDataCorte === '') {
    alert("Escolha a data do corte!");
  } else if (inputHorarioCorte === '') {
    alert("Escolha o horário do corte!");
  } else if (inputTipoCorte === '') {
    alert("Escolha o tipo do corte!");
  
  } else {
    insertLista(inputBarbeiroCorte, inputDataCorte, inputHorarioCorte, inputTipoCorte, inputValorCorte)
    postitem(inputBarbeiroCorte, inputDataCorte, inputHorarioCorte, inputTipoCorte, inputValorCorte)
    alert("Postagem adicionada!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertLista = (barbeiro_corte, data_corte, horario_corte, tipo_corte, valor_corte) => {
  var item = [barbeiro_corte, data_corte, horario_corte, tipo_corte, valor_corte]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertbotao(row.insertCell(-1))
  document.getElementById("barbeiro_corte").value = "";
  document.getElementById("data_corte").value = "";
  document.getElementById("horario_corte").value = "";
  document.getElementById("tipo_corte").value = "";
  document.getElementById("valor_corte").value = "";
   

  removeElement()
}

/*
  --------------------------------------------------------------------------------------
  F#########################################################################
  --------------------------------------------------------------------------------------
*/

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
  window.location.href = 'index.html';

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



/*
  --------------------------------------------------------------------------------------
  Função para página agendamento
  --------------------------------------------------------------------------------------
*/
$(document).ready(function() {
  // Horários disponíveis (intervalo de 30 minutos)
  var times = [];
  for (var i = 9; i <= 17; i++) {
    times.push(i + ":00");
    times.push(i + ":30");
  }
  
  // Preenche o dropdown de horários
  var horario_corte = $("#horario_corte");
  $.each(times, function(index, value) {
    horario_corte.append($("<option></option>").attr("value", value).text(value));
  });
  
  // Atualiza os horários disponíveis quando a data é alterada
  $("#data_corte").change(function() {
    // Lógica para verificar a disponibilidade de horários na data selecionada
  });
  
  // Lógica para agendar o corte quando o botão é clicado
  $("#submitBtn").click(function() {
    var selectedDate = $("#data_corte").val();
    var selectedTime = $("#horario_corte").val();
    var selectedHaircutType = $("#tipo_corte").val();
    // Lógica para enviar os dados do agendamento para o servidor
    console.log("Data selecionada:", selectedDate);
    console.log("Horário selecionado:", selectedTime);
    console.log("Tipo de corte selecionado:", selectedHaircutType);
  });

  // Para pegar o valor do serviço automaticamente
  const prices = {
    0: 50, // 
    1: 70, // Corte Tradicional
    2: 20, // Barba
    3: 90, // Corte e Barba
    // Adicione mais preços conforme necessário
  };

  // Selecione o elemento do tipo de corte
  const selectHaircutType = document.getElementById('tipo_corte');
  // Selecione o elemento do valor do corte
  const inputHaircutPrice = document.getElementById('valor_corte');

  // Adicione um evento de mudança ao tipo de corte
  selectHaircutType.addEventListener('change', () => {
    const selectedValue = selectHaircutType.value;
    const price = prices[selectedValue];
    inputHaircutPrice.value = `R$ ${price.toFixed(2)}`; // Exibe o valor formatado
  });

});

/*
  --------------------------------------------------------------------------------------
  Função para criar agendamento
  --------------------------------------------------------------------------------------
*/

function criarAgendamento() {
  // Captura os valores dos campos do formulário
  var activeItem = document.querySelector('#barbersCarousel .carousel-item.active img');
  var barbeiro_corte = activeItem.getAttribute('data-nome');

  var data_corte = document.getElementById('data_corte').value;

  var horario_corte = document.getElementById('horario_corte').value;

  var tipo_corte = document.getElementById('tipo_corte').value;

  var valor_corte = document.getElementById('valor_corte').value;

  // Define o texto correspondente ao tipo de corte com base no valor selecionado
  switch (tipo_corte) {
    case '0':
      tipo_corte = "Corte Máquina";
      break;
    case '1':
      tipo_corte = "Corte Tesoura";
      break;
    case '2':
      tipo_corte = "Barba";
      break;
    case '3':
      tipo_corte = "Corte e Barba";
      break;
    default:
      tipo_corte = "Tipo de corte não especificado";
      break;
  }

  // Cria um objeto para representar o agendamento
  var agendamento = {
      barbeiro_corte: barbeiro_corte,
      data_corte: data_corte,
      horario_corte: horario_corte,
      tipo_corte: tipo_corte,
      valor_corte: valor_corte
  };

  // Armazena os dados do agendamento no localStorage (ou sessionStorage)
  localStorage.setItem('agendamento', JSON.stringify(agendamento));

  // Redireciona para a próxima página
  window.location.href = 'confirmar_agendamento.html';

}


/*
  --------------------------------------------------------------------------------------
  Função para excluir agendamento
  --------------------------------------------------------------------------------------
*/

function excluirAgendamento() {
  localStorage.removeItem('agendamento');  // Supõe que 'conta' é a chave usada para armazenar o agendamento
  alert('Agendamento excluído com sucesso!');
  window.location.href = 'home.html';  // Redireciona para a página inicial
}


/*
  --------------------------------------------------------------------------------------
  Função para concluir agendamento
  --------------------------------------------------------------------------------------
*/

function concluirAgendamento() {
  let agendamento = JSON.parse(localStorage.getItem('agendamento'));
  if (agendamento) {
      agendamento.status = 'Concluído';
      localStorage.setItem('agendamento', JSON.stringify(agendamento));

      // Atualizando o elemento de mensagem no HTML
      document.getElementById('mensagemStatus').innerHTML = '<strong>Agendamento concluído com sucesso!</strong>';
      document.getElementById('mensagemStatus').style.color = 'green'; // Opcional: mudar a cor do texto
  } else {
      document.getElementById('mensagemStatus').innerHTML = '<strong>Nenhum agendamento encontrado.</strong>';
      document.getElementById('mensagemStatus').style.color = 'red'; // Opcional: mudar a cor do texto
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