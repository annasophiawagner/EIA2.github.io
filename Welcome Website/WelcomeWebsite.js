window.addEventListener("load", myFunction);
function myFunction() {
    var text;
    var person = prompt("What is your name?", "...");
    if (person == null || person == '') {
        text = "Error";
    }
    else {
        text = "Hi " + person + ". Your smile is gorgeous!";
    }
    document.getElementById("Text").innerHTML = text;
}
//# sourceMappingURL=WelcomeWebsite.js.map