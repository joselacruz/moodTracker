import { getDocs, collection,addDoc } from "firebase/firestore";
import { initializeApp} from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword,onAuthStateChanged,signOut,createUserWithEmailAndPassword} from "firebase/auth";
import 'firebase/auth';
// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);




// Función para iniciar sesión con correo y contraseña
export const signInWithEmailPassword = (email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
};


// Verificacion si el El Usuario Esta Autenticado
export const checkUserAuth = () => {
  const auth = getAuth();
  
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};

export const signOutUser = async () => {
  const auth = getAuth();

  try {
    await signOut(auth);
    // El cierre de sesión fue exitoso
    console.log('Cierre de sesión exitoso');
  } catch (error) {
    // Ocurrió un error al cerrar sesión
    console.error('Error al cerrar sesión:', error);
    throw error;
  }
};


export  const saveToFirebase= async (data, key) => {
  try {
    
    const docRef = await addDoc(collection(db, key), data);
    console.log('Text saved to Firestore with document ID:', docRef.id);
  } catch (error) {
    console.error('Error saving text to Firestore:', error);
  }
};



export const readFirebase = async (collectionName) => {
  try {
    const userTextsCollection = collection(db, collectionName);
    const querySnapshot = await getDocs(userTextsCollection);
    
    const documentData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    return documentData;
  } catch (error) {
    console.error("Error reading data from Firestore:", error);
    return [];
  }
};

//Registrar Cuenta correo y contraseña
export const signUpWithEmailAndPassword = async (email, password) => {
  const auth = getAuth();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    throw error;
  }
};