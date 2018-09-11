# Sfeir Schools

On va faire un petit projet pour gérer des Sfeir Schools !

On aura besoin de [Node.js 10](https://nodejs.org/en/).

:arrow_forward: `git checkout -f project-01-readme`.

## Step 1

- Installer [Express](http://expressjs.com/).
- Créer une route correspondant [à la méthode `GET`](https://fr.wikipedia.org/wiki/Hypertext_Transfer_Protocol#M%C3%A9thodes) pour répondre "Hello, Sfeir School!".
- Lancer avec `npm start`.
- Tester avec [httpie](https://httpie.org/): `http http://localhost:3000/`.

Ensuite:

- :sos: `git checkout -f project-01-solution`.
- :fast_forward: `git checkout -f project-02-readme`.

## Step 2

Une Sfeir School est un objet, par exemple:

```json
{
  "title": "Sfeir School NodeJS",
  "trainer": "Siegfried Ehret",
  "attendees": 42
}
```

- On va gérer les Sfeir Schools en mémoire avec un tableau.
- Modifier la route `GET` pour renvoyer l'ensemble des Sfeir Schools.
- Créer une route correspondant à la méthode `POST` pour ajouter une Sfeir School (installer le module [body-parser](https://github.com/expressjs/body-parser)).
- Lancer avec `npm start`.
- Tester avec [httpie](https://httpie.org/):
  - Pour récupérer la liste: `http http://localhost:3000/`.
  - Pour ajouter une Sfeir School: `http POST http://localhost:3000/ title="Sfeir School NodeJS" trainer="Siegfried Ehret"`.

Ensuite:

- :sos: `git checkout -f project-02-solution`.
- :fast_forward: `git checkout -f project-03-readme`.

## Step 3

Des tests !

On va utiliser 2 modules qu'on va installer sous les `devDependencies`:

- [jest](https://facebook.github.io/jest/), un framework de tests.
- [supertest](https://github.com/visionmedia/supertest), pour tester simplement des requêtes à une API.

Et un peu de refactoring:

- Faire un module "lib/app.js" avec toute l'application sauf le `app.listen(...)`.
- Faire un "index.js" qui va appeler notre module et faire le `app.listen(...)`.
- Changer les scripts dans le package.json.

Et enfin:

- Créer un test qui va faire un `GET` sur `/` et vérifier que le `statusCode` est `200` et que le `body` est `[]`.
- Modifier le script npm "test" pour lui affecter la commande "jest".
- Lancer les tests avec `npm test`.

Ensuite:

- :sos: `git checkout -f project-03-solution`.
- :fast_forward: `git checkout -f project-04-readme`.

## Step 4

On code tous pareil dans une équipe !

- On va utiliser [prettier](https://prettier.io/) (on peut aussi [l'intégrer avec ESLint](https://prettier.io/docs/en/eslint.html)).
- On installe prettier en `devDependencies`.
- On ajoute un script: `"lint: "prettier --write lib/**/*.js index.js"`.
- Lancer avec `npm run lint`.

Ensuite:

- :sos: `git checkout -f project-04-solution`.
- :fast_forward: `git checkout -f project-05-readme`.

## Step 5

Persistence des données avec MongoDB. :warning: ce n'est pas un cours sur MongoDB ni la sécurité !

Installer MongoDB:

- Avec [l'installeur officiel](https://www.mongodb.com/download-center?jmp=tutorials#community).
- Avec [l'image docker](https://hub.docker.com/_/mongo/). Vous pouvez faire `docker-compose up` dans le dossier !
- Le fichier docker-compose lance aussi l'image [mongo-express](https://www.npmjs.com/package/mongo-express), une interface d'admin web pour mongo

On va préparer plusieurs variables d'environnement (les 3 premières sont aussi utilisées par l'image docker :whale:):

- `MONGO_INITDB_ROOT_USERNAME` avec la valeur `root`.
- `MONGO_INITDB_ROOT_PASSWORD` avec une valeur de votre choix.
- `MONGO_INITDB_DATABASE` avec la valeur `schoolsdb`.
- `MONGO_INITDB_DATABASE_USERS` avec la valeur de la db sur laquelle est enregistré votre user (par défaut `admin`).

Lancer Mongo comme vous pouvez :smile:.

Et côté code:

- On va utiliser le module officiel [mongodb](https://www.npmjs.com/package/mongodb).
- Pour la connexion:
  - L'url de connexion correspond à: `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${MONGO_INITDB_DATABASE_USERS}`.
  - On va passer les options: `{ useNewUrlParser: true, connectTimeoutMS: 1000 }`.
- On va démarrer le serveur uniquement si la connexion à la base est un succès.
- Il faut mettre à jour `lib/app.js` pour lui passer la db.
- Profitons-en pour ajouter une variable d'environnement `PORT` avec le port sur lequel notre application doit tourner.

Références:

- [API Mongo](http://mongodb.github.io/node-mongodb-native/3.0/api/index.html)
- [MongoDB Compass (Community Edition)](https://www.mongodb.com/download-center?jmp=hero#compass) pour vous aider.

Ensuite:

- :sos: `git checkout -f project-05-solution`.
- :fast_forward: `git checkout -f project-06-readme`.

## Step 6

Les tests sont cassés !

- On va installer les modules [jest-environment-node](https://www.npmjs.com/package/jest-environment-node) et [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server).
- On va [lire un peu de doc](https://facebook.github.io/jest/docs/en/mongodb.html) et plus particulièrement le [repo de référence](https://github.com/vladgolubev/jest-mongodb).
- Il faut créer les fichiers `setup.js`, `teardown.js` et `mongo-environment.js` ainsi que le fichier `jest.config.js` pour [configurer jest](https://facebook.github.io/jest/docs/en/configuration.html).
- :warning: il faut mettre la version de mongo `3.2.19` (comme dans le repo de référence; j'ai eu un bug avec la `3.6.5` et les tests ne se terminent pas).
- Si tout va bien les tests passent presque ! Le message doit vous mettre sur la voie.

Ensuite:

- :sos: `git checkout -f project-06-solution`.
- :fast_forward: `git checkout -f project-07-readme`.

## Step 7

Authentification !

C'est le moment de parler des [middlewares dans Express](https://expressjs.com/en/guide/using-middleware.html). Il y en a 2 types:

- Les middlewares de base (signature: `function(req, res, next) {...}`).
- Les middlewares d'erreur (signature: `function(err, req, res, next) {...}`).

L'ordre d'usage des middlewares est important !

### 1. Routes

On va créer deux routes:

- `/register` pour créer les comptes. Cette méthode de mongo sera utile: [insertOne](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#insertOne).
- `/login` pour la connexion.

On va utiliser un module core de Node: [crypto](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html). Il nous fournit [scrypt](https://nodejs.org/dist/latest-v10.x/docs/api/crypto.html#crypto_crypto_scrypt_password_salt_keylen_options_callback) pour ce qui est de la génération des mots de passe.

### 2. Passport - Stratégie

Nous allons utiliser [passport](https://github.com/jaredhanson/passport) pour gérer les histoires d'authentification.

Commençons par créer une stratégie avec [passport-local](https://github.com/jaredhanson/passport-local):

- On va créer une `strategy` qui va fouiller dans la base.
- Cette méthode de mongo sera utile: [findOne](http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#findOne).

### 3. Passport - application

- Configurer les méthodes `serializeUser` et `deserializeUser` pour passport.
- Ajouter le middleware global `passport.initialize()` à express.
- Ajouter le middleware pour la route d'authentification pour la `/login`.
- Protéger la route pour créer une Sfeir School avec un middleware qui vérifie qu'un utilisateur est connecté ([hint](https://github.com/jaredhanson/passport/blob/882d65e69d5b56c6b88dd0248891af9e0d80244b/lib/http/request.js#L83))
  
Au cas où: [un peu de doc](https://github.com/jwalton/passport-api-docs) en plus.

### 4. Gestion de session

Passport ne gère pas la session. On va déléguer ça à [express-session](http://expressjs.com/en/resources/middleware/session.html) afin de gérer ça en mémoire pour nous.

On aura aussi besoin de [`passport.session()`](https://github.com/jwalton/passport-api-docs/tree/18f7336ce91f0300068c944197017c0815d71b5f#passportsessionoptions).

### Pour essayer tout ça:

- Créer un user: `http POST http://localhost:3000/register username="Siegfried" password="plop"`.
- Lister les Sfeir Schools: `http http://localhost:3000/`.
- Tenter de créer une Sfeir School: `http POST http://localhost:3000/ title="Sfeir School NodeJS"`. On doit avoir un 401.
- Faire un login: `http --session=/tmp/session.json POST http://localhost:3000/login username="Siegfried" password="plop"`. Le `--session=/tmp/session.json` permet de persister les cookies etc.
- On crée pour de vrai une Sfeir School: `http --session=/tmp/session.json POST http://localhost:3000/ title="Sfeir School NodeJS"`.
- Lister les Sfeir Schools: `http http://localhost:3000/` pour voir notre nouvelle Sfeir School !

### Variable d'environnement

- Créer une variable d'environnement `SALT` pour `scrypt`
- Pour assurer la compatibilité entre systèmes d'exploitations, on utilise [cross-env](https://www.npmjs.com/package/cross-env).

Ensuite:

- :sos: `git checkout -f project-07-solution`.
- :fast_forward: `git checkout -f project-08-readme`.

## Step 8

Refactoring !

On va ranger un peu:

- Renommer les routes liées aux utilisateurs en `/users/login` et `/users/register`.
- Renommer les routes liées aux Sfeir Schools en `/schools`.
- Tout ça en utilisant [`express.Router`](http://expressjs.com/en/guide/routing.html).

On reprend les exemples du step précédent en corrigeant les routes:

- Créer un user: `http POST http://localhost:3000/users/register username="Jtutu" password="plop"`.
- Lister les Sfeir Schools: `http http://localhost:3000/schools`.
- Tenter de créer une Sfeir School: `http POST http://localhost:3000/schools title="Sfeir School tartiflette"`. On doit avoir un 401.
- Faire un login: `http --session=/tmp/session.json POST http://localhost:3000/users/login username="Jtutu" password="plop"`. Le `--session=/tmp/session.json` permet de persister les cookies etc.
- On crée pour de vrai une Sfeir School: `http --session=/tmp/session.json POST http://localhost:3000/schools title="Sfeir School tartiflette"`.
- Lister les Sfeir Schools: `http http://localhost:3000/schools` pour voir notre nouvelle Sfeir School !

Ensuite:

- :sos: `git checkout -f project-08-solution`.
- :fast_forward: `git checkout -f project-09-readme`.

## Step 9

Et comment on sait ce qu'il se passe ? On met des logs !

- On va ajouter le module [bunyan](https://www.npmjs.com/package/bunyan#adding-a-stream).
- On ajoute le logger pour sortir dans la console et dans un fichier avec un stream `rotating-file`.
- On va modifier le niveau de log via la variable d'environnement `LOG_LEVEL`.
- Et on met des logs partout !
- On va utiliser aussi les évènements [`uncaughtException`](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_event_uncaughtexception) et [`unhandledRejection`](https://nodejs.org/dist/latest-v8.x/docs/api/process.html#process_event_unhandledrejection)...
- On va créer un script npm `dev` avec la valeur `node index.js | bunyan` pour avoir un affichage joli dans la console.

Ensuite:

- :sos: `git checkout -f project-09-solution`.
- :fast_forward: `git checkout -f project-10-readme`.

## Step 10

Des middlewares !

- On va ajouter un middleware d'erreur pour remplacer les `res.sendStatus(...)` qui envoient des 4xx ou 5xx.
- On va ajouter un middleware pour mesurer le temps de traitement des requêtes pour les envoyer dans les logs.
  - On installe le module [on-headers](https://www.npmjs.com/package/on-headers).
  - Et on joue avec [process.hrtime()](https://nodejs.org/api/process.html#process_process_hrtime_time).

Ensuite:

- :sos: `git checkout -f project-10-solution`.
- :fast_forward: `git checkout -f project-11-readme`.
