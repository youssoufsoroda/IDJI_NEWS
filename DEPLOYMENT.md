# Deployment Guide for IDJINKOUNDZI NEWS

Complete guide for deploying your application to production using Expo Application Services (EAS).

## Prerequisites

Before you begin, ensure you have:
- [ ] Node.js 20+ installed
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Expo account created
- [ ] Supabase project set up and configured
- [ ] Google Play Console account (for Android)

## Step 1: Initial Setup

### 1.1 Install EAS CLI

```bash
npm install -g eas-cli
```

### 1.2 Login to Expo

```bash
eas login
```

Enter your Expo account credentials.

### 1.3 Link Project to EAS

```bash
cd IDJI_NEWS
eas init
```

This will create an EAS project and add the project ID to your configuration.

## Step 2: Configure Environment Variables

### 2.1 Update .env File

Ensure your `.env` file has production values:

```env
SUPABASE_URL=https://your-production-project.supabase.co
SUPABASE_ANON_KEY=your-production-anon-key
EAS_PROJECT_ID=your-eas-project-id
```

### 2.2 Set EAS Secrets

Store sensitive environment variables in EAS:

```bash
eas secret:create --scope project --name SUPABASE_URL --value "https://your-project.supabase.co"
eas secret:create --scope project --name SUPABASE_ANON_KEY --value "your-anon-key"
```

## Step 3: Generate App Icons and Splash Screen

### 3.1 Create Your Assets

Place your assets in the `assets/` folder:
- `icon.png` - 1024x1024px (app icon)
- `splash.png` - 1284x2778px (splash screen)
- `adaptive-icon.png` - 1024x1024px (Android adaptive icon)
- `favicon.png` - 48x48px (web favicon)

### 3.2 Generate Required Assets

Expo will automatically generate all required sizes when you build.

## Step 4: Android Signing (Required for Production)

### 4.1 Generate Keystore

Let EAS generate a keystore for you (recommended):

```bash
eas credentials
```

Select:
1. Android
2. Production
3. Set up credentials from scratch

EAS will automatically create and manage your keystore.

### 4.2 Manual Keystore (Alternative)

If you want to use your own keystore:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore idjinews.keystore \
  -alias idjinews -keyalg RSA -keysize 2048 -validity 10000
```

Then configure it in `eas.json` credentials.

## Step 5: Google Play Service Account (For Automatic Submission)

### 5.1 Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Play Android Developer API
4. Create a service account:
   - Go to IAM & Admin > Service Accounts
   - Click "Create Service Account"
   - Name it "EAS Submit"
   - Grant role: Service Account User
   - Create and download JSON key

### 5.2 Link to Play Console

1. Go to [Google Play Console](https://play.google.com/console/)
2. Settings > API Access
3. Link the service account
4. Grant permissions: Release to production, testing tracks

### 5.3 Add to Project

Save the JSON key as `google-service-account.json` in your project root (it's gitignored).

Update `eas.json`:

```json
{
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json"
      }
    }
  }
}
```

## Step 6: Build for Android

### 6.1 Development Build (Internal Testing)

```bash
npm run build:development
```

or

```bash
eas build --profile development --platform android
```

This creates an APK for internal testing.

### 6.2 Preview Build (Testing)

```bash
npm run build:preview
```

or

```bash
eas build --profile preview --platform android
```

### 6.3 Production Build (Play Store)

```bash
npm run build:production
```

or

```bash
eas build --profile production --platform android
```

This creates an AAB (Android App Bundle) ready for Play Store submission.

### 6.4 Download Build

Once the build completes, you can:
1. Download from the link provided in terminal
2. View in Expo dashboard: https://expo.dev/accounts/[your-account]/projects/idjinkoundzi-news/builds

## Step 7: Publish to Google Play Store

### 7.1 Manual Upload

1. Download the AAB from EAS
2. Go to [Google Play Console](https://play.google.com/console/)
3. Select your app (or create new)
4. Go to Release > Production
5. Create new release
6. Upload the AAB
7. Fill in release notes
8. Review and rollout

### 7.2 Automatic Submission with EAS

```bash
npm run submit:production
```

or

```bash
eas submit --platform android --latest
```

This automatically submits your latest production build to Play Store.

## Step 8: App Store Listing

### 8.1 Prepare Assets

- App icon (512x512)
- Feature graphic (1024x500)
- Screenshots (at least 2):
  - Phone: 1080x1920 or higher
  - Tablet: 1200x1920 or higher (optional)
- Video (optional)

### 8.2 App Information

**Title**: IDJINKOUNDZI NEWS

**Short Description** (80 chars):
Plateforme d'actualités et de gestion d'événements aux Comores

**Full Description**:
```
IDJINKOUNDZI NEWS est votre application de référence pour suivre l'actualité et gérer vos événements aux Comores.

📰 ACTUALITÉS EN TEMPS RÉEL
Restez informé des dernières actualités sur les grands mariages, les mdhoihiricho, les séminaires, les conférences et bien plus encore.

