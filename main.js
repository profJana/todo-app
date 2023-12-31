var firebaseConfig = {
    apiKey: "AIzaSyCvN-1cBODkvdcaqjsJ5fBdq95nbrOSST0",
    authDomain: "todoapp-e890f.firebaseapp.com",
    databaseURL: "https://todoapp-e890f-default-rtdb.firebaseio.com",
    projectId: "todoapp-e890f",
    storageBucket: "todoapp-e890f.appspot.com",
    messagingSenderId: "439819585602",
    appId: "1:439819585602:web:e17f40c165103ca05405db"
};

// Inicialização do Firebase
firebase.initializeApp(firebaseConfig);

// Referência ao banco de dados
var database = firebase.database();

// Função para adicionar uma nova tarefa
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var task = taskInput.value;

    if (task !== "") {
        // Cria um novo nó no banco de dados para as tarefas
        var newTaskRef = database.ref("tasks").push();
        newTaskRef.set({
            task: task
        });

        // Limpa o campo de entrada
        taskInput.value = "";
    }
}

// Monitora as alterações no banco de dados e atualiza a lista de tarefas
database.ref("tasks").on("value", function (snapshot) { //sempre que houver uma alteração nos dados dessas tasks, a função passada como segundo argumento será executada. A função recebe um objeto snapshot que contém os dados atuais do nó "tasks" no banco de dados.
    var taskList = document.querySelector(".tarefas");
    taskList.innerHTML = ""; //o conteúdo HTML do elemento é limpo (setado como uma string vazia) para garantir que a lista de tarefas esteja vazia antes de atualizá-la.

    snapshot.forEach(function (childSnapshot) { //Essa linha inicia um loop forEach sobre cada filho do nó "tasks" no snapshot. Ele percorre todos os nós filhos, que representam as tarefas armazenadas no banco de dados.
        var task = childSnapshot.val().task; //Essa linha obtém o valor da propriedade "task" do objeto childSnapshot. Cada childSnapshot representa um nó filho, e .val() retorna os dados desse nó como um objeto JavaScript. Aqui, estamos obtendo o valor da propriedade "task" específica de cada tarefa.
        
        var divConteudoTarefas = document.createElement("div");
        divConteudoTarefas.classList.add("conteudoTarefas");

        var divTextoTarefas = document.createElement("div");
        divTextoTarefas.classList.add("textoTarefas");

        var spanTask = document.createElement("span");
        spanTask.appendChild(document.createTextNode(task));

        divTextoTarefas.appendChild(spanTask);

        var divBtExcluirTarefa = document.createElement("div");
        divBtExcluirTarefa.classList.add("btExcluirTarefa");

        var deleteButton = document.createElement("button");
        deleteButton.classList.add("btExcluir");
        deleteButton.setAttribute("onclick", "deleteTask('" + 123 + "')"); //Isso permite identificar qual tarefa deve ser excluída no Firebase quando o botão for clicado.
        deleteButton.appendChild(document.createTextNode("x"));

        divConteudoTarefas.appendChild(divTextoTarefas);
        divBtExcluirTarefa.appendChild(deleteButton);
        divConteudoTarefas.appendChild(divBtExcluirTarefa);

        taskList.appendChild(divConteudoTarefas);
    });
});

function deleteTask(taskKey) {
    database.ref("tasks").child(taskKey).remove();
}