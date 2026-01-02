# Quick Start Guide - IDJINKOUNDZI NEWS

Get up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies (2 minutes)

```bash
cd IDJI_NEWS
npm install
```

### 2. Set Up Supabase (3 minutes)

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Name: "IDJINKOUNDZI NEWS"
4. Wait for project creation

#### Get Credentials
1. Go to Settings > API
2. Copy **Project URL** and **anon key**

#### Create Database
1. Go to SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and click "Run"

### 3. Configure Environment (30 seconds)

Edit `.env` file:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Start Development Server (10 seconds)

```bash
npm start
```

Press `a` for Android or `i` for iOS.

## 📱 First Run

### Create Account
1. App opens with animated splash screen
2. Accept terms and conditions
3. Click "Register"
4. Fill in your details
5. You're in! 🎉

### Guest Mode
Skip registration and click "Continue as guest" to browse news.

## 🎯 Key Features to Test

1. **News Feed**: Browse and filter news by event type
2. **Booking**: Create an appointment (requires login)
3. **Contact**: Send a message (works as guest)
4. **Profile**: Toggle dark/light mode

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Check your `.env` file has correct credentials
- Verify Supabase project is active
- Check internet connection

### "Build failed"
- Run `npm install` again
- Clear cache: `rm -rf node_modules && npm install`
- Update Expo: `npm install expo@latest`

### "App won't start"
- Check Node.js version: `node -v` (should be 20+)
- Restart Metro bundler: Press `r` in terminal
- Clear cache: `npx expo start -c`

## 📚 Next Steps

- Read [README.md](./README.md) for full documentation
- Follow [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed Supabase setup
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) when ready to deploy

## 💡 Tips

- Use development build for testing native features
- Enable "Confirm email" in Supabase after initial setup
- Create an admin user to add news content
- Test both light and dark modes

## 🎨 Customize

Want to customize the app?

1. **Colors**: Edit `src/config/theme.ts`
2. **App Name**: Edit `app.config.ts`
3. **Services**: Update in Supabase `services` table
4. **Icons**: Add images to `assets/` folder

## 📞 Need Help?

- Check [CONTRIBUTING.md](./CONTRIBUTING.md)
- Email: contact@idjinkoundzi.com
- Create an issue on GitHub

---

**Ready to build something amazing? Let's go! 🚀**
