# Admin System - Setup Guide

## 📋 Oversigt

Admin systemet til BusBus giver autoriserede brugere mulighed for at:
- ✅ Logge ind med email og adgangskode
- 📊 Se alle indsendte besvarelser
- ✏️ Redigere besvarelser
- 🗑️ Slette besvarelser
- ➕ Oprette nye besvarelser manuelt
- 🔍 Filtrere og sortere data
- 📈 Se statistik

## 🔐 Firebase Setup

### 1. Aktivér Firebase Authentication

1. Gå til [Firebase Console](https://console.firebase.google.com/)
2. Vælg dit projekt: **busbus-a4556**
3. Klik på **Authentication** i sidebar
4. Klik på **Get Started** (hvis ikke allerede aktiveret)
5. Under **Sign-in method**, aktivér **Email/Password**

### 2. Opret Admin Bruger

I Firebase Authentication:
1. Gå til **Authentication** > **Users**
2. Klik **Add user**
3. Indtast email og adgangskode for admin bruger
4. Klik **Add user**
5. **Kopiér User UID** (fx: `zsoRuwBdDoeT6887lcwSD73B7dh2`)

### 3. Tilføj Admin i Firestore

I Firestore Database:
1. Gå til **Firestore Database**
2. Find eller opret collection: `auth`
3. Klik **Add document**
4. **Document ID**: Indsæt den kopierede User UID
5. Tilføj felt:
   - Field: `user`
   - Type: `string`
   - Value: Indsæt samme User UID igen
6. Klik **Save**

### 4. Opdater Firestore Rules

Firestore Rules er allerede opdateret i `firestore.rules`. Deploy dem:

```bash
firebase deploy --only firestore:rules
```

Eller i Firebase Console:
1. Gå til **Firestore Database** > **Rules**
2. Kopiér indholdet fra `firestore.rules` filen
3. Klik **Publish**

## 📁 Filer

- `sites/login.html` - Login side til admin brugere
- `sites/admin.html` - Admin dashboard til at administrere besvarelser
- `sites/firebase-config.js` - Fælles Firebase konfiguration
- `firestore.rules` - Opdaterede sikkerhedsregler

## 🚀 Sådan bruger du systemet

### Login
1. Åbn `sites/login.html` i browseren
2. Indtast admin email og adgangskode
3. Systemet tjekker automatisk om brugeren er admin
4. Hvis godkendt, redirectes til admin dashboard

### Admin Dashboard

**Visning:**
- Se alle besvarelser i en tabel
- Statistik vises øverst (total, filtreret, dansk, engelsk)

**Søgning:**
- Søg i besvarelser, user agent, referrer

**Filtrering:**
- Filtrer efter sprog (Alle, Dansk, English)

**Sortering:**
- Nyeste først / Ældste først
- Sprog A-Z / Z-A

**Rediger besvarelse:**
1. Klik **Rediger** på en besvarelse
2. Modificer felter (sprog, besvarelser, user agent, etc.)
3. Besvarelser skal være i JSON format
4. Klik **Gem ændringer**

**Slet besvarelse:**
1. Klik **Rediger** på en besvarelse
2. Klik **Slet** knappen
3. Bekræft sletning

**Opret ny besvarelse:**
1. Klik **+ Ny besvarelse**
2. Udfyld formular
3. Besvarelser skal være i JSON format, fx:
   ```json
   {
     "question1": "Svar 1",
     "question2": "Svar 2"
   }
   ```
4. Klik **Opret besvarelse**

## 🔒 Sikkerhed

Firestore Rules sikrer:
- ✅ Alle kan oprette submissions (uden login)
- ✅ Kun admin brugere kan læse submissions
- ✅ Kun admin brugere kan opdatere submissions
- ✅ Kun admin brugere kan slette submissions
- ✅ Admin status verificeres via `auth` collection
- ✅ Brugere kan kun læse deres egen auth dokument

## 🎨 Features

- Responsive design
- Real-time data opdateringer
- Moderne UI med gradient farver
- Notifikationer for handlinger
- Validering af JSON format
- Sikker logout funktionalitet
- Session persistence

## 🐛 Troubleshooting

**Kan ikke logge ind:**
- Tjek at Firebase Authentication er aktiveret
- Tjek at email/password er korrekt
- Tjek browser console for fejl

**"Du har ikke adgang til admin panelet":**
- Tjek at brugerens UID er i `auth` collection
- Tjek at `user` feltet matcher UID'et

**Kan ikke se besvarelser:**
- Tjek at Firestore Rules er deployed
- Tjek browser console for permissions fejl
- Tjek at der er submissions i databasen

**Firestore Rules fejl:**
- Deploy rules: `firebase deploy --only firestore:rules`
- Tjek at rules matcher din database struktur

## 📞 Support

Ved problemer, tjek:
1. Browser console for fejl
2. Firebase Console > Firestore Database > Rules for permissions
3. Firebase Console > Authentication > Users for bruger status
