window.addEventListener("load", myFunction);

function myFunction(): void {
    var text: string;
    var person: string = prompt("What is your name?", "...")
        if (person == null || person == ''){
            text = "Error"
        }
            else {
                text = "Hi " + person + ". Your smile is gorgeous!"
            }
        document.getElementById("Text").innerHTML = text;
}    