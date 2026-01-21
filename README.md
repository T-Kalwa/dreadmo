# 🎨 Dreadmo MTL - Plateforme de Réservation de Coiffeurs

Dreadmo est une plateforme moderne de réservation en ligne qui connecte les clients avec des coiffeurs et salons spécialisés à Montréal. Le site permet aux utilisateurs de trouver des experts capillaires selon leur type de cheveux, qu'ils soient en salon ou freelance.

## ✨ Fonctionnalités

### Pour les Clients
- 🔍 **Recherche avancée** - Filtrez par type de cheveux, quartier, prix et disponibilité
- 👥 **Profils détaillés** - Consultez les portfolios, avis et spécialités de chaque coiffeur
- 📅 **Réservation en ligne** - Prenez rendez-vous en quelques clics
- ⭐ **Système d'avis** - Partagez votre expérience et aidez la communauté
- 🏷️ **Badges de vérification** - Identifiez facilement les professionnels vérifiés
- 💇‍♀️ **Distinction Salon/Freelance** - Trouvez le type de service qui vous convient

### Pour les Professionnels
- 📊 **Tableau de bord** - Gérez vos rendez-vous et disponibilités
- 📸 **Galerie photos** - Publiez jusqu'à 10 photos de votre travail
- 💳 **Paiements sécurisés** - Recevez vos paiements en toute sécurité
- 📈 **Statistiques** - Suivez vos performances et avis clients
- 🎯 **Visibilité accrue** - Atteignez des milliers de clients potentiels

## 🛠️ Technologies Utilisées

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Icônes**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## 📁 Structure du Projet

```
dreadmo-mtl/
├── app/
│   ├── components/          # Composants réutilisables
│   │   ├── Footer.tsx
│   │   ├── HairCategories.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProSignup.tsx
│   │   ├── SalonsFeatured.tsx
│   │   └── Testimonials.tsx
│   ├── aide/               # Page centre d'aide
│   ├── comment-ca-marche/  # Page "Comment ça marche"
│   ├── connexion/          # Page de connexion/inscription
│   ├── pro/                # Page espace professionnel
│   ├── recherche/          # Page de recherche avec filtres
│   ├── salon/[id]/         # Page profil de salon (dynamique)
│   ├── globals.css         # Styles globaux
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil
├── public/                 # Assets statiques
└── README.md
```

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 18+ installé
- npm ou yarn

### Installation

1. Clonez le repository
```bash
git clone [votre-repo-url]
cd dreadmo-mtl
```

2. Installez les dépendances
```bash
npm install
# ou
yarn install
```

3. Lancez le serveur de développement
```bash
npm run dev
# ou
yarn dev
```

4. Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur

## 🎨 Design System

### Palette de Couleurs
- **Background**: `#F3F4F1` (Sable Pâle)
- **Foreground**: `#1F2937` (Anthracite)
- **Brand Sage**: `#8DA593` (Vert Sauge)
- **Brand Earth**: `#B45309` (Terre de Sienne)

### Typographie
- **Primary Font**: Geist Sans
- **Monospace Font**: Geist Mono

## 📄 Pages Principales

### 🏠 Page d'Accueil (`/`)
- Hero avec recherche interactive
- Catégories de cheveux
- Salons et coiffeurs vedettes
- Témoignages clients
- Section inscription professionnelle

### 🔍 Page de Recherche (`/recherche`)
- Barre de recherche avancée
- Filtres multiples (type de cheveux, quartier, prix, type de service)
- Grille de résultats avec cartes interactives
- Distinction visuelle Salon/Freelance
- Pagination

### 👤 Profil de Salon (`/salon/[id]`)
- Galerie photos (jusqu'à 10 images)
- Informations détaillées
- Services et tarifs
- Avis clients
- Système de réservation
- Horaires d'ouverture
- Coordonnées

### 💼 Espace Professionnel (`/pro`)
- Landing page pour les professionnels
- Fonctionnalités et avantages
- Plans tarifaires
- Témoignages de partenaires
- Formulaire d'inscription

### 🔐 Connexion (`/connexion`)
- Formulaire de connexion/inscription
- Authentification sociale (Google, Facebook)
- Récupération de mot de passe

### ❓ Autres Pages
- `/comment-ca-marche` - Guide d'utilisation
- `/aide` - Centre d'aide et FAQ

## 🎯 Prochaines Étapes

### Backend & Base de Données
- [ ] Intégration Prisma + MySQL
- [ ] API pour les coiffeurs
- [ ] API pour les réservations
- [ ] Système d'authentification (NextAuth.js)
- [ ] Upload d'images (Cloudinary/AWS S3)

### Fonctionnalités Avancées
- [ ] Système de paiement (Stripe)
- [ ] Notifications email
- [ ] Chat en temps réel
- [ ] Carte interactive (Mapbox)
- [ ] Système de favoris
- [ ] Historique des réservations
- [ ] Gestion du calendrier pour les pros

### Optimisations
- [ ] SEO avancé
- [ ] Performance (lazy loading, optimisation images)
- [ ] Tests unitaires et E2E
- [ ] Accessibilité (WCAG 2.1)
- [ ] Internationalisation (FR/EN)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou un pull request.

## 📝 License

Ce projet est sous licence MIT.

## 📧 Contact

Pour toute question ou suggestion :
- Email: contact@dreadmo.ca
- Site web: [dreadmo.ca](https://dreadmo.ca)

---

**Fait avec ❤️ à Montréal**
