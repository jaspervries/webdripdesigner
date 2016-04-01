/*
WebDRIP Designer - webgebaseerde ontwerptool voor DRIP-teksten
Copyright (C) 2013-2016 Jasper Vries

WebDRIP Designer is free software: you can redistribute it and/or 
modify it under the terms of version 3 of the GNU General Public 
License as published by the Free Software Foundation.

WebDRIP Designer is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with WebDRIP Designer. If not, see <http://www.gnu.org/licenses/>.
*/

//general initialization
var active_textarea = '#drip_t1';
var drip_i1 = null;
var drip_changed = false;
var active_template_class;
var picto_show_all = false;
//template
var tpl_name;
var tpl_size;
var tpl_lines = [];
var tpl_align = ['center', 'center', 'center', 'center', 'center'];
var tpl_lineheight;
var tpl_line = 0;
var tpl_font;
var tpl_picto;
var tpl_symbol;
var tpl_charspacing = 3;
//content
var ctn_fullcolor = false;

function prepare_text(str) {
	//returns list of image IDs and line length in pixels
	var ids = [];
	var width = 0;
	
	for (var i = 0; i < str.length; i++) {
		var char = str[i];
		//inline images
		if (char == '$') {
			//see if next is also $
			if (str[i+1] == '$') {
				//escape sequence
				//draw dollar sign and continue
				ids.push( 'text_' + tpl_font + '_' + char.charCodeAt(0) );
				i = i+1;
			}
			else if ((str[i+1]) && (str[i+2]) && (str[i+3]) && ((str[i+1]+str[i+2]+str[i+3]).match(/^[0-9]{3}$/) != null)) {
				//read next three characters from string
				var symbol = parseInt(str[i+1]+str[i+2]+str[i+3]);
				//check if exists
				if (sprites.symbol[tpl_symbol][symbol]) {
					ids.push('symbol_'+symbol);
				}
				//advance position pointer
				i = i+3;
			}
			else {
				//draw dollar sign and continue
				ids.push( 'text_' + tpl_font + '_' + char.charCodeAt(0) );
			}
		}
		//tiles
		else if ((char == '[') || (char == '{') || (char == '>') || (char == '<') || (char == '^')) {
			//see if next is also [ { > < or ^, of if no tiles allowed
			if ((str[i] == str[i+1]) || (tpl_charspacing != 3)) {
				//escape sequence
				ids.push( 'text_' + tpl_font + '_' + char.charCodeAt(0) );
				if (str[i] == str[i+1]) {
					i = i+1;
				}
			}
			else {
				//tile squences are max 11 characters including the brackets
				//build the maximum possible tilestring for regexing
				var tilestr = '';
				for (var t = 0; t < 11; t++) {
					if (str[i+t]) tilestr = tilestr + str[i+t];
					else break;
				}
				//next character must be A, N, s, U or a
				//subsequent one to three characters must be a number, followed by a closing square bracket
				//OR
				//next character must be a capital OR a number, followed by closing square bracket
				var tilematch = 0;
				if (tilestr.match(/^\[[ANsUa][0-9]]/) != null) { //[Xx]
					tilematch = 3;
				}
				else if ((tilestr.match(/^\[[ANsUa][0-9]{2}]/) != null) || (tilestr.match(/^\[a[0-9]{1}[a-z]{1}]/) != null)) { //[Xxx] or [axy]
					tilematch = 4;
				}
				else if ((tilestr.match(/^\[[ANsUa][0-9]{3}]/) != null) || (tilestr.match(/^\[a[0-9]{2}[a-z]{1}]/) != null) || (tilestr.match(/^\{s[0-9]{3}}/) != null)) { //[Xxxx] or [axxy] or {sxxx}
					tilematch = 5;
				}
				else if (tilestr.match(/^\[[A-Z0-9]{1}[A-Za-z0-9]{1}]/) != null) { //[XX]
					tilematch = 3;
				}
				else if (tilestr.match(/^\[afrit [0-9]{1}]/) != null) { //[afrit x]
					tilematch = 8;
				}
				else if ((tilestr.match(/^\[afrit [0-9]{2}]/) != null) || (tilestr.match(/^\[afrit [0-9]{1}[a-z]{1}]/) != null)) { //[afrit xx] or [afrit xy]
					tilematch = 9;
				}
				else if ((tilestr.match(/^\[afrit [0-9]{3}]/) != null) || (tilestr.match(/^\[afrit [0-9]{2}[a-z]{1}]/) != null)) { //[afrit xxx] or [afrit xxy]
					tilematch = 10;
				}
				else if (tilestr.match(/^\[[A-Z0-9]]/) != null) { //[X]
					tilematch = 11;
				}
				else if (tilestr.match(/^>[A-Z0-9]>/) != null) { //>X>
					tilematch = 12;
				}
				else if (tilestr.match(/^>[A-Z0-9][A-Za-z0-9]>/) != null) { //>Xy>
					tilematch = 3;
				}
				else if (tilestr.match(/^<[A-Z0-9]</) != null) { //<X<
					tilematch = 13;
				}
				else if (tilestr.match(/^<[A-Z0-9][A-Za-z0-9]</) != null) { //<Xy<
					tilematch = 3;
				}
				else if (tilestr.match(/^\^[A-Z0-9]\^/) != null) { //^X^
					tilematch = 14;
				}
				//multi-character tile
				if ((tilematch >= 3) && (tilematch <= 10)) {
					//open
					if (str[i] == '[') {
						ids.push('tile_open');
					}
					else if (str[i] == '>') {
						ids.push('tile_detour_right_open');
					}
					else if (str[i] == '<') {
						ids.push('tile_detour_left_open');
					}
					else { // if (str[i] == '{')
						ids.push('tile_s_open');
					}
					for (var t = 1; t < tilematch; t++) {
						if ((tilematch > 2) && (t == 1) && (str[i+t] == 'a') && (str[(i+2)] != 'f')) {
							//exit symbol
							ids.push('tile_afrit');
						}
						else {
							var char = str[i+t];
							ids.push( 'text_CdmsBdType2_' + char.charCodeAt(0) );
						}
					}
					//close
					if (str[i] == '[') {
						ids.push('tile_close');
					}
					else if (str[i] == '>') {
						ids.push('tile_detour_right_close');
					}
					else if (str[i] == '<') {
						ids.push('tile_detour_left_close');
					}
					else { // if (str[i] == '{')
						ids.push('tile_s_close');
					}
					//advance position pointer
					i = i+tilematch;
				}
				//single-character square tile
				else if (tilematch == 11) {
					ids.push('tile1_square');
					ids.push( 'text_CdmsBdType2_' + str[i+1].charCodeAt(0) );
					i = i+2;
				}
				else if ((tilematch >= 12) && (tilematch <= 14)) {
					switch (tilematch) {
						case 12: var tile_id = 'tile1_detour_right'; break;
						case 13: var tile_id = 'tile1_detour_left'; break;
						case 14: var tile_id = 'tile1_detour_top'; break;
					}
					var tile_font = 'CdmsBdType2';
					if (ctn_fullcolor == true) {
						tile_id = tile_id + '_fc';
						tile_font = 'CdmsBdType1BoldBlack';
					}
					ids.push(tile_id);
					ids.push( 'text_' + tile_font + '_' + str[i+1].charCodeAt(0) );
					i = i+2;
				}
				//no match
				else {
					ids.push( 'text_' + tpl_font + '_' + char.charCodeAt(0) );
				}
			}
		}
		//regular characters
		else {
			ids.push( 'text_' + tpl_font + '_' + char.charCodeAt(0) );
		}
	}
	//get total width
	for (var i = 0; i < ids.length; i++) {
		//text
		if (ids[i].substr(0,4) == 'text') {
			var id = ids[i].substr(ids[i].indexOf('_',6)+1);
			var font = ids[i].substr(5, ids[i].indexOf('_',6)-5);
			width = width + sprites.font[font][id][2];
			if (ids[i+1]) width = width + tpl_charspacing;
		}
		//symbol
		else if (ids[i].substr(0,6) == 'symbol') {
			var id = ids[i].substr(ids[i].indexOf('_',6)+1);
			width = width + sprites.symbol[tpl_symbol][id][2];
			if (ids[i+1]) width = width + tpl_charspacing;
		}
		//tiles
		else {
			width = width + sprites.tiles[ids[i]][2];
			if (ids[i+1]) width = width + tpl_charspacing;
			//fix width for single-char tiles
			if ((ids[i].substr(0,5) == 'tile1') && !(ids[i+2])) width = width - tpl_charspacing;
			//if single-character tile, move pointer ahead as we're overdrawing the text on the tile border
			if (ids[i].substr(0,5) == 'tile1') i++;
		}
	}
	var return_value = [];
	return_value["ids"] = ids;
	return_value["width"] = width;
	return return_value;
}

