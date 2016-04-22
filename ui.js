/*
This file is part of WebDRIP Designer
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

var currentpage = 0;
var nextpage;
var prevpage;

$(document).ready(function () {
	//menu items
	$('#menu li a').click( function() {
		var title;
		var page = $(this).attr('id');
		page = page.substring(5);
		switch (page) {
			case 'about': title = 'Over de WebDRIP Designer'; break;
			case 'manual': title = 'Korte handleiding'; break;
			case 'changelog': title = 'Versiehistorie'; break;
			case 'issues': title = 'Bekende problemen'; break;
			case 'contact': title = 'Contact'; break;
			case 'history': title = 'Historielijst'; break;
		}
		
		$('#dialog').html('laden...');
		
		if (page != 'history') {
			$('#dialog').dialog({
				minWidth:600, 
				width: 600,
				height: 'auto',
				position: { my: "center top", at: "center top", of: window },
				title: title
			});
		}
		else {
			$('#dialog').dialog({
				width: $(window).width() - 32, 
				height: $(window).height() - 32, 
				position: { my: "center top", at: "center top", of: window },
				title: title
			});
		}
		
		$('#dialog').load(page+'.html', function() {
			if (page == 'history') {
				showhistory(currentpage);
				//history navigation
				$('#history_first_a').click(function() {
					showhistory(0);
				});
				$('#history_newer_a').click(function() {
					showhistory(prevpage);
				});
				$('#history_older_a').click(function() {
					showhistory(nextpage);
				});
			}
		});
	});
	
	/*
	* special characters
	*/
	
	$('#specialchars').dialog({
		autoOpen: false,
		minWidth: 200, 
		width: 200,
		height: 'auto',
		position: { my: "left top", at: "right top", of: '#drip_text' },
		title: 'Speciale tekens'}
	);
	
	$('#open_special_chars').click(function() {
		//open dialog
		$('#specialchars').dialog('open');
	});
	
	/*
	* template editor
	*/
	$('#templateeditor').dialog({
		autoOpen: false,
		minWidth: 300, 
		width: 300,
		height: 'auto',
		position: { my: "right top", at: "right top", of: window },
		title: 'LiveEditor'}
	);
	$('#drip_template_info').click(function() {
		//open dialog
		$('#templateeditor').dialog('open');
		//load values
		$('#template_editor_width').val(tpl_size[0]);
		$('#template_editor_height').val(tpl_size[1]);
		$('#template_editor_picto').val(tpl_picto);
		$('#template_editor_num_picto').val(tpl_num_picto);
		$('#template_editor_font').val(tpl_font);
		$('#template_editor_charspacing').val(tpl_charspacing);
		$('#template_editor_lines').val(tpl_lines.length);
		$('.template_editor_lineblock').hide();
		for (var i = 0; i < tpl_lines.length; i++) {
			$('#template_editor_line_' + i).val(tpl_lines[i]);
			$('#template_editor_lineblock_' + i).show();
		}
		$('#template_editor_lineheight').val(tpl_lineheight);
		$('#template_editor_line').val(tpl_line);
	});
	//onchange events
	//font change, set default char spacing
	$('#template_editor_font').change( function() {
		if (($('#template_editor_font').val() == 'CdmsBdType3') || ($('#template_editor_font').val() == 'CdmsBdType3Yellow')) {
			$('#template_editor_charspacing').val(2);
		}
		else {
			$('#template_editor_charspacing').val(3);
		}
	});
	//update drip
	$('.template_editor_val').change( function() {
		if (($('#template_editor_width').val() >= 32) && ($('#template_editor_width').val() <= 512) && ($('#template_editor_height').val() >= 32) && ($('#template_editor_height').val() <= 256)) {
			tpl_size = [];
			tpl_size.push(parseInt($('#template_editor_width').val()));
			tpl_size.push(parseInt($('#template_editor_height').val()));
		}
		tpl_picto = $('#template_editor_picto').val();
		tpl_num_picto = $('#template_editor_num_picto').val();
		tpl_font = $('#template_editor_font').val();
		if (tpl_font == 'CdmsBdType1') {
			tpl_symbol = 'Regel_22';
		}
		else if (tpl_font == 'CdmsBdType2') {
			tpl_symbol = 'Regel_19';
		}
		else if (tpl_font == 'CdmsBdType3') {
			tpl_symbol = 'Regel_15';
		}
		else if (tpl_font == 'CdmsBdType3Yellow') {
			tpl_symbol = 'Regel_15_geel';
		}
		if (($('#template_editor_charspacing').val() >= 0) && ($('#template_editor_charspacing').val() <= 8)) {
			tpl_charspacing = parseInt($('#template_editor_charspacing').val());
		}
		if (($('#template_editor_lines').val() >= 1) && ($('#template_editor_lines').val() <= 5)) {
			tpl_lines = [];
			$('.template_editor_lineblock').hide();
			for (var i = 0; i < $('#template_editor_lines').val(); i++) {
				tpl_lines.push(parseInt($('#template_editor_line_' + i).val()));
				$('#template_editor_lineblock_' + i).show();
			}
		}
		if (($('#template_editor_lineheight').val() >= 8) && ($('#template_editor_lineheight').val() <= 32)) {
			tpl_lineheight = parseInt($('#template_editor_lineheight').val());
		}
		if (($('#template_editor_line').val() >= -1) && ($('#template_editor_line').val() <= 32)) {
			tpl_line = parseInt($('#template_editor_line').val());
		}
		//set template selection
		$('#drip_template').hide();
		if ($('#template_class_select_from_history').length == 0) {
			$('#drip_template_class').prepend('<option id="template_class_select_from_history" value="" disabled="disabled" selected="selected">(aangepast)</option>');
		}
		load_template();
	});

	//tiles
	$('#fieldset_tiles input').keyup(function(event) {
		if(event.keyCode == 13){
			var type = $(this).attr('id');
			type = type.substr(type.lastIndexOf('_')+1);
			insert_tile(type);
		}
	});
	
	//clear all
	$('#drip_clear_all').click( function() {
		clear_all_lines();
		if (tpl_num_picto == 2) {
			picto_active = 2;
			unset_image();
		}
		picto_active = 1;
		unset_image();
		$('#drip_line').prop('checked', false);
		set_active_picto_buttons();
	});

	//load examples
	function loadexamples() {
		var windowheight = $(window).height();
		$.get( "examples.php", { h: windowheight, l:$('#example_select').val() }, function( data ) {
			var htmlstring = '';
			for (var i = 0; i < data.length; i++) {
				htmlstring += '<a onclick="load_drip(\'' + data[i] + '\')" class="drip-example"><img src="store/' + data[i].substr(0,1) + '/' + data[i] + '.png"></a>';
			}
			$('#examples').html(htmlstring);
		}, "json" );
	}
	$(window).resize(function() {
		loadexamples();
	});
	setInterval(loadexamples, 60000);
	loadexamples();
	//example selection limiting change
	$('#example_select').change( function () {
		loadexamples();
		$('#dialog').dialog('close');
	});
	
	/*
	* download image
	*/
	$('#download_button').click( function() {
		var canvas = document.getElementById('drip');
		var canvasData = canvas.toDataURL();
		canvasData = encodeURIComponent(canvasData);
		canvasData.replace(/~/g,'%7E').replace(/%20/g,'+');
		$('#form_data').val(canvasData);
		$('#form_sav').val(save_drip());
	});
	
	/*
	* active picto
	*/
	set_active_picto_buttons();
	$('#picto_select_1').click( function() {
		picto_active = 1;
		set_active_picto_buttons();
	});
	$('#picto_select_2').click( function() {
		picto_active = 2;
		set_active_picto_buttons();
	});
});

