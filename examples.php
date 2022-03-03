<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2013-2022 Jasper Vries

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

//send headers
include('headers.inc.php');

//historylist
if (is_numeric($_GET['s'])) {
	//max number of entries
	//calculated from window area, set to a minimum of 10
	$num_w = max(1, floor(($_GET['w'] - 16) / 208));
	$num_h = max(1, floor(($_GET['h'] - 32) / 144));
	$num = max(1, ($num_w * $num_h));
	//connect db
	include('config.cfg.php');
	$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);
	//get number of items
	$qry = "SELECT `image_md5` FROM `history`";
	//limit by ip or cookie
	if (($_GET['l'] == 'user') || ($_GET['l'] == 'cookie')) {
		$ip = $_SERVER['REMOTE_ADDR'];
		$hostname = gethostbyaddr($ip);
		$qry .= " WHERE `user_id` IN (SELECT `id` FROM `users`
			WHERE `ip` = '".mysqli_real_escape_string($db['link'], $ip)."'
			AND `hostname` = '".mysqli_real_escape_string($db['link'], $hostname)."'";
		//limit by cookie
		if ($_GET['l'] == 'cookie') {
			//get cookie unique id
			$cookie = $_COOKIE[$cfg_cookie['history']];
			$qry .= " AND `cookie` = '".mysqli_real_escape_string($db['link'], $cookie)."'";
		}
		$qry .= ")";
	}
	
	$res = mysqli_query($db['link'], $qry);
	$num_entries = mysqli_num_rows($res);
	//decide next page
	if (($_GET['s'] + $num) >= $num_entries) $nextpage = 0;
	else $nextpage = $_GET['s'] + $num;
	//decide previous page
	$prevpage = $_GET['s'] - $num;
	//select from database
	$qry = "SELECT `history`.`image_md5` FROM `history` LEFT JOIN `users` ON `history`.`user_id` = `users`.`id`";
	//limit by ip or cookie
	if (($_GET['l'] == 'user') || ($_GET['l'] == 'cookie')) {
		$qry .= " WHERE `user_id` IN (SELECT `id` FROM `users`
			WHERE `ip` = '".mysqli_real_escape_string($db['link'], $ip)."'
			AND `hostname` = '".mysqli_real_escape_string($db['link'], $hostname)."'";
		//limit by cookie
		if ($_GET['l'] == 'cookie') {
			$qry .= " AND `cookie` = '".mysqli_real_escape_string($db['link'], $cookie)."'";
		}
		$qry .= ")";
	}
	
	$qry .= " ORDER BY `timestamp` DESC LIMIT ".$_GET['s'].",".$num;
	$res = mysqli_query($db['link'], $qry);
	//create result array
	$result = array();
	while ($row = mysqli_fetch_row($res)) {
		$result[] = $row[0];
	}
	//output to browser
	echo json_encode(array('i' => $result, 'o' => $nextpage, 'n' => $prevpage, 't' => $num_entries));
}
//examples
else {
	//decide number of entries
	$num = 20;
	if (is_numeric($_GET['h'])) {
		$maxheight = min(2000, $_GET['h']);
	}
	else {
		$maxheight = 265;
	}
	//connect db
	include('config.cfg.php');
	$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);
	//select from database
	$qry = "SELECT `image_md5`, `image_raw` FROM `history`";
	if (($_GET['l'] == 'user') || ($_GET['l'] == 'cookie')) {
		$ip = $_SERVER['REMOTE_ADDR'];
		$hostname = gethostbyaddr($ip);
		$qry .= " WHERE `user_id` IN (SELECT `id` FROM `users`
			WHERE `ip` = '".mysqli_real_escape_string($db['link'], $ip)."'
			AND `hostname` = '".mysqli_real_escape_string($db['link'], $hostname)."'";
		//limit by cookie
		if ($_GET['l'] == 'cookie') {
			//get cookie unique id
			$cookie = $_COOKIE[$cfg_cookie['history']];
			$qry .= " AND `cookie` = '".mysqli_real_escape_string($db['link'], $cookie)."'";
		}
		$qry .= ")";
	}
	$qry .= " ORDER BY `timestamp` DESC LIMIT ".$num;
	$res = mysqli_query($db['link'], $qry);
	//create result array
	$result = array();
	while ($row = mysqli_fetch_row($res)) {
		//add to result list
		$result[] = $row[0];
		//calculate image height
		$image = json_decode($row[1], TRUE);
		if ($image['t']['c'][0] > 0) { //prevent div by zero
			$height = min(96, round($image['t']['c'][1] * 144 / $image['t']['c'][0])) + 4;
		}
		$maxheight -= $height;
		if ($maxheight < 0) {
			break;
		}
	}
	//output to browser
	echo json_encode($result);
}
?>