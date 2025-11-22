import React from 'react';

const Notification = ({ notification }) => {
  if (!notification.show) return null;

  return (
    <div className={`notification ${notification.type}`}>
      {notification.type === 'success' && (
        <>
          <span className="notification-emoji">🎉</span>
          <span className="notification-text">{notification.message}</span>
          <span className="notification-emoji">✨</span>
        </>
      )}
      {notification.type === 'error' && (
        <span className="notification-text">{notification.message}</span>
      )}
    </div>
  );
};

export default Notification;