# WBA2SS17HuntschaErsoyLehmann

Das Thema der Anwendung soll ein Wohngemeinschaftsverzeichnis sein. Benutzer können sich Wohngemeinschaften nach bestimmten Kriterien anzeigen lassen. 

Funktionsweise unserer App

Unsere App arbeitet mit JSon-Dateien, in den unsere Anzeigen für die Fliterung bereit stehen. Wir können diese Anzeigen bearbeiten, neue erstellen oder sie auch löschen. 

Features 

Filterung:
Die Filterung geschieht durch die HTTP Methode GET, um die Suche zu spezifizieren haben wir einige Kritieren, wie z.b das eine Anzeige erst anzeigt wird wenn man eine speziellen Stadt eingeben hat oder auch nach der Raumanzahl um bestimmte Anzeigen zu bekommen.

Neue Anzeigen anlegen:

Das Anlegen einer neuen  Anzeige wird durch die Methode POST eingeführt. Diese Methode erzeugt ein neues Objekt mit den Atrributen: "id:","city:","rent:","renttype:","size:","roomqty:".

Anzeige verändern:

Dieses Feature passiert durch die HTTP Methode PUT. Diese Methode ermöglicht es das die bestehenenden Daten in unseren Anzeige verändert und auch übernommen werden. 


Guide für die Instaltion von Node.js und Redis.io 

Node.js und Redis.io sind über die Websiten https://nodejs.org/en/ und https://redis.io zu finden um die dort befindlichen ZIPS runterzuladen und in einem Verzeichnis entpacken. Um diese Werkzeuge nutzen zu können muss folgendes beachtet werden: Bei Node.js muss über die Commandozeile der Befehl "npm-install" durch geführt werden um alle nötigen Module für node.js zu installieren. 


Bei Redis ist es etwas anders, da bei Windows Usern die installtion nicht nur über die Download ZIP gemacht werden kann sondern auch unter dem Reiter "Downloads" dort scrollt man zur Überschrift "Other Version" dann unter dem Punkt Windows auf den Hyperlink "learn more" klicken.

Dieser Hyperlink leitet einen zu der Github seite von redis weiter wo in der Readme.md ein weiterer Hyperlink zur "release page" zu finden ist wo man dort eine .msi zur aktuellen Version runterladen kann. Diese .msi Datei ist ein installer wo alle nötigen Schritte über ein Setup ausgeführt werden.


Klonen eines Repositorys

Das Klonen eines Respositorys geht über 2 Wege: Einmal über die Git Hub Seite wo man auf den Button "Clone or Download" klickt, diese Option bietet einem die Möglichkeit entweder sich eine ZIP zum Repository runterladen oder das Repository lokal auf seinen Rechner zu clonen.Um es clonen zu können wird die Desktop App von Git benötigt. Alternativ kann mit der Shell von GIT sich das gewünschte Repository einfach mit dem Befehl "git clone" über die URL die auch bei dem Button "Clone or Download" drin steht, einfach klonen lassen.  





