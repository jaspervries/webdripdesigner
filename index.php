<?php $version = '0.10' ?>
<!--
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
-->
<!DOCTYPE HTML>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>WebDRIP Designer <?php echo $version; ?></title>
<link rel="stylesheet" type="text/css" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<link rel="stylesheet" type="text/css" href="style.css">
<script src="//code.jquery.com/jquery-2.2.0.min.js" type="text/javascript"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js" type="text/javascript"></script>
<script src="//rawgit.com/timdown/rangyinputs/1.2.0/rangyinputs-jquery.js" type="text/javascript"></script>
<script src="templates.js" type="text/javascript"></script>
<script src="sprites.js" type="text/javascript"></script>
<script src="webdripdesigner.js" type="text/javascript"></script>
<script src="ui.js" type="text/javascript"></script>
</head>
<body>

<div id="content">

<div id="menu">
<ul>
	<li><a id="menu-manual" href="#">Handleiding</a></li>
	<li><a id="menu-changelog" href="#">Versiehistorie</a></li>
    <li><a id="menu-about" href="#">Over de WebDRIP Designer</a></li>
    <li><a id="menu-history" href="#"><strong>Historie</strong></a></li>
</ul>
</div>

<h1>WebDRIP Designer <?php echo $version; ?></h1>

<fieldset class="condensed">
<legend>Template</legend>
<p><select id="drip_template_class"></select> <select id="drip_template"></select> <span style="display:none"><input type="checkbox" id="drip_fullcolor"><label for="drip_fullcolor">Full color</label></span> <span id="drip_template_info"></span></p>
</fieldset>

<fieldset id="fieldset_picto">
<legend>Pictogram</legend>
<div id="drip_picto"></div>
<div id="picto_tools"><a id="picto_show_all"><span class="button"><img src="icon/line_down.png" width="16" height="16" alt="uitvouwen"> toon alle pictogrammen</span></a> <a id="picto_show_pref"><span class="button"><img src="icon/line_up.png" width="16" height="16" alt="invouwen"> toon voorkeurspictogrammen</span></a> <a id="unset_image" onclick="unset_image()"><span class="button"><img src="icon/line_clear.png" width="16" height="16" alt="pictogram wissen"> pictogram wissen</span></a></div>
</fieldset>

<fieldset>
<legend>Beeldstand</legend>
<canvas id="drip" width="192" height="128"></canvas>

<div id="drip_text">
<?php
for ($i = 0; $i < 5; $i++) {
?>
<span class="drip_input" id="drip_input<?php echo $i; ?>">
	<input type="text" class="drip_t" id="drip_t<?php echo $i; ?>"> 
    <a onClick="set_alignment(<?php echo $i; ?>, 'left')"><img class="alignment" id="alignment_left_<?php echo $i; ?>" src="icon/align-left.png" width="16" height="16" alt="links" title="Links"></a> 
    <a onClick="set_alignment(<?php echo $i; ?>, 'center')"><img class="alignment" id="alignment_center_<?php echo $i; ?>" src="icon/align-center.png" width="16" height="16" alt="midden" title="Centreren"></a> 
    <a onClick="set_alignment(<?php echo $i; ?>, 'block')"><img class="alignment" id="alignment_block_<?php echo $i; ?>" src="icon/align-block.png" width="16" height="16" alt="blok" title="Blok"></a> 
    <a onClick="set_alignment(<?php echo $i; ?>, 'right')"><img class="alignment" id="alignment_right_<?php echo $i; ?>" src="icon/align-right.png" width="16" height="16" alt="rechts" title="Rechts"></a> 
    <a onClick="move_line(<?php echo $i; ?>, 'down')"><img class="button" src="icon/line_insert.png" width="16" height="16" alt="regel invoegen" title="Nieuwe regel invoegen"></a> 
    <a onClick="move_line(<?php echo $i; ?>, 'up')"><img class="button" src="icon/line_remove.png" width="16" height="16" alt="regel verwijderen" title="Deze regel verwijderen"></a>
    <a onClick="clear_line(<?php echo $i; ?>)"><img class="button" src="icon/line_clear.png" width="16" height="16" alt="regel leeg maken" title="Deze regel leeg maken"></a>
    <br>
</span>
<?php
}
?>
<div id="addl_tools"><span id="drip_line_gui" class="button"><input type="checkbox" id="drip_line"><label for="drip_line"><img src="icon/separatorline.png" width="16" height="16" alt="scheidingslijn"> scheidingslijn</label></span> <span id="open_special_chars" class="button"><img src="icon/specialchars.png" width="16" height="16" alt="speciale tekens"> speciale tekens</span> <span id="drip_clear_all" class="button"><img src="icon/trash.png" width="16" height="16" alt="beeldstand wissen"> beeldstand wissen</span></div>
<div id="download_tools">
<!-- <input type="button" onClick="redraw_drip('drip')" value="opnieuw tekenen"> -->
<input type="button" onClick="download_image('drip')" value="Download"> <input type="radio" name="filetype" value="bmp" id="filetype_bmp"><label for="filetype_bmp">BMP</label> <input type="radio" checked="checked" name="filetype" value="png" id="filetype_png"><label for="filetype_png">PNG</label> <input type="radio" name="filetype" value="gif" id="filetype_gif"><label for="filetype_gif">GIF</label></div>
</div>
</fieldset>