function draw_text(ids, start, top, context) {
	var tile_down = 0;
	var tile_start = 0;
	var tile_single = 0;
	var image = document.getElementById('sprites');
	for (var i = 0; i < ids.length; i++) {

		//multi-char tile helper
		if ((ids[i] == 'tile_open') || (ids[i] == 'tile_s_open') || (ids[i] == 'tile_detour_right_open') || (ids[i] == 'tile_detour_left_open')) {
			if (tpl_font == 'CdmsBdType2') tile_down = 1;
			tile_start = start;
		}
		//single char tile helper
		if (ids[i].substr(0,5) == 'tile1') {
			if (tpl_font == 'CdmsBdType2') tile_down = 1;
		}
		
		//draw text
		if (ids[i].substr(0,4) == 'text') {
			var id = ids[i].substr(ids[i].indexOf('_',6)+1);
			var font = ids[i].substr(5, ids[i].indexOf('_',6)-5);
			//single tile helper
			if (tile_single > 0) {
				tile_start = start;
				//move start to left
				switch (tile_single) {
					case 11: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3; break;
					case 12: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3 - 11; break;
					case 13: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3 - 3; break;
					case 14: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3; break;
					case 15: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3 - 12; break;
					case 16: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3 - 4; break;
					case 17: start = start - sprites.font[font][id][2] - Math.floor((22 - sprites.font[font][id][2]) / 2) - 3 - 3; break;
				}
			}
			//calculate vertical position
			var down = top + Math.round((tpl_lineheight - sprites.font[font][id][3]) / 2) + tile_down;
			var width = sprites.font[font][id][2];
			//draw text
			if ((tpl_font == 'CdmsBdType3') || (tpl_font == 'CdmsBdType3Yellow')) {
				down = down + 1;
			}
			else {
				down = down + 2;
			}
			//draw text to canvas
			context.drawImage(image, sprites.font[font][id][0], sprites.font[font][id][1], sprites.font[font][id][2], sprites.font[font][id][3], start, down, sprites.font[font][id][2], sprites.font[font][id][3]);
		}
		//draw symbol
		else if (ids[i].substr(0,6) == 'symbol') {
			var id = ids[i].substr(ids[i].indexOf('_',6)+1);
			var down = top + Math.round((tpl_lineheight - sprites.symbol[tpl_symbol][id][3]) / 2) + tile_down;
			var width = sprites.symbol[tpl_symbol][id][2];
			context.drawImage(image, sprites.symbol[tpl_symbol][id][0], sprites.symbol[tpl_symbol][id][1], sprites.symbol[tpl_symbol][id][2], sprites.symbol[tpl_symbol][id][3], start, down, sprites.symbol[tpl_symbol][id][2], sprites.symbol[tpl_symbol][id][3]);
		}
		//draw tiles
		else {
			//calculate vertical position
			var id = ids[i];
			var down = top + Math.round((tpl_lineheight - sprites.tiles[id][3]) / 2) + tile_down;
			var width = sprites.tiles[id][2];
			//context.drawImage(image, start, down);
			context.drawImage(image, sprites.tiles[id][0], sprites.tiles[id][1], sprites.tiles[id][2], sprites.tiles[id][3], start, down, sprites.tiles[id][2], sprites.tiles[id][3]);
		}
		
		//set new left
		start = start + width + tpl_charspacing;
		//if (ids[i+1]) start = start + 3;
		//multi-char tile helper
		if ((ids[i] == 'tile_close') || (ids[i] == 'tile_s_close') || (ids[i] == 'tile_detour_right_close') || (ids[i] == 'tile_detour_left_close')) {
			tile_down = 0;
			if (ids[i] == 'tile_close') {
				//format [x0, y0, length]
				var linecoords = [
					//top
					[0, 0, start - tile_start - 7],
					//bottom
					[0, 19, start - tile_start - 7]
				];
			}
			else if (ids[i] == 'tile_detour_right_close') {
				//format [x0, y0, length]
				var linecoords = [
					//top
					[0, 0, start - tile_start - 15],
					//bottom
					[0, 21, start - tile_start - 15]
				];
			}
			else if (ids[i] == 'tile_detour_left_close') {
				//format [x0, y0, length]
				var linecoords = [
					//top
					[8, 0, start - tile_start - 15],
					//bottom
					[8, 21, start - tile_start - 15]
				];
			}
			else { //if (ids[i] == 'tile_s_close')
				//format [x0, y0, length]
				var linecoords = [
					//top
					[0, 3, 3],
					[3, 2, 5],
					[8, 1, 6],
					[14, 0, start - tile_start - 35],
					[start - tile_start - 21, 1, 6],
					[start - tile_start - 15, 2, 5],
					[start - tile_start - 10, 3, 3],
					//bottom
					[0, 20, 3],
					[3, 21, 5],
					[8, 22, 6],
					[14, 23, start - tile_start - 35],
					[start - tile_start - 21, 22, 6],
					[start - tile_start - 15, 21, 5],
					[start - tile_start - 10, 20, 3]
				];
			}
			for (var t = 0; t < linecoords.length; t++) {
				context.beginPath();
				context.moveTo(tile_start + 2 + linecoords[t][0], down + 0.5 + linecoords[t][1]);
				context.lineTo(tile_start + 2 + linecoords[t][0] + linecoords[t][2], down + 0.5 + linecoords[t][1]);
				context.strokeStyle = "#FFF";
				context.stroke();
			}
			//start = start + 3;
		}
		//single char tile helper
		if (tile_single > 0) {
			tile_down = 0;
			//if (tile_single >= 15) tile_down = 2;
			start = tile_start
			//start = tile_start + 3;
			tile_single = 0;
		}
		if (ids[i] == 'tile1_square') tile_single = 11;
		else if (ids[i] == 'tile1_detour_right') tile_single = 12;
		else if (ids[i] == 'tile1_detour_left') tile_single = 13;
		else if (ids[i] == 'tile1_detour_top') tile_single = 14;
		else if (ids[i] == 'tile1_detour_right_fc') tile_single = 15;
		else if (ids[i] == 'tile1_detour_left_fc') tile_single = 16;
		else if (ids[i] == 'tile1_detour_top_fc') tile_single = 17;
	}

}

