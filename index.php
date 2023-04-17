<?php 
//send headers
include('headers.inc.php');
?>
<!--
WebDRIP Designer - webgebaseerde ontwerptool voor DRIP-teksten
Copyright (C) 2013-2023 Jasper Vries

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
<title>WebDRIP Designer</title>
<link rel="stylesheet" type="text/css" href="bundled/jquery-ui/jquery-ui.min.css">
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="icon" type="image/png" href="favicon.png">
<script src="bundled/jquery/jquery.min.js" type="text/javascript"></script>
<script src="bundled/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
<script src="bundled/rangyinputs/rangyinputs-jquery.js" type="text/javascript"></script>
<script src="templates.js" type="text/javascript"></script>
<script src="sprites.js" type="text/javascript"></script>
<script src="webdripdesigner.js" type="text/javascript"></script>
<script src="ui.js" type="text/javascript"></script>
<script src="conformity.js" type="text/javascript"></script>
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

<h1>WebDRIP Designer</h1>

<fieldset class="condensed">
<legend>Template</legend>
<p><select id="drip_template_class"></select> <select id="drip_template"></select> <span style="display:none"><input type="checkbox" id="drip_fullcolor"><label for="drip_fullcolor">Full color</label></span> <span id="drip_template_info" title="Open Template Editor"></span></p>
</fieldset>

<fieldset id="fieldset_picto">
<legend>Pictogram</legend>
<div id="drip_picto"></div>
<div id="picto_tools"><span class="button" id="picto_show_all"><img src="icon/line_down.png" width="16" height="16" alt="uitvouwen"> toon alle pictogrammen</span> <span id="picto_show_pref" class="button"><img src="icon/line_up.png" width="16" height="16" alt="invouwen"> toon voorkeurspictogrammen</span> <span class="button" id="picto_select_1">pictogram 1</span> <span class="button" id="picto_select_2">pictogram 2</span> <span class="button" id="picto_2_align_left">links</span> <span class="button" id="picto_2_align_right">rechts</span> <span id="unset_image" onclick="unset_image()" class="button"><img src="icon/line_clear.png" width="16" height="16" alt="pictogram wissen"> pictogram wissen</span></div>
</fieldset>

<fieldset>
<legend>Beeldstand</legend>
<canvas id="drip" width="192" height="128"></canvas>

<div id="drip_text">
<?php
for ($i = 0; $i < 5; $i++) {
?>
<div class="drip_input" id="drip_input<?php echo $i; ?>">
	<input type="text" class="drip_t" id="drip_t<?php echo $i; ?>"> 
    <img class="alignment" id="alignment_left_<?php echo $i; ?>" src="icon/align-left.png" width="16" height="16" alt="links" title="Links" onClick="set_alignment(<?php echo $i; ?>, 'left')">
    <img class="alignment" id="alignment_arrowleft_<?php echo $i; ?>" src="icon/align-arrow-left.png" width="16" height="16" alt="pijllinks" title="Pijl links" onClick="set_alignment(<?php echo $i; ?>, 'arrowleft')">
    <img class="alignment" id="alignment_center_<?php echo $i; ?>" src="icon/align-center.png" width="16" height="16" alt="midden" title="Centreren" onClick="set_alignment(<?php echo $i; ?>, 'center')">
    <img class="alignment" id="alignment_arrowright_<?php echo $i; ?>" src="icon/align-arrow-right.png" width="16" height="16" alt="pijlrechts" title="Pijl rechts" onClick="set_alignment(<?php echo $i; ?>, 'arrowright')">
    <img class="alignment" id="alignment_block_<?php echo $i; ?>" src="icon/align-block.png" width="16" height="16" alt="blok" title="Blok" onClick="set_alignment(<?php echo $i; ?>, 'block')"> 
    <img class="alignment" id="alignment_right_<?php echo $i; ?>" src="icon/align-right.png" width="16" height="16" alt="rechts" title="Rechts" onClick="set_alignment(<?php echo $i; ?>, 'right')">
    <img class="button" src="icon/line_insert.png" width="16" height="16" alt="regel invoegen" title="Nieuwe regel invoegen boven deze regel" onClick="move_line(<?php echo $i; ?>, 'down')">
    <img class="button" src="icon/line_remove.png" width="16" height="16" alt="regel verwijderen" title="Deze regel verwijderen" onClick="move_line(<?php echo $i; ?>, 'up')">
    <img class="button" src="icon/line_clear.png" width="16" height="16" alt="regel leeg maken" title="Deze regel leeg maken" onClick="clear_line(<?php echo $i; ?>)">
    <span class="drip_input_error" id="drip_input_error<?php echo $i; ?>"></span>
</div>
<?php
}
?>
<div id="addl_tools"><span id="drip_line_gui" class="button"><img src="icon/separatorline.png" width="16" height="16" alt="scheidingslijn"> scheidingslijn</span> <span id="open_special_chars" class="button"><img src="icon/specialchars.png" width="16" height="16" alt="speciale tekens"> speciale tekens</span> <span id="drip_clear_all" class="button"><img src="icon/trash.png" width="16" height="16" alt="beeldstand wissen"> beeldstand wissen</span></div>
<div id="download_tools">
<!-- <input type="button" onClick="redraw_drip('drip')" value="opnieuw tekenen"> -->
<form action="download.php" method="post"><input type="hidden" name="data" id="form_data"><input type="hidden" name="sav" id="form_sav">
<?php if (!empty($_GET['return_url'])) {
?>
<input type="submit" value="OK" id="download_button">
<input type="hidden" name="return_url" value="<?php echo htmlspecialchars($_GET['return_url']); ?>">
<input type="hidden" name="type" value="png">
<?php
}
else {
?>
<input type="submit" value="Download" id="download_button"> <input type="radio" name="type" value="bmp" id="filetype_bmp"><label for="type_bmp">BMP</label> <input type="radio" checked="checked" name="type" value="png" id="filetype_png"><label for="filetype_png">PNG</label> <input type="radio" name="type" value="gif" id="filetype_gif"><label for="filetype_gif">GIF</label>
<?php
}
?>
</form></div>
</div>
</fieldset>

