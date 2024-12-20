# Plugin Dossier Cible Note (New Note Location)

## Description

- Le plugin **New Note Location** pour Obsidian permet aux utilisateurs de choisir facilement l'emplacement d'un nouveau fichier lorsqu'ils créent une nouvelle note. Ce plugin améliore l'expérience d'Obsidian en permettant une gestion plus flexible des fichiers dans votre vault. 
- Il vous permet de sélectionner un dossier spécifique dans lequel enregistrer vos nouvelles notes.
- Ce plugin a été principalement réalisé par des interactions avec l'IA ChatGPT, d'oû le fait que le code ne respecte pas les standards officiels de Obsidian.
Il est prévu que je mette prochainement a jours le code pour le rendre conforme a ces standards et donc éligible à un partage par Obsidian.

## Fonctionnalités

- **Choisir l'emplacement du fichier** : Sélectionnez facilement l'emplacement du fichier lorsque vous créez une nouvelle note.
- **Sélection du dossier actuel** : L'option de choisir le dossier actuel lors de la création d'une note est maintenant disponible.
<div align="center">
  <img src="https://github.com/MaximeREDIER/Obsidian-Plugin/raw/main/plugin_screenshot.png" alt="Capture d'écran du plugin de l'UI du plugin" width="400" />
  <p> Visuel de la fenêtre de choix du dossier cible de la nouvelle note.</p>
</div>

## Installation

1. Téléchargez et installez le plugin en le copiant dans le dossier `plugins` de votre installation Obsidian.
2. Activez le plugin depuis les paramètres d'Obsidian :
   - Ouvrez Obsidian.
   - Allez dans **Paramètres > Plugins**.
   - Activez **New Note Location**.

## Utilisation

- Pour utiliser le plugin, il suffit de créer une nouvelle note comme d'habitude.
- Lorsque vous appuyez sur `Ctrl+N` (ou `Cmd+N` sur Mac), vous aurez l'option de choisir l'emplacement de votre nouvelle note.
- Cliquez dans le dossier de votre choix, ensuite vous avez 3 options :
  - Choisir le dossier actuel en cliquant sur le bouton `Choose current folder`
  - Choisir un autre dossier en cliquant sur celui-ci
  - Revenir au dossier précédant dans l'arbre de choix, en cliquant sur le bouton `Back`
- Fonctionalité de recherche : dans la barre de recherche tapez le nom du dossier cible, puis cliquez sur celui-ci.
## Problèmes connus

- Lors de la navigation dans l'explorateur de fichiers, si vous cliquez dans la barre de recherche de fichiers et appuyez sur `Ctrl+N`, la nouvelle note s'ouvre dans la section de recherche de fichiers. Cela peut rendre la recherche inaccessible jusqu'à ce qu'Obsidian soit redémarré.

## Dev Roadmap
- Résoudre le problème d'interaction avec l'explorateur de fichier
- Rajouter possiblité de retourner sur dossier précédent lors de la sélection
- Créer fonction de recherche de dossier par clavier similaire a fonction native : `Ctrl+o`
- Améliorer code pour respecter les standards d'Obsidian et rendre disponible le plugin dans l'outil de recherche communautaire.

## Contribution

Si vous souhaitez contribuer au développement de ce plugin, n'hésitez pas à ouvrir des issues ou des pull requests. Toutes les contributions sont les bienvenues !

## Licence

Ce plugin est sous licence MIT. Vous pouvez le modifier et le distribuer selon les termes de cette licence.

---

Créé par [MaximeREDIER](https://github.com/MaximeREDIER)
