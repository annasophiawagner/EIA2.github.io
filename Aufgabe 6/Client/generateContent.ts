namespace L06_Hexenkessel_No4 {

    export interface Item {
        name: string;
    }
    export interface priceItem {
        name: string;
        price: number;
    }

    export interface Data {
        [category: string]: Item[];
    }
    export interface PriceData {
        [category: string]: priceItem[];
    }


    export function generateContent(_data: Data): void {

        for (let category in _data) {
            console.log(category);
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            switch (category) {
                case "Effect":
                    group = createEffects(items, category);
                    break;
                case "Intensity":
                    group = createIntensity(items, category);
                    break;
                case "Texture":
                    group = createTexture(items, category);
                    break;
                case "Color":
                    group = createColor(items, category);
                    break;
                case "Amount":
                    group = createAmount(items,category);
                    break;    

                default:
                    break;
            }
            let fielset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fielset && group)
                fielset.appendChild(group);
        }
    }
    export function generatePriceContent(_data: PriceData): void {
        for(let category in _data){
            let items:priceItem[] = _data[category];
            let group: HTMLElement | null = null;
            if(category=="Extras"){
                group = createExtras(items,category);
            }
            else{
                console.log("Extras wurden nicht geladen");
            }
            let fielset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fielset && group){
                fielset.appendChild(group); 
            }
        }
    }
    function createExtras(_items:priceItem[],_category:string):HTMLElement|null{
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radioButton: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked=true;
            radioButton.className = "ingredients";
            radioButton.setAttribute("price",item.price.toFixed());

            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radioButton);
            group.appendChild(label);
        }

        return group;
    }

    function createEffects(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radioButton: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked=true;

            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radioButton);
            group.appendChild(label);
        }

        return group;

    }

    function createIntensity(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radioButton: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked=true;
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radioButton);
            group.appendChild(label);
        }

        return group;

    }

    function createTexture(_items: Item[], _category: string): HTMLElement | null {
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radioButton: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked=true;
            label.textContent = item.name;
            label.htmlFor = item.name;

            group.appendChild(radioButton);
            group.appendChild(label);
        }

        return group;

    }
    function createColor(_items: Item[], _category: string): HTMLElement | null {
        let color: HTMLInputElement = document.createElement("input");
        color.type = "color";
        color.name = _category;
        color.value = _items[0].name;
        color.id = _items[0].name;

        return color;

    }
    function createAmount(_items: Item[], _category: string): HTMLElement | null{
            let stepper: HTMLInputElement = document.createElement("input");
            let label: HTMLLabelElement = document.createElement("label");
            stepper.type = "number";
            stepper.name = _category;
            stepper.value = "0";
            stepper.className = _items[0].name;
            stepper.min = "0";
            stepper.max = "10";
            stepper.step = "1";
            label.textContent = _items[0].name;
            label.htmlFor = _items[0].name;

            return stepper;
        }

        
}