function redraw_drip() {
	//get canvas
	var canvas = document.getElementById('drip');
	var context = canvas.getContext('2d');
	//disable AA
	context.imageSmoothingEnabled = false;
	//set background color
	context.fillStyle = '#000';
	context.fillRect(0, 0, tpl_size[0], tpl_size[1]);
	//draw picto
	var picto_width = 0;
	var picto_height = 0;
	if ((drip_i1 != null) && (sprites.picto[tpl_picto]) && (sprites.picto[tpl_picto][drip_i1.substr(5)])) {
		var image = document.getElementById('sprites');
		var id = drip_i1.substr(5);
		picto_width = sprites.picto[tpl_picto][id][2];
		picto_height = sprites.picto[tpl_picto][id][3];
		//if there can be no text under the image, draw image left center
		if (picto_height > tpl_size[1] - tpl_lineheight) {
			var picto_left = 0;
			var picto_top = Math.round((tpl_size[1] - picto_height) / 2);
		}
		//if there can be no text next to the image, draw image top center
		else if (picto_height <= tpl_lines[0]) {
			var picto_left = Math.round((tpl_size[0] - picto_width) / 2);
			var picto_top = 0;
		}
		//otherwise draw image top left
		else {
			var picto_left = 0;
			var picto_top = 0;
		}
		context.drawImage(image, sprites.picto[tpl_picto][id][0], sprites.picto[tpl_picto][id][1], sprites.picto[tpl_picto][id][2], sprites.picto[tpl_picto][id][3], picto_left, picto_top, sprites.picto[tpl_picto][id][2], sprites.picto[tpl_picto][id][3]);
	}
	//prepare text lines
	var line_info = [];
	var block_width = 0;
	for (var i = 0; i < tpl_lines.length; i++) {
		var str = $('#drip_t'+i).val();
		line_info[i] = prepare_text(str);
		if (tpl_align[i] == 'block') {
			block_width = Math.max(block_width, line_info[i]["width"]);
		}
	}
	//draw text lines
	for (var i = 0; i < tpl_lines.length; i++) {
		var ids = line_info[i]["ids"];
		var width = line_info[i]["width"];
		//decide start position
		var left;
		if (tpl_lines[i] < picto_height) left = picto_width+2; //text next to picto
		else left = 0; //no picto
		if (tpl_align[i] == 'right') {
			var start = tpl_size[0] - width;
		}
		else if (tpl_align[i] == 'left') {
			var start = left;
		}
		else if (tpl_align[i] == 'block') {
			var start = Math.max((tpl_size[0] - block_width), left);
		}
		else { //align center
			var start = Math.max((Math.round((tpl_size[0] - left - width) / 2) + left), left);
		}
		draw_text(ids, start, tpl_lines[i], context);
	}
	//separator line
	if (($('#drip_line').prop('checked') == true) && (tpl_line != -1)) {
		var top = Math.round((tpl_lines[tpl_line+1] - tpl_lines[tpl_line] + tpl_lineheight) / 2) + tpl_lines[tpl_line] + 0.5;
		if (top < picto_height) left = picto_width+2;
		else left = 2;
		context.beginPath();
		context.moveTo(left, top);
		context.lineTo((tpl_size[0] - 2), top);
		context.strokeStyle = "#FFF";
		context.stroke();
	}
}

