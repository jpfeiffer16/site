/* global $ */


function animateButton(button) {
	button.addClass('button-success');
	setTimeout(function() {
		button.text('Thank You.');
		var message = $('<span class="rsvp-greeting">Have a nice day!</span>').hide().fadeIn(1000);
		if (button.parent().find('.rsvp-greeting').length < 1) {
			button.parent().append(message);
		}
	}, 100);
}



var numberInput = document.getElementById('rsvp-attending');
var allowedChars = '1234567890' + String.fromCharCode(13);
if (numberInput != null || numberInput != undefined) {
	numberInput.addEventListener('click', function(e) {
		document.getElementById('accept').checked = true;
	});
	numberInput.addEventListener('keypress', function(e) {
		var enteredLetter = String.fromCharCode(e.keyCode);
		if ((allowedChars.indexOf(enteredLetter) == -1) || (numberInput.value.length > 1) && (e.keyCode != 13)) {
			e.preventDefault();
		}
	});
}

$(document).ready(function() {
	var submitRsvpButton = $('#submit-rsvp');
	
	if (submitRsvpButton.length > 0) {
		submitRsvpButton.click(function(e) {
			e.preventDefault();
			var accept = $('#accept');
			var decline = $('#decline');
			var numberAttening = $('#rsvp-attending').val();
			var rsvpName = $('#rsvp-name').val();
			if ((accept.prop('checked') == true || decline.prop('checked') == true) && !(accept.prop('checked') == true && numberAttening == '') && (rsvpName != '')) {
				submitRsvpButton.prop('disabled', true);
				$.post('/rsvp', {name: rsvpName, accept: accept.prop('checked'), attending: numberAttening})
				.success(function(result) {
					console.log(result);
					animateButton(submitRsvpButton);
				})
				.fail(function(result) {
					console.log('Failure');
				});
			} else if (accept.prop('checked') == false && decline.prop('checked') == false) {
				alert('Please select either "decline" or "accept".');
			} else if (rsvpName == '') {	
				alert('Please enter you or your family\'s name');
			} else {
				alert('Please enter a number attending.');
			}
		});
	}
});