📅 PRISE DE RENDEZ-VOUS
Prenez facilement rendez-vous pour vos événements directement depuis l'application.

✉️ CONTACT DIRECT
Contactez notre équipe facilement via le formulaire intégré.

🌓 MODE SOMBRE
Interface élégante avec support du mode sombre pour un confort optimal.

👤 COMPTE PERSONNEL
Créez votre compte pour accéder à toutes les fonctionnalités ou parcourez en mode invité.

TYPES D'ÉVÉNEMENTS :
• Grand mariage
• Mdhoihiricho
• Séminaire
• TOIRABE
• Conférence
• Autres événements

Téléchargez IDJINKOUNDZI NEWS et restez connecté avec votre communauté !
```

**Category**: News & Magazines

**Contact Email**: contact@idjinkoundzi.com

**Privacy Policy**: [Your privacy policy URL]

## Step 9: OTA Updates (Over-The-Air)

After your app is published, you can push updates without going through the store review:

### 9.1 Publish an Update

```bash
eas update --branch production --message "Bug fixes and improvements"
```

### 9.2 Channel Management

Configure channels in `eas.json` for different environments:

```json
{
  "update": {
    "development": {
      "channel": "development"
    },
    "preview": {
      "channel": "preview"
    },
    "production": {
      "channel": "production"
    }
  }
}
```

**Note**: OTA updates work for JavaScript code changes only. Native code changes require a new build.

## Step 10: Version Management

### 10.1 Increment Version

Before each production build, update:

1. In `app.config.ts`:
```typescript
version: '1.0.1',  // Increment version
```

2. For Android in `app.config.ts`:
```typescript
android: {
  versionCode: 2,  // Increment versionCode
  // ...
}
```

### 10.2 Semantic Versioning

Follow semantic versioning:
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backwards compatible
- **Patch** (1.0.1): Bug fixes

## Step 11: Production Checklist

Before releasing to production:

### App Configuration
- [ ] Update app version and version code
- [ ] Set production environment variables
- [ ] Configure proper app name and bundle ID
- [ ] Add proper app icons and splash screen
- [ ] Test deep linking

### Supabase
- [ ] Use production Supabase instance
- [ ] Enable email confirmations
- [ ] Configure custom SMTP
- [ ] Review RLS policies
- [ ] Set up database backups
- [ ] Test all API endpoints

### Security
- [ ] Remove console.logs from production code
- [ ] Verify all API keys are in environment variables
- [ ] Enable SSL pinning (if required)
- [ ] Test authentication flow thoroughly

### Testing
- [ ] Test on multiple Android devices
- [ ] Test all user flows
- [ ] Test offline functionality
- [ ] Test error handling
- [ ] Verify loading states
- [ ] Test dark/light mode switching

### Legal
- [ ] Create privacy policy
- [ ] Create terms of service
- [ ] Add contact information
- [ ] Verify GDPR compliance (if applicable)

### Play Store
- [ ] Prepare marketing assets
- [ ] Write compelling app description
- [ ] Add screenshots (multiple devices)
- [ ] Set proper age rating
- [ ] Choose correct category
- [ ] Set pricing (free/paid)

## Step 12: Monitoring & Analytics

### 12.1 Error Tracking

Consider adding error tracking:

```bash
npm install @sentry/react-native
```

Configure in `app.config.ts`:

```typescript
plugins: [
  // ... other plugins
  '@sentry/react-native/expo'
]
```

### 12.2 Analytics

Add analytics to track user behavior:

```bash
npx expo install expo-analytics
```

## Troubleshooting

### Build Failed

1. Check build logs in EAS dashboard
2. Verify all dependencies are compatible
3. Clear cache: `eas build --clear-cache`

### Submission Failed

1. Verify service account permissions
2. Check Play Console for errors
3. Ensure version code is incremented

### OTA Update Not Working

1. Check update channel matches build profile
2. Verify app is using expo-updates
3. Test with development build first

## Support Resources

- EAS Documentation: https://docs.expo.dev/eas/
- Expo Forums: https://forums.expo.dev/
- Supabase Docs: https://supabase.com/docs
- Google Play Help: https://support.google.com/googleplay/android-developer

## Maintenance

### Regular Tasks

1. **Weekly**: Check crash reports and fix critical bugs
2. **Monthly**: Update dependencies and push security patches
3. **Quarterly**: Review analytics and plan new features
4. **Yearly**: Update to latest Expo SDK

### Backup Strategy

1. Regular Supabase database backups
2. Version control all code in Git
3. Document all configuration changes
4. Keep build keystores secure

---

**Need Help?**

Contact: contact@idjinkoundzi.com

**Deployment Status**

- [ ] Development build tested
- [ ] Preview build tested
- [ ] Production build created
- [ ] Play Store listing complete
- [ ] App submitted for review
- [ ] App published successfully

---

Made with ❤️ by YOUSSOUF SORODA