<fieldset>
<legend>Regelsymbolen</legend>
<div id="drip_symbol"></div>
</fieldset>

<fieldset id="fieldset_tiles">
<legend>Tegeltjes</legend>
<input type="text" id="ins_tile_regular" maxlength="4" onClick="select()"> <a onClick="insert_tile('regular')">invoegen</a>
<input type="text" id="ins_tile_afrit" maxlength="4" onClick="select()"> <a onClick="insert_tile('afrit')">invoegen</a>
<input type="text" id="ins_tile_sroute" maxlength="3" onClick="select()"> <a onClick="insert_tile('sroute')">invoegen</a>
<input type="text" id="ins_tile_omll" maxlength="2" onClick="select()"> <a onClick="insert_tile('omll')">invoegen</a>
<input type="text" id="ins_tile_omlr" maxlength="2" onClick="select()"> <a onClick="insert_tile('omlr')">invoegen</a>
<input type="text" id="ins_tile_omlb" maxlength="1" onClick="select()"> <a onClick="insert_tile('omlb')">invoegen</a>
</fieldset>
</div>

<div id="drip_font">
<img src="sprites.png" id="sprites" width="1" height="1" alt="sprites">
</div>

<div id="dialog"></div>

<div id="examplescontainer">
<select name="example_select" id="example_select">
	<option value="all" selected="selected">alle beeldstanden</option>
    <option value="user">van dit ip-adres</option>
</select>
<div id="examples"></div>
</div>

<div id="specialchars">
<?php
$special_chars = array('½','Æ','Ç','Ð','×','Ø','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','÷','ù','ú','û','ü','ý','þ');
foreach ($special_chars as $char_this) {
	echo '<span onclick="insert_text(\''.$char_this.'\')" title="speciaal teken '.$char_this.' invoegen">'.$char_this.'</span>';		
}
?>
</div>

<div id="templateeditor">
<table>
<tr><td>Breedte:</td><td><input type="number" min="32" max="512" class="template_editor_val" id="template_editor_width"> px</td></tr>
<tr><td>Hoogte:</td><td><input type="number" min="32" max="256" class="template_editor_val" id="template_editor_height"> px</td></tr>
<tr><td>Pictogram:</td><td><select class="template_editor_val" id="template_editor_picto">
<option value="0">(geen)</option>
<option value="Picto_30">Picto 30</option>
<option value="Picto_40">Picto 40</option>
<option value="Picto_44">Picto 44</option>
<option value="Picto_48">Picto 48</option>
<option value="Picto_60">Picto 60</option>
<option value="Picto_70">Picto 70</option>
<option value="Picto_92">Picto 92</option>
</select></td></tr>
<tr><td>Lettertype:</td><td><select class="template_editor_val" id="template_editor_font">
<option value="CdmsBdType1">CdmsBdType1</option>
<option value="CdmsBdType2">CdmsBdType2</option>
<option value="CdmsBdType3">CdmsBdType3</option>
<option value="CdmsBdType3Yellow">CdmsBdType3 Geel</option>
</select></td></tr>
<tr><td>Tekenafstand:</td><td><input type="number" min="0" max="8" class="template_editor_val" id="template_editor_charspacing"> px</td></tr>
<tr><td>Aantal regels:</td><td><input type="number" min="1" max="5" class="template_editor_val" id="template_editor_lines"></td></tr>
<?php
for ($i = 0; $i < 5; $i++) {
	?>
<tr class="template_editor_lineblock" id="template_editor_lineblock_<?php echo $i; ?>"><td>Regel <?php echo $i+1; ?> pos:</td><td><input type="number" min="0" max="265" class="template_editor_val" id="template_editor_line_<?php echo $i; ?>"> px</td></tr>
    <?php
}
?>
<tr><td>Regelhoogte:</td><td><input type="number" min="8" max="32" class="template_editor_val" id="template_editor_lineheight"> px</td></tr>
<tr><td>Scheidingslijn:</td><td><select class="template_editor_val" id="template_editor_line">
<option value="-1">(geen)</option>
<option value="0">Na regel 1</option>
<option value="1">Na regel 2</option>
<option value="2">Na regel 3</option>
<option value="3">Na regel 4</option>
</select></td></tr>
</table>
</div>

<?php 
if (file_exists('googleanalytics.inc.php')) {
    include('googleanalytics.inc.php'); 
}
?>
</body>
</html>