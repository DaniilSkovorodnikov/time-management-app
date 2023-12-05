import firebase from 'firebase/compat/app'
import "firebase/compat/firestore";
import { DocumentData } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBTjjQ0jhmsk8vgYmb9d0y7RyKLiYcgGIA",
    authDomain: "time-management-app-34a13.firebaseapp.com",
    projectId: "time-management-app-34a13",
    storageBucket: "time-management-app-34a13.appspot.com",
    messagingSenderId: "53139880233",
    appId: "1:53139880233:web:2908c96015848a4f051f38"
  };
  const app = firebase.initializeApp(firebaseConfig);
  export const db = firebase.firestore();

  export async function getFirestoreDocument<T>(name: string){
    return await db.collection(name).get().then(snapshot => snapshot.docs.map(doc => ({...doc.data() as T, id: doc.id})))
  }

  export async function addToFirestoreDocument<T>(name: string, data: Omit<T, 'id'>): Promise<string> {
    return await db.collection(name).add(data as DocumentData).then(doc => doc.id)
  }

  export async function deleteFromFirestoreDocument(name: string, id: string) {
    return await db.collection(name).doc(id).delete()
  }

  export async function updateFirestoreDocument<T>(name: string, id: string, data: Partial<T>) {
    return await db.collection(name).doc(id).update(data)
  }