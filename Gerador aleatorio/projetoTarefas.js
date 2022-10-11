const btn_Gerar = document.querySelector('#btnGerar');
const btn_Reset = document.querySelector('#btnReset');
const lista = document.querySelector('#list');
const btnCopy = document.querySelector('#btnCopy');
var arrayJogos =[];
var jogo = [];

function addElements(){
    var numeros = document.querySelector('#numbers');

    numeros = numeros.value.split(",");
    arrayJogos.forEach((jogo) => {
        var todo = document.createElement('div');
        todo.classList.add('jogo');
    

        jogo.forEach((num)=>{
    
            if(numeros.includes(num)){
                var h3 = document.createElement('h3');
                h3.classList.add('numbers');
                h3.innerText = num+",";
                todo.appendChild(h3);
            }else{
                var h3 = document.createElement('h3');
                h3.innerText = num +",";
                todo.appendChild(h3);
            }
        })
    
         lista.appendChild(todo);
    });
    arrayJogos = [];
 
}
function generate(){
    var min = document.querySelector('#min');
    var max = document.querySelector('#max');
    var quantidade = document.querySelector('#quantJogos');
    var numeros = document.querySelector('#numbers');

    numeros = numeros.value.split(",");
    var z = 0;
    if(quantidade.value === ""){
        alert('Insira a quantidade de jogos!')
    }else{
        if(numeros.value === ""){
            for(i=0; i< quantidade.value; i++){
                for(y=0; y<15; y++){
                    let num =  Math.floor(Math.random() * (max.value - min.value) + min.value);
                    jogo.push(num);
                } 
          
                if(jogo.length < 15){
                    let diferenca = 15 - jogo.length;

                    for(x=1; x<= (diferenca); x++){
                        jogo.push(Math.floor(Math.random() * (max.value - min.value) + min.value));
                    }    
                }
      
                jogo = jogo.filter(Boolean);
                arrayJogos.push(jogo);
                jogo = [];
             
            }
        }else{
            for(i=0; i< quantidade.value; i++){
                   
                for(y=0; y<14; y++){
                    let num =  Math.floor(Math.random() * (max.value - min.value) + min.value);
                    jogo.push(num);
                } 
              
                jogo = jogo.filter(Boolean);        
                jogo.splice(z, 0, numeros[z]); 
        
                if(jogo.length < 15){
                    let diferenca = 15 - jogo.length;
                    for(x=1; x<= (diferenca); x++){
                        jogo.push(Math.floor(Math.random() * (max.value - min.value) + min.value));
                    }    
                }
                arrayJogos.push(jogo);
                jogo = [];
                
               
                if(z === numeros.length-1){
                    z = 0;
                }else{
                    z++;
                }
               
               
            }
         
            
    
        }
        addElements();
    }

   
    
    
}


btn_Gerar.addEventListener("click", (e)=>{
    e.preventDefault();

    generate();
})

btn_Reset.addEventListener("click", (e)=>{
    quantidade = 0;
    arrayJogos = [];
})

