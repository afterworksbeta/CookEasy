
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";

/**
 * Firebase configuration for the CookEasy web app.
 * Project ID: cookeasy-530bc
 * 
 * IMPORTANT: The Flutter code (dart/firebase_options.dart) you provided 
 * is only for Flutter apps. For this Web app, we use the Web SDK 
 * configuration below.
 */
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "YOUR_WEB_API_KEY", 
  authDomain: "cookeasy-530bc.firebaseapp.com",
  projectId: "cookeasy-530bc",
  storageBucket: "cookeasy-530bc.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: process.env.FIREBASE_APP_ID || "YOUR_WEB_APP_ID",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase (Equivalent to Firebase.initializeApp in Flutter)
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional, for tracking)
let analytics = null;
if (typeof window !== 'undefined' && firebaseConfig.measurementId !== "YOUR_MEASUREMENT_ID") {
  analytics = getAnalytics(app);
}

// Export services for use in the app
export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

export default app;
