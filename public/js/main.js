/* global $ */

var download = function(filename, text) {
	var tempElement = document.createElement('a');
	tempElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	tempElement.setAttribute('download', filename);
	
	tempElement.style.display = 'none';
	document.body.appendChild(tempElement);
	
	tempElement.click();
	
	document.body.removeChild(tempElement);
}

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
				$.post('/addrsvp', {name: rsvpName, accept: accept.prop('checked'), attending: numberAttening})
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
	
	var deleteButton = $('.rspv-delete');
	
	if (deleteButton.length > 0) {
		deleteButton.click(function() {
			var guid = $(this).parent().parent().attr('guid');
			var name = $(this).parent().parent().find('td').eq(0).text();
			var shouldDelete = confirm('Are you sure you wish to delete ' + name + '\'s rsvp?');
			if (shouldDelete) {
				var parentRow = $(this).parent().parent();
				var parent = $(this).parent();
				$(this).remove();
				parent.append('<img src="img/spinner.gif">');
				//Send the post
				$.post('/removersvp', {name: name})
					.success(function(result) {
						parentRow.remove();
						console.log(result);
					})
					.fail(function(result) {
						parentRow.class('warning');
						console.log(result);
					});
			}
		});
	}
	
	
	$('#download-button').click(function(e) {
		getCsv();
	});
	
	function getCsv(shouldDownload) {
		var table = $('#response-list');
		var rows = table.find('tr');
		var csvString = 'Name,Attending,Number' + String.fromCharCode(10);
		
		for (var i = 1; i < rows.length; i++) {
			var row = rows.eq(i);
			var name = row.find('td').eq(0).text();
			var attending = row.find('td').eq(1).text();
			var numberAttending = row.find('td').eq(2).text();
			csvString = csvString + name + ',' + attending + ',' + numberAttending + String.fromCharCode(10);
		}
		//Export Csv
		download('Rsvp-list.csv', csvString);
	}
});