<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2016 Jasper Vries

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

//directories to process
$fontdir = 'fonts';
$tiledir = 'tiles';
$resourcedirs = array('symbols', 'images');
//output file width, start height and start position
$s_w = 800;
$s_h = 16;
$x = 8;
$y = 8;
//include names
require('names.php');
//create output image
$spritesheet = imagecreate($s_w, $s_h);
imagefill($spritesheet, 0, 0, imagecolorallocate($spritesheet, 255, 255, 255));
//ouput array
$spritearray = array();

//function to convert win-1252 character index to utf-8 character index
function win1252tounicode($i) {
	if (($i <= 127) || ($i >= 160)) return $i;
	else { //index 128 trough 159
		$mapping = array(8364, 129, 8218, 8222, 8230, 8224, 8225, 135, 8240, 137, 8249, 139, 338, 141, 381, 143,
		144, 8216, 8217, 8220, 8221, 8226, 8211, 8212, 732, 8482, 353, 8250, 339, 157, 382, 376);
		return $mapping[$i-128];
	}
}

//process fonts
$files = scandir($fontdir);
foreach ($files as $file) {
	if (is_file($fontdir.'/'.$file) && (substr($file, strrpos($file, '.')) == '.png')) {
		echo $fontdir.'/'.$file.PHP_EOL;
		//font name
		$font_name = substr($file, 0, strrpos($file, '.'));
		//open png file
		$png = imagecreatefrompng($fontdir.'/'.$file);
		$png_w = imagesx($png);
		$png_h = imagesy($png);
		$magicpink = imagecolorat($png, 0, 0);
		//replace black with blue for transparency later on
		imagecolorset($png, imagecolorclosest($png, 0, 0, 0), 0, 0, 255);
		//start id and height
		$glyph_id = 32;
		$glyph_h = 0;
		//find sprites in file
		for ($h = 0; $h < $png_h; $h++) {
			$max_glyph_h = 0;
			for ($w = 0; $w < $png_w; $w++) {
				//find sprite
				if (imagecolorat($png, $w, $h) != $magicpink) {
					//find sprite height
					$glyph_h = 0;
					while (imagecolorat($png, $w, $h+$glyph_h) != $magicpink) {
						$glyph_h++;
					}
					$max_glyph_h = max($max_glyph_h, $glyph_h);
					//find sprite width
					$glyph_w = 0;
					while (imagecolorat($png, $w+$glyph_w, $h) != $magicpink) {
						$glyph_w++;
					}
					
					//check if sufficient width, otherwise move to next line
					if ($x + $glyph_w + 8 > $s_w) {
						$x = 8;
						$y = $s_h;
					}
					//check if sufficient height, otherwise increase height
					if ($y + $glyph_h + 8 > $s_h) {
						$spritesheet_new = imagecreate($s_w, $y + $glyph_h + 8);
						imagecopy($spritesheet_new, $spritesheet, 0, 0, 0, 0, $s_w, $s_h);
						$s_h = $y + $glyph_h + 8;
						$spritesheet = imagecreate($s_w, $s_h);
						imagecopy($spritesheet, $spritesheet_new, 0, 0, 0, 0, $s_w, $s_h);
						imagedestroy($spritesheet_new);
					}
					//copy glyph to sprite sheet
					imagecopy($spritesheet, $png, $x, $y, $w+1, $h, $glyph_w-2, $glyph_h);
					
					//add to table
					//format: [xpos, ypos, xlen, ylen]
					$spritearray['font'][$font_name][win1252tounicode($glyph_id)] = array($x, $y, $glyph_w - 2, $glyph_h);
					
					//increase x
					$x += $glyph_w-2 + 8;
					//advance width and sprite counter
					$w += $glyph_w;
					$glyph_id++;
				}
				//advance height
				if (($w == ($png_w - 1)) && ($max_glyph_h > 0)) {
					$h += $max_glyph_h;
				}
			}
		}
	}
}

