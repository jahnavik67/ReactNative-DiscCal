# Claude Code Session Context - Discount Calculator

## Project Overview
- **App Name**: Discount Calculator
- **Platform**: React Native (Android focus)
- **GitHub Repo**: https://github.com/jahnavik67/ReactNative-DiscCal
- **Project Path**: C:\DC (Windows) / /mnt/c/DC (WSL)

## Recent Work Completed

### Layout Responsiveness Fix (Latest Session)
**Problem**: Layout looked different on Pixel 9 vs Pixel 4 - Pixel 9 showed everything on one screen without scrolling, Pixel 4 had proper scrolling behavior.

**Solution Applied**: Modified `DiscountCalculatorScreen.tsx` with:
- Added `Dimensions` import for responsive sizing
- Set `minHeight: Dimensions.get('window').height * 0.9` to force scroll behavior
- Enabled `showsVerticalScrollIndicator={true}` and `alwaysBounceVertical={true}`
- Improved content structure with `mainContent` wrapper and flex layout
- Enhanced button positioning with proper padding

**Files Modified**:
- `/mnt/c/DC/src/components/calculator/DiscountCalculatorScreen.tsx`

## Current Issues

### Environment Setup Problems
**Status**: App was working on Friday, now failing on Monday

**Issues Found** (via `npx react-native doctor`):
- ✖ JDK version mismatch: Have 21.0.7, need >= 17 <= 20
- ✖ Android Studio not detected properly  
- ✖ Android SDK not found (needs version 35.0.0)

**Error when running `npm run android`**:
```
<< was unexpected at this time.
error Failed to install the app. Command failed with exit code 255
```

## Key Commands Used
```bash
# Run Android app
npm run android

# Check environment
npx react-native doctor

# Git workflow
git add .
git commit -m "message"
git push origin main

# Project structure
git remote add origin https://github.com/jahnavik67/ReactNative-DiscCal.git
```

## Project Structure
```
DC/
├── src/
│   ├── components/
│   │   ├── calculator/
│   │   │   └── DiscountCalculatorScreen.tsx (MODIFIED)
│   │   └── ui/
│   ├── hooks/
│   ├── styles/
│   └── utils/
├── android/
├── package.json
└── CLAUDE.md (this file)
```

## Next Steps
1. Fix JDK version issue (install JDK 17 or 20)
2. Verify Android Studio and SDK setup
3. Test the responsive layout changes on both Pixel 4 and Pixel 9
4. Build and publish new version to Google Play Console for closed testing

## App Publishing
- Previous version already published to Google Play Console for closed testing
- Need to increment version code for new release with layout fixes

## Development Environment
- **OS**: Windows with WSL2
- **Node**: Working
- **NPM**: Working
- **React Native CLI**: Working
- **Android Device**: Google Pixel 9 and Pixel 4 for testing