<?php
/*
This file is part of WebDRIP Designer
Copyright (C) 2017-2021, 2023 Jasper Vries

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

//omschrijvingen van regelsymbolen
$names['symbol'] = array(
//serie 0: pijlen
0 => 'Smalle spatie',
20 => 'Centrico-pijl voor omleidingen, rechtdoor',
21 => 'Centrico-pijl voor omleidingen, diagonaal links',
22 => 'Centrico-pijl voor omleidingen, diagonaal rechts',
23 => 'Centrico-pijl voor omleidingen, horizontaal links',
24 => 'Centrico-pijl voor omleidingen, horizontaal rechts',
30 => 'Pijl, rechtdoor',
31 => 'Pijl, diagonaal links',
32 => 'Pijl, diagonaal rechts',
33 => 'Pijl, horizontaal links',
34 => 'Pijl, horizontaal rechts',
35 => 'Pijl, hoek links',
36 => 'Pijl, hoek rechts',
37 => 'Pijl, keren',
50 => 'Pijl in ANWB-Redesign, rechtdoor',
51 => 'Pijl in ANWB-Redesign, diagonaal links',
52 => 'Pijl in ANWB-Redesign, diagonaal rechts',
53 => 'Pijl in ANWB-Redesign, horizontaal links',
54 => 'Pijl in ANWB-Redesign, horizontaal rechts',
55 => 'Pijl in ANWB-Redesign, hoek links',
56 => 'Pijl in ANWB-Redesign, hoek rechts',
90 => 'Oude Centrico-pijl, rechtdoor',
91 => 'Oude Centrico-pijl, diagonaal links',
92 => 'Oude Centrico-pijl, diagonaal rechts',
93 => 'Oude Centrico-pijl, horizontaal links',
94 => 'Oude Centrico-pijl, horizontaal rechts',
//serie 1: oorzaken van stremming
100 => 'File',
110 => 'Ongeval',
111 => 'Stoomboot',
120 => 'Werk in uitvoering',
130 => 'Brug open',
140 => 'Voertuig met pech',
141 => 'Voertuig wordt geborgen',
142 => 'Afgevallen lading',
//serie 2: locaties
200 => 'Knooppunt',
210 => 'Afrit',
230 => 'Autosnelweg',
240 => 'Tunnel',
//serie 3: voertuigen
300 => 'Auto',
301 => 'Auto, vanaf de voorkant gezien',
310 => 'Aanhanger',
320 => 'Vrachtauto',
330 => 'Bus',
340 => 'Tram',
350 => 'Motorfiets',
//serie 4: (gereserveerd)
//serie 5: doelen
500 => 'Centrum, gebruik dit symbool alleen wanneer dit ook op de bewegwijzering voorkomt, bij voorkeur met het woord Centrum toegevoegd',
510 => 'Trein',
511 => 'NS-logo',
512 => 'Station',
520 => 'Vliegveld, rijrichting is rechtdoor',
521 => 'Vliegveld, rijrichting is linksaf',
522 => 'Vliegveld, rijrichting is rechtsaf',
530 => 'Veerboot',
540 => 'Bedrijventerrein',
541 => 'Kantorenlocatie',
542 => 'Woonboulevard',
550 => 'Voetbalstadion',
551 => 'Stadion',
560 => 'Dierenpark',
570 => 'Hospitaal, ziekenhuis',
//serie 6: parkeren
600 => 'Parkeerterrein',
601 => 'Parkeerterrein (nieuw)',
610 => 'Parkeergarage',
611 => 'Parkeergarage (nieuw)',
612 => 'Parkeergarage',
620 => 'Parkeren en reizen',
630 => 'Parkeerroute (smal)',
631 => 'Parkeerroute (breed)',
632 => 'Parkeerroute (oud)',
633 => 'Parkeer-ring',
//serie 7: doelen binnen bebouwde kom
700 => 'Winkelcentrum',
701 => 'Congrescentrum',
702 => 'Industriehaven',
703 => 'Bungalowpark',
704 => 'Begraafplaats',
705 => 'Recreatiegebied',
706 => 'Strand',
707 => 'Jachthaven',
708 => 'VVV-kantoor',
709 => 'Toeristisch informatiepunt',
710 => 'Museum',
//serie 8: (gereserveerd)
//serie 9: overige
900 => 'File plus',
901 => 'File min',
902 => 'Uitroepteken',
910 => 'RING in CdmsBdType2',
950 => 'België',
951 => 'Duitsland',
952 => 'Groot-Brittannië',
953 => 'Nederland'
);

//omschrijvingen van pictogrammen
$names['picto'] = array(
'A1v50' => 'Verkeersbord A1: maximumsnelheid 50 km/u',
'A1v70' => 'Verkeersbord A1: maximumsnelheid 70 km/u',
'A1v80' => 'Verkeersbord A1: maximumsnelheid 80 km/u',
'A1v90' => 'Verkeersbord A1: maximumsnelheid 90 km/u',
'A1v100' => 'Verkeersbord A1: maximumsnelheid 100 km/u',
'C1' => 'Verkeersbord C1: gesloten in beide richtingen voor voertuigen, ruiters en geleiders van rij- of trekdieren of vee',
'C7' => 'Verkeersbord C7: gesloten voor vrachtauto\'s',
'C7b' => 'Verkeersbord C7b: gesloten voor autobussen en vrachtauto\'s',
'C10' => 'Verkeersbord C10: gesloten voor motorvoertuigen met aanhanger',
'C16' => 'Verkeersbord C10: gesloten voor voetgangers',
'C22' => 'Verkeersbord C22: Gesloten voor voertuigen gevaarlijke stoffen',
'C22catC' => 'Verkeersbord C22 categorie C: Gesloten voor voertuigen gevaarlijke stoffen in categorie C',
'C22catD' => 'Verkeersbord C22 categorie D: Gesloten voor voertuigen gevaarlijke stoffen in categorie D',
'E4' => 'Verkeersbord E4: parkeergelegenheid',
'E4C1' => 'Parkeergelegenheid vol of gesloten, gebruik altijd in combinatie met de tekst \'VOL\' of \'dicht\' in verband met kleurenblinden',
'E12' => 'Verkeersbord E12: parkeergelegenheid ten behoeve van overstappers op het openbaar vervoer',
'F1' => 'Verkeersbord F1: verbod voor motorvoertuigen om elkaar onderling in te halen',
'F2' => 'Verkeersbord F2: einde verbod voor motorvoertuigen om elkaar onderling in te halen',
'F3' => 'Verkeersbord F3: verbod voor vrachtauto\'s om motorvoertuigen in te halen',
'F4' => 'Verkeersbord F4: einde verbod voor vrachtauto\'s om motorvoertuigen in te halen',
'F8' => 'Verkeersbord F8: einde van alle door verkeersborden aangegeven verboden',
'J1' => 'Verkeersbord J1: slecht wegdek',
'J15' => 'Verkeersbord J15: beweegbare brug, gebruik alleen in geval van een geopende brug',
'J16' => 'Verkeersbord J16: werk in uitvoering',
'J17' => 'Verkeersbord J17: rijbaanversmalling',
'J18' => 'Verkeersbord J18: rijbaanversmalling rechts',
'J19' => 'Verkeersbord J19: rijbaanversmalling links',
'J20' => 'Verkeersbord J20: slipgevaar',
'J25' => 'Verkeersbord J25: losliggende stenen',
'J29' => 'Verkeersbord J29: tegenliggers',
'J31' => 'Verkeersbord J31: zijwind',
'J33' => 'Verkeersbord J33: file',
'J34' => 'Pictogram ter indicatie van een zinkende stoomboot',
'J34v2' => 'Verkeersbord J34: ongeval',
'J35' => 'Verkeersbord J35: slecht zicht door sneeuw, regen of mist',
'J36' => 'Verkeersbord J36: ijzel of sneeuw',
'J37' => 'Verkeersbord J37: gevaar direct na de DRIP, aard van het gevaar moet in tekst worden aangegeven. Niet bedoeld om afsluitingen, stremmingen, afgelastingen etc. aan te duiden',
'L215' => 'Snelheidscontrole',
'RC22' => 'Gesloten voor voertuigen gevaarlijke stoffen op grotere afstand van deze DRIP',
'RC22catC' => 'Gesloten voor voertuigen gevaarlijke stoffen in categorie C op grotere afstand van deze DRIP',
'RC22catD' => 'Gesloten voor voertuigen gevaarlijke stoffen in categorie D op grotere afstand van deze DRIP',
'RJ15C1' => 'Brug gestremd door storing, gebruik altijd in combinatie met tekst \'gestremd\' (CDMS versie)',
'RJ15C1v2' => 'Brug gestremd door storing, gebruik altijd in combinatie met tekst \'gestremd\' (grotere versie)',
'RJ16' => 'Werk in uitvoering op grotere afstand van deze DRIP',
'RJ20' => 'Slipgevaar op grotere afstand van deze DRIP',
'RJ31' => 'Zijwind op grotere afstand van deze DRIP',
'RJ33' => 'File op grotere afstand van deze DRIP',
'RJ33goomba' => 'File van Goomba\'s™ verder verwijderd van deze DRIP, er is op dit moment een actie vereist van de leidinggevende van wie dit op een DRIP heeft gezet',
'RJ34' => 'Pictogram ter nagedachtenis aan de Costa Concordia, R.I.P',
'RJ34v2' => 'Ongeval op grotere afstand van deze DRIP',
'RJ36' => 'IJzel of sneeuw op grotere afstand van deze DRIP',
'RJ37' => 'Attentieverhogend',
'RJ100' => 'Afgevallen lading',
'RL13' => 'Tunnel',
'RL13C1' => 'Tunnel dicht, gebruik altijd in combinatie met de tekst \'dicht\' in verband met kleurenblinden',
'RL13J29' => 'Tegenverkeer in tunnel',
'RL13J34' => 'Schip van trailer gevallen in tunnel',
'RL13J34v2' => 'Ongeval in tunnel, gebruik bij voorkeur verkeersbord J34 in plaats van dit pictogram',
'RwOSKD' => 'Oosterscheldekering gesloten voor wegverkeer',
'RwOSKO' => 'Oosterscheldekering vrij voor wegverkeer',
'RwC10D1L' => 'T-splitsing links en gesloten rechtdoor',
'RwC10D1R1L' => 'T-splitsing rechts en gesloten rechtdoor',
'RwC10D1R' => 'Kruispunt gesloten rechtdoor',
'RwC10D2R1L' => 'Kruispunt gesloten rechtdoor na zijweg rechts',
'RwC10Drot1R0L' => 'Rotonde gesloten rechtdoor, adviesroute rechtsaf',
'RwC10Drot1R1L' => 'Rotonde gesloten rechtdoor',
'RwC10L1D' => 'T-splitsing rechtdoor en gesloten links',
'RwC10L1R' => 'T-splitsing rechts en gesloten links',
'RwC10R1D' => 'T-splitsing rechtdoor en gesloten rechts',
'RwC10R1L' => 'T-splitsing links en gesloten rechts',
'RwC10Rrot1D1L' => 'Rotonde gesloten rechts',
'RwC1D1L' => 'T-splitsing links en gesloten voor vrachtauto\'s rechtdoor',
'RwC1D1R1L' => 'T-splitsing rechts en gesloten voor vrachtauto\'s rechtdoor',
'RwC1D1R' => 'Kruispunt gesloten voor vrachtauto\'s rechtdoor',
'RwC1D2R1L' => 'Kruispunt gesloten voor vrachtauto\'s rechtdoor na zijweg rechts',
'RwC1Drot1R0L' => 'Rotonde gesloten voor vrachtauto\'s rechtdoor, adviesroute rechtsaf',
'RwC1Drot1R1L' => 'Rotonde gesloten voor vrachtauto\'s rechtdoor',
'RwC1L1D' => 'T-splitsing rechtdoor en gesloten voor vrachtauto\'s links',
'RwC1L1R' => 'T-splitsing rechts en gesloten voor vrachtauto\'s links',
'RwC1R1D' => 'T-splitsing rechtdoor en gesloten voor vrachtauto\'s rechts',
'RwC1R1L' => 'T-splitsing links en gesloten voor vrachtauto\'s rechts',
'RwC1Rrot1D1L' => 'Rotonde gesloten voor vrachtauto\'s rechts',
'RwC7D1L' => 'T-splitsing links en gesloten voor motorvoertuigen met aanhanger rechtdoor',
'RwC7D1R1L' => 'T-splitsing rechts en gesloten voor motorvoertuigen met aanhanger rechtdoor',
'RwC7D1R' => 'Kruispunt gesloten voor motorvoertuigen met aanhanger rechtdoor',
'RwC7D2R1L' => 'Kruispunt gesloten voor motorvoertuigen met aanhanger rechtdoor na zijweg rechts',
'RwC7Drot1R0L' => 'Rotonde gesloten voor motorvoertuigen met aanhanger rechtdoor, adviesroute rechtsaf',
'RwC7Drot1R1L' => 'Rotonde gesloten voor motorvoertuigen met aanhanger rechtdoor',
'RwC7L1D' => 'T-splitsing rechtdoor en gesloten voor motorvoertuigen met aanhanger links',
'RwC7L1R' => 'T-splitsing rechts en gesloten voor motorvoertuigen met aanhanger links',
'RwC7R1D' => 'T-splitsing rechtdoor en gesloten voor motorvoertuigen met aanhanger rechts',
'RwC7R1L' => 'T-splitsing links en gesloten voor motorvoertuigen met aanhanger rechts',
'RwC7Rrot1D1L' => 'Rotonde gesloten voor motorvoertuigen met aanhanger rechts',
'RwZBD' => 'Zeelandbrug gesloten voor wegverkeer',
'RwZBO' => 'Zeelandbrug vrij voor wegverkeer',
'RWS01' => 'Stormvloedkering Ramspol gestremd voor scheepvaart'
);
?>