//set active picto buttons
function set_active_picto_buttons() {
	if (tpl_num_picto > 1) {
		$('#picto_select_1').show();
		$('#picto_select_2').show();
	}
	else {
		picto_active = 1;
		$('#picto_select_1').hide();
		$('#picto_select_2').hide();
	}
	if (picto_active == 2) {
		$('#picto_select_1').removeClass('buttonactive');
		$('#picto_select_2').addClass('buttonactive');
	}
	else { //picto 1 active
		$('#picto_select_1').addClass('buttonactive');
		$('#picto_select_2').removeClass('buttonactive');
	}
}

//show history
function showhistory(num_start) {
	$.get( "examples.php", { s: num_start, w: $('#dialog').width(), h:$('#dialog').height(), l:$('#example_select').val() }, function( data ) {
		currentpage = num_start;
		nextpage = data['o'];
		prevpage = data['n'];
		totalcount = data['t'];
		creator = data['c'];
		data = data['i'];
		var htmlstring = '';
		for (var i = 0; i < data.length; i++) {
			htmlstring += '<a onclick="load_history(\'' + data[i] + '\')" class="drip-history" title="' + creator[i] + '"><img src="store/' + data[i].substr(0,1) + '/' + data[i] + '.png" alt="' + creator[i] + '"></a>';
		}
		$('#historycontainer').html(htmlstring);
		//display and update navigation buttons
		if (prevpage < 0) {
			$('#history_newer_li').hide();
			$('#history_first_li').hide();
		}
		else {
			$('#history_newer_li').show();
			$('#history_first_li').show();
		}
		if (nextpage == 0) $('#history_older_li').hide();
		else $('#history_older_li').show();
		//update title
		$('#dialog').dialog({
			title: 'Historielijst: ' + (num_start + 1) + '-' + (num_start + data.length) + ' van ' + totalcount
		});
	}, "json" );
}

