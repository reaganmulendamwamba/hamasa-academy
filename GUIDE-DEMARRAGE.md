# AMASA Academy — site web + catalogue modifiable + APK Android

## Ce qui est prêt
- Le site existant est conservé dans `www/index.html`.
- CSS séparé dans `www/css/style.css`.
- Les livres sont chargés depuis `www/data/books.json`.
- La bibliothèque et la boutique sont alimentées par le même fichier JSON.
- Le projet Capacitor Android est configuré.
- Le workflow GitHub Actions de compilation APK est inclus.
- Un manifeste et des icônes PWA sont inclus.

## Ajouter un livre
Ouvrez `www/data/books.json` et ajoutez un objet dans `books` :
```json
{
  "id": "mon-guide",
  "title": "Titre du guide",
  "category": "entrepreneuriat",
  "categoryLabel": "Entrepreneuriat",
  "description": "Description courte.",
  "cover": "./assets/mon-guide.jpg",
  "coverTone": "green",
  "eyebrow": "AMASA · GUIDE PRATIQUE",
  "coverSubtitle": "Une phrase courte",
  "status": "published",
  "statusLabel": "Disponible",
  "orderLabel": "Détails & commande"
}
```
Catégories : `entrepreneuriat`, `personnel`, `outils`.
Pour ne pas afficher un livre en préparation, mettez `"status": "draft"`.
Placez l'image dans `www/assets/` et renseignez son chemin dans `cover`. Si `cover` est vide, une couverture typographique est générée.
Seul « Commencer avec presque rien » est présent en `published` dans le catalogue initial. Les autres titres proposés précédemment ne sont pas présentés comme des livres réellement disponibles.

## Mettre le site en ligne avec GitHub + Vercel
1. Créez un dépôt GitHub et téléversez tout le contenu de ce dossier à sa racine, y compris `.github/workflows`.
2. Dans Vercel : Add New > Project > Importer le dépôt GitHub.
3. Dans les paramètres du projet, choisissez Framework Preset : Other et Root Directory : `www`. Laissez Build Command vide et Output Directory sur `.`. Ne choisissez pas `www` comme Output Directory si Root Directory est déjà `www`.
4. Déployez. Chaque commit GitHub redéploiera le site.

## Synchroniser le catalogue entre le site et l'APK
Le site lit `./data/books.json`. Après le déploiement Vercel :
1. Copiez l'adresse publique `https://VOTRE-SITE.vercel.app/data/books.json`.
2. Ouvrez `www/js/config.js`.
3. Remplacez `catalogUrl: ''` par `catalogUrl: 'https://VOTRE-SITE.vercel.app/data/books.json'`.
4. Faites un commit et relancez la compilation APK.
Les applications Android installées liront ensuite le catalogue distant : ajouter un livre au JSON et redéployer le site suffit, sans réinstaller l'APK.
Les changements de design ou de code peuvent demander une nouvelle version APK.

## Générer l'APK sur GitHub depuis un téléphone
Le fichier `.github/workflows/build-apk.yml` est déjà inclus.
1. Après avoir téléversé le projet sur GitHub, ouvrez l'onglet Actions.
2. Sélectionnez « Générer APK AMASA Academy » puis « Run workflow ».
3. Attendez que l'exécution réussisse.
4. Ouvrez l'exécution et téléchargez l'artefact `AMASA-Academy-APK`.
5. Décompressez-le : `app-debug.apk` est l'application Android de test.

Cet APK debug peut être installé et partagé pour test. Il n'est pas encore signé pour une publication Play Store. La publication nécessite une signature de production, un compte Play Console et un AAB adapté.

## Tâches à faire par l'équipe AMASA
- Remplacer les photos de démonstration par les photos officielles.
- Ajouter les couvertures réelles et les livres confirmés dans `books.json`.
- Confirmer les prix, les modalités de commande et les moyens de paiement.
- Renseigner `ACADEMY_EMAIL` dans le script en bas de `www/index.html`.
- Remplacer `catalogUrl` dans `www/js/config.js` après déploiement.
- Tester sur plusieurs appareils Android.
- Pour Play Store : compte Play Console, signature de production, AAB, captures, description et politique de confidentialité.

## Limites
Pas de backend, de base de données, de comptes ou de paiement automatisé dans cette version. Le catalogue JSON est public : ne mettez aucune donnée privée dedans. Les commandes sont des demandes de contact.
