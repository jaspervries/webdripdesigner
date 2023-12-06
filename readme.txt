========================================================================
                       WebDRIP Designer README
========================================================================

De WebDRIP Designer is een webgebaseerde ontwerptool voor DRIP-teksten.
Er is ondersteuning voor de meest voorkomende typen beeldstanden met 
een pictogram en een of meerdere tekstregels, welke voldoen aan de 
"Richtlijn informatievoorziening op dynamische informatiepanelen" van 
CROW (artikelnummer D1073). De functionaliteit is gebaseerd op de 
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
    2.5 FAQ
3. Installatie
4. Genereren van release
5. API functionaliteit
6. Licentie
    6.1 imagebmp + imagecreatefrombmp
7. Verkrijgen van de broncode


========================================================================
1. Systeemvereisten en benodigdheden
========================================================================

Voor de basisfunctionaliteit is een recente webbrowser met 
ondersteuning voor HTML5 nodig. Primaire ontwikkeling vindt plaats 
voor Mozilla Firefox en releases worden getest in Chromium.

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
JShrink: https://github.com/tedious/JShrink (gebundeld)
Rangy Inputs: https://github.com/timdown/rangyinputs (gebundeld)
Bitmap Font Maker: http://xbox.create.msdn.com/en-US/education/catalog/utility/bitmap_font_maker
imagebmp + imagecreatefrombmp: http://www.phpclasses.org/package/5991-PHP-Load-and-save-images-in-the-BMP-format.html (gebundeld)


========================================================================
2. Voorbereiding
========================================================================

Vanwege auteursrecht bevat de broncode van de WebDRIP Designer geen 
lettertypen, pictogrammen en regelsymbolen. Deze dienen te worden 
gedownload van de website van CROW en te worden voorbereid voor 
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
(RGB 255,255,0) gemaakt (in een grafisch programma naar keuze).

----------------
2.2 Pictogrammen
----------------

Converteer de pictogrammen naar PNG formaat en sla deze per grootte op 
in een submap van resources/images/. De namen van de submappen worden 
gebruikt als identifiers voor de pictogramgrootte, dus dienen geen 
spaties of speciale tekens te bevatten. 
De namen van de pictogrammen dienen een underscore te bevatten. Het deel 
voor de underscore wordt gebruikt als identifier voor het pictogramen.
Deze idenitifier dient uniek te zijn voor de pictogrammen van dezelfde 
grootte (alle bestanden in dezelfde map hebben een andere identifier). 
De identifier is bij voorkeur uniform over de verschillende groottes van 
pictogrammen (in alle mappen wordt dezelfde identifier gebruikt voor 
hetzelfde verkeersbord). Hierdoor kunnen pictogrammen worden behouden 
bij het wisselen van templates.
Zie het bestand resources/names.php voor de standaardidentifiers van
WebDRIP Designer. Wanneer een andere naamgeving wordt gebruikt, verdient 
het de aanbeveling dit bestand aan te passen en/of uit te breiden. De 
hier opgegeven omschrijvingen worden getoond als tooltip van het 
betreffende pictogram in de interface.
Het deel na de underscore dient als omschrijving en wordt niet door het 
programma gebruikt.

De standaard mapnamen zijn:
- resources/images/Picto_40/
- resources/images/Picto_44/
- resources/images/Picto_48/
- resources/images/Picto_60/
- resources/images/Picto_70/
- resources/images/Picto_92/

Voorbeeld van bestanden in iedere bovengenoemde map:
- J33_file.png
- J34_ongeval.png
- J35_slechtzicht.png
- RJ16_werk.png
- RJ33_file.png
- ...

Bestanden met dezelfde identifier binnen een map worden overschreven, 
bijvoorbeeld J33_file.png en J33_file2.png levert maar één pictogram op.

-----------------
2.3 Regelsymbolen
-----------------

