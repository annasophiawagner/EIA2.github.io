   
    
    window.addEventListener("load", handleLoad);

    function handleLoad(_event: Event): void {
        document.getElementById("formDesc").addEventListener("change", handleDesc);
        document.getElementById("ingredients").addEventListener("change", handleIngredients);
    }


    function handleDesc(_event: Event): void {
        let formData: FormData = new FormData(document.forms[0]);
        console.log(formData);
        let description: HTMLDivElement = <HTMLDivElement>document.getElementById("description");
        description.innerHTML = "";

        for (let entry of formData) {
            description.innerHTML +=entry[0] + ": " + entry[1] + "<br>";
        }

    }
    
    function handleIngredients(_event: Event): void {
        let formData: FormData = new FormData(document.forms[1]);
        let recipe: HTMLDivElement = <HTMLDivElement>document.getElementById("recipe");
        let ingredients: NodeListOf<HTMLInputElement> = document.querySelectorAll(".ingredients");
        let amounts: NodeListOf<HTMLInputElement> = document.querySelectorAll(".amount");
        let price: number[] = [];
        let amount: number[] = [];
        recipe.innerHTML = "";

        
        for (let i: number = 0; i < ingredients.length; i++) {
            if(ingredients[i].checked){
            price.push(Number(ingredients[i].getAttribute("price")));
        }
        }
        for (let i: number = 0; i < amounts.length; i++) {
            if(ingredients[i].checked){
            amount.push(Number(amounts[i].value));
            }
        }

        for (let entry of formData) {
            switch (String(entry[1])) {
                case "spider":
                    recipe.innerHTML += entry[0] + ": " + entry[1] + " price = " + price[0] + "<br>";
                    break;
                case "fingernail":
                    recipe.innerHTML += entry[0] + ": " + entry[1] + " price = " + price[1] + "<br>";
                    break;
                case "blood":
                    recipe.innerHTML += entry[0] + ": " + entry[1] + " price = " + price[2] + "<br>";
                    break;
                default:
                    recipe.innerHTML += entry[0] + ": " + entry[1] + "<br>";
                    break;

            }
        }
        recipe.innerHTML +=  "<br>" + "<br>" + "Total: " + calculatePrice(price, amount);
    }

    function calculatePrice(_price: number[], _amount: number[]): string {
        let totalPrice: number = 0;
        for (let i: number = 0; i < _price.length; i++) {
            totalPrice += _price[i] * _amount[i];
            
        }

        if (totalPrice < 29) {
            return totalPrice + " Knut";
        }
        else if (totalPrice<493) {
            let sickel: number = totalPrice / 29;
            let knut: number = totalPrice % 29;
            return sickel.toFixed() + " Sickel," + knut.toFixed() + " Knut";
        }
        else {
            let galleone: number = totalPrice / 493;
            let rest: number = totalPrice % 493;
            let sickel: number = rest / 29;
            let knut: number = sickel % 29;
            return galleone.toFixed() + " Galleonen, " + sickel.toFixed() + " Sickel, " + knut.toFixed() + " Knut";

        }

    }


