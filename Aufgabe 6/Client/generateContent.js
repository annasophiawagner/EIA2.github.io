var L06_Hexenkessel_No4;
(function (L06_Hexenkessel_No4) {
    function generateContent(_data) {
        for (let category in _data) {
            console.log(category);
            let items = _data[category];
            let group = null;
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
                    group = createAmount(items, category);
                    break;
                default:
                    break;
            }
            let fielset = document.querySelector("fieldset#" + category);
            if (fielset && group)
                fielset.appendChild(group);
        }
    }
    L06_Hexenkessel_No4.generateContent = generateContent;
    function generatePriceContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
            if (category == "Extras") {
                group = createExtras(items, category);
            }
            else {
                console.log("Extras wurden nicht geladen");
            }
            let fielset = document.querySelector("fieldset#" + category);
            if (fielset && group) {
                fielset.appendChild(group);
            }
        }
    }
    L06_Hexenkessel_No4.generatePriceContent = generatePriceContent;
    function createExtras(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked = true;
            radioButton.className = "ingredients";
            radioButton.setAttribute("price", item.price.toFixed());
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radioButton);
            group.appendChild(label);
        }
        return group;
    }
    function createEffects(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked = true;
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radioButton);
            group.appendChild(label);
        }
        return group;
    }
    function createIntensity(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked = true;
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radioButton);
            group.appendChild(label);
        }
        return group;
    }
    function createTexture(_items, _category) {
        let group = document.createElement("div");
        for (let item of _items) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");
            radioButton.type = "radio";
            radioButton.name = _category;
            radioButton.value = item.name;
            radioButton.id = item.name;
            radioButton.checked = true;
            label.textContent = item.name;
            label.htmlFor = item.name;
            group.appendChild(radioButton);
            group.appendChild(label);
        }
        return group;
    }
    function createColor(_items, _category) {
        let color = document.createElement("input");
        color.type = "color";
        color.name = _category;
        color.value = _items[0].name;
        color.id = _items[0].name;
        return color;
    }
    function createAmount(_items, _category) {
        let stepper = document.createElement("input");
        let label = document.createElement("label");
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
})(L06_Hexenkessel_No4 || (L06_Hexenkessel_No4 = {}));
//# sourceMappingURL=generateContent.js.map