var container, options, json, editor;

container = document.getElementById('jsoneditor');

options = {
	mode: 'code',
	modes: ['code', 'tree'], // allowed modes
	mainMenuBar: false,
	onError: function(err) {
		console.error(err);
		alert(err.toString());
	},
	onChange: function() {
		console.log('onChange');
	},
	onChangeText: function(text) {
		console.log('onChangeText', text);
	},
	onFocus: function(event) {
		console.log('Focus : ', event);
	},
	onBlur: function(event) {
		console.log('Blur : ', event);
	},
	indentation: 4,
	// escapeUnicode: true,
	limitDragging: true,
	language: "en"
};

json = {
    "arrayOfArrays": [
        1,
        2,
        999,
        [
            3,
            4,
            5
        ]
    ],
    "someField": true,
    "boolean": true,
    "htmlcode": "&quot;",
    "escaped_unicode": "\\u20b9",
    "unicode": "₹,💩",
    "return": "\n",
    "null": null,
    "thisObjectDoesntExistOnTheRight": {
        "key": "value"
    },
    "number": 123,
    "object": {
        "a": "b",
        "new": 4,
        "c": "d",
        "e": [
            1,
            2,
            3
        ]
    },
    "string": "Hello World",
    "url": "http://jsoneditoronline.org",
    "[0]": "zero"
};

editor = new JSONEditor(container, options, json);

$(document).ready(function() {
	$('.sidenav').sidenav();

	$('select').formSelect();

	$("#mode").change(function() {
		console.log(editor)
		editor.setMode($(this).val());

		if ($(this).val() === "code") {
			$("#expand_collapse").addClass("disabled");
			$("#search").prop("disabled", true);

			$("#compact_format").removeClass("disabled");
			$("#compact_format").attr("value", "compact");
			$("#compact_format").html("Compact");
			$("#repair").removeClass("disabled");
			
			$("#search").val("");
			$("#search").parent().find("span").html("");
			$("#search").parent().find("label").removeClass("active");
		} else {
			$("#expand_collapse").removeClass("disabled");
			$("#expand_collapse").attr("value", "collapse");
			$("#expand_collapse").html("Collapse");
			$("#search").removeAttr("disabled");

			$("#compact_format").addClass("disabled");
			$("#repair").addClass("disabled");
		}
		
	});

	$("#search").keyup(function() {
		/* if($("#mode").val() === "code") {
			editor.aceEditor.find($(this).val());
		} else {
			editor.search($(this).val());
		} */

		if ($(this).val() === "") {
			$(this).parent().find("span").html("");
			$(".jsoneditor-highlight").removeClass("jsoneditor-highlight");
		} else {
			editor.expandAll();
			editor.search($(this).val());
			$(this).parent().find("span").html($(".jsoneditor-highlight").length + " results");
		}
	});

	$("#expand_collapse").click(function() {
		if ($(this).attr("value") === "collapse") {
			$(this).attr("value", "expand");
			$(this).html("Expand");
			editor.collapseAll();
		} else {
			$(this).attr("value", "collapse");
			$(this).html("Collapse");
			editor.expandAll();
		}
	});

	$("#compact_format").click(function() {
		if ($(this).attr("value") === "compact") {
			$(this).attr("value", "format");
			$(this).html("Format");
			editor.compact();
		} else {
			$(this).attr("value", "compact");
			$(this).html("Compact");
			editor.format();
		}
	});

	$("#sort").click(function() {
		$(".jsoneditor-sort").click();
	});

	$("#transform").click(function() {
		$(".jsoneditor-transform").click();
	});

	$("#repair").click(function() {
		$(".jsoneditor-repair").click();
	});

	$("#redo").click(function() {
		$(".jsoneditor-redo").click();
	});

	$("#undo").click(function() {
		$(".jsoneditor-undo").click();
	});
	
	$("#sort").hide();
	$("#transform").hide();
	$("#repair").hide();
	$("#redo").hide();
	$("#undo").hide();
});