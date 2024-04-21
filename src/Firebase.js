import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBlrZykQZw7E2Ip8L84qfLxrubRyK8teNw",
    authDomain: "dream-interpreter-b7df4.firebaseapp.com",
    projectId: "dream-interpreter-b7df4",
    storageBucket: "dream-interpreter-b7df4.appspot.com",
    messagingSenderId: "387093512097",
    appId: "1:387093512097:web:5a71ae0758eda523ee15e0"
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

