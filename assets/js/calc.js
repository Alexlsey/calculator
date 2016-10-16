var model = {
        number: ["1", "2", "3", "4", "5", "6", "7", "8", "9","0", "."],
        result: ["="],
        actions: ["+", "-", "*", "/"],
        reset: ["C"]
    }
    ;
var views = {
    init: function (numbers) {
        views.getDom();
        views.setListItems(numbers);
    },
    getDom: function () {
        this.numbers = document.getElementById("numbers");
        this.result = document.getElementById("result");
        this.previousResult = document.getElementById("firstValue");

    },
    setListItems: function (item) {
        for (var i = 0; i < item.length; i++) {
            var elem = document.createElement('li');
            elem.textContent = item[i];
            var textnode = document.createTextNode(item[i]);
            elem.addEventListener('click', (function (elemCopy) {
                return function () {
                    calculator.initLogicOfCalculator(elemCopy.innerHTML);
                };
            })(elem));
            this.numbers.appendChild(elem);
        }
    },
    resetFirstValue: function () {
        this.result.innerHTML = "";
    },
    resetSecondValue: function () {
        this.previousResult.innerHTML = "";
    },
    setSecondValue: function (item) {
        this.result.innerHTML += item;
    },
    setFirstValue: function (item) {
        this.previousResult.innerHTML = this.result.innerHTML + item;
        this.resetFirstValue();
    },
    getPreviousResult: function () {
        return this.previousResult.innerText;
    },
    getResult: function () {
        return this.result.innerText;
    }
};
var calculator = {
    init: function () {
        this.numbers = model.number;
        this.actions = model.actions;
        this.result = model.result;
        this.reset=model.reset;
        views.init(this.numbers.concat(this.actions,this.result,this.reset));
    },
    initLogicOfCalculator: function (item) {
        console.log(views.getPreviousResult() + "  " + this.numbers.indexOf(item));

        if (this.numbers.indexOf(item) >= 0) {
            views.setSecondValue(item);
        } else if (this.actions.indexOf(item) >= 0
            && this.actions.indexOf(views.getPreviousResult().slice(-1))
            && this.result.indexOf(item) < 0) {
            views.setFirstValue(item);
        }
        else if (this.reset.indexOf(item)>= 0) {
            this.resetAllFields();
        }
        else {
            this.renderResult(views.getPreviousResult().concat(views.getResult()));
        }

    },
    calculateResult: function (result) {
        return eval(result);

    },
    resetAllFields: function () {
        views.resetFirstValue();
        views.resetSecondValue();
    },
    renderResult: function (result) {
        this.resetAllFields();
        views.setFirstValue(result);
        views.setSecondValue(this.calculateResult(result));
    }


}
calculator.init();



