//for login button on home page
function login() {
    let newUrl = "play.html";

    window.location.href = newUrl;
}

function insertLetter(letter) {


    if(letter === "ENTER") alert("Submit word");
    else if(letter == "DEL") alert("Backspace");
    else alert(letter);
}


