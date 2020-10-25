// Anzahl der Handkarten wählen.
// Kartenstapel als Array vom Interface
var cardStack = [
    { number: "0", color: "rot" }, { number: "0", color: "gelb" }, { number: "0", color: "blau" }, { number: "0", color: "grün" },
    { number: "1", color: "rot" }, { number: "1", color: "gelb" }, { number: "1", color: "blau" }, { number: "1", color: "grün" },
    { number: "2", color: "rot" }, { number: "2", color: "gelb" }, { number: "2", color: "blau" }, { number: "2", color: "grün" },
    { number: "3", color: "rot" }, { number: "3", color: "gelb" }, { number: "3", color: "blau" }, { number: "3", color: "grün" },
    { number: "4", color: "rot" }, { number: "4", color: "gelb" }, { number: "4", color: "blau" }, { number: "4", color: "grün" },
    { number: "5", color: "rot" }, { number: "5", color: "gelb" }, { number: "5", color: "blau" }, { number: "5", color: "grün" },
    { number: "6", color: "rot" }, { number: "6", color: "gelb" }, { number: "6", color: "blau" }, { number: "6", color: "grün" },
    { number: "7", color: "rot" }, { number: "7", color: "gelb" }, { number: "7", color: "blau" }, { number: "7", color: "grün" },
    { number: "8", color: "rot" }, { number: "8", color: "gelb" }, { number: "8", color: "blau" }, { number: "8", color: "grün" },
    { number: "9", color: "rot" }, { number: "9", color: "gelb" }, { number: "9", color: "blau" }, { number: "9", color: "grün" },
];
// Arrays 
var handCards = [];
var CpuHandCards = [];
var playCards = [];
//Beim Load Event wird das Spiel mit der Funktion startGame gestartet
window.addEventListener("load", startGame);
//Funktion um das Spiel zu starten. In ihr werden alle relevatnen Funktionen zum Spielstart augerufen und ein Event um eine neue Karte zu ziehen registriert
function startGame() {
    document.getElementById("drawstack").addEventListener("click", drawNewCard);
    shuffleCardstack();
    getPlayerStartCards(5);
    getCpuStartCards(5);
    displayHandCards();
    displayCpuCards();
    getStartCard();
}
//Funktion um die Startkarten des Spielers vom Kartenstapel zu ziehen
function getPlayerStartCards(cards) {
    console.log("Die Anzahl an Startkarten beträgt: " + cards);
    for (var i = 0; i < cards; i++) {
        var cardDrawn = cardStack[i];
        handCards.push(cardDrawn);
        cardStack.splice(i, 1);
    }
    console.log("Die Startkarten sind: ");
    console.log(handCards);
}
//Funktion um die Startkarten des Computergegners vom Kartenstapel zu ziehen
function getCpuStartCards(cards) {
    console.log("Die Anzahl an Startkarten beträgt: " + cards);
    for (var i = 0; i < cards; i++) {
        var cardDrawn = cardStack[i];
        CpuHandCards.push(cardDrawn);
        cardStack.splice(i, 1);
    }
    console.log("Die Startkarten des CPU´s sind: ");
    console.log(CpuHandCards);
}
//Funktion um die Startkarte des Ablagestapels vom Kartenstapel zu ziehen
function getStartCard() {
    playCards.push(cardStack[0]);
    cardStack.splice(0, 1);
    console.log(playCards);
    for (var i = 0; i < playCards.length; i++) {
        var cardDrawn = document.createElement("div");
        cardDrawn.innerText = playCards[i].number;
        cardDrawn.setAttribute("class", "cardsDrawn");
        cardDrawn.setAttribute("class", playCards[i].color);
        document.getElementById("playstack").appendChild(cardDrawn);
    }
}
//Funktion um die Karten des Spielers im HTML hinzuzufügen. Dabei werden zur ID "handcards" für jede Karte ein div mit dazugehörigem Inhalt erzeugt (Text, Attribute, und Clickevent)
function displayHandCards() {
    console.log("Handkarten anzeigen");
    var element = document.getElementById("handcards");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    for (var i = 0; i < handCards.length; i++) {
        var cardDrawn = document.createElement("div");
        cardDrawn.innerText = handCards[i].number;
        cardDrawn.setAttribute("class", "cardsDrawn");
        cardDrawn.setAttribute("class", handCards[i].color);
        cardDrawn.addEventListener("click", playCard);
        cardDrawn.setAttribute("id", "" + i);
        document.getElementById("handcards").appendChild(cardDrawn);
    }
}
//Funktion um die Karten des Computergegners im HTML hinzuzufügen. Dabei werden zu der ID "cpucards" für jede Karte ein div mit dazugehörigem Inhalt erzeugt
function displayCpuCards() {
    console.log("CPU Karten anzeigen");
    var element = document.getElementById("cpucards");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    for (var i = 0; i < CpuHandCards.length; i++) {
        var cardDrawn = document.createElement("div");
        cardDrawn.setAttribute("class", "cardsDrawn");
        document.getElementById("cpucards").appendChild(cardDrawn);
    }
}
//Funktion zum mischen des Kartendecks 
function shuffleCardstack() {
    for (var i = cardStack.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cardStack[i];
        cardStack[i] = cardStack[j];
        cardStack[j] = temp;
    }
}
//Funktion um beim Clicken auf eine Karte des Spielers gewünschte Prüfung ob Zug möglich auszuführen. Wenn Ja wird Karte aus Hand entfernt und auf Ablagestapel. Wenn Nein benachrichtigung
function playCard(element) {
    console.log("Clicked Card");
    var target = element.target;
    if (playPossible(handCards[target.id]) === true) {
        playCards.push(handCards[Number(target.id)]);
        handCards.splice(Number(target.id), 1);
        displayPLayedCards();
        displayHandCards();
        checkWin();
        CpuTurn();
    }
    else {
        alert("Card can´t be played. Please try another or draw one");
    }
}
//Funktion um Karten auf dem Ablagestapel im HTML anzuzeigen. 
function displayPLayedCards() {
    for (var i = 0; i < playCards.length; i++) {
        var cardDrawn = document.createElement("div");
        cardDrawn.innerText = playCards[i].number;
        cardDrawn.setAttribute("class", "cardsDrawn");
        cardDrawn.setAttribute("class", playCards[i].color);
        document.getElementById("playstack").appendChild(cardDrawn);
    }
}
/* Funktion um eine Simple KI des Computergegners zu simulieren.
   Es wird eine Schleife nach der Anzahl an Handkarten durchlaufen und geprüft ob eine Karte spielbar ist.
   Die Prüfung erfolgt dabei auf gleicher Farbe oder gleicher Nummer.
   Ist dies der Fall wird eine der möglichen Spielbaren Karten gespielt und die Karte aus der Hand des CPU´s entfernt
   Wenn nicht wird eine Karte gezogen
*/
function CpuTurn() {
    var cardIndex = 0;
    for (var i = 0; i < CpuHandCards.length; i++) {
        if (CpuHandCards[i].number === playCards[playCards.length - 1].color) {
            console.log("Enemy Same number");
            cardIndex = i;
        }
        else {
            if (CpuHandCards[i].number === playCards[playCards.length - 1].number) {
                console.log("Enemy Same color");
                cardIndex = i;
            }
        }
    }
    console.log(cardIndex);
    if (cardIndex > 0) {
        playCards.push(CpuHandCards[cardIndex]);
        CpuHandCards.splice(cardIndex, 1);
        displayCpuCards();
        displayPLayedCards();
        checkWin();
    }
    else {
        CpuDrawNewCard();
    }
}
/* Funktion des Spielers um eine neue Karte vom Kartenstapel zu ziehen
   Oberste Karte aus Stapel wird dem handCard Array hinzugefügt und aus dem cardStackArray entfernt
   FUnktion DisplayhandCards um UI zu aktualisieren und CPU Turn
*/
function drawNewCard() {
    if (cardStack.length != 0) {
        console.log("Clicked Draw Card");
        var newcard = cardStack[0];
        handCards.push(newcard);
        cardStack.splice(0, 1);
        displayHandCards();
        CpuTurn();
    }
    else {
        alert("No Cards available! \n Please press F5 to Restart the Game");
    }
}
/* Funktion des CPU´s um eine neue Karte vom Kartenstapel zu ziehen
   Oberste Karte aus Stapel wird dem CpusHandCards Array hinzugefügt und aus dem cardStackArray entfernt
   Funktion displayCpuCards um UI zu aktualisieren
*/
function CpuDrawNewCard() {
    if (cardStack.length != 0) {
        var newCPUcard = cardStack[0];
        CpuHandCards.push(newCPUcard);
        console.log(CpuHandCards);
        cardStack.splice(0, 1);
        displayCpuCards();
    }
    else {
        alert("No Cards available! \n Please press F5 to Restart the Game");
    }
}
// Funktion des Spielers, welche aufgerufen wird sobald er eine Karte spielen möchte. Prüfung auf Farbe und Nummer. Liefert einen Boolean zurück
function playPossible(card) {
    if (card.color === playCards[playCards.length - 1].color) {
        console.log("Same Color");
        return true;
    }
    else {
        if (card.number === playCards[playCards.length - 1].number) {
            console.log("Same Number");
            return true;
        }
        else {
            console.log("Diffrent Color and Number");
            return false;
        }
    }
}
// Game Over. Benachrichtigug an Spieler sobald CPU oder Player gewonnen hat.
function checkWin() {
    if (handCards.length === 0) {
        alert("Congratulations \n You won :) \n To restart the Game please press F5");
    }
    if (CpuHandCards.length === 0) {
        alert("Sorry \n You lost Bro :( \n To restart the Game please press F5");
    }
}
//# sourceMappingURL=MiniUno.js.map