<?php
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

//prepare GET data
$data = $_GET['data'];
$data = urldecode($_GET['data']);
$data = substr($data, strrpos($data, ',')+1);
$data = str_replace(' ', '+', $data);
$image = base64_decode($data);
$md5 = md5($_GET['sav']);
//if valid image
if (in_array($_GET['type'], array('png', 'bmp', 'gif')) && ($image = imagecreatefromstring($image))) {
	//store locally, always overwrite in case rendering has changed
	imagepng($image, 'store/'.substr($md5,0,1).'/'.$md5.'.png');
	//connect db
	include('config.cfg.php');
	$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);
	//get user id or create one
	$ip = $_SERVER['REMOTE_ADDR'];
	$hostname = gethostbyaddr($ip);
	//get IP owner from RIPE
	$ripe_url = 'http://rest.db.ripe.net/search.json?query-string='.$ip.'&amp;flags=resource';
	$json = file_get_contents($ripe_url);
	$json = json_decode($json, TRUE);
	$ripe_descr = '';
	if (is_array($json['objects']['object'])) {
		foreach($json['objects']['object'] as $object) {
			if ($object['type'] = 'inetnum') {
				if (is_array($object['attributes']['attribute'])) {
					foreach($object['attributes']['attribute'] as $attribute) {
						if ($attribute['name'] == 'descr') {
							$ripe_descr = $attribute['value'];
							break 2;
						}
					}
				}
			}
		}
	}
	$qry = "SELECT `id` FROM `users`
	WHERE `ip` = '".mysqli_real_escape_string($db['link'], $ip)."'
	AND `hostname` = '".mysqli_real_escape_string($db['link'], $hostname)."'";
	$res = mysqli_query($db['link'], $qry);
	if (!mysqli_num_rows($res)) {
		//create one
		$qry = "INSERT INTO `users` SET
		`id` = NULL,
		`ip` = '".mysqli_real_escape_string($db['link'], $ip)."',
		`hostname` = '".mysqli_real_escape_string($db['link'], $hostname)."',
		`ripe_descr` = '".mysqli_real_escape_string($db['link'], $ripe_descr)."'";
		mysqli_query($db['link'], $qry);
		$id = mysqli_insert_id($db['link']);
	}
	else {
		//get existing
		$row = mysqli_fetch_row($res);
		$id = $row[0];	
	}
	if (!is_numeric($id)) $id = 0;
	//update database
	$qry = "INSERT INTO `history` SET
	`user_id` = '".$id."',
	`timestamp` = NULL,
	`image_md5` = '".$md5."',
	`image_raw` = '".mysqli_real_escape_string($db['link'], $_GET['sav'])."',
	`useragent` = '".mysqli_real_escape_string($db['link'], $_SERVER['HTTP_USER_AGENT'])."'
	ON DUPLICATE KEY UPDATE
	`timestamp` = NULL,
	`image_raw` = '".mysqli_real_escape_string($db['link'], $_GET['sav'])."',
	`useragent` = '".mysqli_real_escape_string($db['link'], $_SERVER['HTTP_USER_AGENT'])."'";
	mysqli_query($db['link'], $qry);
	//output to browser
	header('Content-Type: image/'.$_GET['type']);
	header('Content-Disposition: attachment; filename=drip_'.$md5.'.'.$_GET['type']);
	header('Pragma: no-cache');
	if ($_GET['type'] == 'png') imagepng($image);
	elseif ($_GET['type'] == 'gif') imagegif($image);
	elseif ($_GET['type'] == 'bmp') {
		include('BMP.php');
		imagebmp($image);
	}
}
else {
	//unsupported type or invalid image data
	echo 'ongeldige aanvraag';
}
exit;
?>