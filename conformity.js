/*
This file is part of WebDRIP Designer
Copyright (C) 2017 Jasper Vries

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

var conformity_err = [];
var conformity_txt = {
	i_J34:		'Overweeg het gebruik van nieuw ongeval-pictogram',
	i_Goomba:	'Overweeg een Italiaanse loodgieter te bellen',
	t_slash:	'Gebruik geen schuine streep tussen wegnummers die een te volgen route aangeven',
	t_max:		'Gebruik maximaal twee wegnummer achter elkaar in routeadvies',
	t_doel:		'Plaats wegnummer gebruikt als doel/bestemming niet in tegeltje',
	t_brugdicht:'Gebruik \'gestremd\' i.p.v. \'dicht\' bij brug',
	u_pos_r: 	'Naar rechts wijzende pijl moet rechts worden geplaatst',
	u_pos_l: 	'Naar links wijzende pijl moet links worden geplaatst',
	u_dir_r:	'Uitlijning komt niet overeen met pijlrichting, aanbevolen uitlijning \'Pijl rechts\'',
	u_dir_l:	'Uitlijning komt niet overeen met pijlrichting, aanbevolen uitlijning \'Pijl links\'',
	u_blk_r:	'Pijl dient zo veel mogelijk vrij gehouden te worden, aanbevolen uitlijning \'Pijl rechts\'',
	u_blk_l:	'Pijl dient zo veel mogelijk vrij gehouden te worden, aanbevolen uitlijning \'Pijl links\'',
	t_Volg:		'Gebruik geen hoofdletter voor \'volg\'',
	t_Via:		'Gebruik geen hoofdletter voor \'via\'',
	t_Dicht:	'Gebruik geen hoofdletter voor \'dicht\'',
	t_centrum:	'Gebruik beginhoofdletter voor \'Centrum\'',
	t_volgvia:	'Gebruik bij voorkeur \'via\' i.p.v. \'volg\'',
	s_J34:		'Overweeg het gebruik van nieuw ongeval-symbool',
	s_centrico:	'Overweeg het gebruik van nieuwe Centrico-pijl',
	s_centrum:	'Overweeg het gebruik van centrum-symbool i.c.m. tekst \'Centrum\' i.v.m. herkenbaarheid',
	s_afrit:	'Overweeg het gebruik van een afritnummer in tegeltje',
	t_wegnr:	'Gebruik indien mogelijk tegeltje voor wegnummer',
	l_onnodig:	'Scheidingslijn niet nodig vanwege lege tekstregel',
	l_4regel:	'Overweeg het gebruik van horizontale scheidingslijn',
	t_richting:	'Gebruik bij voorkeur \'ri\' i.p.v. \'richting\'',
	t_space:	'Gebruik indien mogelijk spatie tussen tekst en pijl',
	i_tnldicht:	'Gebruik tekst \'dicht\' i.v.m. kleurenblinden',
	i_pvol:		'Gebruik tekst \'VOL\' of \'dicht\' i.v.m. kleurenblinden',
	
};
var str_fulltext = '';

function conformity_check() {
	//check each line
	for (var i = 0; i < tpl_lines.length; i++) {
		conformity_line(i);
	}
	//display messages for each line, handled sequentially because messages for line 0 can be pushed from the last line
	for (var i = 0; i < tpl_lines.length; i++) {
		conformity_message(i);
	}
}

function conformity_line(line) {
	//handle text
	var str = $('#drip_t'+line).val();
	if (line == 0) {
		str_fulltext = str;
		var str_prev = '';
	}
	else {
		str_fulltext += ' ' + str;
		var str_prev = $('#drip_t'+(line-1)).val();
	}
	//reset error list
	if (typeof conformity_err[line] !== 'undefined') {
		conformity_err[line].length = 0;
	}
	else {
		conformity_err[line] = [];
	}
	//match on first line only
	if (line == 0) {
		if ((drip_i1 == 'pictoJ34') || (drip_i2 == 'pictoJ34') || (drip_i1 == 'pictoRJ34') || (drip_i2 == 'pictoRJ34') || (drip_i1 == 'pictoRL13J34') || (drip_i2 == 'pictoRL13J34')) {
			conformity_err[line].push('i_J34');
		}
		if ((drip_i1 == 'pictoRJ33goomba') || (drip_i2 == 'pictoRJ33goomba') ) {
			conformity_err[line].push('i_Goomba');
		}
	}
	//match on lookback
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(([AN][0-9]+\]?)|([sS][0-9]{3}\}?))\/((\[?[AN][0-9]+)|(\{?[sS][0-9]{3}))/) != null))
		|| ((str.match(/(\b|\d)(volg|via)(\b|\d).*(([AN][0-9]+\]?)|([sS][0-9]{3}\}?))\/((\[?[AN][0-9]+)|(\{?[sS][0-9]{3}))/) != null)) ) {
		conformity_err[line].push('t_slash');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(([AN][0-9]+\]?)|([sS][0-9]{3}\}?)).*((\[?[AN][0-9]+\]?)|(\{?[sS][0-9]{3}\}?)).*((\[?[AN][0-9]+)|(\{?[sS][0-9]{3}))/) != null))
		|| ((str.match(/(\b|\d)(volg|via)(\b|\d).*(([AN][0-9]+\]?)|([sS][0-9]{3}\}?)).*((\[?[AN][0-9]+\]?)|(\{?[sS][0-9]{3}\}?)).*((\[?[AN][0-9]+)|(\{?[sS][0-9]{3}))/) != null)) ) {
		conformity_err[line].push('t_max');
	}
	if ((str.match(/((\[[AN][0-9]+\])|(\{[sS][0-9]{3}\})) +(volg|via)(\b|\d)/) != null)) {
		conformity_err[line].push('t_doel');
	}
	if ((str.match(/^((\$\$)*\$0[0-9]{2})? *(volg|via)(\b|\d)/i) != null) && (str_prev.match(/((\[[AN][0-9]+\])|(\{[sS][0-9]{3}\})) *$/) != null)) {
		conformity_err[line-1].unshift('t_doel');
	}
	//match on fulltext
	if ( (((drip_i1 == 'pictoJ15') || (drip_i2 == 'pictoJ15')) && (str.match(/(\b|\d)dicht(\b|\d)/i) != null))
		|| ((str_fulltext.match(/brug(\b|\d)/) != null) && (str.match(/(\b|\d)dicht(\b|\d)/i) != null))
		|| ((str_fulltext.match(/(^|[^\$])(\$\$)*\$130/) != null) && (str.match(/(\b|\d)dicht(\b|\d)/i) != null)) ) {
		conformity_err[line].push('t_brugdicht');
	}
	//match on all lines individually
	if (str.match(/[a-z][^\$]*(\$\$)*\$0[0-9][1357]$/i) != null) {
		conformity_err[line].push('u_pos_l');
	}
	if (str.match(/(^|[^\$])(\$\$)*\$0[0-9][246].*[a-z]/i) != null) {
		conformity_err[line].push('u_pos_r');
	}
	//match on lookback
	if ((str.match(/(^|[^\$])(\$\$)*\$0[0-9][246]/i) != null) && (['arrowright', 'block', 'right'].indexOf(tpl_align[line]) < 0)) {
		conformity_err[line].push('u_dir_r');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][246]/) != null) && (['arrowright', 'block', 'right'].indexOf(tpl_align[line-1]) < 0))
		|| ((str_prev.length > 0) && (str.match(/^ *(\b|\d)(volg|via)(\b|\d).*[^\$](\$\$)*\$0[0-9][246]/i) != null) && (['arrowright', 'block', 'right'].indexOf(tpl_align[line-1]) < 0)) ) {
		conformity_err[line-1].unshift('u_dir_r');
	}
	if ((str.match(/(^|[^\$])(\$\$)*\$0[0-9][1357]/) != null) && (['left', 'arrowleft'].indexOf(tpl_align[line]) < 0)) {
		conformity_err[line].push('u_dir_l');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][1357]/) != null) && (['left', 'arrowleft'].indexOf(tpl_align[line-1]) < 0))
		|| ((str_prev.length > 0) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][1357] *(volg|via)(\b|\d)/i) != null) && (['left', 'arrowleft'].indexOf(tpl_align[line-1]) < 0)) ) {
		conformity_err[line-1].unshift('u_dir_l');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][246]/) != null) && (tpl_align[line] != 'arrowright'))
		|| ((str_prev.length > 0) && (str.match(/^ *(\b|\d)(volg|via)(\b|\d).*[^\$](\$\$)*\$0[0-9][246]/i) != null) && (tpl_align[line] != 'arrowright')) ) {
		conformity_err[line].push('u_blk_r');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][246]/) != null) && (tpl_align[line-1] != 'arrowright'))
		|| ((str_prev.length > 0) && (str.match(/^ *(\b|\d)(volg|via)(\b|\d).*[^\$](\$\$)*\$0[0-9][246]/i) != null) && (tpl_align[line-1] != 'arrowright')) ) {
		conformity_err[line-1].unshift('u_blk_r');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/^\$(\$\$)*0[0-9][01357]/) != null) && (tpl_align[line] != 'arrowleft'))
		|| ((str_prev.length > 0) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][1357] *(volg|via)(\b|\d)/i) != null) && (tpl_align[line] != 'arrowleft')) ) {
		conformity_err[line].push('u_blk_l');
	}
	if ( ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/^\$(\$\$)*0[0-9][01357]/) != null) && (tpl_align[line-1] != 'arrowleft'))
		|| ((str_prev.length > 0) && (str.match(/(^|[^\$])(\$\$)*\$0[0-9][1357] *(volg|via)(\b|\d)/i) != null) && (tpl_align[line-1] != 'arrowleft')) ) {
		conformity_err[line-1].unshift('u_blk_l');
	}
	//match on all lines individually
	if (str.match(/(\b|\d)Volg(\b|\d)/) != null) {
		conformity_err[line].push('t_Volg');
	}
	if (str.match(/(\b|\d)Via(\b|\d)/) != null) {
		conformity_err[line].push('t_Via');
	}
	if (str.match(/(\b|\d)Dicht(\b|\d)/) != null) {
		conformity_err[line].push('t_Dicht');
	}
	if (str.match(/(\b|\d)centrum(\b|\d)/) != null) {
		conformity_err[line].push('t_centrum');
	}
	//match on lookback
	if (str.match(/volg *((\[?[ANa][0-9]+)|(\{?[sS][0-9]{3}))/) != null) {
		conformity_err[line].push('t_volgvia');
	}
	if ((str_prev.match(/(\b|\d)volg(\b|\d) *$/i) != null) && (str.match(/((\[?[ANa][0-9]+)|(\{?[sS][0-9]{3}))/) != null)) {
		conformity_err[line-1].push('t_volgvia');
	}
	//match on all lines individually
	if (str.match(/(^|[^\$])(\$\$)*\$111/) != null) {
		conformity_err[line].push('s_J34');
	}
	if (str.match(/(^|[^\$])(\$\$)*\$09[0-9]/) != null) {
		conformity_err[line].push('s_centrico');
	}
	if (str.match(/(^|[^\$])(\$\$)*\$500(?! *centrum)/i) != null) {
		conformity_err[line].push('s_centrum');
	}
	if (str.match(/(^|[^\$])(\$\$)*\$210 *[0-9]/) != null) {
		conformity_err[line].push('s_afrit');
	}
	//match on lookback
	if ((tpl_font == 'CdmsBdType1') || (tpl_font == 'CdmsBdType2')) {
		if ( ((str.match(/(([AN][0-9]{1,3}(?!(\d|])))|([sS][0-9]{3}(?!\}[^\]\}]*)))[^\]\}]*(\b|\d)(dicht|gestremd)(\b|\d)/) != null)) 
			|| ((str_prev.match(/(\b|\d)(volg|via)(\b|\d) *$/i) != null) && (str.match(/(([AN][0-9]{1,3}(?!(\d|])))|([sS][0-9]{3}(?!\})))/) != null))
			|| ((str.match(/(\b|\d)(volg|via)(\b|\d).*(([AN][0-9]{1,3}(?!(\d|])))|([sS][0-9]{3}(?!\})))/) != null)) ) {
			conformity_err[line].push('t_wegnr');
		}
		if ((str_prev.match(/(([AN][0-9]{1,3}(?!(\d|])))|([sS][0-9]{3}(?!\})))/) != null) && (str.match(/(\b|\d)(dicht|gestremd)(\b|\d)/) != null))  {
			conformity_err[line-1].push('t_wegnr');
		}
	}
	//horizontal line
	if ((drip_line_active == 1) && (str.length == 0) && (tpl_line >= 0) && ((tpl_line + 1 == line) || (tpl_line == line))) {
		conformity_err[line].push('l_onnodig');
	}
	if ((tpl_line >= 0) &&(drip_line_active != 1) && (tpl_line + 1 == line) && (tpl_lines.length >= 5) && (str.length > 0) && (str_prev.length > 0)) {
		conformity_err[line].push('l_4regel');
	}
	//match on all lines individually
	if (str.match(/(\b|\d)richting(\b|\d)/i) != null) {
		conformity_err[line].push('t_richting');
	}
	if ( (str.match(/\$0[1-9][0-9]\S/) != null)
		|| (str.match(/\S\$0[1-9][0-9]/) != null) ) {
		conformity_err[line].push('t_space');
	}
	//on last line only
	if (line + 1 == tpl_lines.length) {
		//match on full text
		if (((drip_i1 == 'pictoRL13C1') || (drip_i2 == 'pictoRL13C1')) && (str_fulltext.match(/(\b|\d)dicht(\b|\d)/) == null)) {
			conformity_err[0].push('i_tnldicht');
		}
		if (((drip_i1 == 'pictoE4C1') || (drip_i2 == 'pictoE4C1')) && (str_fulltext.match(/(\b|\d)(dicht|VOL|vol)(\b|\d)/) == null)) {
			conformity_err[0].push('i_pvol');
		}
	}
}

function conformity_message(line) {
	//output error messages
	if (typeof conformity_err[line][0] !== 'undefined') {
		$('#drip_input_error' + line).html(conformity_txt[conformity_err[line][0]]);
	}
	else {
		$('#drip_input_error' + line).html('');
	}
}
