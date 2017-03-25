// ==UserScript==
// @name        CyrillicKeyboard
// @namespace   http://www.inerd.com/
// @author      Shaun Amott <shaun@inerd.com>
// @description Cyrillic keyboard for Duolingo Russian
// @include     https://www.duolingo.com/skill/ru/*/*
// @version     1.0
// @grant       none
// ==/UserScript==

var CyrillicKeyboard = {
	kbd: null,
	shiftElem: null,

	isShifted: false,

	chars: [
		[ '\u0410', '\u0430' ],
		[ '\u0411', '\u0431' ],
		[ '\u0412', '\u0432' ],
		[ '\u0413', '\u0433' ],
		[ '\u0414', '\u0434' ],
		[ '\u0415', '\u0435' ],
		[ '\u0416', '\u0436' ],
		[ '\u0417', '\u0437' ],
		[ '\u0418', '\u0438' ],
		[ '\u0419', '\u0439' ],
		[ '\u041A', '\u043A' ],
		[ '\u041B', '\u043B' ],
		[ '\u041C', '\u043C' ],
		[ '\u041D', '\u043D' ],
		[ '\u041E', '\u043E' ],
		[ '\u041F', '\u043F' ],
		[ '\u0420', '\u0440' ],
		[ '\u0421', '\u0441' ],
		[ '\u0422', '\u0442' ],
		[ '\u0423', '\u0443' ],
		[ '\u0424', '\u0444' ],
		[ '\u0425', '\u0445' ],
		[ '\u0426', '\u0446' ],
		[ '\u0427', '\u0447' ],
		[ '\u0428', '\u0448' ],
		[ '\u0429', '\u0449' ],
		[ '\u042A', '\u044A' ],
		[ '\u042B', '\u044B' ],
		[ '\u042C', '\u044C' ],
		[ '\u042D', '\u044D' ],
		[ '\u042E', '\u044E' ],
		[ '\u042F', '\u044F' ],
	],

	shiftKeyboard: function(shiftOn) {
		var kbd = CyrillicKeyboard.kbd;

		for (var i = 0; i < kbd.childNodes.length; i++) {
			var key = kbd.childNodes[i];
			if (!key.hasAttribute('keyID'))
				continue;
			var id = key.getAttribute('keyID');
			var keyCase = shiftOn ? 0 : 1;
			key.innerHTML = CyrillicKeyboard.chars[id][keyCase];
		}
		CyrillicKeyboard.isShifted = shiftOn;
	},

	toggleShift: function() {
		var shift = CyrillicKeyboard.shiftElem;

		if (CyrillicKeyboard.isShifted) {
			shift.className = 'key keyLong';
			CyrillicKeyboard.shiftKeyboard(false);
		} else {
			shift.className = 'key keyLong keyPressed';
			CyrillicKeyboard.shiftKeyboard(true);
		}
	},

	addKey: function(contents) {
		var kbd = CyrillicKeyboard.kbd;
		var key = document.createElement('div');

		key.className = 'key';
		key.innerHTML = contents;

		kbd.appendChild(key);

		return key;
	},

	keyPress: function() {
		var elem = document.getElementById('text-input');
		if (!elem) elem = document.getElementById('word-input');

		if (!elem)
			return;

		var keyCase = CyrillicKeyboard.isShifted ? 0 : 1;
		elem.value += CyrillicKeyboard.chars[this.getAttribute('keyID')][keyCase];

		if (CyrillicKeyboard.isShifted)
			CyrillicKeyboard.toggleShift();
	},

	create: function(elem) {
		var kbd = document.createElement('div');
		CyrillicKeyboard.kbd = kbd;

		kbd.className = 'cyrillicKeyboard';

		for (var i = 0; i < CyrillicKeyboard.chars.length; i++) {
			var key = CyrillicKeyboard.addKey(CyrillicKeyboard.chars[i][1], i);
			key.setAttribute('keyID', i);

			key.addEventListener('click', CyrillicKeyboard.keyPress);
		}

		//var key = CyrillicKeyboard.addKey('\u21E7 Shift');
		var key = CyrillicKeyboard.addKey('\u21E7');
		key.className = 'key keyLong';

		CyrillicKeyboard.shiftElem = key;

		key.addEventListener('click', CyrillicKeyboard.toggleShift);

		elem.appendChild(kbd);
	}
};

document.addEventListener('DOMContentLoaded', function() {
	CyrillicKeyboard.create(document.body);

	var style = document.createElement('style');
	var head = document.head || document.getElementsByTagName('head')[0];

	var cssText = '';
	cssText += '.cyrillicKeyboard {';
	cssText += 'position: fixed;';
	cssText += 'bottom: 0px;';
	cssText += 'right: 0px;';
	cssText += 'width: 600px;';
	cssText += 'padding: 12px;';
	cssText += 'border-top: 2px dashed #999999 !important;';
	cssText += 'border-left: 2px dashed #999999 !important;';
	cssText += 'background-color: #DBDBDB;';
	cssText += 'z-index: 255;';
	cssText += '}';
	cssText += '.key {';
	cssText += 'color: #000000;';
	cssText += 'border-left: 2px solid #C9C9C9;';
	cssText += 'border-top: 2px solid #C9C9C9;';
	cssText += 'border-right: 2px solid #999999;';
	cssText += 'border-bottom: 2px solid #999999;';
	cssText += 'background-color: #EFEFEF;';
	cssText += 'border-radius: 4px;';
	cssText += 'padding: 2px;';
	cssText += 'font-weight: bold;';
	cssText += 'font-size: 140%;';
	cssText += 'font-family: Serif;';
	cssText += 'text-align: center;';
	cssText += 'margin: 4px;';
	cssText += 'width: 38px;';
	cssText += 'height: 38px;';
	cssText += 'float: left;';
	cssText += 'cursor: pointer;';
	cssText += '}';
	cssText += '.key:hover {';
	cssText += 'background-color: #A1D490;';
	cssText += '}';
	cssText += '.keyPressed {';
	cssText += 'border-right: 2px solid #C9C9C9;';
	cssText += 'border-bottom: 2px solid #C9C9C9;';
	cssText += 'border-left: 2px solid #999999;';
	cssText += 'border-top: 2px solid #999999;';
	cssText += 'background-color: #C9C9C9;';
	cssText += '}';
	cssText += '.keyLong {';
	cssText += 'width: 130px;';
	cssText += 'text-align: left;';
	cssText += '}';

	style.type = 'text/css';

	if (style.styleSheet) {
		style.styleSheet.cssText = cssText;
	} else {
		style.appendChild(document.createTextNode(cssText));
	}

	head.appendChild(style);
});
