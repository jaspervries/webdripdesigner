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

//dirs
$dirs = array('fonts', 'images', 'symbols');
$imagesdirs = array('Picto_40', 'Picto_44', 'Picto_48', 'Picto_60', 'Picto_70', 'Picto_92');
$symbolsdirs = array('Regel_15', 'Regel_15_geel', 'Regel_19', 'Regel_12');

echo 'creating directory structure...'.PHP_EOL;
//check if release dir exists, if not create it
foreach ($dirs as $dir) {
	if (!is_dir($dir)) {
		mkdir($dir);
	}
	$createsubdirs = FALSE;
	if ($dir == 'images') {
		$subdirs = $imagesdirs;
		$createsubdirs = TRUE;
	}
	if ($dir == 'symbols') {
		$subdirs = $symbolsdirs;
		$createsubdirs = TRUE;
	}
	if ($createsubdirs == TRUE) {
		foreach ($subdirs as $subdir) {
			if (!is_dir($dir.'/'.$subdir)) {
				mkdir($dir.'/'.$subdir);
			}
		}
	}
}
echo 'done!'.PHP_EOL;
?>
