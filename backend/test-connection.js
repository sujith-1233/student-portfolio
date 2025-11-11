// Test MongoDB Connection and Add Sample Data
require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB Connected Successfully!');
    
    // Show database info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log('\n📊 Database:', db.databaseName);
    console.log('\n📁 Collections:');
    
    for (const collection of collections) {
      const count = await db.collection(collection.name).countDocuments();
      console.log(`  - ${collection.name}: ${count} documents`);
    }
    
    // Show sample data from each collection
    console.log('\n📝 Sample Data:');
    
    const User = require('./models/User');
    const Project = require('./models/Project');
    const Achievement = require('./models/Achievement');
    
    const users = await User.find().limit(1);
    const projects = await Project.find().limit(1);
    const achievements = await Achievement.find().limit(1);
    
    console.log('\nUsers:', users.length > 0 ? 'Data exists ✓' : 'No data yet');
    console.log('Projects:', projects.length > 0 ? 'Data exists ✓' : 'No data yet');
    console.log('Achievements:', achievements.length > 0 ? 'Data exists ✓' : 'No data yet');
    
    console.log('\n✅ Test Complete!');
    console.log('\n💡 To view data in MongoDB Compass:');
    console.log('   1. Open MongoDB Compass');
    console.log('   2. Connect to: mongodb://localhost:27017');
    console.log('   3. Select database: student-portfolio');
    console.log('   4. Browse collections: users, projects, achievements');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n⚠️  Make sure MongoDB is running!');
    console.log('   Start MongoDB with: mongod');
    process.exit(1);
  }
};

testConnection();
