# Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Install MongoDB
If you don't have MongoDB installed, you can:
- **Option A**: Install locally from [mongodb.com](https://www.mongodb.com/try/download/community)
- **Option B**: Use MongoDB Atlas (cloud) - create a free account at [mongodb.com/atlas](https://www.mongodb.com/atlas)

### Step 2: Start Backend

Open a terminal and run:

```bash
cd backend
npm install
npm start
```

You should see:
```
MongoDB Connected: localhost
Server is running on port 5000
```

### Step 3: Start Frontend

Open a **new terminal** and run:

```bash
cd frontend
npm install
npm start
```

The browser will automatically open at `http://localhost:3000`

### Step 4: Explore the Platform

1. The app will create a default user profile
2. Click **"Edit Profile"** to customize your information
3. Click **"Add Project"** to showcase your work
4. Click **"Add Achievement"** to highlight your accomplishments
5. Use the filters to organize your projects

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running. Start it with `mongod` command.

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change the PORT in `backend/.env` file to another port like 5001.

### Backend API Not Found
```
Error: Failed to fetch
```
**Solution**: Make sure the backend server is running on port 5000 before starting the frontend.

## What's Included

✅ Complete CRUD operations for Users, Projects, and Achievements  
✅ Image upload functionality (base64 encoding)  
✅ Responsive design for mobile and desktop  
✅ Filter projects by category and tech stack  
✅ Modal previews for achievements  
✅ Inline editing for all content  

## Next Steps

- Customize the styling in the CSS files
- Add authentication (JWT tokens)
- Deploy to cloud platforms (Heroku, Vercel, Netlify)
- Integrate cloud storage for images (AWS S3, Cloudinary)
- Add more features like search and analytics

## Need Help?

Check the main README.md for detailed documentation and API endpoints.
