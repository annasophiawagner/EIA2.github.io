var L03_FormElements;
(function (L03_FormElements) {
    window.addEventListener("load", init);
    function init(_event) {
        console.log("Init");
        var fieldsets = document.querySelectorAll("fieldset");
        for (var i = 0; i < fieldsets.length; i++) {
            var fieldset = fieldsets[i];
            fieldset.addEventListener("change", handleChange);
            fieldset.addEventListener("input", handleChange);
        }
    }
    function handleChange(_event) {
        var target = _event.target;
        console.log();
        if (_event.type == "change")
            console.warn("Change: " + target.name + " = " + target.value, _event);
        else
            console.log("Input: " + target.name + " = " + target.value, _event);
        // Handling checkbox
        if (target.type == "checkbox")
            console.log("Checked: " + target.name + " = " + target.checked);
    }
})(L03_FormElements || (L03_FormElements = {}));
//# sourceMappingURL=Aufgabe3.js.map