//process tile dir
$files = scandir($tiledir);
foreach ($files as $file) {
	if (is_file($tiledir.'/'.$file) && (substr($file, strrpos($file, '.')) == '.png')) {
		echo $tiledir.'/'.$file.PHP_EOL;
		$item_name = substr($file, 0, strrpos($file, '.'));
		//load file
		$png = imagecreatefrompng($tiledir.'/'.$file);
		$png_w = imagesx($png);
		$png_h = imagesy($png);
		//replace black with blue for transparency later on
		imagecolorset($png, imagecolorclosest($png, 0, 0, 0), 0, 0, 255);
		//check if sufficient width, otherwise move to next line
		if ($x + $png_w + 8 > $s_w) {
			$x = 8;
			$y = $s_h;
		}
		//check if sufficient height, otherwise increase height
		if ($y + $png_h + 8 > $s_h) {
			$spritesheet_new = imagecreate($s_w, $y + $png_h + 8);
			imagecopy($spritesheet_new, $spritesheet, 0, 0, 0, 0, $s_w, $s_h);
			$s_h = $y + $png_h + 8;
			$spritesheet = imagecreate($s_w, $s_h);
			imagecopy($spritesheet, $spritesheet_new, 0, 0, 0, 0, $s_w, $s_h);
			imagedestroy($spritesheet_new);
		}
		//copy picto to sprite sheet
		imagecopy($spritesheet, $png, $x, $y, 0, 0, $png_w, $png_h);
		//add to table
		//format: [xpos, ypos, xlen, ylen]
		$spritearray['tiles'][$item_name] = array($x, $y, $png_w, $png_h);
		//increase x
		$x += $png_w + 8;
	}
}

//loop through resource dirs
foreach ($resourcedirs as $resourcedir) {
$dirs = scandir($resourcedir);
	foreach ($dirs as $dir) {
		if (is_dir($resourcedir.'/'.$dir) && ($dir != '.') && ($dir != '..')) {
			echo $resourcedir.'/'.$dir.PHP_EOL;
			$type_name = ($resourcedir == 'symbols') ? 'symbol' : 'picto';
			$var_name = $dir;
			//foreach picto/symbol in dir
			$files = scandir($resourcedir.'/'.$dir);
			foreach ($files as $file) {
				if (is_file($resourcedir.'/'.$dir.'/'.$file) && (substr($file, strrpos($file, '.')) == '.png')) {
					//echo $resourcedir.'/'.$dir.'/'.$file.PHP_EOL;
					$item_name = ($resourcedir == 'symbols') ? (int) substr($file, strpos($file, '_') + 1, 3) : substr($file, 0, strpos($file, '_'));
					//load file
					$png = imagecreatefrompng($resourcedir.'/'.$dir.'/'.$file);
					$png_w = imagesx($png);
					$png_h = imagesy($png);
					//check if sufficient width, otherwise move to next line
					if ($x + $png_w + 8 > $s_w) {
						$x = 8;
						$y = $s_h;
					}
					//check if sufficient height, otherwise increase height
					if ($y + $png_h + 8 > $s_h) {
						$spritesheet_new = imagecreate($s_w, $y + $png_h + 8);
						imagecopy($spritesheet_new, $spritesheet, 0, 0, 0, 0, $s_w, $s_h);
						$s_h = $y + $png_h + 8;
						$spritesheet = imagecreate($s_w, $s_h);
						imagecopy($spritesheet, $spritesheet_new, 0, 0, 0, 0, $s_w, $s_h);
						imagedestroy($spritesheet_new);
					}
					//copy picto to sprite sheet
					imagecopy($spritesheet, $png, $x, $y, 0, 0, $png_w, $png_h);
					//add to table
					//format: [xpos, ypos, xlen, ylen, $descr] $descr optional from $names
					$spritearray[$type_name][$var_name][$item_name] = array($x, $y, $png_w, $png_h);
					if (array_key_exists($item_name, $names[$type_name])) {
						$spritearray[$type_name][$var_name][$item_name][] = $names[$type_name][$item_name];
					}
					//increase x
					$x += $png_w + 8;
				}
			}
		}
	}
}

//apply transparency to file
imagecolorset($spritesheet, imagecolorclosest($spritesheet, 0, 0, 255), 0, 0, 0, 127);
//write spritesheet
imagepng($spritesheet, '../sprites.png', 9);
//write js
$h = fopen('../sprites.js', 'wb');
$js = 'var sprites=\'' . str_replace('\'', '\\\'', json_encode($spritearray)).'\';' . PHP_EOL;
$js .= 'sprites = JSON.parse(sprites);';
if (fwrite($h, $js)) {
	echo 'Spritetabel geschreven'.PHP_EOL;
}
else {
	echo 'Kan spritetabel niet schrijven'.PHP_EOL;
}
fclose($h);

?>