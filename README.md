# Romeo Nordstrøm — portfolio

Jeg bygger en portfolio til fotograf Romeo Nordstrøm med Next.js, TypeScript og SQLite. Romeo skal kunne logge ind og administrere sine billeder og videoer selv.

Projektet er under udvikling. GitHub indeholder kode og SQL-skemaer. Private billeder, videoer, loginoplysninger og den lokale database ligger separat.

## Det virker nu

- En hero med fire billeder i en carousel og bløde overgange.
- Et rødt ROMEO-overlay med fotografiet synligt gennem bogstaverne. Det står i 1,5 sekunder, efter hovedbilledet er indlæst, og fader derefter ud over 1,6 sekunder.
- Et masonry-galleri med større billedvisning ved klik. Det offentlige galleri bruger foreløbig `src/data/gallery.ts`.
- Login og logout med Better Auth. Offentlig oprettelse af brugere er slået fra.
- Et privat mediebibliotek og en detaljeside, som læser fra SQLite og kræver administratoradgang.
- En forespørgsel, der henter højst 9 medier valgt til forsiden. Den er afprøvet på `/database-test`, men er endnu ikke koblet til det offentlige galleri.

## Det skal vi bygge videre på

Upload fra telefon og Dropbox, redigering af titel og beskrivelse, sted og dato samt valg af medier til forsiden. Uploadknappen er foreløbig deaktiveret. Der skal også laves separate galleri- og videosider, flere sider i mediebiblioteket og den endelige hosting med backup.

## Start projektet lokalt

Brug Node.js 20.9 eller nyere og npm. Du skal også have `sqlite3` i terminalen.

Alle terminalkommandoer her køres fra projektets rod: mappen med `package.json`.

```bash
npm ci
```

### 1. Tilføj de private mediefiler

Billederne følger ikke med, når du kloner projektet. Hent dem fra din egen private kopi og læg dem på de samme stier:

```text
public/
  hero.jpg
  hero2.jpg
  hero3.jpg
  hero4.jpg
  romeo-coast.jpg
  Min portofolio/
    ... billederne, som src/data/gallery.ts henviser til
```

Opret derefter den lokale billedpreview til heroen:

```bash
node scripts/generate-hero-preview.mjs
```

Scriptet bruger Sharp, som installeres med Next.js. Det laver `src/data/hero-preview.ts` ud fra `public/hero.jpg`. Previewen er indlejret i siden, så billedet kan ses gennem bogstaverne, mens den større version indlæses. Den genererede fil er også udeladt fra Git, fordi den indeholder billeddata.

En ny klon kan først køres og bygges, når de private billeder og previewen er tilføjet.

### 2. Opret databasen én gang

Kør disse kommandoer ved en ny installation med en tom database:

```bash
mkdir -p data
sqlite3 data/romeo.sqlite < src/lib/db/schema.sql
sqlite3 data/romeo.sqlite < src/lib/db/auth-schema.sql
sqlite3 data/romeo.sqlite ".tables"
```

Du skal nu kunne se `media`, `user`, `session`, `account` og `verification`.

Har du allerede `data/romeo.sqlite`, skal du beholde den. Skemaerne er til første oprettelse og indeholder ikke en funktion til at opdatere eksisterende tabeller.

### 3. Tilføj lokal konfiguration

Opret `.env` ved siden af `package.json`:

```dotenv
BETTER_AUTH_SECRET="DIN_EGEN_GENEREREDE_NØGLE"
BETTER_AUTH_URL="http://localhost:3000"
```

På Mac kan du generere en nøgle og kopiere den direkte til udklipsholderen:

```bash
openssl rand -base64 32 | pbcopy
```

Indsæt nøglen mellem anførselstegnene i `.env`. Hvis nøglen slutter med `=`, er det en del af nøglen. Behold den samme nøgle mellem almindelige genstarter.

### 4. Opret en administrator ved en ny installation

```bash
npx auth@1.7.27 create-admin --config ./src/lib/auth.ts --email din-email@example.com --name "Romeo Nordstrøm" --role admin
```

Erstat eksempeladressen med administratorens e-mail. Kommandoen beder om en adgangskode i terminalen. En eksisterende installation har allerede sin bruger i databasen.

### 5. Start siden

```bash
npm run dev
```

Åbn `http://localhost:3000`. Login ligger på `/login`, og mediebiblioteket ligger på `/admin`.

## Sådan fungerer databasen

SQLite gemmer databasen i én lokal fil: `data/romeo.sqlite`. Der skal ikke startes en separat databaseserver. Serverkoden i Next.js åbner filen med `better-sqlite3`; browseren har ikke direkte adgang til den.

Databasen gemmer oplysninger og filhenvisninger. Selve billederne og videoerne ligger separat.

### Tabellen media

Hver række beskriver ét medie.

