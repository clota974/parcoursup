# Protocole : Parties en ligne
#ONLINE #PROTOCOL

**Pour jouer en ligne, une syntaxe est à respectée**

## Compatibilité entre joueurs
**La version du package Online de Squazzio des deux joueurs doivent être identiques** _Certaines exceptions existent quand les deux versions ne sont pas identiques mais pas compatibles_ 

**Avant chaque partie, la version du package doivent être vérifiées**

## Nouvelle partie
A chaque partie, une nouvelle entrée SQL doit être créée, elle doit contenir les informations suivantes :
* `ID`  _(automatique)_
* `mode`
* `joueurA`   _pseudo_
* `joueurB`  _pseudo_
* `infos`  _(Section suivante)_

## Transfert des `infos` de jeu
Le champ infos est en _JSON_ selon cette structure :
```
{
 "joueurs": {
		"joueurA": {
      "pseudo": "* Pseudo du joueurA *",
      "pion": {"Feuille CSS->JSON du pion du JoueurB"}
    },
		"joueurB": {
      "pseudo": "* Pseudo du joueurB *",
      "pion": {"Feuille CSS->JSON du pion du JoueurB"}
    }
	},
  "jeu": {
    "tour": "A ou B si c'est le tour du joueurB",
    "pions": [
      [1, 2, 0],
      [1, 0, 1],
      [2, 0, 2]
    ],
  }, 
  "extra": {"Données en plus selon le mode de jeu"}
}
```

## Fin d’une partie
Une fois, la partie terminée, l’entrée SQL n’est pas supprimée. Elle est supprimée :
* Soit quand les deux joueurs ont vu que la partie est terminée
* Soit après 30h

Sur l’écran du client, la partie apparaît toujours même si l’entrée SQL est supprimée car les données sont sauvegardées sur la machine client. 