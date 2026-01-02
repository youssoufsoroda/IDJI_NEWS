# Assets Directory

This directory contains all the visual assets for IDJINKOUNDZI NEWS.

## Required Assets

Before building the app, you need to add the following images:

### App Icons
- `icon.png` - 1024x1024px
  - Main app icon
  - Used for iOS and Android

- `adaptive-icon.png` - 1024x1024px
  - Android adaptive icon foreground
  - Should work well with different shapes

### Splash Screen
- `splash.png` - 1284x2778px
  - Displayed while app is loading
  - Background color: #1a1a2e (configured in app.config.ts)

### Web
- `favicon.png` - 48x48px
  - Browser favicon for web version

## Design Guidelines

### App Icon
- Should be simple and recognizable at small sizes
- Use the app's primary colors
- Include the 📰 emoji or a stylized version
- Ensure good contrast
- Test at various sizes

### Splash Screen
- Match the animated splash screen style
- Use dark background (#1a1a2e)
- Center the logo/icon
- Keep it simple and professional

### Color Palette
- Primary: #4285f4 (blue)
- Secondary: #fdd663 (yellow)
- Accent: #f28b82 (red)
- Background Dark: #0f0f1e
- Background Light: #ffffff

## Generating Assets

Expo will automatically generate all required sizes from these base images when you build the app.

To manually regenerate icons:
```bash
npx expo prebuild --clean
```

## Tools

Recommended tools for creating assets:
- Figma (https://figma.com)
- Adobe Illustrator
- Sketch
- Canva (https://canva.com)

## Current Status

- [ ] icon.png
- [ ] adaptive-icon.png
- [ ] splash.png
- [ ] favicon.png

Add your custom assets to replace the default Expo assets.
