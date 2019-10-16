# Illustration des workers

## Introduction
Les workers sont arrivés dans NodeJS en expérimental avec la version 10.

Ils sont dans une version stable avec NodeJS 12.


## Principe du projet :

2 routes :
* /hello, qui répond vite
* /compute, qui simule un calcul intensif, répond lentement, et peut "bloquer" NodeJS .


 ### Sans workers 

Lancement du projet (flag --experimental-worker non requis avec Node JS > 12)
```sh
node --experimental-worker index.js
```

* On va sur la route /hello, on a un retour rapide.
* On va sur la route /compute, qui met du temps à répondre.
* Lors du compute, on appelle de nouveau hello: elle met du temps à répondre car elle doit attendre la fin du compute.

### Avec workers

```sh
node --experimental-worker index.js
```

L'appel à /compute ne bloque plus /hello
