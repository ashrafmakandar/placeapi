This is a simple yet functional React Native application that enables users to:

Search for locations using Google Places Autocomplete.

View selected locations on a map (via react-native-maps).

Save and retrieve previously searched locations using AsyncStorage.

✨ Features
🔍 Google Places Autocomplete integration for place suggestions.

🗺️ MapView showing selected place with a marker.

📜 Search history that stores recent places and allows quick re-selection.

💾 Persistent data using @react-native-async-storage/async-storage.

🚀 Getting Started
Prerequisites
Ensure you have the following installed:

Node.js & npm
Expo CLI

Android Studio / Xcode for emulation

A Google Maps API key with Places API and Maps SDK enabled

Install dependencies:

npm install
react-native-maps

react-native-google-places-autocomplete

@react-native-async-storage/async-storage

@env for environment variables
Add your API Key:

Create a .env file in the root.
Add:
GOOGLE_API_KEY=your_google_api_key_here

Run the app:
npx expo start




