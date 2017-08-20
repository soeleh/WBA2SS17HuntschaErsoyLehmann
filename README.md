# WBA2SS17HuntschaErsoyLehmann

**Beschreibung**

Die Anwendung ist ein Wohngemeinschaftsverzeichnis und verschafft dem Nutzer einen Überblick zu aktuell angebotenen Anzeigen. Durch Filtermöglichkeiten und zusätzliche Funktionen, wie das Anzeigen der Wohnungsumgebung, ist dem Nutzer eine angenehme Suchatmosphäre geboten. Zudem ist es für angemeldete Nutzer möglich eigene WG-Anzeigen zu posten.

**Installation**

1. [Node.js](https://nodejs.org) installieren

2. [Redis.io](https://redis.io) installieren

Beachten: Redis sollte global installiert werden. Setzen Sie hierfür einen Haken bei *Add the Redis Intallation folder to the PATH environment variable.*

3. Klonen Sie das Repository auf Ihren PC oder laden Sie sich das Repository als ZIP Datei runter.

4. Öffnen Sie die Konsole im Projektordner und nutzen Sie den Befehl *npm install*.

**Guide**

1. Starten Sie die Datenbank via Redis über den Befehl *redis-server*.

2. Öffnen Sie im Ordner des Dienstgebers die Eingabeaufforderung und lassen Sie den Server über den Befehl *node dienstgeber.js* laufen. (das Fenster weiterhin geöffnet lassen)

3. Rufen Sie die Seite *localhost:3000/testdata* im Browser auf um die Testdatensätze zu laden.
