import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';


// Function to update user completion record
export const updateUserCompletion = async (userId, date) => {
  const db = getFirestore();
  const userCompletionRef = doc(db, 'userCompletions', userId);

  try {
    await setDoc(userCompletionRef, {
      [date]: true,
      timestamp: serverTimestamp()
    }, { merge: true });
    console.log('User completion record updated successfully');
  } catch (error) {
    console.error('Error updating user completion record:', error);
  }
};

export async function createUserCollection(userUid) {
  const userRef = firestore.collection('users').doc(userUid);
  const doc = await userRef.get();
  if (!doc.exists) {
    // Collection doesn't exist, create it
    await userRef.set({});
  }
}