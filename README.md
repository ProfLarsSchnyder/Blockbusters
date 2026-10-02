# Blockbusters

HTML Gameshow für den Unterricht.

## Aktueller Stand

- einfacher Passwortzugang
- Passwort wird serverseitig in Supabase geprüft
- Spieleübersicht
- Spiele per KI JSON erstellen und bearbeiten
- 40 Fragen als empfohlener Fragenpool
- dauerhafte Speicherung in Supabase
- Titel Splashscreen
- Spielanleitung
- Teamnamen und 8 feste Teamfarben
- Auswahlrecht für Startteam
- nummeriertes 25 Felder Wabenbrett
- Buzzer mit A für Team 1 und L für Team 2
- falsche erste Antwort sperrt dieses Team für die aktuelle Frage
- das andere Team erhält allein die zweite Chance
- ein Feld wird nur bei richtiger Antwort vergeben
- bei zwei falschen Antworten oder keiner Antwort kann eine neue Frage für dasselbe Feld gezogen werden
- das Team mit der richtigen Antwort erhält das nächste Auswahlrecht
- automatische Gewinnprüfung

## Supabase

Die Projekt URL und der Publishable Key stehen in `config.js`.

Einmal den vollständigen Inhalt von `supabase.sql` im Supabase SQL Editor ausführen.

Das aktuell konfigurierte Passwort ist:

`4208`

Die Tabelle selbst ist für den öffentlichen API Key gesperrt. Lesen, Speichern und Löschen laufen über serverseitige Supabase Funktionen, welche das Passwort prüfen.

## Hinweis zur Sicherheit

Ein vierstelliger PIN ist für ein privates Unterrichtstool bequem, aber kein Hochsicherheits Login. Wer die veröffentlichte Webseite gezielt angreift, könnte einen kurzen PIN theoretisch ausprobieren. Für normale private Nutzung ist die Datenbank trotzdem besser geschützt als bei offenem Tabellenzugriff, da direkte Tabellenoperationen für den Publishable Key gesperrt sind.
