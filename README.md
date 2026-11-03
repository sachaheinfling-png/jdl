# jdl

> Une page web d'invitation pour le jour de l'an : « Oui » lance une pluie de chats et de cœurs, « Non » s'échappe dès qu'on essaie de cliquer dessus.

## Lancer le projet

```powershell
uv run python -m http.server 8000   # sert la page en local
# puis ouvrir http://localhost:8000 dans le navigateur
```

La page est 100 % statique (HTML/CSS/JS) : on peut aussi simplement double-cliquer sur `index.html`.

## Fonctionnement

- **Bouton « Oui »** : déclenche une pluie de chats et de cœurs, affiche des chats contents et un message de confirmation.
- **Bouton « Non »** : au survol (souris) ou au toucher (téléphone), il se déplace à une position aléatoire dans sa zone, reste visible et évite le bouton « Oui ».
- Le prénom de la personne invitée se modifie avec `const PRENOM = "..."` en haut de `script.js`.
- Pensé d'abord pour le **téléphone**, puisque le lien sera ouvert depuis un message.
- Aucune dépendance externe : la page fonctionne hors ligne et sur GitHub Pages.

## Structure

- `index.html` : la page d'invitation
- `style.css` : mise en page, couleurs, animations
- `script.js` : fuite du bouton « Non » et animation du « Oui »
- `docs/` : idées, maquettes, notes

## Mise en ligne

Pour obtenir un lien à envoyer : publier le dépôt sur GitHub et activer **GitHub Pages** (Settings → Pages → branche `main`). Le lien aura la forme `https://<pseudo>.github.io/jdl/`.

## À faire

- [x] Page de base avec la question et les deux boutons
- [x] Bouton « Non » qui s'échappe (souris + tactile)
- [x] Animation « Oui » : chats + cœurs, avec respect de `prefers-reduced-motion`
- [x] Test responsive à 375 px
- [ ] Mise en ligne et envoi du lien

## Journal

- 2026-11-03 : création du projet
- 2026-11-03 : création et test de la page d'invitation statique, sans dépendance externe
