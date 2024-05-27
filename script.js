let Players = {};
let reference = ["attendance.html"];

function searchPlayer(id){
    for (let i = 0; i < data.json; ++i){
        if (data.json[i].players.id() === players.id()) {
            return data.json [i];
        }
    }
    return null;
}

async function getPlayers(){
    console.log('running get Players');
    // let players = null;
    // fetch (data.json)
    let response = await fetch ("data.json");
    console.log(response)
    let data;
    try{
        data = await response.json();
    }
    catch(error){
        console.log("error");
        console.log(error);
    }
    return data;
}

async function searchForPlayer() {

    let players = await getPlayers();
    console.log(players.Players);
    Players = players.Players;
}

function goToWebsite(player) {
    console.log("the user was able to go to the website");
    console.log(player);
    localStorage.setItem('player', JSON.stringify(player));
    window.location.href = 'http://127.0.0.1:5500/attendance.html'
}

async function runProgram(){    
    console.log('running Program');
    await searchForPlayer();
    console.log(Players)

    let myButtonContainer = document.querySelector(".background-img"); 
    
    for (let i = 0; i < Players.length; i++){ //here i made a loop to create the buttons for people to log in and get their attendance
        let player = Players[i];
        console.log(player);
        const nameButtons = document.createElement("a");
        nameButtons.classList.add("btn");
        nameButtons.classList.add("btn-success");
        nameButtons.textContent = player.firstName+" "+player.lastName;
        //console.log("buttons are being made");
        //nameButtons.href= reference;

        nameButtons.addEventListener('click', goToWebsite.bind(this, player));

        myButtonContainer.appendChild(nameButtons);
    }
}
document.addEventListener('DOMContentLoaded', runProgram);