import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProfileHeader from './components/ProfileHeader';
import PortfolioGrid from './components/PortfolioGrid';
import AchievementModal from './components/AchievementModal';

function App() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterTech, setFilterTech] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    fetchUser();
    fetchProjects();
    fetchAchievements();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      if (data.length > 0) {
        setUser(data[0]); // Get first user for demo
      } else {
        // Create default user if none exists
        const defaultUser = {
          name: 'John Doe',
          branch: 'Computer Science',
          bio: 'Passionate developer and problem solver',
          skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'Python'],
          profilePic: 'https://via.placeholder.com/150'
        };
        const createResponse = await fetch('/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(defaultUser)
        });
        const createdUser = await createResponse.json();
        setUser(createdUser);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements');
      const data = await response.json();
      setAchievements(data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    }
  };

  const handleUpdateUser = async (updatedUser) => {
    try {
      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleAddProject = async (project) => {
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...project, userId: user._id })
      });
      const data = await response.json();
      setProjects([data, ...projects]);
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleUpdateProject = async (id, updatedProject) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProject)
      });
      const data = await response.json();
      setProjects(projects.map(p => p._id === id ? data : p));
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const handleAddAchievement = async (achievement) => {
    try {
      const response = await fetch('/api/achievements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...achievement, userId: user._id })
      });
      const data = await response.json();
      setAchievements([data, ...achievements]);
    } catch (error) {
      console.error('Error adding achievement:', error);
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
      setAchievements(achievements.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting achievement:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    const categoryMatch = filterCategory === 'all' || project.category === filterCategory;
    const techMatch = filterTech === 'all' || (project.techStack && project.techStack.includes(filterTech));
    return categoryMatch && techMatch;
  });

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <Header />
      {user && (
        <>
          <ProfileHeader 
            user={user} 
            onUpdateUser={handleUpdateUser}
          />
          <PortfolioGrid
            projects={filteredProjects}
            achievements={achievements}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
            onAddAchievement={handleAddAchievement}
            onDeleteAchievement={handleDeleteAchievement}
            onViewAchievement={setSelectedAchievement}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            filterTech={filterTech}
            setFilterTech={setFilterTech}
            allProjects={projects}
          />
          {selectedAchievement && (
            <AchievementModal
              achievement={selectedAchievement}
              onClose={() => setSelectedAchievement(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