function redraw_drip_onchange() {
	if (drip_changed == true) {
		redraw_drip();
		drip_changed = false;
	}
}
function redraw_drip_delayed() {
	setTimeout(redraw_drip, 1000);
}

function set_drip_changed() {
	drip_changed = true;
}

function set_alignment(i, align) {
	tpl_align[i] = align;
	set_drip_changed();
	set_align_button_state();
}

function move_line(start, direction) {
	if (direction == 'down') {
		//insert row, move all down from end to start
		for (var i = tpl_lines.length-1; i >= start; i--) {
			$('#drip_t'+(i+1)).val( $('#drip_t'+i).val() ); //line text
			tpl_align[(i+1)] = tpl_align[i]; //alignment
		}
		//clear start line
		$('#drip_t'+start).val('');
	}
	else if (direction == 'up') {
		//remove row, move all up from start+1 to end
		//if (start == 0) start = 1;
		for (var i = start; i < tpl_lines.length; i++) {
			$('#drip_t'+i).val( $('#drip_t'+(i+1)).val() ); //line text
			tpl_align[i] = tpl_align[i+1]; //alignment
		}
		//clear last line
		$('#drip_t'+(tpl_lines.length-1)).val('');
	}
	set_drip_changed();
}

function clear_line(line) {
	$('#drip_t'+line).val('');
	set_drip_changed();
}

