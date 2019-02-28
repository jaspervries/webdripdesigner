<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2016-2017, 2019 Jasper Vries

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

$release_dir = 'release';
$jshrink_dir = 'JShrink-1.1.0';

//check if JShrink available, otherwise do not minify
if (is_file($jshrink_dir.'/src/JShrink/Minifier.php')) {
	$jshrink = TRUE;
}
else {
	$jshrink = FALSE;
}

//function to clean directory
function rm_r($dir) {
	$files = scandir($dir);
	foreach ($files as $file) {
		$path = $dir . '/' . $file;
		if (is_dir($path) && ($file != '.') && ($file != '..')) {
			rm_r($path);
		}
		elseif (is_file($path)) {
			unlink($path);
		}
	}
}

//check if release dir exists, if not create it
if (!is_dir($release_dir)) {
	mkdir($release_dir);
	echo 'created '.$release_dir.' directory'.PHP_EOL;
}
else {
	echo 'NOTICE: directory '.$release_dir.' already exists'.PHP_EOL;
	//clean release directory
	rm_r($release_dir);
}

//run spritesheet generator
echo 'generating spritesheet'.PHP_EOL;
chdir('resources');
exec('php -f generatespritesheet.php', $output);
chdir('..');

//copy files
//main dir
$files = scandir('.');
$filetypes = array('.html', '.php', '.png', '.css', '.txt', '.htaccess');
if ($jshrink === FALSE) $filetypes[] = '.js';
$ignore = array('config.cfg.php', 'release.php', 'migrate_symbols.php');
$js = array();
foreach ($files as $file) {
	if (is_file($file) && !in_array($file, $ignore) && in_array(substr($file, strrpos($file, '.')), $filetypes)) {
		copy($file, $release_dir.'/'.$file);
	}
	elseif (is_file($file) && (substr($file, strrpos($file, '.')) == '.js')) {
		//get list of js files to minify
		$js[] = $file;
	}
}
//icon dir
if (!is_dir($release_dir.'/icon')) {
	mkdir($release_dir.'/icon');
	echo 'created icon directory'.PHP_EOL;
}
$files = scandir('icon');
foreach ($files as $file) {
	if (is_file('icon/'.$file) && (substr($file, strrpos($file, '.')) == '.png')) {
		copy('icon/'.$file, $release_dir.'/icon/'.$file);
	}
}

//minify js
if ($jshrink === TRUE) {
	echo 'generating minified javascript'.PHP_EOL;
	$combined_js = array();
	foreach ($js as $file) {
		$combined_js[] = file_get_contents($file);
	}
	$combined_js = join(PHP_EOL, $combined_js);
	require_once($jshrink_dir.'/src/JShrink/Minifier.php');
	$minifiedCode = \JShrink\Minifier::minify($combined_js);
    //add copyright notice
    $minifiedCode = '/*
WebDRIP Designer - webgebaseerde ontwerptool voor DRIP-teksten
Copyright (C) 2013-2019 Jasper Vries

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
'. $minifiedCode;
	//get md5
	$js_md5 = md5($minifiedCode);
	$js_filename = 'webdripdesigner-' . $js_md5 . '.min.js';
	//write to file
	file_put_contents($release_dir . '/' . $js_filename, $minifiedCode);
	
	//replace script tags
	$html = file_get_contents('index.php');
	$html = preg_replace_callback('#<script.*src="(.*)".*</script>\v+?#U', 
		function($matches) use ($js) {
			global $js_filename;
			if (in_array($matches[1], $js)) {
				if ($matches[1] == 'webdripdesigner.js') {
					return '<script src="' . $js_filename . '" type="text/javascript"></script>';
				}
				else {
					return '';
				}
			}
			else {
				return $matches[0];
			}
		},
		$html);
	file_put_contents($release_dir.'/index.php', $html);
}

//get hg version
$hg_ver = exec('hg id -i');
$build = 'build ' . $hg_ver . ' ' . date('Y-m-d');
$hg_tag = exec('hg id -t');
if ($hg_tag !== 'tip') {
	$build = 'versie ' . $hg_tag . ' ' . $build;
}
//insert version into file
$html = file_get_contents($release_dir.'/index.php');
$html = str_replace('{{BUILD}}', $build, $html);
file_put_contents($release_dir.'/index.php', $html);

?>
