<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2014-2022 Jasper Vries

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

//connect db
include('config.cfg.php');
$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);
//select from database
$qry = "SELECT `image_raw` FROM `history` WHERE `image_md5` = '".mysqli_real_escape_string($db['link'], $_GET['md5'])."' ORDER BY `timestamp` DESC LIMIT 1";
$res = mysqli_query($db['link'], $qry);
//result
if ($row = mysqli_fetch_row($res)) {
	if (json_decode($row[0]) !== NULL) {
		header('Content-Type: application/json');
		echo $row[0];
		exit;
	}
}
//no saved format
header("HTTP/1.0 404 Not Found");
exit;
?>