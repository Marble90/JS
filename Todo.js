// select elements
const addButton = document.querySelector('.addButton');
var inputValue = document.querySelector('.input');
const container = document.querySelector('.container');
const dateElement = document.getElementById("date");
const btnClear = document.querySelector('.btnClear');
const btnSave = document.querySelector('.btnSave');
var idDiff = 0;

//classes names
// const UNCHECK = "fa fa-circle-thin";
// const CHECK = "fa fa-check-circle";
// const LINE_THROUGH = "lineThrough"


const today = new Date();
const options = { weekday: "long", year: "numeric", month: "short",  
day: "numeric" }; 
date.innerHTML = today.toLocaleDateString("en-US", options);

class item {
    constructor(itemName, itemBool){
        //create the item div
        this.createDiv(itemName, itemBool);
    }
    createDiv (itemName, itemBool){
        let input = document.createElement('input');
        idDiff++
        let idDifference = idDiff.toString()
        input.id = "todoItem" + idDifference
        input.value = itemName;
        input.diff = idDiff
        input.disabled = true;
        input.classList = 'item_input';
        input.type = 'text';

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        var checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        checkBox.checked = undefined;
    
        if (itemBool) {
            checkBox.done = itemBool;
            checkBox.checked = itemBool;
        } else {
            checkBox.done = false;
            checkBox.checked = false;
        }
        
        checkBox.classList.add('mycheckbox');

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE"
        removeButton.classList.add('removeButton');

        itemBox.appendChild(checkBox); // beginning
        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(removeButton);

        if (itemBool){
        checkBox.parentNode.children[1].style.textDecoration = "line-through"
        checkBox.checked = true
    }
        
        

        editButton.addEventListener('click' , () => this.edit(input));
        removeButton.addEventListener('click' , () => this.remove(itemBox));
        checkBox.addEventListener('click' , () => this.completeTask(checkBox));

    }

    edit (input){
        input.disabled = !input.disabled;
    }

    remove(input){
        container.removeChild(input);
    }

    completeTask(checkBox){
        let parentItem = checkBox.parentNode
        let inputItem = parentItem.children[1]


        //const LINE = checkBox.done ? LINE_THROUGH : "";
        const DONE =  checkBox.done ? false : true;
        // checkBox.classList.toggle('CHECK');
        // checkBox.classList.toggle('UNCHECK');

        if (DONE) {
            inputItem.style.textDecoration = "line-through";
        } else {
            inputItem.style.textDecoration = "none";
        }
        checkBox.done = !checkBox.done
         
    }

  

}

// new item('Learn JS');

addButton.addEventListener('click', check);



function check(){
    if(inputValue.value == "")
    alert("please fill in the blanks");

    if(inputValue.value != ""){
    new item(inputValue.value);
    inputValue.value = "";
      }
}

btnClear.addEventListener('click', removeAll);

function removeAll(){
    container.innerHTML = "";
}

btnSave.addEventListener('click', saveAll);

function saveAll(){
    let cnt = container.childElementCount
    let toDos = {}
    for (i = 0; i < cnt; i++) {
        done_in = document.getElementsByClassName("mycheckbox")[i].done;
        value_in = document.getElementsByClassName("item_input")[i].value ;
        
        toDos[i] = {value_in,done_in};
        console.log(toDos)
      }

      var str = JSON.stringify(toDos);
      localStorage.setItem("toDos", str)
}

function getAll(){
    var str = localStorage.getItem("toDos");
    toDos = JSON.parse(str)

    if (!toDos)
    toDos = [];
    console.log(toDos)
    for (i in toDos){
    // document.getElementsByClassName("item_input").value = toDos[i].value_in
    // document.getElementsByClassName("mycheckbox").done = toDos[i].done_in
    new item (toDos[i].value_in, toDos[i].done_in)
    }
}

getAll();



