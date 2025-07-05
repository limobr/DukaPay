DukaPay

DukaPay is a Point of Sale (POS) application designed for Kenyan small businesses, offering inventory management, offline sales, M-Pesa payments, and business insights. Built with React Native and Expo, it features a modern UI with a purple theme (#7C3AED) and a smooth onboarding flow. The app is structured for easy collaboration, with screens organized into accounts, main, and onboarding folders.

Project Structure





assets/images: Static images (cereals.jpg, fruitsandvegetables.jpg, shoeshop.jpg, winesspirits.jpg)



src/screens/accounts: LoginScreen.js, SignupScreen.js (user authentication)



src/screens/main:





LandingScreen.js (initial landing page)



DashboardScreen.js (main user interface with sidebar and dynamic content)



HomeContent.js, SalesContent.js, ProductsContent.js, ReportsContent.js, SettingsContent.js (dashboard content sections)



src/screens/onboarding: WelcomeScreen.js, BusinessBasicsScreen.js, PersonalizationScreen.js, SubscriptionScreen.js (user onboarding)



App.js: Navigation setup with React Navigation



app.json: Expo configuration



babel.config.js: Babel configuration for React Native Reanimated



README.md: This file

How to Set Up

Follow these steps to set up and run DukaPay locally using Expo Go.

Prerequisites





Node.js: Version 18 (use nvm to manage Node versions)



Expo Go: Install the Expo Go app on your Android or iOS device



Git: Installed for cloning the repository



Code Editor: VS Code or similar

Step 1: Clone the Repository





Clone the repository from GitHub:

git clone https://github.com/your-username/DukaPay.git
cd DukaPay

Step 2: Install Dependencies





Ensure Node.js v18 is active:

nvm use 18
node -v



Install project dependencies:

npm install



Install specific Expo dependencies:

npx expo install react-native-app-intro-slider react-native-reanimated react-native-safe-area-context react-native-picker-select @react-native-picker/picker expo-image-picker react-native-vector-icons



Verify package.json includes:

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

Step 3: Verify Configuration





app.json: Ensure app.json includes the expo-image-picker plugin:

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



babel.config.js: Ensure it includes the reanimated plugin:

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};

Step 4: Run the App with Expo Go





Start the Expo development server:

npx expo start --clear

The --clear flag clears the Metro cache to avoid path or bundling issues.



Open the Expo Go app on your Android/iOS device.



Scan the QR code displayed in the terminal (e.g., exp://192.168.100.70:8081).



The app should load, starting with WelcomeScreen.

Step 5: Test the App





Navigation Flow:





WelcomeScreen: Displays onboarding slides, navigates to LoginScreen via "Skip" or "Get Started".



LandingScreen: Click "Log In" to go to LoginScreen or "Sign Up" for onboarding.



LoginScreen: Mock login navigates to DashboardScreen.



SignupScreen → BusinessBasicsScreen → PersonalizationScreen → SubscriptionScreen → DashboardScreen.



DashboardScreen:





Collapsible sidebar with buttons: Home (default), Sales, Products, Reports, Settings.



Content area dynamically loads content from separate files (HomeContent.js, etc.).



Toggle sidebar with the menu/close icon.



Styling: Purple buttons (#7C3AED), light background (#F3F4F6), card-like UI with shadows.



Features: No phone number in SignupScreen; supports email/password and Google login (mock).

Troubleshooting





Image Loading Issues:





Verify images exist in assets/images and match case (cereals.jpg, not Cereals.jpg).



Check paths in WelcomeScreen.js: require('../../../assets/images/cereals.jpg').



Clear cache: npx expo start --clear.



Dependency Errors:





Reinstall dependencies:

rm -rf node_modules package-lock.json
npm install



Navigation Issues:





Ensure App.js imports match the folder structure (e.g., ./src/screens/main/DashboardScreen).



Sidebar/Content Issues:





Verify content files (HomeContent.js, etc.) exist in src/screens/main.



Check console for errors if content doesn’t load.



Other Errors:





Check terminal logs or Expo Go console.



Share errors/screenshots via GitHub Issues.

Pushing to GitHub





Initialize Git (if not already done):

cd C:\Users\Limo\Desktop\DukaPay
git init



Verify .gitignore: Ensure .gitignore excludes:

node_modules/
.expo/
dist/
*.log



Add and Commit Files:

git add .
git commit -m "Add DashboardScreen with sidebar and content sections"



Push to GitHub:

git push origin main

Replace your-username with your GitHub username.

Contributing





Branching: Create a feature branch (git checkout -b feature/your-feature).



Commits: Use clear messages (e.g., Add Firebase auth to LoginScreen).



Pull Requests: Push to GitHub and create a PR for review.



Issues: Report bugs or suggest features via GitHub Issues.

Next Steps





Backend: Add Firebase Authentication for LoginScreen and SignupScreen.



Profile Screen: Collect phone number post-signup/login.



Features:





Add react-native-maps for BusinessBasicsScreen location picker.



Implement “Forgot Password” flow.



Expand ProductsContent.js for inventory management with Firebase.



Add M-Pesa integration for SalesContent.js.



Develop analytics for ReportsContent.js.



Customization: Add more Swahili phrases or Kenyan-specific imagery (contact the team for preferences).

For questions, contact the team via GitHub Issues or email. Happy coding!