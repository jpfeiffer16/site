var numberInput = document.getElementById('number-attending');
var allowedChars = '1234567890';
if (numberInput != null || numberInput != undefined) {
	numberInput.addEventListener('click', function(e) {
		document.getElementById('accept').checked = true;
	});
	numberInput.addEventListener('keypress', function(e) {
		var enteredLetter = String.fromCharCode(e.keyCode);
		if ((allowedChars.indexOf(enteredLetter) == -1) || (numberInput.value.length > 1)) {
			e.preventDefault();
		}
	});
}