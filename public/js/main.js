/* global $ */
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

$(document).ready(function() {
	var submitRsvpButton = $('#submit-rsvp');
	
	if (submitRsvpButton.length > 0) {
		submitRsvpButton.click(function(e) {
			e.preventDefault();
			$.ajax('/rsvp', {
				contents: {test: true},
				data: {test: true},
				contentType: 'application/json',
				method: 'POST'
			});
		});
	}
});

