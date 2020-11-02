namespace L03_FormElements {
    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        let fieldsets: NodeListOf<HTMLFieldSetElement> = document.querySelectorAll("fieldset");

        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
            fieldset.addEventListener("input", handleChange);
        }
    }

    function handleChange(_event: Event): void {
        let target: HTMLInputElement = <HTMLInputElement>_event.target;
        console.log();
        if (_event.type == "change")
            console.warn("Change: " + target.name + " = " + target.value, _event);
        else
            console.log("Input: " + target.name + " = " + target.value, _event);

        // Handling checkbox
        if (target.type == "checkbox")
            console.log("Checked: " + target.name + " = " + target.checked);
        }
    }