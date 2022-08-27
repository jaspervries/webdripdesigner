<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2016-2017, 2019, 2020, 2022 Jasper Vries

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
$jshrink_dir = 'bundled/JShrink';

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

//function to copy directory recursively
function copy_r($source, $target) {
	if (is_dir($source)) {
		if (!is_dir($target)) {
			mkdir($target);
		}
		$files = scandir($source);
		foreach ($files as $file) {
			if (($file != '.') && ($file != '..')) {
				$source_path = $source . '/' . $file;
				$target_path = $target . '/' . $file;
				copy_r($source_path, $target_path);
			}
		}
	}
	elseif (is_file($source)) {
		//source is a file, only copy a single file
		copy($source, $target);
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
$md5ify = array('sprites.png', 'style.css');
$md5ify = array_flip($md5ify);
$js = array();
foreach ($files as $file) {
	if (is_file($file) && !in_array($file, $ignore) && in_array(substr($file, strrpos($file, '.')), $filetypes)) {
		$target_file = $file;
		//check if md5ify
		if (array_key_exists($file, $md5ify)) {
			$md5 = md5_file($file);
			$target_file = explode('.', $file);
			$target_file = $target_file[0] . '-' . $md5 . '.' . $target_file[1];
			$md5ify[$file] = $target_file;
		}
		copy($file, $release_dir.'/'.$target_file);
	}
	elseif (is_file($file) && (substr($file, strrpos($file, '.')) == '.js')) {
		//get list of js files to minify
		$js[] = $file;
	}
}

//copy directories
copy_r('icon', $release_dir.'/icon');
echo 'created icon directory'.PHP_EOL;
copy_r('bundled', $release_dir.'/bundled');
echo 'created bundled directory'.PHP_EOL;

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
Copyright (C) 2013-2020 Jasper Vries

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
	//replace md5ified filenames
	$minifiedCode = str_replace(array_keys($md5ify), $md5ify, $minifiedCode);
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
	//replace md5ified filenames
	$html = str_replace(array_keys($md5ify), $md5ify, $html);
	file_put_contents($release_dir.'/index.php', $html);
}

//get git version
$git_ver = exec('git log -1 --pretty=format:%H');
$build = 'build <a href="https://github.com/jaspervries/webdripdesigner/commits">' . substr($git_ver, 0, 7) . '</a> ' . date('Y-m-d');
//insert version into file
$html = file_get_contents($release_dir.'/index.php');
$html = str_replace('{{BUILD}}', $build, $html);
file_put_contents($release_dir.'/index.php', $html);

?>
