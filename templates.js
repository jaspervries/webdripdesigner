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
	name: 'Tekst 2+2 / Medium Links',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 30, 77, 106],
	lineheight: 22,
	line: 1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type1',
	size: [192, 128],
	lines: [0, 30, 59, 106],
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
tpl.push({
	name: 'Large',
	class: 'rws_type1',
	size: [192, 128],
	lines: [106],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_92',
	symbol: 'Regel_22'
});
template_classes.push({
	id: 'rws_type2',
	name: 'RWS BermDRIP Type 2'
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
	name: 'Tekst 2+2 / Medium Links',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 25, 53, 77],
	lineheight: 18,
	line: 1,
	font: 'CdmsBdType2',
	picto: 'Picto_48',
	symbol: 'Regel_19'
});
tpl.push({
	name: 'Tekst 3+1',
	class: 'rws_type2',
	size: [144, 96],
	lines: [0, 25, 49, 77],
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
tpl.push({
	name: 'Large',
	class: 'rws_type2',
	size: [144, 96],
	lines: [77],
	lineheight: 18,
	line: -1,
	font: 'CdmsBdType2',
	picto: 'Picto_70',
	symbol: 'Regel_19'
});
/*
 * RWS rijbaanbreed Templates
*/
template_classes.push({
	id: 'rws_drip',
	name: 'RWS DRIP rijbaanbreed'
});
tpl.push({
	name: 'Drieregel (onoffici&euml;el)',
	class: 'rws_drip',
	size: [384, 90],
	lines: [4, 34, 64],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_0',
	symbol: 'Regel_22'
});
/*
 * RWS DRIP+
*/
template_classes.push({
	id: 'rws_dplus',
	name: 'RWS DRIP+'
});
tpl.push({
	name: 'Large',
	class: 'rws_dplus',
	size: [512, 88],
	lines: [0, 33, 66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_70',
	num_picto: 2,
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Midden',
	class: 'rws_dplus',
	size: [512, 88],
	lines: [66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Medium Dubbel',
	class: 'rws_dplus',
	size: [512, 88],
	lines: [66],
	lineheight: 22,
	line: -1,
	font: 'CdmsBdType1',
	picto: 'Picto_60',
	num_picto: 2,
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Small Links 1+1',
	class: 'rws_dplus',
	size: [512, 88],
	lines: [14, 60],
	lineheight: 22,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
/*
 * RWS BermDRIP Type 3A Breed Geel
*/
template_classes.push({
	id: 'rws_type3a',
	name: 'RWS BermDRIP Type 3A'
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
	name: 'Tekst 2+2 / Medium Links',
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
tpl.push({
	name: 'Medium Dubbel',
	class: 'rws_type3a',
	size: [112, 80],
	lines: [45, 65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3Yellow',
	picto: 'Picto_40_yellow',
	num_picto: 2,
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
	name: 'Tekst 2+2 / Medium Links',
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
tpl.push({
	name: 'Large',
	class: 'rws_type3c',
	size: [112, 80],
	lines: [65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_60',
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
tpl.push({
	name: 'Large',
	class: 'rws_type3d',
	size: [80, 80],
	lines: [65],
	lineheight: 14,
	line: -1,
	font: 'CdmsBdType3',
	picto: 'Picto_60',
	symbol: 'Regel_15'
});

/*
 * Weinig gebruikte templates
*/
tpl.push({
	name: 'Small 1+2',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [12, 74, 104],
	lineheight: 26,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Small 1+3',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [12, 48, 76, 104],
	lineheight: 26,
	line: 0,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
tpl.push({
	name: 'Small 2+2',
	class: 'gdh_bermdrip',
	size: [192, 128],
	lines: [0, 30, 74, 104],
	lineheight: 26,
	line: 1,
	font: 'CdmsBdType1',
	picto: 'Picto_44',
	symbol: 'Regel_22'
});
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