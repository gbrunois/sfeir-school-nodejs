# Sfeir Schools

Démo avec AppEngine Standard et Firestore

* Créer une application sur [Google Cloud Platform Console](https://console.cloud.google.com/)
* Retenir le `project-id` pour plus tard
* Visiter [Cloud Firestore Viewer](https://console.cloud.google.com/firestore). Sélectionner le mode natif
* Sélectionner une [région](https://cloud.google.com/firestore/docs/locations). Créer une base de données
* Visiter [App Engine](https://console.cloud.google.com/appengine).
 
## Exécution en local

* Installer les modules `npm install`.
* Pour se connecter à l'API Firestore, il faut télécharger une clé de sécurité en local
* Aller dans **IAM & Admin** > **Service accounts** et créer un clé pour le compte `<project-id>@appspot.gserviceaccount.com`
* Créer un répertoire `secret` et stocker la clé `key.json`.
* Lancer avec `NODE_ENV=development npm run start`.

## Déploiement


* Installer [Google Cloud SDK](https://cloud.google.com/sdk/)

```
gcloud auth login
gcloud config set project <project-id>
gcloud app deploy
```