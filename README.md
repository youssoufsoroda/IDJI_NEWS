# IDJINKOUNDZI NEWS

A professional React Native mobile application built with Expo SDK 54 for social news and event management in the Comoros.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Expo SDK](https://img.shields.io/badge/Expo%20SDK-54-000020?logo=expo)
![React Native](https://img.shields.io/badge/React%20Native-0.76.5-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?logo=typescript)

## 📱 Features

### Core Functionality
- 📰 **News Feed**: Browse and filter news by event type
- 📅 **Appointment Booking**: Schedule appointments for various services
- ✉️ **Contact Form**: Send messages directly to the organization
- 👤 **User Profiles**: Manage your account and preferences
- 🌓 **Dark/Light Mode**: Beautiful themes with smooth transitions
- 🎨 **Premium Design**: Editorial-style UI with smooth animations

### Event Types
- Grand mariage (Traditional weddings)
- Mdhoihiricho (Cultural celebrations)
- Séminaire (Seminars)
- TOIRABE (Cultural events)
- Conférence (Conferences)
- Other events

### Authentication
- Email/Password registration and login
- Guest mode for browsing news
- Secure authentication with Supabase
- Mandatory terms and conditions acceptance

### Technical Highlights
- ⚡ **Hermes Engine**: Optimized performance
- 🔐 **Supabase Backend**: Secure authentication and database
- 📦 **EAS Build Ready**: Full configuration for production builds
- 🎯 **16 KB Page Size Compatible**: Ready for Android 15+
- 🚀 **Expo SDK 54**: Latest Expo features and improvements
- 💾 **Offline Support**: AsyncStorage for local data persistence

## 🏗️ Tech Stack

- **Framework**: React Native 0.76.5
- **Platform**: Expo SDK 54 (Managed Workflow)
- **Language**: TypeScript 5.3
- **Navigation**: Expo Router 4.0
- **Backend**: Supabase
- **State Management**: Zustand
- **Animations**: React Native Reanimated 3.16
- **UI Components**: Custom components with premium design
- **Date Handling**: date-fns 4.1
- **Build System**: EAS Build

## 📋 Prerequisites

- Node.js 20.0.0 or higher
- npm or yarn
- Expo CLI
- EAS CLI (for building)
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/youssoufsoroda/IDJI_NEWS.git
cd IDJI_NEWS
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
1. Create a Supabase project
2. Run the database schema
3. Configure authentication
4. Get your API credentials

### 4. Configure Environment Variables

Create a `.env` file in the root directory:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
EAS_PROJECT_ID=your-eas-project-id
```

### 5. Start Development Server

```bash
npm start
```

This will open Expo Dev Tools. You can then:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan the QR code with Expo Go app on your physical device

## 🏗️ Building for Production

### Configure EAS

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
eas login
```

3. Configure your project:
```bash
eas build:configure
```

### Build APK (for testing)

```bash
npm run build:preview
```

### Build AAB (for Play Store)

```bash
npm run build:production
```

### Submit to Google Play Store

```bash
npm run submit:production
```

## 📁 Project Structure

```
IDJI_NEWS/
├── app/                        # Expo Router pages
│   ├── (tabs)/                # Tab navigation screens
│   │   ├── _layout.tsx       # Tab navigator
│   │   ├── news.tsx
│   │   ├── booking.tsx
│   │   ├── contact.tsx
│   │   └── profile.tsx
│   ├── _layout.tsx           # Root layout
│   ├── index.tsx             # Entry point
│   ├── login.tsx
│   └── register.tsx
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── LoadingSkeleton.tsx
│   │   ├── ErrorView.tsx
│   │   └── EmptyState.tsx
│   ├── screens/              # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── TermsScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── NewsScreen.tsx
│   │   ├── BookingScreen.tsx
│   │   ├── ContactScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── config/               # Configuration files
│   │   ├── supabase.ts
│   │   └── theme.ts
│   ├── services/             # API services
│   │   └── api.ts
│   ├── store/                # State management
│   │   ├── useAuthStore.ts
│   │   └── useThemeStore.ts
│   └── types/                # TypeScript types
│       └── index.ts
├── assets/                   # Images, fonts, etc.
├── android/                  # Android native code
├── supabase/                 # Database schema
│   └── schema.sql
├── app.config.ts            # Expo configuration
├── eas.json                 # EAS Build configuration
├── package.json
├── tsconfig.json
└── .env                     # Environment variables
```

## 🎨 Design System

### Colors

#### Light Mode
- Primary: #1a73e8
- Background: #ffffff
- Surface: #f5f5f5
- Text: #212121

#### Dark Mode
- Primary: #4285f4
- Background: #0f0f1e
- Surface: #1a1a2e
- Text: #e8eaed

### Typography
- Headings: 20-32px, weight 600-700
- Body: 14-16px, weight 400
- Captions: 12px, weight 400

### Spacing
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

## 🔐 Security

- Row Level Security (RLS) enabled on all Supabase tables
- Secure token storage using AsyncStorage
- API keys stored in environment variables
- HTTPS-only communication
- Input validation on all forms

## 📱 Android Configuration

### 16 KB Page Size Compatibility

This app is fully compatible with Android 15's 16 KB page size requirement:
- Configured in `android/gradle.properties`
- NDK version: 27.0.12077973
- Build tools: 35.0.0
- Target SDK: 35

### Permissions
- INTERNET
- ACCESS_NETWORK_STATE

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Type checking
npx tsc --noEmit

# Linting (when configured)
npm run lint
```

## 📦 Dependencies

### Core
- expo: ^54.0.0
- react: 18.3.1
- react-native: 0.76.5
- expo-router: ^4.0.0

### Backend
- @supabase/supabase-js: ^2.47.0
- @react-native-async-storage/async-storage: ^2.1.0

### UI & Animation
- react-native-reanimated: ^3.16.0
- react-native-gesture-handler: ^2.20.0
- expo-linear-gradient: ^14.0.0
- expo-blur: ^14.0.0
- expo-image: ^2.0.0

### State & Utils
- zustand: ^5.0.2
- date-fns: ^4.1.0
- zod: ^3.23.8

See [package.json](./package.json) for the complete list.

## 📝 Scripts

```bash
npm start              # Start Expo development server
npm run android        # Run on Android
npm run ios            # Run on iOS
npm run web            # Run on web
npm run build:development   # Build development APK
npm run build:preview       # Build preview APK
npm run build:production    # Build production AAB
npm run submit:production   # Submit to Play Store
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software created for IDJINKOUNDZI NEWS.

## 👨‍💻 Author

**YOUSSOUF SORODA**

## 🐛 Known Issues

- DateTimePicker on Android may require additional configuration for specific devices
- First-time load may take a few seconds to initialize Supabase connection

## 🔮 Future Enhancements

- [ ] Push notifications for news updates
- [ ] In-app chat support
- [ ] Multiple language support (Comorian, French, Arabic)
- [ ] Offline mode for reading cached news
- [ ] Share news on social media
- [ ] Calendar integration for appointments
- [ ] Payment integration for event bookings
- [ ] Admin dashboard

## 📞 Support

For support, email contact@idjinkoundzi.com or create an issue in this repository.

## 🙏 Acknowledgments

- Expo team for the amazing framework
- Supabase team for the backend infrastructure
- React Native community for excellent libraries

---

Made with ❤️ in Comoros by YOUSSOUF SORODA
