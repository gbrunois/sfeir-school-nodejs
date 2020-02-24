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

* Un appel à /hello, n'est pas bloquant (`curl localhost:3001/hello`).
* Un appel à /compute est bloquant. (`curl localhost:3001/compute`)
* Pendant le calcul, les autres appels à /hello sont en attente.

### Avec workers

```sh
node --experimental-worker index.js
```
* Un appel à /compute-worker est non bloquant. (`curl localhost:3001/compute-worker`)
* Pendant le calcul, les autres appels à /hello sont exécutés immediatement.