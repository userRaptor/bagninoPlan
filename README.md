Hier sind die Schritte um das gesamte Projekt zu starten:

    Backend (Laravel):
        Voraussetzungen:
            PHP 8.1: Stelle sicher, dass PHP 8.1 auf dem System deines Vorgesetzten installiert ist.
            Composer: Installiere Composer, falls es noch nicht installiert ist.
        Schritte:
            Projekt herunterladen: Lade das Projekt herunter (oder klone es mit GIT).
            Konfiguration der Umgebungsvariablen:
                Kopiere die Datei .env.example und benenne sie in .env um.
                Passe die Datenbank-Anmeldeinformationen in der .env-Datei an.
            Composer-Abhängigkeiten installieren:
                Navigiere im Terminal zum Hauptverzeichnis des Projekts.
                Führe composer install aus, um die erforderlichen Abhängigkeiten zu installieren.
            Verschlüsselungsschlüssel setzen:
                Führe php artisan key:generate --ansi aus, um den Verschlüsselungsschlüssel zu generieren.
            Datenbankmigrationen ausführen:
                Führe php artisan migrate --seed aus, um die Datenbanktabellen zu erstellen und mit Testdaten zu füllen.
            Lokalen Server starten:
                Führe php artisan serve aus, um den Laravel-Entwicklungsserver zu starten.

    Frontend (React):
        Voraussetzungen:
            Node.js: Stelle sicher, dass Node.js auf dem System deines Vorgesetzten installiert ist.
        Schritte:
            Zum React-Verzeichnis wechseln:
                Öffne ein neues Terminal und navigiere zum Ordner react im Hauptverzeichnis des Projekts.
            Konfiguration der Umgebungsvariablen:
                Kopiere die Datei react/.env.example und benenne sie in .env um.
                Passe den Parameter VITE_API_BASE_URL in der .env-Datei an, um die API-URL für das Backend festzulegen.
            Node-Abhängigkeiten installieren:
                Führe npm install aus, um die erforderlichen Node-Module zu installieren.
            Vite-Server für React starten:
                Führe npm run dev aus, um den Vite-Entwicklungsserver für React zu starten.
