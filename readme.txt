========================================================================
                       WebDRIP Designer README
========================================================================

De WebDRIP Designer is een webgebaseerde ontwerptool voor DRIP-teksten.
Er is ondersteuning voor de meest voorkomende typen beeldstanden met 
een pictogram en een of meerdere tekstregels, welke voldoen aan de 
"Richtlijn informatievoorziening op dynamische informatiepanelen" van 
het CROW (artikelnummer D1073). De functionaliteit is gebaseerd op de 
BermDRIP Designer van Rijkswaterstaat en kent vele nieuwe mogelijkheden.


========================================================================
0. Inhoudsopgave
========================================================================

1. Systeemvereisten en benodigdheden
2. Voorbereiding
    2.1 Lettertypen
    2.2 Pictogrammen
    2.3 Regelsymbolen
    2.4 Spritetabel genereren
3. Installatie
4. Genereren van release
5. Licentie
    5.1 imagebmp + imagecreatefrombmp
6. Verkrijgen van de broncode


========================================================================
1. Systeemvereisten en benodigdheden
========================================================================

Voor de basisfunctionaliteit is een recente webbrowser met 
ondersteuning voor HTML5 nodig. Primaire ontwikkeling vindt plaats 
voor Mozilla Firefox en releases worden getest in Chromium en Firefox 
Mobile.

Voor de historie- en downloadfunctie is een webserver met PHP (5.3+) en 
MySQL (5+) of MariaDB (5+) nodig. Daarnaast wordt PHP gebruikt voor het 
genereren van de spritesheet en het samenstellen van een release. Voor 
het samenstellen van een release wordt optioneel gebruik gemaakt van 
JShrink. 

Voor een basisversie zonder historie- en downloadfunctie is op dit 
moment eveneens PHP noodzakelijk, omdat enkele HTML-onderdelen in een 
loop worden gegerereerd. Het is echter relatief eenvoudig om dit om te 
zetten naar puur HTML.

URLs:
Mozilla Firefox: https://www.mozilla.org/firefox
Chromium: https://www.chromium.org
Chromium (Windows build): http://chromium.woolyss.com
PHP: http://php.net
MySQL: https://www.mysql.com
MariaDB: https://mariadb.org
JShrink: https://github.com/tedious/JShrink
Bitmap Font Maker: http://xbox.create.msdn.com/en-US/education/catalog/utility/bitmap_font_maker
imagebmp + imagecreatefrombmp: http://www.phpclasses.org/package/5991-PHP-Load-and-save-images-in-the-BMP-format.html (gebundeld)


========================================================================
2. Voorbereiding
========================================================================

Vanwege auteursrecht bevat de broncode van de WebDRIP Designer geen 
lettertypen, pictogrammen en regelsymbolen. Deze dienen te worden 
gedownload van de website van het CROW en te worden voorbereid voor 
gebruik met de WebDRIP Designer. De lettertypen, pictogrammen en 
regelsymbolen behorend bij uitgave D1073 zijn gratis te downloaden via
http://www.crow.nl/publicaties/richtlijn-informatievoorziening-op-dynamische-info

---------------
2.1 Lettertypen
---------------

Gebruik Bitmap Font Maker (ttf2bmp) om spritesheets te genereren van de 
lettertypen. Converteer de gegenereerde bitmaps naar PNG-formaat.

Gebruik de volgende instellingen:
- Font style: regular
- Outline size: 0
- Shadow offset: 0
- Min char: 0x20
- Max char: 0xFF
- Antialiased: uitgeschakeld

Lettertype      | Puntgrootte | Uitvoerbestand
----------------|-------------|----------------
CdmsBdType1.ttf | 18 pt       | CdmsBdType1.png
CdmsBdType2.ttf | 15 pt       | CdmsBdType2.png
CdmsBdType3.ttf | 11 pt       | CdmsBdType3.png
CdmsBdType3.ttf | 11 pt       | CdmsBdType3Yellow.png *

Sla de uitvoerbestanden op in resources/fonts/. De namen van de PNG-
bestanden worden gebruikt als identifiers, dus dienen geen spaties of 
speciale tekens te bevatten.

*) Is identiek aan CdmsBdType3.png, maar dan met de witte letters geel 
gemaakt (RGB 255,255,0).

----------------
2.2 Pictogrammen
----------------

Converteer de pictogrammen naar PNG formaat en sla deze per grootte op 
in een submap van resources/images/. De namen van de submappen worden 
gebruikt als identifiers, dus dienen geen spaties of speciale tekens te 
bevatten. De namen van de pictogrammen dienen een underscore te 
bevatten. Het deel voor de underscore wordt gebruikt als identifier en 
dient uniform te zijn over de verschillende groottes van pictogrammen. 
Het deel na de underscore dient als omschrijving en wordt niet door het 
programma gebruikt.

De standaard mapnamen zijn:
- resources/images/Picto_40/
- resources/images/Picto_44/
- resources/images/Picto_48/
- resources/images/Picto_60/
- resources/images/Picto_70/
- resources/images/Picto_92/

