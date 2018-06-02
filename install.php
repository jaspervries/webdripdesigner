<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2014-2016, 2018 Jasper Vries

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

//create config
if (!is_file('config.cfg.php')) {
	$config = '<?php
/*
 * WebDRIP Designer configuration file
*/

//Database details
$cfg_db[\'host\'] = \'localhost\';
$cfg_db[\'user\'] = \'root\';
$cfg_db[\'pass\'] = \'\';
$cfg_db[\'db\'] = \'wdd\';

$cfg_cookie[\'history\'] = \'wdd_unique_id\';
?>
';
	file_put_contents('config.cfg.php', $config);
	echo 'created config file'.PHP_EOL;
	echo 'PLEASE EDIT CONFIG FILE AND RUN INSTALL AGAIN!'.PHP_EOL;
	exit;
}

include('config.cfg.php');

$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass']);


$qry = "CREATE DATABASE IF NOT EXISTS `".$cfg_db['db']."`
COLLATE 'latin1_general_ci'";
if (mysqli_query($db['link'], $qry)) echo 'database created or exists'.PHP_EOL;
else echo 'did not create database'.PHP_EOL;

$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);

$qry = "CREATE TABLE IF NOT EXISTS `history`
(
	`user_id` INT UNSIGNED NOT NULL DEFAULT 0,
	`timestamp` TIMESTAMP NOT NULL,
	`image_md5` VARCHAR(32) NOT NULL,
	`image_raw` TEXT NOT NULL,
	`useragent` TINYTEXT NULL,
	CONSTRAINT `userimage` PRIMARY KEY (user_id,image_md5)
)
ENGINE `MyISAM`,
CHARACTER SET 'latin1', 
COLLATE 'latin1_general_ci'";
if (mysqli_query($db['link'], $qry)) echo 'table `history` created or exists'.PHP_EOL;
else echo 'did not create table `history`'.PHP_EOL;
echo mysqli_error($db['link']).PHP_EOL;

$qry = "CREATE TABLE IF NOT EXISTS `users`
(
	`id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	`ip` varchar(39),
	`hostname` varchar(255),
	`cookie` varchar(32)
)
ENGINE `MyISAM`,
CHARACTER SET 'latin1', 
COLLATE 'latin1_general_ci'";
if (mysqli_query($db['link'], $qry)) echo 'table `users` created or exists';
else echo 'did not create table `users`'.PHP_EOL;
echo mysqli_error($db['link']).PHP_EOL;

//add cookie column
$qry = "ALTER TABLE `users` ADD `cookie` VARCHAR(32) NULL DEFAULT NULL";
if (mysqli_query($db['link'], $qry)) echo 'table `users` altered';
else echo 'did not alter table `users`'.PHP_EOL;
echo mysqli_error($db['link']).PHP_EOL;

//create store
if (!is_dir('store')) {
	mkdir('store');
	$subdirs = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
	foreach ($subdirs as $subdir) {
		mkdir('store/'.$subdir);
	}
	echo 'created store directories'.PHP_EOL;
}
?>