<fieldset>
<legend>Regelsymbolen</legend>
<div id="drip_symbol"></div>
<div id="symbol_tools"><span class="button" id="symbol_show_all"><img src="icon/line_down.png" width="16" height="16" alt="uitvouwen"> toon alle regelsymbolen</span> <span id="symbol_show_pref" class="button"><img src="icon/line_up.png" width="16" height="16" alt="invouwen"> toon voorkeursregelsymbolen</span></div>
</fieldset>

<fieldset id="fieldset_tiles">
<legend>Tegeltjes</legend>
<input type="text" id="ins_tile_regular" maxlength="4"><input type="text" id="ins_tile_afrit" maxlength="7"><input type="text" id="ins_tile_ring" minlength="2" maxlength="4"><input type="text" id="ins_tile_ringinverse" minlength="2" maxlength="4"><input type="text" id="ins_tile_sroute" minlength="3" maxlength="3"><input type="text" id="ins_tile_omll" maxlength="2"><input type="text" id="ins_tile_omlr" maxlength="2"><input type="text" id="ins_tile_omlb" maxlength="2"><span class="button" id="ins_tile_button">tegeltje invoegen</span>
</fieldset>
</div>

<div id="drip_sprites">
<img src="sprites.png" id="sprites" width="1" height="1" alt="sprites">
</div>

<div id="dialog"></div>

<div id="examplescontainer">
<select name="example_select" id="example_select">
	<option value="all" selected="selected">alle beeldstanden</option>
    <option value="user">van dit ip-adres</option>
    <option value="cookie">van deze browser</option>
</select>
<div id="examples"></div>
</div>

<div id="specialchars">
<?php
$special_chars = array('½', '€', 'Æ','Ç','Ð','×','Ø','Þ','ß','à','á','â','ã','ä','å','æ','ç','è','é','ê','ë','ì','í','î','ï','ð','ñ','ò','ó','ô','õ','ö','÷','ù','ú','û','ü','ý','þ');
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
<option value="Picto_40_yellow">Picto 40 Geel</option>
<option value="Picto_44">Picto 44</option>
<option value="Picto_48">Picto 48</option>
<option value="Picto_60">Picto 60</option>
<option value="Picto_70">Picto 70</option>
<option value="Picto_92">Picto 92</option>
</select><br>
<input type="checkbox" class="template_editor_val" id="template_editor_textunderpicto"> <label for="template_editor_textunderpicto">Tekst onder pictogram toestaan</label>
</td></tr>
<tr><td>Aantal:</td><td><select class="template_editor_val" id="template_editor_num_picto">
<option value="1">1</option>
<option value="2">2</option>
</select></td></tr>
<tr><td>Lettertype:</td><td><select class="template_editor_val" id="template_editor_font">
<option value="CdmsBdType1">CdmsBdType1</option>
<option value="CdmsBdType1Yellow">CdmsBdType1 Geel</option>
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

<div id="footer">WebDRIP Designer {{BUILD}}</div>

<?php if (strlen($_GET['md5']) == 32) {
?>
<script type="text/javascript">
$(document).ready(function () {
	load_drip('<?php echo htmlspecialchars($_GET['md5']); ?>');
});
</script>
<?php
}

if (file_exists('googleanalytics.inc.php')) {
    include('googleanalytics.inc.php'); 
}
?>
</body>
</html>
