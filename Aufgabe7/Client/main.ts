//Definition des Ingredient Typs, kann dann als type nach dem ":" verwendet werden
type Ingredient = {
    name: string;
    unit: string;
    price: number;
};

//Alle verschiedenen Step types, welche zur Verfügung stehen
enum recipeStepTypes {
    ADD_INGREDIENT = "ingredient",
    GET_UP_TO_TEMPERATURE = "temperatur",
    STIRING = "stiring",
    WAITING = "waiting"
}

//alle Zubereitungsschritte (benötigen auf jeden fall den Step type und dann noch beliebige andere Eigenschaften)
let recipeSteps: { type: recipeStepTypes, [key: string]: any }[] = [];
//alle Effekte welche ausgewählt wurden
let addedEffects: { name: string, duration: string } [] = [];
let loadedRecipes: any = {};

//Alle notwendigen Elemente im Dokument suchen
const ingredientsDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("ingredientDropdown");
const effectsDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("effectsDropdown");
const effectDuration: HTMLInputElement = <HTMLInputElement>document.getElementById("effectTime");
const poisonName: HTMLInputElement = <HTMLInputElement>document.getElementById("name");
const poisonDescription: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("description");
const addEffectButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addEffect");
const addIngredientButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addIngredient");
const ingredientAmount: HTMLInputElement = <HTMLInputElement>document.getElementById("addIngredientAmount");
const getToTemperature: HTMLInputElement = <HTMLInputElement>document.getElementById("getToTemperature");
const addTemperatureButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addTemperature");
const stirIntensityDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("stirintensity");
const stirTime: HTMLInputElement = <HTMLInputElement>document.getElementById("stirTime");
const addStiringButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addStiring");
const waittime: HTMLInputElement = <HTMLInputElement>document.getElementById("waittime");
const addWaitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("addWaiting");
const recipeName: HTMLSpanElement = <HTMLSpanElement>document.getElementById("recipeName");
const recipeDescription: HTMLPreElement = <HTMLPreElement>document.getElementById("recipeDescription");
const submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submit");
const recipesDropdown: HTMLSelectElement = <HTMLSelectElement>document.getElementById("availableRecipes");
const searchRecipesButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchRecipes");
const loadRecipeButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("loadRecipe");


const ingredientsList: HTMLUListElement = <HTMLUListElement>document.getElementById("ingredientsList");
const effectsList: HTMLUListElement = <HTMLUListElement>document.getElementById("effectsList");
const stepsList: HTMLOListElement = <HTMLOListElement>document.getElementById("stepsList");
const totalCostSpanElement: HTMLSpanElement = <HTMLSpanElement>document.getElementById("totalCost");


//hier werden die geladenen Einstellungen von Snape reingeladen
let availableIngredients: Ingredient[] = [];
let availableEffects: string[] = [];

//wenn alle Ressourcen geladen sind die snapeSettings.json laden
window.addEventListener("load", loadSnapeConfig);

async function loadSnapeConfig() {
    //GET Anfrage für die snapeSettings.json Datei
    const Response = await fetch("./snapeSettings.json");
    //in data steht der inhalt von der snapeSettings.json Datei
    const data: { effects: string[], ingredients: Ingredient[] } = await Response.json();


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
    const effectname: string = effectsDropdown.value;
    const duration: string = effectDuration.value;
    //hinzufügen auf die Globale Variable addedEffects
    addedEffects.push({name: effectname, duration});
    //Aktualisierung der darstellung der Effekte
    displayEffects();
});

//Add Ingredient Button
addIngredientButton.addEventListener("click", () => {
    //Name und anzahl der Zutat von HTML Elementen holen
    const ingredientsName = ingredientsDropdown.value;
    const ingredientsAmount = ingredientAmount.valueAsNumber;
    //ueber die find funktion zuerst die zutat aus den verfügbaren zutaten finden und dann die unit herausfinden
    const ingredientUnit = <string>availableIngredients.find(value => value.name == ingredientsName)!.unit;

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
        const listItem: HTMLLIElement = <HTMLLIElement>document.createElement("li");
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
        const listItem: HTMLLIElement = <HTMLLIElement>document.createElement("li");
        let innerHTML: string = "";

        //Für jeden Schritt den typ herausfinden und Text dementsprechend anpassen
        if (step.type == recipeStepTypes.ADD_INGREDIENT) {
            innerHTML = "add " + step.amount + step.unit + " of " + step.name + " to the poison";
        } else if (step.type == recipeStepTypes.WAITING) {
            innerHTML = "wait for " + step.duration + "h";
        } else if (step.type == recipeStepTypes.STIRING) {
            innerHTML = "stir with " + step.intensity + " intensity for " + step.duration + "h";
        } else if (step.type == recipeStepTypes.GET_UP_TO_TEMPERATURE) {
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
    let totalPrice: number = 0;
    ingredientsSteps.forEach(ingredientStep => {
        const listItem: HTMLLIElement = <HTMLLIElement>document.createElement("li");
        //Preis pro einheit über availableIngredients herausfinden
        const price: number = <number>availableIngredients.find(value => value.name == ingredientStep.name)!.price;
        const cost: number = price * ingredientStep.amount;
        totalPrice += cost;
        listItem.innerHTML = ingredientStep.amount + ingredientStep.unit + " of " + ingredientStep.name + " with kost of " + cost + " Knuts required";
        ingredientsList.appendChild(listItem);
    });

    //Gesamtpreis abändern
    totalCostSpanElement.innerText = totalPrice + " Knuts";

}

function deleteEffect(toDeteleIndex: number) {
    //löschen des übergebenen Indexes mithilfe der filter funktion
    //(Array behält alle werte für die die funktion true ergibt)
    addedEffects = addedEffects.filter((_value, index) => index != toDeteleIndex);
    displayEffects();
}

function deleteRecipeStep(toDeleteIndex: number) {
    recipeSteps = recipeSteps.filter((_value, index) => index != toDeleteIndex);
    displayRecipeSteps();
    displayIngredients();
}

submitButton.addEventListener("click", submitButtonHandler);

async function submitButtonHandler(_event:Event): Promise <void> {
    console.log("submitButton");
    let query: URLSearchParams = new URLSearchParams();
    let recipe: any = {};
    recipe ["effects"] = addedEffects;
    recipe ["potion"] = poisonName.value; 
    recipe ["steps"] = recipeSteps;
    recipe ["description"] = poisonDescription.value;
    query.append("recipe", JSON.stringify(recipe));
    query.append("type", "put");
    
    const response: Response = await fetch("https://avifuwa.herokuapp.com?" + query.toString());
    const data = await response.json()
    alert(JSON.stringify(data));
    console.log(query.toString());
}

searchRecipesButton.addEventListener("click", async function() {
    const response: Response = await fetch("https://avifuwa.herokuapp.com?type=get");
    const data = await response.json();
    recipesDropdown.innerHTML = "";
    data.forEach(recipe => {
        const newOption = document.createElement("option");
        newOption.value = recipe._id;
        newOption.text = recipe.potion;
        recipesDropdown.add(newOption);
    });
    loadedRecipes = data;

});

loadRecipeButton.addEventListener("click", function() {
    let selectedID = recipesDropdown.value;
    let selectedrecipe = loadedRecipes.find(function(recipe) {
        return recipe._id == selectedID;
    });
    addedEffects = selectedrecipe.effects;
    recipeSteps = selectedrecipe.steps;
    poisonName.value = selectedrecipe.potion;
    poisonDescription.value = selectedrecipe.description;

    displayEffects();
    displayRecipeSteps();
    displayIngredients();
});