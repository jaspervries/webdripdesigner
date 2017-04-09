<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2017 Jasper Vries

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

/*
In r43 is de nummering van de regelsymbolen gewijzigd.
Met dit script kan de database worden bijgewerkt zodat opgeslagen 
beeldstanden kunnen worden ingeladen met behoud van de oorspronkelijk
geselecteerde regelsymbolen.
Het is belangrijk dit script slechts eenmaal uit te voeren!
Het is aanbevolen eerst een backup te maken van de database.
Verwijder de exit; op regel 30 voor gebruik.
*/

//voorkom per ongeluk uitvoeren
exit;

//create config
include('config.cfg.php');
$db['link'] = mysqli_connect($cfg_db['host'], $cfg_db['user'], $cfg_db['pass'], $cfg_db['db']);

$fromto = array(
'041' => '090',
'042' => '091',
'043' => '092',
'044' => '093',
'045' => '094',
'071' => '020',
'072' => '021',
'073' => '022',
'074' => '023',
'075' => '024',
'111' => '200',
'112' => '210',
'113' => '130',
'114' => '240',
'115' => '230',
'121' => '100',
'122' => '111',
'123' => '110',
'124' => '120',
'125' => '140',
'126' => '141',
'131' => '500',
'132' => '540',
'133' => '511',
'134' => '570',
'135' => '550',
'136' => '551',
'137' => '560',
'138' => '710',
'140' => '300',
'141' => '301',
'142' => '310',
'143' => '320',
'144' => '330',
'145' => '340',
'146' => '510',
'147' => '520',
'148' => '521',
'149' => '522',
'150' => '530',
'151' => '900',
'152' => '901',
'161' => '600',
'162' => '610',
'163' => '620',
'164' => '632',
'165' => '631',
'166' => '630',
'167' => '601',
'168' => '611',
'169' => '910',
'170' => '700',
'171' => '701',
'172' => '541',
'173' => '702',
'174' => '542',
'175' => '703',
'176' => '704',
'177' => '705',
'178' => '706',
'179' => '707',
'180' => '708',
'181' => '709'
);

$qry = "UPDATE `history` SET `image_raw` = REPLACE(`image_raw`, '$', '$#')";
mysqli_query($db['link'], $qry);
echo mysqli_error($db['link']) . PHP_EOL;

foreach ($fromto as $from => $to) {
	echo $from . ' => ' . $to . PHP_EOL;
	$qry = "UPDATE `history` SET `image_raw` = REPLACE(`image_raw`, '$#".$from."', '$".$to."')";
	mysqli_query($db['link'], $qry);
	echo mysqli_error($db['link']) . PHP_EOL;
}

$qry = "UPDATE `history` SET `image_raw` = REPLACE(`image_raw`, '$#', '$')";
mysqli_query($db['link'], $qry);
echo mysqli_error($db['link']) . PHP_EOL;
?>