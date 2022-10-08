//Seleção de elementos
// ----------------------------- FORMULARIOS -------------------------------------------------
const todoForm = document.querySelector('#todo-form');//formulario prinncipal da tarefa
const categoriaForm =document.querySelector('#categoria-form');//formulario para criar nova categoria
const editForm = document.querySelector('#edit-form');//formulario de edição de tarefas


// ----------------------------- INPUTS -------------------------------------------------
const inputTask_Name = document.querySelector('#todo-input');//input como nome da tarefa
const corCategoria = document.querySelector('#color');//input cor da categoria
const editInput = document.querySelector('#edit-input');//input do formulario de edição
const inputCategoria = document.querySelector('#input-categoria');//input nome da categoria



// ----------------------------- BOTÕES -------------------------------------------------
const cancelCategoriaBtn = document.querySelector('#cancel-addCategoria-btn');//botão cancela nova categoria
const btnCreate_Categoria = document.querySelector('#createCategoria');//botão para criar categoria
const btnAdd_categoria = document.querySelector('#btnAddCategoria');//botao para  criar task
const btnCancelEdit = document.querySelector('#cancel-edit-btn');//botão para cancelar edição da tarefa
const newTask_Phone = document.querySelector('#create-task');
const exit_todoForm = document.querySelector('#cancel-task-btn');
const editarTask = document.querySelector('#edit-taskBtn');
// --------------------------------------------------------------------------------------


const categoriaList = document.querySelector('#categoria-select');//categoria selecionada
const todoList = document.querySelector('#todo-list');//elemento para exibir lista de tarefas
// const filtro = document.querySelector('#filtro');
var colorValue;
let oldInputValue;//valor do input - tarefa - antes da edição - variavel no escopo global

 
//=============================================================== FUNÇÕES =================================================

//----------- Função para salvar e add tarefa ------------------------------------------
function saveTodo(texto){

    const categoria = categoriaList.value;
    // const date = dateTask.value;
    // date.toLocaleString('pt-BR',{dateStyle:'short'});
    let date = document.querySelector('#dateTask').value;//input data da tarefa
  


    const  options = document.querySelectorAll('option');
    options.forEach(option =>{
        if(option.value == categoria){
             colorValue = option.getAttribute('id');
            console.log('Sucess');
            console.log(colorValue);
            
        }
    })

    const divH3 = document.createElement("div");
    divH3.classList.add("todo-h3-phone");
    
    //criando layout class todo
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = texto;
    divH3.appendChild(todoTitle);

    if(date !== ""){
        dataTask = dataAtualFormatada(date);
        const todoDate = document.createElement("h3");
        todoDate.innerHTML = dataTask;
        divH3.appendChild(todoDate);
    }
   


     const todoCategoria = document.createElement("h3");
     todoCategoria.style.color = colorValue;
     todoCategoria.setAttribute('id', categoria);
     todoCategoria.innerHTML = categoria;
     divH3.appendChild(todoCategoria);
     todo.appendChild(divH3);

    // botoes
    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<span class="material-icons">done</span>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
    todo.appendChild(deleteBtn);
    //mudar os icones na criação dos botões
   
    todoList.appendChild(todo);

    inputTask_Name.value = "";
    inputTask_Name.focus();
    dateTask.value="";

    todoForm.style.display = 'none'
    
    //volta a focar no input depois de criado a nova tarefa
    // console.log(todo);
}


// -------- Função para mostrar e ocultar formulario de edição de tarefas --------------------------------
function dataAtualFormatada(taskDate){
    if(taskDate !== "" && taskDate !== null && taskDate !== undefined){
        var data = new Date(taskDate),
        dia  = (data.getDate()+1).toString(),
        diaF = (dia.length == 1) ? '0'+dia: dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
    return diaF+"/"+mesF+"/"+anoF;
    }
 
}

// Função para editar tarefa
function updateTodo(texto){
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = texto;
        }

      
    })

}


//-------------- Função para criar nova categoria de tarefa ----------------------------------------------------
function createCategoria(){
    if(!inputCategoria.value ==""){
        const todoCategoria = document.createElement("option");
        todoCategoria.value = inputCategoria.value;
        todoCategoria.innerText = inputCategoria.value;
        todoCategoria.setAttribute('id', corCategoria.value);
        todoCategoria.style.backgroundColor = corCategoria.value;
        console.log(todoCategoria);
        categoriaList.appendChild(todoCategoria);
        inputCategoria.value="";
    }
   
}


//---------- Função para exibir e ocultar formulario de nova categoria -----------------------------------------

//========================================================= = EVENTOS =================================================================

//quando o formulario todoForm for "enviado" chamar função para salvar tarefa
todoForm.addEventListener("submit",(e) =>{
    e.preventDefault();//para nao enviar formulario - recarregar a pagina

    const inputValue = inputTask_Name.value;
  

    if(inputValue !== ""){
        
        saveTodo(inputValue);
    }
   
});


// evento para editar tarefa
editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    //pegando novo nome da tarefa

  
        if(editInputValue){
            updateTodo(editInputValue);
            editForm.style.display = 'none';
        }
        
    
   
});


//
document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    //pega o elemento pai do elemento clicado
    //no caso busca a div mais proxima a de classe todo
    let todoTitle;

    if(parentEl && parentEl.querySelector("h3")){
        //se o elemento pai existir e tiver um h3(titulo)
        todoTitle = parentEl.querySelector("h3").innerText;
    }



//pego o elemento onde ocorreu o evento de click 
//e testo se tem a classe finish-todo
    if(targetEl.classList.contains("finish-todo")){
        // console.log('finalizar');
        parentEl.classList.toggle("done");
        //coloca estilo de finalizada
        // o toggle add se nao tem e remove se ja tem
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        if(categoriaForm.style.display === 'flex' && todoForm.style.display === 'flex'){
            editForm.style.display = 'none';
        }else{
            editForm.style.display = 'flex';
            editInput.value = todoTitle;
            oldInputValue = todoTitle;
            //mostrando e guardando nome atual da tarefa
            updateTodo(editInput.value);
        }
       
    }
});
cancelCategoriaBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    categoriaForm.style.display = 'none';
    inputCategoria.value ="";
})


//evento para cancelar edição e ocultar formulario de edição
btnCancelEdit.addEventListener("click", (e) =>{
    e.preventDefault();

        editForm.style.display = 'none';
    
});


// Chamando função para criar nova categoria
btnCreate_Categoria.addEventListener("click", (e) =>{
    e.preventDefault();

    let categoriaValue = inputCategoria.value;
    if(categoriaValue !== ""){
        createCategoria();

        categoriaForm.style.display = 'none';
    }
   
    
})


btnAdd_categoria.addEventListener("click", (e) =>{
    categoriaForm.style.display = 'flex';
    
})


newTask_Phone.addEventListener("click", (e) =>{
        todoForm.style.display ='flex';
        inputTask_Name.focus();
})
exit_todoForm.addEventListener("click", (e)=>{
    e.preventDefault()
    todoForm.style.display ='none';
})