//load example from history
function load_history(md5) {
	load_drip(md5);
	$('#dialog').dialog('close');
}

//load symbols
function load_symbols(size) {
	$('#drip_symbol').html('');
	$.each(sprites.symbol[size], function(i, val) {
		$('#drip_symbol').append('<span onclick="insert_text(\'$' + ('000' + i).substring(i.length) + '\')" class="drip_s" title="Regelsymbool ' + ('000' + i).substring(i.length) + ' invoegen"><span style="display: block; width: ' + val[2] + 'px; height: ' + val[3] + 'px; background: url(\'sprites.png\') -' + val[0] + 'px -' + val[1] + 'px;"></span></span>');
	});
}

//load picto
function load_picto(size) {
	$('#drip_picto').html('');
	if (sprites.picto[size]) {
		var preferred_picto = ['E12', 'E4C1', 'E4', 'J15', 'J16', 'RJ16', 'J33', 'RJ33', 'J34', 'RJ34', 'J34v2', 'RJ34v2', 'J37', 'RL13C1'];
		$.each(sprites.picto[size], function(i, val) {
			$('#drip_picto').append('<span onclick="set_image(\'picto' + i + '\')" class="drip_i' + ( ($.inArray(i, preferred_picto) >= 0) ? ' picto_pref' : '' ) + '" title="Pictogram ' + i + ' invoegen"><span style="display: block; width: ' + val[2] + 'px; height: ' + val[3] + 'px; background: url(\'sprites.png\') -' + val[0] + 'px -' + val[1] + 'px;"></span></span>');
		});
	}
	//show-hide picto gui
	if (tpl_picto == 'Picto_0') {
		$('#fieldset_picto').hide();
	}
	else {
		$('#fieldset_picto').show();
	}
	//preferred picto
	if (picto_show_all == false) {
		$('#picto_show_pref').hide();
		$('.drip_i').hide();
		$('.picto_pref').show();
	}
	else {
		$('#picto_show_all').hide();
	}
	//change picto
	$('#picto_show_all').click( function() {
		picto_show_all = true;
		$('#picto_show_all').hide();
		$('#picto_show_pref').show();
		$('.drip_i').show();
	});
	$('#picto_show_pref').click( function() {
		picto_show_all = false;
		$('#picto_show_pref').hide();
		$('#picto_show_all').show();
		$('.drip_i').hide();
		$('.picto_pref').show();
	});
}
