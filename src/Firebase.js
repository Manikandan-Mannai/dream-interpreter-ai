import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;

            // Check if user data already exists
            if (!localStorage.getItem("name")) {
                localStorage.setItem("name", name);
            }
            if (!localStorage.getItem("email")) {
                localStorage.setItem("email", email);
            }
            if (!localStorage.getItem("profilePic")) {
                localStorage.setItem("profilePic", profilePic);
            }
        })
        .catch((error) => {
            // Handle authentication errors
            console.error("Error signing in with Google:", error);
            // You can show an error message to the user or perform any other action here
        });
};

export const signOutUser = () => {
    signOut(auth)
        .then(() => {
            // Perform any additional actions after successful logout
            localStorage.clear(); // Clear localStorage upon logout
        })
        .catch((error) => {
            console.error("Error signing out:", error);
            // Handle logout errors
        });
};