-----------------
2.3 Regelsymbolen
-----------------

Converteer de regelpictogrammen naar PNG formaat en sla deze per 
grootte op in een submap van resources/symbols/. De namen van de 
submappen worden gebruikt als identifiers, dus dienen geen spaties of 
speciale tekens te bevatten. De namen van de regelsymbolen dienen twee 
underscores te bevatten. Het deel voor de eerste underscore is 
aanwezig om historische redenen en wordt gebruikt om de grootte van het 
regelsymbool aan te geven. Het gedeelte tussen de underscores wordt 
gebruikt als identifier en dient uniform te zijn over de verschillende 
groottes van pictogrammen. Het deel na de tweede underscore dient 
als omschrijving en wordt niet door het programma gebruikt.

De standaard mapnamen zijn:
- resources/symbols/Regel_15/
- resources/symbols/Regel_15_geel/
- resources/symbols/Regel_19/
- resources/symbols/Regel_22/

-------------------------
2.4 Spritetabel genereren
-------------------------

Voor lokaal testen vanuit de repository directory dient eerst een 
spritetabel gegenereerd te worden. Voer hiervoor het script
resources/generatespritesheet.php uit vanuit een opdrachtregel:
php -f generatespritesheet.php

De spritetabel wordt in de vorm van een PNG-afbeelding en JavaScript 
bestand naar de root van het repository geschreven.


========================================================================
3. Installatie
========================================================================

Om gebruik te maken van de historie- en downloadfunctie is installatie 
vereist. De installatie maakt de databasetabellen en mappenstructuur 
hiervoor aan. Voer install.php uit vanuit een opdrachtregel. Als er nog 
geen configuratiebestand aanwezig is, wordt dit aangemaakt. Open dit 
met een teksteditor en vul de juiste databasecredentials is. Voer 
hierna install.php nogmaals uit om de databasetabellen en 
mappenstructuur aan te maken.

De WebDRIP Designer kan nu gebruikt worden vanuit het working 
repository.


========================================================================
4. Genereren van release
========================================================================

Voor het gebruik in een productieomgeving wordt aanbevolen een release 
te genereren. Hierbij worden enkele optimalisaties uitgevoerd en 
enkel de noodzakelijke bestanden bij elkaar gezet. Voor een optimale 
release is JShrink nodig om de JavaScript bestanden te minimaliseren.
Hiervoor moet JShrink in de root van het repository aanwezig zijn. Pak 
hiertoe JShrink na downloaden uit in een submap in het repository. 

Standaard verwijst het release-script naar 
JShrink-1.1.0/src/JShrink/Minifier.php voor het JShrink programma. Dit 
kan worden aangepast in release.php.

Voer release.php uit vanuit een opdrachtregel om een release te 
genereren. Standaard wordt hiervoor een map release/ aangemaakt in de 
root van het repository. De inhoud van deze map is gereed voor gebruik 
op de productieomgeving. Op de productieomgeving dient dan nog wel 
install.php uitgevoerd te worden. Zie hiervoor het vorige hoofdstuk.


========================================================================
5. Licentie
========================================================================

Omdat veel partijen inmiddels afhankelijk zijn van de WebDRIP Designer 
voor hun werkzaamheden, is de broncode vrijgegeven als open source 
software. Hiermee is geborgd dat iedereen de WebDRIP Designer kan 
blijven gebruiken, mocht de door de auteur beheerder versie op 
http://wdd.s200.nl wegvallen.

Eenieder die de broncode van de WebDRIP Designer gebruikt voor meer dan 
testdoeleinden wordt vriendelijk gevraagd dat via jasper@s200.nl 
kenbaar te maken.

De WebDRIP Designer is vrijgegeven onder de GNU General Public License 
versie 3. Dit geeft iedereen het recht om de software te gebruiken en 
te kunnen beschikken over de broncode. Het maken van aanpassingen is 
eveneens toegestaan, zolang auteursrechtvermeldingen intact blijven, en 
vallen automatisch onder dezelfde licentievoorwaarden. Gebruikers van 
een aangepaste versie hebben daardoor ook het recht om te beschikken 
over de broncode van de aangepaste versie. Voor meer informatie zie de 
volledige licentietekst in license.txt.


WebDRIP Designer - webgebaseerde ontwerptool voor DRIP-teksten
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

---------------------------------
5.1 imagebmp + imagecreatefrombmp
---------------------------------

WebDRIP Designer maakt gebruik van de PHP klasse 
"imagebmp + imagecreatefrombmp" door "de77" voor het genereren van 
bitmapafbeeldingen. Deze klasse is vrijgegeven onder de MIT licentie en 
is gebundeld met de broncode van de WebDRIP Designer. 
Voor de oorspronkelijke bron van "imagebmp + imagecreatefrombmp" zie: 
http://www.phpclasses.org/package/5991-PHP-Load-and-save-images-in-the-BMP-format.html


========================================================================
6. Verkrijgen van de broncode
========================================================================

De broncode van de WebDRIP Designer is gepubliceerd op Bitbucket.
https://bitbucket.org/jaspervries/webdripdesigner
