function insertToDisplay (data){
//document.getElementById('display').value = data;
document.querySelector('#display').value += data;

}

function limparDisplay (){
document.querySelector('#display').value = '';
}
function apagarUm (){
   let display = document.querySelector('#display')
   display.value = display.value.slice (0, -1);

}
function result(){
     let display = document.querySelector('#display')
     try{
        display.value = eval(display.value);
        } catch {
            display.value = 'Erro'
}
}