function clear_all_lines() {
	$('.drip_t').each( function() {
		$(this).val('');
	});
	set_drip_changed();
}

function set_image(id) {
	drip_i1 = id;
	set_drip_changed();
}

function unset_image() {
	drip_i1 = null;
	set_drip_changed();
}

function insert_text(text) {
	$(active_textarea).replaceSelectedText(text, "collapseToEnd");
	$(active_textarea).focus();
	set_drip_changed();
}

function insert_tile(type) {
	var id = '#ins_tile_' + type;
	var value = $(id).val();
	var valuematch  = false;
	//check for valid string
	switch (type) {
		case 'regular':
			if (value.match(/^[ANsU][0-9]{1,3}$/) != null) {
				valuematch = true;
				value = '[' + value + ']';
			}
			break;
		case 'afrit':
			if (value.match(/^[0-9]{0,2}[0-9a-z]{1}$/) != null) {
				valuematch = true;
				value = '[a' + value + ']';
			}
			break;
		case 'sroute':
			if (value.match(/^[0-9]{3}$/) != null) {
				valuematch = true;
				value = '{s' + value + '}';
			}
			break;
		case 'omll':
			if ((value.match(/^[A-Z0-9]$/) != null) || (value.match(/^[A-Z0-9][A-Za-z-0-9]$/) != null)) {
				valuematch = true;
				value = '<' + value + '<';
			}
			break;
		case 'omlr':
			if ((value.match(/^[A-Z0-9]$/) != null) || (value.match(/^[A-Z0-9][A-Za-z-0-9]$/) != null)) {
				valuematch = true;
				value = '>' + value + '>';
			}
			break;
		case 'omlb':
			if (value.match(/^[A-Z0-9]{1}$/) != null) {
				valuematch = true;
				value = '^' + value + '^';
			}
			break;
	}
	//if invalid string, warn
	if (valuematch == false) {
		alert('Geen geldige waarde voor tegeltje.');
	}
	//else insert
	else {
		insert_text(value);
	}
}

