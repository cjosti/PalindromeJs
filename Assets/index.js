const deleteAll = document.querySelector("#delete-all");
const tableResult = document.querySelector("#table");
const input = document.querySelector("input");

function handleEnter(event) {
    if (event.which == 13 || event.keyCode == 13) {
        const data = getData();
        if (!data.replace(/\s+/g, ''))
            return;
        createDataTable(data);
        clearInput();
    }
}

function clearInput() {
    input.value = "";
}

function handleDeleteAll(event){
    event.preventDefault();
    const trs= document.querySelectorAll("#table tbody tr");
    trs.forEach((x) => x.remove()); 
}

function getData () {
    return input.value;
}

function createDataTable(frase){
    const tableRow = createTableRow()
    const tableDataFrase = createTableData(frase);
    const palindrome = verifyPalindrome(frase);
    const tableDataPalindromo = createTableData(palindrome ? 'Sim' : 'Não');  
    tableRow.appendChild(tableDataFrase);
    tableRow.appendChild(tableDataPalindromo);
    tableResult.children[1].appendChild(tableRow);
}

function createTableRow(){
    const row = document.createElement('tr');
    return row;
}

function createTableData(str){
    const data = document.createElement("td");
    data.textContent = str;
    if (str === 'Sim' || str === 'Não'){
        const att = createAttribute(str);
        data.setAttributeNode(att);
    }   
    
    return data;
}

function createAttribute(str) {
    const att = document.createAttribute("data-verificado");       
    att.value = str === 'Sim' ? 'positivo' : 'negativo'; 
    return att;
}

function createButton(callback){
    const button = document.createElement('button');
    button.textContent = "Deletar"
    button.onclick = callback
    return button;
}

input.addEventListener("keypress", handleEnter) ;


function verifyPalindrome(str) {
    const regex = /[\W_]/g;
    let lowRemoveStr = str.toLowerCase().replace(regex, '');
    let reverseStr = lowRemoveStr.split('').reverse().join(''); 
    return reverseStr === lowRemoveStr;
}

deleteAll.addEventListener('click', handleDeleteAll);