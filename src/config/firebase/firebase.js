import app from "firebase/app"
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig) // Initialize firebase firebaseConfig
        this.auth = app.auth() // Initialize firebase auth

        // For Firestore
        this.fieldValue = app.firestore.FieldValue;
        this.db = app.firestore();
    }

    // Create user with email and password
    createFirebaseUser = (user) => {
        return this.auth.createUserWithEmailAndPassword(user.email, user.password)
    }
    // Users cloud firestore for crud
    usersDb = () => this.db.collection("students")

    // Login with email and password
    loginFirebaseUser = (user) => {
        return this.auth.signInWithEmailAndPassword(user.email, user.password)
    }

    // Logout user
    logoutFirebaseUser = () => this.auth.signOut()



    // // User API
    // user = uid => this.db.doc(`users/${uid}`);
    // users = () => this.db.collection('users');
}

export default Firebase