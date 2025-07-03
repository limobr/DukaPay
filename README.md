# DukaPay

DukaPay is a Point of Sale (POS) application designed for Kenyan small businesses, offering inventory management, offline sales, M-Pesa payments, and business insights. Built with React Native and Expo, it features a modern UI with a purple theme (`#7C3AED`) and a smooth onboarding flow. The app is structured for easy collaboration, with screens organized into `accounts`, `main`, and `onboarding` folders.

## Project Structure
- `assets/images`: Static images (`cereals.jpg`, `fruitsandvegetables.jpg`, `shoeshop.jpg`, `winesspirits.jpg`)
- `src/screens/accounts`: `LoginScreen.js`, `SignupScreen.js` (user authentication)
- `src/screens/main`: `LandingScreen.js` (core app dashboard)
- `src/screens/onboarding`: `WelcomeScreen.js`, `BusinessBasicsScreen.js`, `PersonalizationScreen.js`, `SubscriptionScreen.js` (user onboarding)
- `App.js`: Navigation setup with React Navigation
- `app.json`: Expo configuration
- `babel.config.js`: Babel configuration for React Native Reanimated

## How to Set Up
Follow these steps to set up and run DukaPay locally using Expo Go.

### Prerequisites
- **Node.js**: Version 18 (use `nvm` to manage Node versions)
- **Expo Go**: Install the Expo Go app on your Android or iOS device
- **Git**: Installed for cloning the repository
- **Code Editor**: VS Code or similar

### Step 1: Clone the Repository
1. Clone the repository from GitHub:
   ```bash
   git clone https://github.com/your-username/DukaPay.git
   cd DukaPay
   ```
2. If you don’t have a GitHub repository yet, create one (see [Pushing to GitHub](#pushing-to-github) below).

### Step 2: Install Dependencies
1. Ensure Node.js v18 is active:
   ```bash
   nvm use 18
   node -v
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Install specific Expo dependencies:
   ```bash
   npx expo install react-native-app-intro-slider react-native-reanimated react-native-safe-area-context react-native-picker-select @react-native-picker/picker expo-image-picker react-native-vector-icons
   ```
4. Verify `package.json` includes:
   ```json
   "dependencies": {
     "expo": "~51.0.8",
     "@react-navigation/native": "^6.0.0",
     "@react-navigation/stack": "^6.0.0",
     "react-native-safe-area-context": "^4.10.5",
     "react-native-picker-select": "^9.0.0",
     "@react-native-picker/picker": "^2.7.7",
     "expo-image-picker": "~15.0.7",
     "react-native-vector-icons": "^10.0.0",
     "react-native-reanimated": "~3.10.1",
     "react-native-app-intro-slider": "^4.0.4",
     ...
   }
   ```

### Step 3: Verify Configuration
1. **app.json**:
   Ensure `app.json` includes the `expo-image-picker` plugin:
   ```json
   {
     "expo": {
       "name": "DukaPay",
       "slug": "DukaPay",
       "version": "1.0.0",
       "orientation": "portrait",
       "icon": "./assets/icon.png",
       "userInterfaceStyle": "light",
       "newArchEnabled": true,
       "splash": {
         "image": "./assets/splash-icon.png",
         "resizeMode": "contain",
         "backgroundColor": "#ffffff"
       },
       "ios": {
         "supportsTablet": true
       },
       "android": {
         "adaptiveIcon": {
           "foregroundImage": "./assets/adaptive-icon.png",
           "backgroundColor": "#ffffff"
         },
         "edgeToEdgeEnabled": true
       },
       "web": {
         "favicon": "./assets/favicon.png"
       },
       "plugins": [
         [
           "expo-image-picker",
           {
             "photosPermission": "Allow DukaPay to access your photos to upload a business logo."
           }
         ]
       ]
     }
   }
   ```
2. **babel.config.js**:
   Ensure it includes the `reanimated` plugin:
   ```javascript
   module.exports = function(api) {
     api.cache(true);
     return {
       presets: ['babel-preset-expo'],
       plugins: ['react-native-reanimated/plugin'],
     };
   };
   ```

### Step 4: Run the App with Expo Go
1. Start the Expo development server:
   ```bash
   npx expo start --clear
   ```
   The `--clear` flag clears the Metro cache to avoid path or bundling issues.
2. Open the Expo Go app on your Android/iOS device.
3. Scan the QR code displayed in the terminal (e.g., `exp://192.168.100.70:8081`).
4. The app should load, starting with `WelcomeScreen` (displaying `cereals.jpg`, etc.).

### Step 5: Test the App
- **WelcomeScreen**: Displays four slides with images (`cereals.jpg`, `fruitsandvegetables.jpg`, `shoeshop.jpg`, `winesspirits.jpg`), auto-scrolls every 5 seconds, and navigates to `LoginScreen` via "Skip" or "Get Started".
- **Navigation Flow**: `WelcomeScreen` → `LoginScreen` → `SignupScreen` → `BusinessBasicsScreen` → `PersonalizationScreen` → `SubscriptionScreen` → `LandingScreen`.
- **Styling**: Purple buttons (`#7C3AED`), light background (`#F3F4F6`), card-like UI with shadows.
- **Features**: No phone number in `SignupScreen`; supports email/password and Google login (mock).

### Troubleshooting
- **Image Loading Issues**:
  - Verify images exist in `assets/images` and match case (`cereals.jpg`, not `Cereals.jpg`).
  - Clear cache: `npx expo start --clear`.
  - Check paths in `WelcomeScreen.js`: `require('../../../assets/images/cereals.jpg')`.
- **Dependency Errors**:
  - Reinstall dependencies:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
- **Navigation Issues**:
  - Ensure `App.js` imports match the folder structure (e.g., `./src/screens/onboarding/WelcomeScreen`).
- **Other Errors**:
  - Check terminal logs or Expo Go console.
  - Share errors/screenshots with the team for help.

## Pushing to GitHub
If you haven’t set up a GitHub repository:
1. **Initialize Git**:
   ```bash
   cd C:\Users\Limo\Desktop\DukaPay
   git init
   ```
2. **Create .gitignore**:
   Ensure `.gitignore` excludes unnecessary files:
   ```
   node_modules/
   .expo/
   dist/
   *.log
   ```
3. **Add and Commit Files**:
   ```bash
   git add .
   git commit -m "Initial commit of DukaPay project"
   ```
4. **Create GitHub Repository**:
   - Go to GitHub, sign in, and create a new repository (e.g., `DukaPay`).
   - Choose private or public based on your needs.
5. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/your-username/DukaPay.git
   git branch -M main
   git push -u origin main
   ```

## Contributing
- **Branching**: Create a feature branch (`git checkout -b feature/your-feature`).
- **Commits**: Use clear messages (e.g., `Add Firebase auth to LoginScreen`).
- **Pull Requests**: Push to GitHub and create a PR for review.
- **Issues**: Report bugs or suggest features via GitHub Issues.

## Next Steps
- **Backend**: Add Firebase Authentication for `LoginScreen` and `SignupScreen`.
- **Profile Screen**: Collect phone number post-signup/login.
- **Features**:
  - Add `react-native-maps` for `BusinessBasicsScreen` location picker.
  - Implement “Forgot Password” flow.
  - Develop `DashboardScreen` or `ProductListScreen` for POS functionality.
- **Customization**: Add more Swahili phrases or Kenyan-specific imagery (contact the team for preferences).

For questions, contact the team via GitHub Issues or email. Happy coding!