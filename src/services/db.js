import { collection, addDoc, getDocs, query, where, updateDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { db as firestore } from '../firebase';

// Helper to prevent infinite hangs when Firestore Database isn't created in the console
const withTimeout = (promise, ms = 8000) => {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Firestore timeout: Have you clicked 'Create Database' in the Firebase Console yet?")), ms))
    ]);
};

// Real Firebase Database Service
const db = {
    portfolios: {
        // Fetch all portfolios for a user
        getAll: async (userId) => {
            if (!userId) return [];
            try {
                const q = query(collection(firestore, "portfolios"), where("userId", "==", userId));
                const querySnapshot = await withTimeout(getDocs(q));
                const ports = [];
                querySnapshot.forEach((doc) => {
                    ports.push({ id: doc.id, ...doc.data() });
                });
                // If empty, create a default one for the user
                if (ports.length === 0) {
                    const defaultPort = { name: 'Main Portfolio', balance: 0, currency: 'USD', userId };
                    const docRef = await withTimeout(addDoc(collection(firestore, "portfolios"), defaultPort));
                    ports.push({ id: docRef.id, ...defaultPort });
                }
                return ports;
            } catch (error) {
                console.error(error);
                throw error; // Re-throw to be caught by component
            }
        }
    },

    transactions: {
        getAll: async (portfolioId) => {
            if (!portfolioId) return [];
            const q = query(collection(firestore, "transactions"), where("portfolioId", "==", portfolioId));
            const querySnapshot = await withTimeout(getDocs(q));
            const txns = [];
            querySnapshot.forEach((doc) => {
                txns.push({ id: doc.id, ...doc.data() });
            });
            return txns;
        },
        
        add: async (transaction) => {
            // Add transaction document
            const docRef = await withTimeout(addDoc(collection(firestore, "transactions"), transaction));
            
            // Update portfolio metadata
            const portRef = doc(firestore, "portfolios", transaction.portfolioId);
            const portSnap = await withTimeout(getDoc(portRef));
            if (portSnap.exists()) {
                const currentBalance = portSnap.data().balance || 0;
                const valueDelta = transaction.shares * transaction.price;
                const newBalance = transaction.type === 'buy' ? currentBalance - valueDelta : currentBalance + valueDelta;
                
                await withTimeout(updateDoc(portRef, { balance: newBalance }));
            }
            
            return { id: docRef.id, ...transaction };
        }
    }
};

export default db;
