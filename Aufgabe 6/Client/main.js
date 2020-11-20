"use strict";
//Alle verschiedenen Step types, welche zur Verfügung stehen
var recipeStepTypes;
(function (recipeStepTypes) {
    recipeStepTypes["ADD_INGREDIENT"] = "ingredient";
    recipeStepTypes["GET_UP_TO_TEMPERATURE"] = "temperatur";
    recipeStepTypes["STIRING"] = "stiring";
    recipeStepTypes["WAITING"] = "waiting";
})(recipeStepTypes || (recipeStepTypes = {}));
//alle Zubereitungsschritte (benötigen auf jeden fall den Step type und dann noch beliebige andere Eigenschaften)
let recipeSteps = [];
//alle Effekte welche ausgewählt wurden
let addedEffects = [];
//Alle notwendigen Elemente im Dokument suchen
const ingredientsDropdown = document.getElementById("ingredientDropdown");
const effectsDropdown = document.getElementById("effectsDropdown");
const effectDuration = document.getElementById("effectTime");
const poisonName = document.getElementById("name");
const poisonDescription = document.getElementById("description");
const addEffectButton = document.getElementById("addEffect");
const addIngredientButton = document.getElementById("addIngredient");
const ingredientAmount = document.getElementById("addIngredientAmount");
const getToTemperature = document.getElementById("getToTemperature");
const addTemperatureButton = document.getElementById("addTemperature");
const stirIntensityDropdown = document.getElementById("stirintensity");
const stirTime = document.getElementById("stirTime");
const addStiringButton = document.getElementById("addStiring");
const waittime = document.getElementById("waittime");
const addWaitButton = document.getElementById("addWaiting");
const recipeName = document.getElementById("recipeName");
const recipeDescription = document.getElementById("recipeDescription");
const submitButton = document.getElementById("submit");
const ingredientsList = document.getElementById("ingredientsList");
const effectsList = document.getElementById("effectsList");
const stepsList = document.getElementById("stepsList");
const totalCostSpanElement = document.getElementById("totalCost");
//hier werden die geladenen Einstellungen von Snape reingeladen
let availableIngredients = [];
let availableEffects = [];
//wenn alle Ressourcen geladen sind die snapeSettings.json laden
window.addEventListener("load", loadSnapeConfig);
async function loadSnapeConfig() {
    //GET Anfrage für die snapeSettings.json Datei
    const Response = await fetch("./snapeSettings.json");
    //in data steht der inhalt von der snapeSettings.json Datei
    const data = await Response.json();
    //Daten auf die globalen Variablen übernehmen
    availableIngredients = data.ingredients;
    availableEffects = data.effects;
    //Beide Dropdown listen bereinigen
    ingredientsDropdown.innerHTML = "";
    effectsDropdown.innerHTML = "";
    //Zutaten als Dropdown hinzufügen
    availableIngredients.forEach(function (ingredient) {
        //neues Option Element erstellen und werte setzen
        const newOption = document.createElement("option");
        newOption.value = ingredient.name;
        newOption.text = ingredient.name;
        //dem Dropdown menu hinzufügen
        ingredientsDropdown.add(newOption);
    });
    availableEffects.forEach(effect => {
        const newOption = document.createElement("option");
        newOption.value = effect;
        newOption.text = effect;
        effectsDropdown.add(newOption);
    });
}
//Beim ändern des Namens wird der name auf dem Rezept aktualisiert
poisonName.addEventListener("input", () => {
    recipeName.innerText = poisonName.value;
});
//Beim ändern der Beschreibung wird die Beschreibung auf dem Rezept aktualisiert
poisonDescription.addEventListener("input", () => {
    recipeDescription.innerText = poisonDescription.value;
});
//Add Effekt Button
addEffectButton.addEventListener("click", () => {
    //holen von effektname und dauer von den HTML Elementen
    const effectname = effectsDropdown.value;
    const duration = effectDuration.value;
    //hinzufügen auf die Globale Variable addedEffects
    addedEffects.push({ name: effectname, duration });
    //Aktualisierung der darstellung der Effekte
    displayEffects();
});
//Add Ingredient Button
addIngredientButton.addEventListener("click", () => {
    //Name und anzahl der Zutat von HTML Elementen holen
    const ingredientsName = ingredientsDropdown.value;
    const ingredientsAmount = ingredientAmount.valueAsNumber;
    //ueber die find funktion zuerst die zutat aus den verfügbaren zutaten finden und dann die unit herausfinden
    const ingredientUnit = availableIngredients.find(value => value.name == ingredientsName)?.unit;
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.ADD_INGREDIENT,
        name: ingredientsName,
        amount: ingredientsAmount,
        unit: ingredientUnit
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
    displayIngredients();
});
//Add Temperature Button
addTemperatureButton.addEventListener("click", () => {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.GET_UP_TO_TEMPERATURE,
        temperature: getToTemperature.value //temperatur von dem HTML Element holen (getToTemperature.value)
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
//Add stiring button
addStiringButton.addEventListener("click", () => {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.STIRING,
        intensity: stirIntensityDropdown.value,
        duration: stirTime.value
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
//Add Waiting
addWaitButton.addEventListener("click", () => {
    //Zu den Zubereitungsschritten hinzufügen
    recipeSteps.push({
        type: recipeStepTypes.WAITING,
        duration: waittime.value
    });
    //aktualisierung der anzeigen
    displayRecipeSteps();
});
function displayEffects() {
    //Effekte-Liste bereinigen
    effectsList.innerHTML = "";
    //Für jeden ausgewählten Effekt ein eintrag in der Liste hinzufügen
    addedEffects.forEach((effect, index) => {
        //erstellen eines li Elements
        const listItem = document.createElement("li");
        //Bearbeiten des inhalts
        listItem.innerHTML = effect.name + " for" + effect.duration + "h";
        //hinzufügen del Löschen buttons (aufruf der deleteEffect funktion mit dem eigenen index)
        listItem.innerHTML += "<button onclick = 'deleteEffect(" + index + ")'> DELETE </button>";
        //Hinzufügen zu der Effekte Liste
        effectsList.appendChild(listItem);
    });
}
function displayRecipeSteps() {
    //Bereinugung aller Zutaten Schritte
    stepsList.innerHTML = "";
    recipeSteps.forEach((step, index) => {
        const listItem = document.createElement("li");
        let innerHTML = "";
        //Für jeden Schritt den typ herausfinden und Text dementsprechend anpassen
        if (step.type == recipeStepTypes.ADD_INGREDIENT) {
            innerHTML = "add " + step.amount + step.unit + " of " + step.name + " to the poison";
        }
        else if (step.type == recipeStepTypes.WAITING) {
            innerHTML = "wait for " + step.duration + "h";
        }
        else if (step.type == recipeStepTypes.STIRING) {
            innerHTML = "stir with " + step.intensity + " intensity for " + step.duration + "h";
        }
        else if (step.type == recipeStepTypes.GET_UP_TO_TEMPERATURE) {
            innerHTML = "bring the potion to " + step.temperature + "C°";
        }
        //hinter jedem element delete button hinzufügen welcher die funktion deleteRecipeStep mit dem eigenen Index aufruft
        innerHTML += " <button onclick='deleteRecipeStep(" + index + ")'> DELETE";
        listItem.innerHTML = innerHTML;
        //Hinzufügen des listItems
        stepsList.appendChild(listItem);
    });
}
function displayIngredients() {
    ingredientsList.innerHTML = "";
    //Aus der Zubereitungsliste alle schritte mit dem typ ADD_INGREDIENT herausfiltern
    const ingredientsSteps = recipeSteps.filter(value => value.type == recipeStepTypes.ADD_INGREDIENT);
    let totalPrice = 0;
    ingredientsSteps.forEach(ingredientStep => {
        const listItem = document.createElement("li");
        //Preis pro einheit über availableIngredients herausfinden
        const price = availableIngredients.find(value => value.name == ingredientStep.name)?.price;
        const cost = price * ingredientStep.amount;
        totalPrice += cost;
        listItem.innerHTML = ingredientStep.amount + ingredientStep.unit + " of " + ingredientStep.name + " with kost of " + cost + " Knuts required";
        ingredientsList.appendChild(listItem);
    });
    //Gesamtpreis abändern
    totalCostSpanElement.innerText = totalPrice + " Knuts";
}
function deleteEffect(toDeteleIndex) {
    //löschen des übergebenen Indexes mithilfe der filter funktion
    //(Array behält alle werte für die die funktion true ergibt)
    addedEffects = addedEffects.filter((_value, index) => index != toDeteleIndex);
    displayEffects();
}
function deleteRecipeStep(toDeleteIndex) {
    recipeSteps = recipeSteps.filter((_value, index) => index != toDeleteIndex);
    displayRecipeSteps();
    displayIngredients();
}
submitButton.addEventListener("click", submitButtonHandler);
async function submitButtonHandler(_event) {
    console.log("submitButton");
    let query = new URLSearchParams();
    query.append("effects", JSON.stringify(addedEffects));
    query.append("recipeSteps", JSON.stringify(recipeSteps));
    await fetch("index.html?" + query.toString());
    alert("Recipe sent!");
    console.log(query.toString());
}
//# sourceMappingURL=main.js.map