Converteer de regelpictogrammen naar PNG formaat en sla deze per 
grootte op in een submap van resources/symbols/. De namen van de 
submappen worden gebruikt als identifiers, dus dienen geen spaties of 
speciale tekens te bevatten. 
De namen van de regelsymbolen dienen twee underscores te bevatten. Het 
deel voor de eerste underscore is aanwezig om historische redenen en 
werd gebruikt om de grootte van het regelsymbool aan te geven. Het 
programma gebruikt de mapnaam als identifier voor de grootte van de 
regelsymbolen. Het gedeelte tussen de twee underscores wordt 
gebruikt als identifier voor het regelsymbool. Deze idenitifier dient 
uniek te zijn voor de regelsymbolen van dezelfde grootte (alle bestanden 
in dezelfde map hebben een andere identifier). De identifier is bij 
voorkeur uniform over de verschillende groottes van regelsymbolen (in 
alle mappen wordt dezelfde identifier gebruikt voor hetzelfde symbool). 
Hierdoor kunnen symbolen worden behouden bij wisselen tussen 
(tekst)groottes. De identifier bestaat uit exact drie cijfers. Dit is 
tevens het getal wat de gebruiker ziet na een dollarteken in de invoer-
regels (bijvoorbeeld $036).
Zie het bestand resources/names.php voor de standaardidentifiers van
WebDRIP Designer. Wanneer een andere nummering wordt gebruikt, verdient 
het de aanbeveling dit bestand aan te passen en/of uit te breiden. De 
hier opgegeven omschrijvingen worden getoond als tooltip van het 
betreffende symbool in de interface.
Het deel na de tweede underscore dient als omschrijving en wordt niet 
door het programma gebruikt.

De standaard mapnamen zijn:
- resources/symbols/Regel_15/
- resources/symbols/Regel_15_geel/
- resources/symbols/Regel_19/
- resources/symbols/Regel_22/

Voorbeeld van bestanden in iedere bovengenoemde map:
- 19_030_pijl_op.png
- 19_031_pijl_links.png
- 19_032_pijl_rechts.png
- 19_100_file.png
- 19_110_ongeval.png
- ...

Bestanden met dezelfde identifier binnen een map worden overschreven, 
bijvoorbeeld 19_041_Centrico_op.png en 19_041_Centrico_op_nieuw.png 
levert maar één pictogram op.

-------------------------
2.4 Spritetabel genereren
-------------------------

Voor lokaal testen vanuit de repository directory dient eerst een 
spritetabel gegenereerd te worden. Voer hiervoor het script
resources/generatespritesheet.php uit vanuit een opdrachtregel:
php -f generatespritesheet.php

De spritetabel wordt in de vorm van een PNG-afbeelding (sprites.png) en 
JavaScript bestand (sprites.js) naar de root van het repository 
geschreven. De spritetabel wordt automatisch gegenereerd bij het 
genereren van een release (zie hoofdstuk 4) en hoeft in dat geval niet 
apart uitgevoerd te worden.

-------
2.5 FAQ
-------

Q: Waarom heb je niet gemaakt dat de BMP-afbeeldingen direct worden 
   ingelezen?
A: GD heeft geen ondersteuning voor BMP-afbeeldingen. Vrij beschikbare 
   externe bibliotheken blijken nogal moeite te hebben met het correct 
   inlezen van BMP-afbeeldingen in bepaalde bitdiepten. Aangezien het 
   converteren naar PNG een eenmalige actie is en in batch kan worden 
   uitgevoerd door de betere grafische pakketten is besloten geen tijd 
   te investeren in een geautomatiseerde oplossing.

Q: Waarom moet ik alle bestandsnamen van de CROW-download hernoemen?
A: De CROW-download bestond nog niet toen met ontwikkeling van de 
   WebDRIP Designer is gestart. Daarnaast beschikken niet alle 
   bestandsnamen in de download over geschikte unieke identifiers.

Q: Je hebt alle lettertypen en pictogrammen al eens geconverteerd,
   waarom worden deze niet gewoon bijgeleverd?
A: Bij de CROW-download is geen toestemming verleend om deze 
   verder te verspreiden, al dan niet in afgeleide vorm. Hierdoor 
   blijft de auteurswet van toepassing.


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

Met beperkte aanpassingen is het mogelijk om de WebDRIP Designer zonder
historiefunctie en dus zonder database te gebruiken.


========================================================================
4. Genereren van release
========================================================================

