import React from 'react';
import './AchievementModal.css';

function AchievementModal({ achievement, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        {achievement.imageUrl && (
          <div className="modal-image">
            <img src={achievement.imageUrl} alt={achievement.title} />
          </div>
        )}
        
        <div className="modal-body">
          <h2 className="modal-title">{achievement.title}</h2>
          <p className="modal-date">{formatDate(achievement.date)}</p>
          {achievement.category && (
            <span className="modal-category">{achievement.category}</span>
          )}
          <p className="modal-description">{achievement.description}</p>
        </div>
      </div>
    </div>
  );
}

export default AchievementModal;
