/*
This file is part of WebDRIP Designer
Copyright (C) 2013-2020, 2022-2023 Jasper Vries

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

var tpl = [];
var template_classes = [];
/*
 * Den Haag Templates
*/
template_classes.push({
	id: 'gdh_stadsdrip',
	name: 'GDH StadsDRIP'
});
tpl.push({
	name: 'Small 1+2',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	lines: [12, 74, 104],
	lineheight: 24,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_40',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Small 1+3',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	lines: [12, 48, 76, 104],
	lineheight: 24,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_40',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Small 2+2',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	lines: [0, 30, 74, 104],
	lineheight: 24,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_40',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Small 2+3',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	lines: [0, 25, 54, 79, 104],
	lineheight: 24,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_40',
	symbol: 'Regel_19'
});
template_classes.push({
	id: 'gdh_bermdrip',
	name: 'GDH BermDRIP'
});
tpl.push({
	name: 'SmallPlus 1+2',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [12, 74, 104],
	lineheight: 26,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_48',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'SmallPlus 1+3',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [12, 52, 78, 104],
	lineheight: 26,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_48',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'SmallPlus 2+2',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [0, 30, 74, 104],
	lineheight: 26,
	line: 1,
	font: 'CdmsBdType1',
	picto: 'Picto_48',
	symbol: 'Regel_22'
});
/*
 * RWS BermDRIP Designer Templates
*/
template_classes.push({
	id: 'rws_type1',
	name: 'RWS BermDRIP Type 1'
});
tpl.push({
	name: 'Small',
	class: 'rws_type1',
	size: [192, 128],
	lines: [14, 50, 78, 106],
	lineheight: 22,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'SmallPlus',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 28, 78, 106],
	lineheight: 22,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Links / Tekst 2+2',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 29, 77, 106],
	lineheight: 22,
	line: 1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 47, 77, 106],
	lineheight: 22,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 29, 59, 106],
	lineheight: 22,
	line: 2,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type1',
	size: [192, 128],
	lines: [17, 47, 77, 106],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type1',
	size: [192, 128],
	lines: [77, 106],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Dubbel',
	class: 'rws_type1',
	size: [192, 128],
	lines: [77, 106],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	num_picto: 2,
	symbol: 'Regel_22'
});
/*
 * RWS BermDRIP Type 2
*/
template_classes.push({
	id: 'rws_type2',
	name: 'RWS BermDRIP Type 2'
});
tpl.push({
	name: 'Small',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 24, 53, 77],
	lineheight: 18,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_44',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Links / Tekst 2+2',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 24, 53, 77],
	lineheight: 18,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 28, 53, 77],
	lineheight: 18,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 24, 49, 77],
	lineheight: 18,
	line: 2,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type2',
	size: [144, 96],
	lines: [3, 28, 53, 77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type2',
	size: [144, 96],
	lines: [52, 77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Dubbel',
	class: 'rws_type2',
	size: [144, 96],
	lines: [52, 77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	num_picto: 2,
	symbol: 'Regel_19'
});
/*
 * RWS BermDRIP Type 3A Breed Geel
*/
template_classes.push({
	id: 'rws_type3a',
	name: 'RWS BermDRIP Type 3A'
});
tpl.push({
	name: 'Medium Links / Tekst 2+2',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [0, 20, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [0, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [0, 20, 40, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [6, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
/*
 * RWS BermDRIP Type 3B Smal Geel
*/
template_classes.push({
	id: 'rws_type3b',
	name: 'RWS BermDRIP Type 3B'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type3b',
	size: [80, 80],
	lines: [0, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 2+2',
	class: 'rws_type3b',
	size: [80, 80],
	lines: [0, 20, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type3b',
	size: [80, 80],
	lines: [0, 20, 40, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type3b',
	size: [80, 80],
	lines: [6, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type3b',
	size: [80, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	symbol: 'Regel_15_geel'
});
/*
 * RWS BermDRIP Type 3C Breed Wit
*/
template_classes.push({
	id: 'rws_type3c',
	name: 'RWS BermDRIP Type 3C'
});
tpl.push({
	name: 'Medium Links / Tekst 2+2',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [0, 20, 45, 65],
	lineheight: 14,
	line: 1,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [0, 25, 45, 65],
	lineheight: 14,
	line: 0,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [0, 20, 40, 65],
	lineheight: 14,
	line: 2,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [6, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Medium Dubbel',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	num_picto: 2,
	symbol: 'Regel_15'
});
/*
 * RWS BermDRIP Type 3D Small Wit
*/
template_classes.push({
	id: 'rws_type3d',
	name: 'RWS BermDRIP Type 3D'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [0, 25, 45, 65],
	lineheight: 14,
	line: 0,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 2+2',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [0, 20, 45, 65],
	lineheight: 14,
	line: 1,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [0, 20, 40, 65],
	lineheight: 14,
	line: 2,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [6, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_40',
	symbol: 'Regel_15'
});
/*
 * RWS Type 4
*/
template_classes.push({
	id: 'rws_type4',
	name: 'RWS BermDRIP Type 4'
});
tpl.push({
	name: 'Small',
	class: 'rws_type4',
	size: [160, 96],
	lines: [0, 24, 53, 77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_44',
	textunderpicto: 0,
	num_picto: 1,
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Links',
	class: 'rws_type4',
	size: [160, 96],
	lines: [0, 24, 53, 77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	textunderpicto: 0,
	num_picto: 1,
	symbol: 'Regel_19'
});
/*
 * RWS DRIP+
*/
template_classes.push({
	id: 'rws_type5a',
	name: 'RWS BermDRIP Type 5A (DRIP+)'
});
tpl.push({
	name: 'Medium Links / Tekst',
	class: 'rws_type5a',
	size: [512, 88],
	lines: [0, 33, 66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	textunderpicto: 1,
	num_picto: 1,
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Dubbel  / Medium Rechts',
	class: 'rws_type5a',
	size: [512, 88],
	lines: [0, 33, 66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	textunderpicto: 1,
	num_picto: 2,
	symbol: 'Regel_22'
});
/*
 * RWS DRIP+ (smal)
*/
template_classes.push({
	id: 'rws_type6a',
	name: 'RWS BermDRIP Type 6A (DRIP+ smal)'
});
tpl.push({
	name: 'Medium Links / Tekst',
	class: 'rws_type6a',
	size: [256, 88],
	lines: [0, 33, 66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	textunderpicto: 1,
	num_picto: 1,
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Dubbel / Medium Rechts',
	class: 'rws_type6a',
	size: [256, 88],
	lines: [0, 33, 66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	textunderpicto: 1,
	num_picto: 2,
	symbol: 'Regel_22'
});
/*
 * RWS rijbaanbreed Templates
*/
template_classes.push({
	id: 'rws_drip',
	name: 'RWS tekstDRIP rijbaanbreed'
});
tpl.push({
	name: 'Tekst',
	class: 'rws_drip',
	size: [450, 100],
	lines: [10, 45, 80],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
/*
 * RWS tekstkar Templates
*/
template_classes.push({
	id: 'rws_tekstkar',
	name: 'RWS Tekstkar'
});
tpl.push({
	name: 'Tekstkar',
	class: 'rws_tekstkar',
	size: [112, 80],
	lines: [2, 22, 41, 60],
	lineheight: 15,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_44',
	symbol: 'Regel_19'
});
/*
 * Weinig gebruikte templates
*/
tpl.push({
	name: 'X-Small 1+2',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	lines: [4, 44, 91],
	lineheight: 24,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_30',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'X-Small 1+3',
	class: 'gdh_stadsdrip',
	size: [192, 128],
	size: [192, 128],
	lines: [4, 40, 76, 104],
	lineheight: 24,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_30',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'X-Small 2+2',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [4, 32, 74, 104],
	lineheight: 26,
	line: 1,
	font: 'CdmsBdType1',
	picto: 'Picto_30',
	symbol: 'Regel_22'
});
/*
 * Rotterdam DataDisplay
*/
template_classes.push({
	id: 'rdam_dd',
	name: 'Rotterdam DataDisplay'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'rdam_dd',
	size: [112, 80],
	lines: [0, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 2+2',
	class: 'rdam_dd',
	size: [112, 80],
	lines: [0, 20, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rdam_dd',
	size: [112, 80],
	lines: [0, 20, 40, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
tpl.push({
	name: 'Tekst 4',
	class: 'rdam_dd',
	size: [112, 80],
	lines: [6, 25, 45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_0',
	symbol: 'Regel_15_geel'
});
/*
 * PZH VaarwegDRIP
*/
template_classes.push({
	id: 'pzh_vaarweg',
	name: 'PZH VaarwegDRIP'
});
tpl.push({
	name: '2-regel',
	class: 'pzh_vaarweg',
	size: [207, 54],
	lines: [3, 27],
	lineheight: 24,
	line: 0,
	font: 'CdmsBdType1Yellow',
	picto: 'Picto_40',
	symbol: 'Regel_22_geel'
});
/*
 * StadsDRIP Halfhoog 216x60
*/
template_classes.push({
	id: 'ly_216_60',
	name: 'StadsDRIP Halfhoog 216x60'
});
tpl.push({
	name: '3-regel',
	class: 'ly_216_60',
	size: [216, 60],
	lines: [0, 20, 40],
	lineheight: 20,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_0',
	symbol: 'Regel_15'
});
/*
 * Gemeente Amsterdam
*/
template_classes.push({
	id: 'gad_stadsdrip',
	name: 'Amsterdam StadsDRIP'
});
tpl.push({
	name: 'Small',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [3, 27, 51, 75],
	lineheight: 18,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_40',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Links / Tekst 2+2',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [1, 25, 51, 75],
	lineheight: 18,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 1+3',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [1, 27, 51, 75],
	lineheight: 18,
	line: 0,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [1, 25, 49, 75],
	lineheight: 18,
	line: 2,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 4',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [3, 27, 51, 75],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Midden',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [51, 75],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Medium Dubbel',
	class: 'gad_stadsdrip',
	size: [160, 96],
	lines: [51, 75],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	num_picto: 2,
	symbol: 'Regel_19'
});
template_classes.push({
	id: 'gad_trbord',
	name: 'Amsterdam TR-bord'
});
tpl.push({
	name: '3 tekstregels',
	class: 'gad_trbord',
	size: [192, 64],
	lines: [1, 22, 43],
	lineheight: 18,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_0',
	symbol: 'Regel_19'
});