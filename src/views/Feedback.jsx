import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/firebaseConfig';
import Footer from '../components/Footer';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const q = query(collection(firestore, 'feedback'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFeedbackData(data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-white">Feedback</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbackData.map(feedback => (
            <div key={feedback.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2">{feedback.title}</h2>
                <p className="text-gray-300">{feedback.message}</p>
              </div>
              <div className="bg-gray-700 px-6 py-3">
                <p className="text-gray-400">Submitted by: {feedback.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Feedback;