function set_template(i) {
	//set template values
	tpl_name = tpl[i].name;
	tpl_size = tpl[i].size;
	tpl_lines = tpl[i].lines;
	tpl_lineheight = tpl[i].lineheight;
	tpl_line = tpl[i].line;
	tpl_font = tpl[i].font;
	tpl_picto = tpl[i].picto;
	tpl_symbol = tpl[i].symbol;
	if ((tpl_font == 'CdmsBdType3') || (tpl_font == 'CdmsBdType3Yellow')) tpl_charspacing = 2;
	else tpl_charspacing = 3;
	load_template();
}

function load_template() {
	//set canvas size
	var canvas = document.getElementById('drip');
	canvas.width = tpl_size[0];
	canvas.height = tpl_size[1];
	//load picto
	load_picto(tpl_picto);
	//load symbols
	load_symbols(tpl_symbol);
	//show-hide input lines
	$('.drip_input').hide();
	for (var i = 0; i < tpl_lines.length; i++) {
		$('#drip_input'+i).show();
	}
	//show-hide separator line gui
	if (tpl_line == -1) {
		$('#drip_line_gui').hide();
	}
	else {
		$('#drip_line_gui').show();
	}
	//show-hide tiles gui
	if ((tpl_font == 'CdmsBdType3') || (tpl_font == 'CdmsBdType3Yellow')) {
		$('#fieldset_tiles').hide();
	}
	else {
		$('#fieldset_tiles').show();
	}
	//set template info
	set_template_info();
	set_drip_changed();
	redraw_drip_delayed();
}

function download_image(drip) {
	var canvas = document.getElementById(drip);
	var canvasData = canvas.toDataURL();
	canvasData = encodeURIComponent(canvasData);
  	canvasData.replace(/~/g,'%7E').replace(/%20/g,'+');
	window.open('download.php?type='+$('input:radio[name=filetype]:checked').val()+'&data='+canvasData+'&sav='+save_drip());
}

function save_drip() {
	var save = { 
		v: 1,
		t: {
			n: tpl_lines,
			c: tpl_size,
			a: tpl_align,
			h: tpl_lineheight,
			l: tpl_line,
			f: tpl_font,
			p: tpl_picto,
			s: tpl_symbol
		},
		c: {
			t: [],
			l: 0,
			i1: drip_i1
		}
	};
	for (var i = 0; i < tpl_lines.length; i++) {
		save.c.t[i] = $('#drip_t'+i).val();
	}
	if (($('#drip_line').prop('checked') == true) && (tpl_line != -1)) save.c.l = 1;
	return JSON.stringify(save);
}

function load_drip(md5) {
	$.getJSON('load.php', { md5: md5 }, function(save) {
		//load values
		if (save.v == 1) {
			//template
			tpl_lines = save.t.n;
			tpl_size = save.t.c;
			tpl_align = save.t.a;
			tpl_lineheight = save.t.h;
			tpl_line = save.t.l;
			tpl_font = save.t.f;
			tpl_picto = save.t.p;
			tpl_symbol = save.t.s;
			if ((tpl_font == 'CdmsBdType3') || (tpl_font == 'CdmsBdType3Yellow')) tpl_charspacing = 2;
			else tpl_charspacing = 3;
			if (!tpl_size) { //backward compatibility for saves without size definition
				tpl_size = [192, 128];
			}
			//set content
			for (var i = 0; i < tpl_lines.length; i++) {
				$('#drip_t'+i).val(save.c.t[i]);
			}
			//set separator line
			if (save.c.l == 1) $('#drip_line').prop('checked', true);
			else $('#drip_line').prop('checked', false);
			drip_i1 = save.c.i1;
			//process loading template
			load_template();
			//set template selection
			$('#drip_template').hide();
			if ($('#template_class_select_from_history').length == 0) {
				$('#drip_template_class').prepend('<option id="template_class_select_from_history" value="" disabled="disabled" selected="selected">(van geladen historie)</option>');
			}
			//set alignment button state
			set_align_button_state();
		}
		else {
			alert('Unknown save version.');
		}
	})
	.done( function() {
		redraw_drip_delayed();
	})
	.fail( function() {
		alert('Kan beeldstand niet laden. Geen beeldstanddata beschikbaar.');
	});
}

