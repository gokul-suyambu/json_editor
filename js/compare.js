$(document).ready(function() {
	$('.sidenav').sidenav();

	$('select').formSelect();

	$("#mode").change(function() {

		editorRight.setMode($(this).val());
		editorLeft.setMode($(this).val());

		if ($(this).val() === "code") {
			$("#compare").addClass("disabled");
			$("#remove").addClass("disabled");
		} else {
			$("#compare").removeClass("disabled");
			$("#remove").removeClass("disabled");
		}
	});

	$("#compare").click(function() {
		editorRight.options.onClassName = function({ path, field, value }) {
			const leftValue = _.get(jsonLeft, path);
			const rightValue = _.get(jsonRight, path);

			return _.isEqual(leftValue, rightValue)
				? 'the_same_element'
				: 'different_element';
		}
		editorRight.refresh();

		editorLeft.options.onClassName = function({ path, field, value }) {
			const leftValue = _.get(jsonLeft, path);
			const rightValue = _.get(jsonRight, path);

			return _.isEqual(leftValue, rightValue)
				? 'the_same_element'
				: 'different_element';
		}
		editorLeft.refresh();
	});

	$("#remove").click(function() {
		editorLeft.options.onClassName = function({ path, field, value }) {
			return "the_same_element";
		}
		editorLeft.refresh();

		editorRight.options.onClassName = function({ path, field, value }) {
			return "the_same_element";
		}
		editorRight.refresh();
	});

});

var optionsLeft, optionsRight, editorLeft, editorRight;

optionsLeft = {
	mode: 'code',
	//modes : [ 'code', 'tree' ], // allowed modes
	onError: function(err) {
		console.error(err);
		alert(err.toString());
	},
	onChangeJSON: function(json) {
		jsonLeft = json;
		editorRight.refresh();
		editorLeft.refresh();
	},
	onChangeText: function(json) {
		jsonLeft = JSON.parse(json);
	},
	indentation: 4,
	// escapeUnicode: true,
	limitDragging: true
};

optionsRight = {
	mode: 'code',
	//modes : [ 'code', 'tree' ], // allowed modes
	onError: function(err) {
		console.error(err);
		alert(err.toString());
	},
	onChangeJSON: function(json) {
		jsonRight = json;
		editorRight.refresh();
		editorLeft.refresh();
	},
	onChangeText: function(json) {
		jsonRight = JSON.parse(json);
	},
	indentation: 4,
	// escapeUnicode: true,
	limitDragging: true
};

let jsonLeft = {
	"arrayOfArrays": [1, 2, 999, [3,  4, 5]],
	"someField": true,
	"boolean": true,
	"htmlcode": '&quot;',
	"escaped_unicode": '\\u20b9',
	"unicode": '\u20b9,\uD83D\uDCA9',
	"return": '\n',
	"null": null,
	"thisObjectDoesntExistOnTheRight": { key: "value" },
	"number": 123,
	"object": { "a": "b", "new": 4, "c": "d", "e": [1, 2, 3] },
	"string": "Hello World",
	"url": "http://jsoneditoronline.org",
	"[0]": "zero"
}

let jsonRight = {
	"arrayOfArrays": [1, 2, [3, 4, 5]],
	"boolean": true,
	"htmlcode": '&quot;',
	"escaped_unicode": '\\u20b9',
	"thisFieldDoesntExistOnTheLeft": 'foobar',
	"unicode": '\u20b9,\uD83D\uDCA9',
	"return": '\n',
	"null": null,
	"number": 123,
	"object": { "a": "b", "c": "d", "e": [1, 2, 3] },
	"string": "Hello World",
	"url": "http://jsoneditoronline.org",
	"[0]": "zero"
}

editorLeft = new JSONEditor(document.getElementById('jsoneditor_left'), optionsLeft, jsonLeft);

editorRight = new JSONEditor(document.getElementById('jsoneditor_right'), optionsRight, jsonRight);
