# Blockbusters

HTML Gameshow für den Unterricht.

## Aktueller Stand

- Login über Supabase Auth
- optional auf eine einzelne E-Mail beschränkbar
- Spieleübersicht
- neue Spiele per KI JSON erstellen
- 40 Fragen als empfohlener Fragenpool
- Spiele aktuell lokal im Browser gespeichert
- Beispielspiel zu Angebot und Nachfrage enthalten
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

## Supabase Auth einrichten

In `config.js` eintragen:

```js
window.BLOCKBUSTERS_CONFIG = {
  supabaseUrl: "IHRE_SUPABASE_URL",
  supabaseAnonKey: "IHR_SUPABASE_ANON_KEY",
  allowedEmail: "IHRE_EMAIL"
};
```

In Supabase unter Authentication ein Benutzerkonto für diese E-Mail anlegen. Wenn nur dieses Konto Zugriff haben soll, öffentliche Registrierungen deaktivieren.

## Speicherung

Die Spiele werden momentan in `localStorage` gespeichert. Als nächster Schritt wird die Speicherung auf Supabase umgestellt, inklusive SQL Tabelle und Row Level Security.
