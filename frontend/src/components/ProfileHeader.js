import React, { useState } from 'react';
import './ProfileHeader.css';
import SkillTag from './SkillTag';

function ProfileHeader({ user, onUpdateUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [newSkill, setNewSkill] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    onUpdateUser(editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setEditedUser({
        ...editedUser,
        skills: [...editedUser.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser({
          ...editedUser,
          profilePic: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-header">
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-pic-container">
            <img 
              src={isEditing ? editedUser.profilePic : user.profilePic} 
              alt={user.name}
              className="profile-pic"
            />
            {isEditing && (
              <label className="upload-label">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                Change Photo
              </label>
            )}
          </div>
        </div>
        
        <div className="profile-right">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                className="edit-input name-input"
              />
              <input
                type="text"
                value={editedUser.branch}
                onChange={(e) => setEditedUser({ ...editedUser, branch: e.target.value })}
                className="edit-input branch-input"
              />
              <textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                className="edit-textarea"
                rows="3"
              />
            </>
          ) : (
            <>
              <h1 className="profile-name">{user.name}</h1>
              <p className="profile-branch">{user.branch}</p>
              <p className="profile-bio">{user.bio}</p>
            </>
          )}
          
          <div className="skills-section">
            <h3>Skills</h3>
            <div className="skills-container">
              {(isEditing ? editedUser.skills : user.skills).map((skill, index) => (
                <SkillTag 
                  key={index} 
                  skill={skill}
                  editable={isEditing}
                  onRemove={() => handleRemoveSkill(skill)}
                />
              ))}
            </div>
            
            {isEditing && (
              <div className="add-skill">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                  placeholder="Add a skill"
                  className="skill-input"
                />
                <button onClick={handleAddSkill} className="add-skill-btn">Add</button>
              </div>
            )}
          </div>
          
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn btn-save">Save</button>
                <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit} className="btn btn-edit">Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