function load_templates_list() {
	//clear existing
	$('#drip_template').find('option').remove();
	//add new
	var template_set = false;
	var tpl_match_id;
	var tpl_match_val = 10000;
	for (var i = 0; i < tpl.length; i++) {
		if (tpl[i].class == active_template_class) {
			$('#drip_template').append('<option value="'+i+'">'+tpl[i].name+'</option>');
			//calculate match for this template, lowest is best
			var this_match_val = 0;
			if (tpl_lines.length > 0) {
				for (var ii = 0; ii < 5; ii++) {
					var value_old = 0;
					var value_new = 0;
					if (typeof tpl_lines[ii] !== 'undefined') value_old = tpl_lines[ii];
					if (typeof tpl[i].lines[ii] !== 'undefined') value_new = tpl[i].lines[ii];
					this_match_val = this_match_val + Math.abs(value_old - value_new);
				}
				this_match_val = this_match_val + Math.abs(tpl[i].line - tpl_line) * 10;
				
			}
			if (this_match_val < tpl_match_val) {
				tpl_match_val = this_match_val;
				tpl_match_id = i;
			}
		}
	}
	//set template
	set_template(tpl_match_id);
	$('#drip_template option[value=' + tpl_match_id + ']').prop('selected', true);
}

function set_template_info() {
	var text = tpl_size[0] + '&times;' + tpl_size[1] + 'px ' + tpl_lines.length + ((tpl_lines.length == 1) ? ' regel ' : ' regels ') + tpl_font + ' pictogram ' + tpl_picto.substr(6);
	$('#drip_template_info').html(text);
}

function set_align_button_state() {
	$('img.alignment').removeClass('alignmentactive');
	for (var i = 0; i < tpl.length; i++) {
		$('img#alignment_' + tpl_align[i] + '_' + i).addClass('alignmentactive');
	}
}

$(document).ready(function () {
	//load template classes
	for (var i = 0; i < template_classes.length; i++) {
		$('#drip_template_class').append('<option value="'+template_classes[i].id+'">'+template_classes[i].name+'</option>');
		//set first class for use
		if (typeof active_template_class === 'undefined') active_template_class = template_classes[i].id;
	}
	//load templates
	load_templates_list();
	//set alignment button state
	set_align_button_state();
	//change template class
	$('#drip_template_class').change( function() {
		if ($('#template_class_select_from_history').length > 0) {
			$('#template_class_select_from_history').remove();
		}
		$('#drip_template').show();
		active_template_class = $(this).val();
		load_templates_list();
		//close template editor
		$('#templateeditor').dialog('close');
	});
	//change template
	$('#drip_template').change( function() {
		set_template($(this).val());
		//close template editor
		$('#templateeditor').dialog('close');
	});
	
	//get textarea in use and position in it
	function reportSelection() {
    	var sel = $(this).getSelection();
		active_textarea = this;
    }
	$('input.drip_t').on("input textInput mouseup focus", reportSelection);
	$('input.drip_t').on("input textInput", set_drip_changed);
	
	//draw line
	$('#drip_line').change( function() {
		set_drip_changed();
	});
		
	//full color
	if ($('#drip_fullcolor').prop('checked') == true) ctn_fullcolor = true;
	$('#drip_fullcolor').change( function() {
		if ($('#drip_fullcolor').prop('checked') == true) ctn_fullcolor = true;
		else ctn_fullcolor = false;
		set_drip_changed();
	});
		
	setInterval(redraw_drip_onchange, 100);
});