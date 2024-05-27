let Players = {};

async function getPlayers() { //get the players from my json 
    console.log('running get Players');
    let response = await fetch("data.json");
    console.log(response);
    let data;
    try {
        data = await response.json();
    } catch (error) {
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

async function runProgram() {
    console.log('running Program');
    await searchForPlayer();
    console.log(Players);

    let retrievedObject = localStorage.getItem('player');
    console.log('retrievedObject:', retrievedObject);

    //here i Mr. A and I did this thing to parse the json so that we could connect it to local storage
    if (retrievedObject) {
        retrievedObject = JSON.parse(retrievedObject);
    }

    //making myWelcomeContainer in order to contain a message sayin this person logged in
    let myWelcomeContainer = document.querySelector(".heading");

    //create the welcome heading element
    const welcomeHeading = document.createElement("h1");
    welcomeHeading.style.color = "lightblue";
    welcomeHeading.style.fontSize = "30px";
    welcomeHeading.style.padding = "30px";

    //set the welcome message based on retrievedObject
    if (retrievedObject && retrievedObject.firstName && retrievedObject.lastName) {
        welcomeHeading.textContent = "Welcome " + retrievedObject.firstName + " " + retrievedObject.lastName;
    } else {
        welcomeHeading.textContent = "Welcome HITS Team Member";
    }

    myWelcomeContainer.appendChild(welcomeHeading);

    //creating the input so that the user can put the date they were at practice
    const dateInput = document.createElement("input");
    dateInput.setAttribute("type", "date");
    dateInput.id = "attendance-date";
    myWelcomeContainer.appendChild(dateInput);

    //creating an additional text area that the user can add an extra note if they need to let the coaches know something
    const noteTextarea = document.createElement("textarea");
    noteTextarea.setAttribute("placeholder", "Add a note (optional)");
    noteTextarea.id = "attendance-note";
    noteTextarea.style.width = "100%";
    noteTextarea.style.height = "100px";
    noteTextarea.style.marginTop = "10px";
    myWelcomeContainer.appendChild(noteTextarea);

    //here is my button so that the users can save when they practiced into local storage
    const storeAttendanceButton = document.createElement("button");
    storeAttendanceButton.textContent = "Submit Attendance";
    storeAttendanceButton.classList.add("btn");
    storeAttendanceButton.classList.add("btn-success");
    storeAttendanceButton.onclick = storeAttendanceInLocalStorage;
    myWelcomeContainer.appendChild(storeAttendanceButton);
}

function storeAttendanceInLocalStorage() { //here is where i am storing everything
    const dateInput = document.getElementById("attendance-date");
    const noteTextarea = document.getElementById("attendance-note");
    const dateValue = dateInput.value;
    const noteValue = noteTextarea.value;

    if (dateValue) {
        localStorage.setItem("attendanceDate", dateValue);
        console.log("Date stored in local storage:", dateValue);
    } else {
        console.log("Please select a date.");
    }

    if (noteValue) {
        localStorage.setItem("attendanceNote", noteValue);
        console.log("Note stored in local storage:", noteValue);
    }
}

document.addEventListener('DOMContentLoaded', runProgram);
