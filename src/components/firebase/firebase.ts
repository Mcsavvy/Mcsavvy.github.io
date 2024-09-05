import { initializeApp, FirebaseApp, FirebaseOptions } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import {
  getFirestore,
  Firestore,
  collection,
  getDocs,
} from "firebase/firestore";
import { Client, MyInfo, Project, Service, Testimonial } from "../@types";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
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

class Firebase {
  db: Firestore;
  analytics: Analytics;
  app: FirebaseApp;

  constructor() {
    this.app = app;
    this.db = getFirestore(app);
    this.analytics = getAnalytics(app);
  }

  async getAllProjects() {
    const projects = collection(this.db, "project");
    const projectsSnapshot = await getDocs(projects);
    const projectsList = projectsSnapshot.docs.map((doc) => doc.data());
    return projectsList as Project[];
  }

  async getAllTestimonials() {
    const testimonials = collection(this.db, "testimonial");
    const testimonialsSnapshot = await getDocs(testimonials);
    const testimonialsList = testimonialsSnapshot.docs.map((doc) => doc.data());
    return testimonialsList as Testimonial[];
  }

  async getAllServices() {
    const services = collection(this.db, "service");
    const servicesSnapshot = await getDocs(services);
    const servicesList = servicesSnapshot.docs.map((doc) => doc.data());
    return servicesList as Service[];
  }

  async getAllClients() {
    const clients = collection(this.db, "client");
    const clientsSnapshot = await getDocs(clients);
    const clientsList = clientsSnapshot.docs.map((doc) => doc.data());
    return clientsList as Client[];
  }

  async getMyInfo() {
    const info = collection(this.db, "info");
    const myInfoSnapshot = await getDocs(info);
    const myInfoData = myInfoSnapshot.docs.map((doc) => doc.data());
    return myInfoData[0] as MyInfo;
  }
}

export default Firebase;
