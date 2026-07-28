import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBL92n6vm-6imt-oPMDj-XrZCmzK9SJXIA",
  authDomain: "toolmarket-8e667.firebaseapp.com",
  projectId: "toolmarket-8e667",
  storageBucket: "toolmarket-8e667.firebasestorage.app",
  messagingSenderId: "523531957442",
  appId: "1:523531957442:web:92ccc636f0d0a3880df75b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);