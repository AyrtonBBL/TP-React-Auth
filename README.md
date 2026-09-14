#  TP Authentification React + Node

## Démarrage rapide

```bash
cd starter
npm install
npm run dev
```

- **Front** : http://localhost:5173
- **API** : http://localhost:3001
- **Identifiants de test** : `alice@ynov.com` / `password123`

---

##  Question TP

> **« Quand je suis connecté, qu'est-ce qui prouve au serveur que c'est bien moi, à chaque requête - et où est stockée cette preuve ? »**

- **La preuve** : Un **JWT (JSON Web Token)** signé par le serveur contenant l'identité de l'utilisateur.
- **Où est-elle stockée ?** : Dans un **cookie HttpOnly** nommé `token`.
- **Pourquoi HttpOnly ?** : Le JavaScript (`document.cookie`) ne peut pas le lire, ce qui empêche le vol de session via faille XSS.
- **Comment voyage-t-elle ?** : Automatiquement transmise par le navigateur à l'API grâce à `credentials: 'include'`.

---

## Code complété (Starter)

1. **TODO 1 · `src/api/client.ts`** : Ajout de `credentials: 'include'` dans `fetch`.
2. **TODO 2 · `src/auth/ProtectedRoute.tsx`** : Protection de la route `/profile` selon `status` (`loading`, `anonymous`, `authenticated`).
3. **TODO 3 · `src/pages/LoginPage.tsx`** : Soumission du formulaire (`login()`, redirection `/profile` et gestion d'erreurs).
