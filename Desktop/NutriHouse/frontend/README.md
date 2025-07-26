
# NutriHouse – Gestionale per Nutrizionisti

**Versione 1.0 – sviluppato da Francesco Chifari, Software Engineer (Laurea in Scienze Informatiche)**

NutriHouse è un’applicazione full‑stack pensata per facilitare il lavoro del nutrizionista nella gestione di pazienti, diete, planner settimanali e alimenti.  
Il progetto è _open‑source_ e combina React + Vite (frontend) con Spring Boot e JWT (backend) per offrire un’esperienza moderna, veloce e sicura.

---

## Funzionalità principali

| Modulo        | Cosa puoi fare                                    |
| ------------- | ------------------------------------------------- |
| **Autenticazione** | Login / Register con token JWT e `PrivateRoute` |
| **Dashboard** | Panoramica rapida, contatori e collegamenti veloci |
| **Pazienti**  | CRUD completo (crea, modifica, elimina, lista)    |
| **Diete**     | Lista diete, creazione nuova dieta, dettaglio      |
| **Planner**   | Calendario settimanale (roadmap)                   |
| **Alimenti**  | Archivio alimenti con valori nutrizionali          |
| **Info**      | Informazioni sul progetto e sull’autore            |

---

## Stack tecnologico

- **Frontend**: React + Vite · Material UI · Axios  
- **Backend**: Spring Boot 3 · Spring Security 6 · JPA/Hibernate · JWT  
- **Database**: PostgreSQL (configurabile)  
- **Build/Tooling**: Maven · ESLint · Prettier

---

## Come eseguire il progetto in locale

```bash
# 1. Clona la repository
git clone https://github.com/francescochifari/nutrihouse.git
cd nutrihouse

# 2. Avvia il backend (Spring Boot)
cd nutrihouse-backend
./mvnw spring-boot:run

# 3. Avvia il frontend (Vite)
cd ../nutrihouse-frontend
npm install
npm run dev
```

Il frontend sarà disponibile su <http://localhost:5173>, il backend su <http://localhost:9090>.

> **Nota**: assicurati che il file `application.properties` punti al tuo database e che le porte non siano occupate da altri processi.

---

## Roadmap

- [ ] CRUD completo Planner con drag‑and‑drop pasti  
- [ ] Report nutrizionali PDF per paziente  
- [ ] Localizzazione i18n (IT/EN)  
- [ ] Dark mode nativa MUI  

Contributi e segnalazioni sono benvenuti!

---

## Licenza

Questo progetto è distribuito sotto licenza **MIT**.  
Consulta il file `LICENSE` per i dettagli.