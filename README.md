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
