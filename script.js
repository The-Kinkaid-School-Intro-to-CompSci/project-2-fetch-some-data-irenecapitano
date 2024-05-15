const members;

function runProgram(){

    console.log('runProgram');
    //your code goes here
}

async fuction getPlayers(){
    let response = await fetch("data.json");
    console.log(response);
    let data = response.json();
}
document.addEventListener('DOMContentLoaded', runProgram);