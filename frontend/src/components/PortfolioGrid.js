import React, { useState } from 'react';
import './PortfolioGrid.css';
import ProjectCard from './ProjectCard';

function PortfolioGrid({ 
  projects, 
  achievements, 
  onAddProject, 
  onUpdateProject, 
  onDeleteProject,
  onAddAchievement,
  onDeleteAchievement,
  onViewAchievement,
  filterCategory,
  setFilterCategory,
  filterTech,
  setFilterTech,
  allProjects
}) {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showAchievementForm, setShowAchievementForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    techStack: [],
    repoLink: '',
    demoLink: '',
    imageUrl: '',
    category: ''
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    date: '',
    description: '',
    imageUrl: '',
    category: ''
  });
  const [newTech, setNewTech] = useState('');

  const categories = ['all', ...new Set(allProjects.map(p => p.category).filter(Boolean))];
  const techStacks = ['all', ...new Set(allProjects.flatMap(p => p.techStack || []))];

  const handleAddProject = () => {
    if (newProject.title && newProject.description) {
      onAddProject(newProject);
      setNewProject({
        title: '',
        description: '',
        techStack: [],
        repoLink: '',
        demoLink: '',
        imageUrl: '',
        category: ''
      });
      setShowProjectForm(false);
    }
  };

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.date && newAchievement.description) {
      onAddAchievement(newAchievement);
      setNewAchievement({
        title: '',
        date: '',
        description: '',
        imageUrl: '',
        category: ''
      });
      setShowAchievementForm(false);
    }
  };

  const handleAddTech = () => {
    if (newTech.trim()) {
      setNewProject({
        ...newProject,
        techStack: [...newProject.techStack, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setNewProject({
      ...newProject,
      techStack: newProject.techStack.filter(tech => tech !== techToRemove)
    });
  };

  const handleProjectImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject({ ...newProject, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAchievementImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewAchievement({ ...newAchievement, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="portfolio-grid-container">
      <div className="filters-section">
        <div className="filter-group">
          <label>Category:</label>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label>Tech Stack:</label>
          <select value={filterTech} onChange={(e) => setFilterTech(e.target.value)}>
            {techStacks.map(tech => (
              <option key={tech} value={tech}>{tech}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="section-header">
        <h2>Projects</h2>
        <button onClick={() => setShowProjectForm(!showProjectForm)} className="btn btn-add">
          {showProjectForm ? 'Cancel' : 'Add Project'}
        </button>
      </div>

      {showProjectForm && (
        <div className="add-form project-form">
          <h3>New Project</h3>
          
          <label className="image-upload-label">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleProjectImageUpload}
              className="file-input"
            />
            <div className="image-preview-small">
              {newProject.imageUrl ? (
                <img src={newProject.imageUrl} alt="Preview" />
              ) : (
                <span>Upload Image</span>
              )}
            </div>
          </label>
          
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            className="form-input"
          />
          
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
            className="form-textarea"
            rows="4"
          />
          
          <input
            type="text"
            placeholder="Category"
            value={newProject.category}
            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
            className="form-input"
          />
          
          <input
            type="text"
            placeholder="Repository Link"
            value={newProject.repoLink}
            onChange={(e) => setNewProject({ ...newProject, repoLink: e.target.value })}
            className="form-input"
          />
          
          <input
            type="text"
            placeholder="Demo Link"
            value={newProject.demoLink}
            onChange={(e) => setNewProject({ ...newProject, demoLink: e.target.value })}
            className="form-input"
          />
          
          <div className="tech-stack-input">
            <div className="tech-tags">
              {newProject.techStack.map((tech, index) => (
                <span key={index} className="skill-tag">
                  {tech}
                  <button onClick={() => handleRemoveTech(tech)} className="remove-skill">×</button>
                </span>
              ))}
            </div>
            <div className="add-tech-inline">
              <input
                type="text"
                placeholder="Add technology"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTech()}
                className="tech-input"
              />
              <button onClick={handleAddTech} className="add-tech-btn">+</button>
            </div>
          </div>
          
          <button onClick={handleAddProject} className="btn btn-submit">Add Project</button>
        </div>
      )}

      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard
            key={project._id}
            project={project}
            onUpdate={onUpdateProject}
            onDelete={onDeleteProject}
          />
        ))}
      </div>

      <div className="section-header">
        <h2>Achievements</h2>
        <button onClick={() => setShowAchievementForm(!showAchievementForm)} className="btn btn-add">
          {showAchievementForm ? 'Cancel' : 'Add Achievement'}
        </button>
      </div>

      {showAchievementForm && (
        <div className="add-form achievement-form">
          <h3>New Achievement</h3>
          
          <label className="image-upload-label">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleAchievementImageUpload}
              className="file-input"
            />
            <div className="image-preview-small">
              {newAchievement.imageUrl ? (
                <img src={newAchievement.imageUrl} alt="Preview" />
              ) : (
                <span>Upload Image</span>
              )}
            </div>
          </label>
          
          <input
            type="text"
            placeholder="Achievement Title"
            value={newAchievement.title}
            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
            className="form-input"
          />
          
          <input
            type="date"
            value={newAchievement.date}
            onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
            className="form-input"
          />
          
          <input
            type="text"
            placeholder="Category"
            value={newAchievement.category}
            onChange={(e) => setNewAchievement({ ...newAchievement, category: e.target.value })}
            className="form-input"
          />
          
          <textarea
            placeholder="Description"
            value={newAchievement.description}
            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
            className="form-textarea"
            rows="4"
          />
          
          <button onClick={handleAddAchievement} className="btn btn-submit">Add Achievement</button>
        </div>
      )}

      <div className="achievements-gallery">
        {achievements.map(achievement => (
          <div 
            key={achievement._id} 
            className="achievement-card"
            onClick={() => onViewAchievement(achievement)}
          >
            {achievement.imageUrl && (
              <div className="achievement-image">
                <img src={achievement.imageUrl} alt={achievement.title} />
              </div>
            )}
            <div className="achievement-content">
              <h4>{achievement.title}</h4>
              <p className="achievement-date">
                {new Date(achievement.date).toLocaleDateString()}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteAchievement(achievement._id);
                }} 
                className="btn btn-delete-small"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioGrid;