Voor het gebruik in een productieomgeving wordt aanbevolen een release 
te genereren. Hierbij worden enkele optimalisaties uitgevoerd en 
enkel de noodzakelijke bestanden bij elkaar gezet. Voor een optimale 
release wordt JShrink gebruikt om de JavaScript bestanden te minimaliseren.

Voer release.php uit vanuit een opdrachtregel om een release te 
genereren. Standaard wordt hiervoor een map release/ aangemaakt in de 
root van het repository. De inhoud van deze map is gereed voor gebruik 
op de productieomgeving. Op de productieomgeving dient dan nog wel 
install.php uitgevoerd te worden. Zie hiervoor het vorige hoofdstuk.

Het script release.php maakt gebruik van git om de actuele hash op te 
vragen. Hiervoor moet git via de opdrachtregel beschikbaar zijn.


========================================================================
5. API functionaliteit
========================================================================

De WebDRIP Designer is voorzien van API functionaliteit om de WebDRIP 
Designer aan te roepen vanuit andere programma's. In plaats van de 
gemaakte beeldstand ter download aan te bieden wordt de gebruiker 
teruggestuurd naar het programma die de WebDRIP Designer heeft 
aangeroepen. Dit programma handelt vervolgens de verwerking van de 
gegenereerde afbeelding af. Via de API kunnen alleen beeldstanden in
PNG-formaat worden verkregen.

Aanroep:
Roep de WebDRIP Designer aan via de normale URL, met toevoeging van de 
parameter "return_url" aan de querystring. De waarde van de parameter 
is de URL waar de bezoeker naar toegestuurd moet worden wanneer de 
beeldstand klaar is. De waarde van de parameter is URL-encoded.

Terugkeer:
Wanneer de bezoeker op de OK-knop klikt (ter vervanging van de Download-
knop), wordt de doorgestuurd naar de pagina die is opgegeven als 
"return_url". Hierbij wordt de parameter "image" aan de querystring 
toegevoegd met als waarde de MD5-hash van de gemaakte beeldstand. Deze 
afbeelding kan vervolgens als PNG-bestand worden opgehaald uit 
/store/<n>/<md5>.png
waarin:
<n>:    het eerste teken van de MD5-hash uit de teruggegeven parameter.
<md5>:  de MD5-hash uit de teruggegeven parameter.

Bestaande afbeelding bewerken:
Als de teruggegeven MD5-hash wordt bewaard, kan deze worden gebruikt om 
eerder gemaakte beeldstanden te bewerken. Voeg hiertoe de parameter 
"md5" toe aan de querystring bij de aanroep, met als waarde de MD5-hash.
De bewerkbare beeldstand wordt dan automatisch ingeladen bij het openen 
van de pagina.

Template (klasse) selecteren:
Bij het aanroepen van de WebDRIP Designer kan via de querystring worden 
aangegeven welk template (eigenlijk template klasse) bij het openen van 
de pagina automatisch geselecteerd. Voeg hiervoor de parameter 
"template" toe aan de URL en geef als waarde de naam van de template 
klasse. Dit zijn dezelfde namen als in de eerste template-dropdown in de
interface. Wanneer de opgegeven naam niet wordt aangetroffen, wordt de 
eerste klasse uit de lijst geselecteerd.
Deze functionaliteit is ook beschikbaar wanneer geen gebruik wordt 
gemaakt van de overige API-functionaliteit.


========================================================================
6. Licentie
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
Copyright (C) 2013-2023 Jasper Vries

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
6.1 imagebmp + imagecreatefrombmp
---------------------------------

WebDRIP Designer maakt gebruik van de PHP klasse 
"imagebmp + imagecreatefrombmp" door "de77" voor het genereren van 
bitmapafbeeldingen. Deze klasse is vrijgegeven onder de MIT licentie en 
is gebundeld met de broncode van de WebDRIP Designer als BMP.php. 
Voor de oorspronkelijke bron van "imagebmp + imagecreatefrombmp" zie: 
http://www.phpclasses.org/package/5991-PHP-Load-and-save-images-in-the-BMP-format.html


========================================================================
7. Verkrijgen van de broncode
========================================================================

De broncode van de WebDRIP Designer is gepubliceerd op Bitbucket.
https://bitbucket.org/jaspervries/webdripdesigner