| Felt | Type | Hvad jeg gemmer |
| --- | --- | --- |
| `id` | `INTEGER PRIMARY KEY` | Et unikt nummer, som SQLite tildeler automatisk. |
| `media_type` | `TEXT NOT NULL` | `image`, `video`, `audio` eller `document`. |
| `title` | `TEXT NOT NULL` | Overskriften, der vises, når mediet åbnes. |
| `description` | `TEXT` | En valgfri beskrivelse. |
| `location` | `TEXT` | Et valgfrit sted. |
| `taken_on` | `TEXT` | En valgfri dato, som vi skriver som `YYYY-MM-DD`. Formatet håndhæves endnu ikke af tabellen. |
| `file_path` | `TEXT NOT NULL` | Stien til filen, fx `/hero.jpg`. |
| `show_on_home` | `INTEGER NOT NULL DEFAULT 0` | `1` betyder valgt til forsiden. `0` betyder ikke valgt. |

`NOT NULL` betyder, at værdien ikke må være `NULL`; det forhindrer ikke en tom tekst. `CHECK` begrænser de tilladte medietyper og sikrer, at `show_on_home` kun er `0` eller `1`.

Lyd i en video kræver ikke en ekstra række med typen `audio`. Den type er til selvstændige lydfiler.

### Forespørgslerne i src/lib/db/media.ts

| Funktion | Hvad den gør |
| --- | --- |
| `getHomeMedia()` | Henter op til 9 valgte medier med højeste id først. |
| `getLibraryMedia()` | Kræver administratorlogin og henter de nyeste 24 medier. |
| `getMediaById(id)` | Kræver administratorlogin og henter ét medie med en parameteriseret forespørgsel. |

Grænsen på 9 gælder resultatet af forespørgslen. Databasen kan godt have flere end 9 rækker markeret med `show_on_home = 1`. Selve afkrydsningsfeltet og publiceringsflowet er endnu ikke bygget.

### Et eksempel i terminalen

Her sendes SQL direkte til SQLite fra den almindelige terminal:

```bash
sqlite3 data/romeo.sqlite "INSERT INTO media (media_type, title, file_path) VALUES ('image', 'Mit testbillede', '/hero.jpg');"
sqlite3 -header -column data/romeo.sqlite "SELECT id, title, show_on_home FROM media;"
```

Brug det id, der vises i resultatet, når du ændrer en række. Dette eksempel vælger rækken med id 1 til forsiden:

```bash
sqlite3 data/romeo.sqlite "UPDATE media SET show_on_home = 1 WHERE id = 1;"
```

Skift `1` til `0` efter `SET show_on_home =` for at fjerne valget. Rækken og filen bliver stadig liggende.

### Better Auths tabeller

`user` gemmer brugeren og rollen. `account` gemmer loginoplysninger, herunder password-hash for e-mail-login. `session` gemmer aktive sessioner. `verification` bruges til verifikationer, når de relevante flows er aktiveret.

`src/lib/require-admin.ts` kontrollerer session og rollen `admin`. Uden login sendes man til `/login`; andre roller får en 404-side. Password-reset og e-mailverifikation er endnu ikke sat op som færdige brugerflows.

## De vigtigste filer

```text
src/app/                         Sider og API-ruter
src/components/Hero.tsx          Carousel og indlæsning af billeder
src/components/HeroOverlay.tsx   ROMEO-overlay og fade
src/components/Gallery.tsx       Offentligt galleri og større billedvisning
src/data/gallery.ts              Det nuværende offentlige billedudvalg
src/data/hero-lettering.ts        Faste vektorkonturer til ROMEO
src/lib/auth.ts                  Better Auth på serveren
src/lib/require-admin.ts         Kontrol af administratoradgang
src/lib/db/index.ts              Forbindelse til SQLite
src/lib/db/schema.sql            Min media-tabel
src/lib/db/auth-schema.sql       Better Auths tabeller
src/lib/db/media.ts              Forespørgsler til medier
scripts/generate-hero-preview.mjs  Gendanner den private preview lokalt
```

`MaskedHeading.tsx` og `SplitFlapText.jsx` er tidligere animationseksperimenter. Den aktive hero bruger `HeroOverlay.tsx`.

## Git, backup og hosting

`.gitignore` holder `.env`, `data/`, private mediefiler i `public/`, den genererede hero-preview, `node_modules` og `.next` uden for Git. De generiske ikoner fra startprojektet og `masked-placeholder.svg` er ikke private fotografier.

GitHub er derfor en kopi af koden, ikke en backup af fotografierne eller administratorens data. Mediefiler, `.env` og SQLite-databasen skal have en separat privat backup. Ved backup af en kørende SQLite-database kan SQLite lave en konsistent kopi:

```bash
sqlite3 data/romeo.sqlite ".backup '/din/private/backup/romeo.sqlite'"
```

Udskift stien med en eksisterende privat backupmappe.

Hosting er endnu ikke konfigureret. Ved senere hosting med Docker skal database og uploadede medier ligge på vedvarende storage, så de overlever en ny container. SQLite bruges fra en Node.js-server med skriveadgang til databasefilen. Dropbox-integrationen er stadig planlagt.

## Kontrol af koden

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Build kræver samme lokale opsætning med mediefiler, database og miljøvariabler som udviklingsserveren. `/database-test` er en midlertidig offentlig testside og skal gennemgås inden lancering.
