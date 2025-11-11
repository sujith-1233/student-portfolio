import React from 'react';
import './SkillTag.css';

function SkillTag({ skill, editable, onRemove }) {
  return (
    <span className="skill-tag">
      {skill}
      {editable && (
        <button 
          onClick={onRemove} 
          className="remove-skill"
          aria-label="Remove skill"
        >
          ×
        </button>
      )}
    </span>
  );
}

export default SkillTag;
