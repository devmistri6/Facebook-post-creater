import React, { useState } from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import Confetti from './components/Confetti';
import Header from './components/Header';
import Notification from './components/Notification';
import PostForm from './components/PostForm';
import './App.css';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [confetti, setConfetti] = useState([]);

  const createConfetti = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
    const newConfetti = [];
    
    for (let i = 0; i < 100; i++) {
      newConfetti.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
        duration: Math.random() * 3 + 2
      });
    }
    
    setConfetti(newConfetti);
    setTimeout(() => setConfetti([]), 5000);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    if (type === 'success') {
      createConfetti();
    }
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  const handleSubmit = async ({ imageFile, title, description }) => {
    if (!imageFile) {
      showNotification('❌ Please upload an image first.', 'error');
      return false;
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('title', title);
    formData.append('description', description);

    setIsSubmitting(true);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/post-to-facebook', {
        method: 'POST',
        body: formData
      });

      let result = {};
      try {
        result = await response.json();
      } catch (e) {}

      if (response.ok && result.success) {
        showNotification('🎊 Successfully Posted to Facebook! 🎊', 'success');
        return true;
      } else {
        showNotification(`❌ ${result.error || 'Unexpected error occurred'}`, 'error');
        return false;
      }
    } catch (error) {
      showNotification('❌ Network error. Please check your connection and try again.', 'error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <BackgroundAnimation />
      <Confetti confetti={confetti} />
      <Notification notification={notification} />

      <div className="app-content">
        <Header />
        <PostForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}

export default App;