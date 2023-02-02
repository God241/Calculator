'use strict';

document.getElementById('0').addEventListener('click', input);
document.getElementById('1').addEventListener('click', input);
document.getElementById('2').addEventListener('click', input);
document.getElementById('3').addEventListener('click', input);
document.getElementById('4').addEventListener('click', input);
document.getElementById('5').addEventListener('click', input);
document.getElementById('6').addEventListener('click', input);
document.getElementById('7').addEventListener('click', input);
document.getElementById('8').addEventListener('click', input);
document.getElementById('9').addEventListener('click', input);
document.getElementById('+').addEventListener('click', input);
document.getElementById('-').addEventListener('click', input);
document.getElementById('*').addEventListener('click', input);
document.getElementById('/').addEventListener('click', input);
document.getElementById('%').addEventListener('click', input);
document.getElementById('.').addEventListener('click', input);
document.getElementById('=').addEventListener('click', calculate);
document.getElementById('ac').addEventListener('click', reset);
document.getElementById('del').addEventListener('click', del);

const display = document.getElementById('display-text');
display.innerText = '0';
let displayCurrent = '';

function input(e) {
	let inputValue = '';	// инициализируем inputValue 

	if (e.type == 'click') {	// При щелчке установить inputValue как раньше 
		inputValue = e.target.innerText;	// сохранить значение клавиши ввода 
	} else {	// В противном случае установить ввод по нажатой клавише 
		switch (e.key) {
			case '0':
				inputValue = '0'
				break;
			case '1':
				inputValue = '1'
				break;
			case '2':
				inputValue = '2'
				break;
			case '3':
				inputValue = '3'
				break;
			case '4':
				inputValue = '4'
				break;
			case '5':
				inputValue = '5'
				break;
			case '6':
				inputValue = '6'
				break;
			case '7':
				inputValue = '7'
				break;
			case '8':
				inputValue = '8'
				break;
			case '9':
				inputValue = '9'
				break;
			case '+':
				inputValue = '+'
				break;
			case '-':
				inputValue = '-'
				break;
			case '*':
				inputValue = '*'
				break;
			case '/':
				inputValue = '/'
				break;
			case '%':
				inputValue = '%'
				break;
		}
	}
	// *** Фильтр для начала двойного символа *** // 
	if ((displayCurrent.substring(displayCurrent.length - 1) == "*" ||	// Проверяем, являются ли предыдущий и текущий ввод символами 
		displayCurrent.substring(displayCurrent.length - 1) == "/" ||
		displayCurrent.substring(displayCurrent.length - 1) == "+" ||
		displayCurrent.substring(displayCurrent.length - 1) == "-" ||
		displayCurrent.substring(displayCurrent.length - 1) == ".") &&
		(inputValue == '*' ||
			inputValue == '/' ||
			inputValue == '+' ||
			inputValue == '-' ||
			inputValue == '.')
	) {
		displayCurrent = displayCurrent.slice(0, -1); // Если да, удалите последний символ и добавьте новый 
		displayCurrent += inputValue; // добавляем к displayCurrent 
		display.innerText = numberWithCommas(displayCurrent);
	} else if (displayCurrent.substring(displayCurrent.length - 1) == "%" && inputValue == '%') {
		displayCurrent = displayCurrent.slice(0, -1); // Если да, удалите последний символ и добавьте новый 
		displayCurrent += inputValue; // добавляем к displayCurrent 
		display.innerText = numberWithCommas(displayCurrent);
	} else {
		// В противном случае добавляем входное значение как обычно
		displayCurrent += inputValue; // добавляем к displayCurrent 
		display.innerText = numberWithCommas(displayCurrent);
	}

	if ((	//Проверка первого символа в строке, чтобы не было ошибки (первым символом из операторов могут быть толкьо + -)
		displayCurrent == '*' ||
		displayCurrent == '/' ||
		displayCurrent == '%' ||
		displayCurrent == '.'
	)) {
		displayCurrent = displayCurrent.slice(0, -1);
		display.innerText = numberWithCommas(displayCurrent);
	}
}

function calculate() {

	if (displayCurrent[displayCurrent.length - 1] == '+' ||
		displayCurrent[displayCurrent.length - 1] == '-' ||
		displayCurrent[displayCurrent.length - 1] == '*' ||
		displayCurrent[displayCurrent.length - 1] == '/') {
		displayCurrent = '';
		display.innerText = 'Вы ошиблись!';
	}

	if (displayCurrent.includes('%')) {
		let exp = displayCurrent.match(/\d+(\.\d+)|\d+|(\%|\+|\-|\*|\/)/g);
		let str = [];

		for (let key in exp) {
			if (exp[key] == '%') {
				break;
			} else {
				str.push(exp[key]);
			}
		}

		if (str.length < 2) {
			displayCurrent = '';
			display.innerText = 'Неправильный формат!';
		}

		let result = '';
		let operator = str[str.length - 2];
		let valueProcent = str[str.length - 1];

		if (valueProcent == '-' || valueProcent == '+' || valueProcent == '%' || valueProcent == '*' || valueProcent == '/' || valueProcent == '.') {
			displayCurrent = '';
			display.innerText = 'Неправильный формат!';
		}

		let leftExpression = [];

		for (let i = 0; i < str.length - 2; i++) {
			leftExpression.push(str[i]);
		}

		leftExpression = leftExpression.join('');
		leftExpression = eval(leftExpression);

		if (operator == '*') {
			valueProcent = str[str.length - 1] / 100;
			result += leftExpression;
			result += operator;
			result += valueProcent;
			result = eval(result);

			exp.splice(0, str.length + 1);
			exp.unshift(result);

			displayCurrent = exp.join('');
		} else {
			valueProcent = leftExpression / 100 * str[str.length - 1];

			result += leftExpression;
			result += operator;
			result += valueProcent;
			result = eval(result);

			exp.splice(0, str.length + 1);
			exp.unshift(result);

			displayCurrent = exp.join('');
		}
	}

	//Проверка на деление на ноль и NaN
	let checkResult = eval(displayCurrent);
	if (checkResult == Infinity || checkResult == -Infinity || Number.isNaN(checkResult)) {
		displayCurrent = '';
		display.innerText = 'Не делите на 0!';
	} else { //если всё норм то выводим результат
		display.innerText = numberWithCommas(eval(displayCurrent).toFixed(2));
		displayCurrent = numberWithCommas(eval(displayCurrent).toFixed(2));
	}
}

function reset() {
	displayCurrent = '';
	display.innerText = numberWithCommas(displayCurrent);
	display.innerText = '0';
}

function del() {
	displayCurrent = displayCurrent.substring(0, displayCurrent.length - 1);
	display.innerText = numberWithCommas(displayCurrent);
}

function numberWithCommas(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

document.addEventListener('keydown', (e) => {
	if (e.key == "Enter") { calculate() }
	else if (e.key == "Backspace") { del() }
	else if (e.key == "Delete") { reset() }
	else { input(e) }
})
