# WBA2SS17HuntschaErsoyLehmann

Das Thema der Anwendung soll ein Wohngemeinschaftsverzeichnis sein. Benutzer können sich Wohngemeinschaften nach bestimmten Kriterien anzeigen lassen. 

Funktionsweise unserer App

Unsere App arbeitet mit JSon-Dateien, in den unsere Anzeigen für die Filterung bereit stehen. Wir können diese Anzeigen bearbeiten, neue erstellen oder sie auch löschen. 

Features 

Filterung:
<<<<<<< HEAD
Die Filterung geschieht durch die HTTP Methode GET,diese Methode zeigt durch das Einstellen nach bestimmten Kritierien die zu passende Anzeige.

Um die Suche zu spezifizieren haben wir einige Kritieren, wie z.b das eine Anzeige erst anzeigt wird wenn man eine speziellen Stadt eingeben hat oder auch nach der Raumanzahl um bestimmte Anzeigen zu bekommen.
=======
Die Filterung geschieht durch die HTTP Methode GET, wo dort die Anzeigen mit den Kritieren anzeigt werden. Um die Suche zu spezifizieren haben wir einige Kritieren, wie z.b das eine Anzeige erst anzeigt wird wenn man eine speziellen Stadt eingeben hat oder auch nach der Raumanzahl um bestimmte Anzeigen zu bekommen.
>>>>>>> 2598e881b034ac132aa63dbb7a6c8460e62fc846

Neue Anzeigen anlegen:

Das Anlegen einer neuen  Anzeige wird durch die Methode POST eingeführt. Diese Methode erzeugt ein neues Objekt mit den Atrributen: "id:","city:","rent:","renttype:","size:","roomqty:".

Anzeige verändern:

Dieses Feature passiert durch die HTTP Methode PUT. Diese Methode ermöglicht es das die bestehenenden Daten in unseren Anzeige verändert und auch übernommen werden. 


Guide für die Instaltion von Node.js und Redis.io 

Node.js und Redis.io sind über die Websiten 

https://nodejs.org/en/ 

https://redis.io 

https://github.com/MSOpenTech/redis/releases (Für Windows User)

dort sind ZIP Datei zum download die dann entpackt werden können.

Um diese Werkzeuge nutzen zu können muss folgendes beachtet werden: Bei Node.js muss über die Commandozeile der Befehl "npm-install" durch geführt werden um alle nötigen Module für node.js zu installieren. 

Man sollte beachten das Redis global instaliert sein also bei der Installtion den Haken bei "Add the Redi folder to the PATH Enviroment" setzen!


Klonen eines Repositorys

Das Klonen eines Respositorys geht über 2 Wege: 
Einmal über die Git Hub Seite wo man auf den Button "Clone or Download" klickt, diese Option bietet einem die Möglichkeit entweder sich eine ZIP zum Repository runterladen oder das Repository lokal auf seinen Rechner zu clonen.Um es clonen zu können wird die Desktop App von Git benötigt.


Alternativ kann mit der Shell von GIT sich das gewünschte Repository einfach mit dem Befehl "git clone" über die URL die auch bei dem Button "Clone or Download" drin steht, einfach klonen lassen.  





