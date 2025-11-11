// View All Data in MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

const viewData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const User = require('./models/User');
    const Project = require('./models/Project');
    const Achievement = require('./models/Achievement');
    
    console.log('\n========================================');
    console.log('📊 MONGODB DATABASE CONTENTS');
    console.log('========================================\n');
    
    // Users
    const users = await User.find();
    console.log('👤 USERS (' + users.length + '):');
    users.forEach((user, i) => {
      console.log(`\n  [${i + 1}] Name: ${user.name}`);
      console.log(`      Branch: ${user.branch}`);
      console.log(`      Skills: ${user.skills.join(', ')}`);
      console.log(`      Bio: ${user.bio}`);
    });
    
    // Projects
    const projects = await Project.find().populate('userId', 'name');
    console.log('\n\n💼 PROJECTS (' + projects.length + '):');
    projects.forEach((project, i) => {
      console.log(`\n  [${i + 1}] Title: ${project.title}`);
      console.log(`      Category: ${project.category || 'N/A'}`);
      console.log(`      Tech Stack: ${project.techStack.join(', ')}`);
      console.log(`      Description: ${project.description.substring(0, 60)}...`);
      if (project.repoLink) console.log(`      Repo: ${project.repoLink}`);
      if (project.demoLink) console.log(`      Demo: ${project.demoLink}`);
    });
    
    // Achievements
    const achievements = await Achievement.find().populate('userId', 'name');
    console.log('\n\n🏆 ACHIEVEMENTS (' + achievements.length + '):');
    achievements.forEach((achievement, i) => {
      console.log(`\n  [${i + 1}] Title: ${achievement.title}`);
      console.log(`      Date: ${achievement.date.toDateString()}`);
      console.log(`      Category: ${achievement.category || 'N/A'}`);
      console.log(`      Description: ${achievement.description.substring(0, 60)}...`);
    });
    
    console.log('\n========================================');
    console.log('✅ Total Records: ' + (users.length + projects.length + achievements.length));
    console.log('========================================\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

viewData();
