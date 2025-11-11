import React, { useState } from 'react';
import './ProjectCard.css';
import SkillTag from './SkillTag';

function ProjectCard({ project, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProject, setEditedProject] = useState(project);
  const [newTech, setNewTech] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProject(project);
  };

  const handleSave = () => {
    onUpdate(project._id, editedProject);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProject(project);
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      setEditedProject({
        ...editedProject,
        techStack: [...(editedProject.techStack || []), newTech.trim()]
      });
      setNewTech('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setEditedProject({
      ...editedProject,
      techStack: editedProject.techStack.filter(tech => tech !== techToRemove)
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProject({
          ...editedProject,
          imageUrl: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="project-card">
      {isEditing ? (
        <div className="project-edit-mode">
          <label className="image-upload-label">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <div className="image-preview">
              {editedProject.imageUrl ? (
                <img src={editedProject.imageUrl} alt="Preview" />
              ) : (
                <span>Upload Image</span>
              )}
            </div>
          </label>
          
          <input
            type="text"
            value={editedProject.title}
            onChange={(e) => setEditedProject({ ...editedProject, title: e.target.value })}
            className="edit-input"
            placeholder="Project Title"
          />
          
          <textarea
            value={editedProject.description}
            onChange={(e) => setEditedProject({ ...editedProject, description: e.target.value })}
            className="edit-textarea"
            placeholder="Description"
            rows="3"
          />
          
          <input
            type="text"
            value={editedProject.category || ''}
            onChange={(e) => setEditedProject({ ...editedProject, category: e.target.value })}
            className="edit-input"
            placeholder="Category"
          />
          
          <input
            type="text"
            value={editedProject.repoLink || ''}
            onChange={(e) => setEditedProject({ ...editedProject, repoLink: e.target.value })}
            className="edit-input"
            placeholder="Repository Link"
          />
          
          <input
            type="text"
            value={editedProject.demoLink || ''}
            onChange={(e) => setEditedProject({ ...editedProject, demoLink: e.target.value })}
            className="edit-input"
            placeholder="Demo Link"
          />
          
          <div className="tech-stack-edit">
            <div className="tech-tags">
              {(editedProject.techStack || []).map((tech, index) => (
                <SkillTag 
                  key={index} 
                  skill={tech}
                  editable={true}
                  onRemove={() => handleRemoveTech(tech)}
                />
              ))}
            </div>
            <div className="add-tech">
              <input
                type="text"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                placeholder="Add tech"
                className="tech-input"
              />
              <button onClick={handleAddTech} className="add-tech-btn">+</button>
            </div>
          </div>
          
          <div className="card-actions">
            <button onClick={handleSave} className="btn btn-save">Save</button>
            <button onClick={handleCancel} className="btn btn-cancel">Cancel</button>
          </div>
        </div>
      ) : (
        <>
          {project.imageUrl && (
            <div className="project-image">
              <img src={project.imageUrl} alt={project.title} />
            </div>
          )}
          
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            {project.category && (
              <span className="project-category">{project.category}</span>
            )}
            <p className="project-description">{project.description}</p>
            
            <div className="tech-stack">
              {(project.techStack || []).map((tech, index) => (
                <SkillTag key={index} skill={tech} />
              ))}
            </div>
            
            <div className="project-links">
              {project.repoLink && (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  Repository
                </a>
              )}
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="project-link">
                  Live Demo
                </a>
              )}
            </div>
            
            <div className="card-actions">
              <button onClick={handleEdit} className="btn btn-edit-small">Edit</button>
              <button onClick={() => onDelete(project._id)} className="btn btn-delete">Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectCard;
