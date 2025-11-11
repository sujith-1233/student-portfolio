# Student Portfolio Platform

A comprehensive web platform where students can showcase their academic project achievements, skills, and accomplishments.

## Features

### Frontend (React)
- **Profile Management**: Edit profile with name, branch, bio, skills, and profile picture
- **Project Showcase**: Display projects with images, descriptions, tech stack, and links
- **Achievement Gallery**: Showcase achievements with modal previews
- **Filtering System**: Filter projects by category and tech stack
- **Dynamic Forms**: Add/edit portfolio items dynamically
- **Image Uploads**: Upload images for profile, projects, and achievements
- **Responsive Design**: Mobile-friendly interface with modern UI

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for all resources
- **MongoDB Collections**:
  - Users: name, branch, bio, skills, profilePic
  - Projects: userId, title, description, techStack, repoLink, demoLink, category, imageUrl
  - Achievements: userId, title, date, description, category, imageUrl
- **Filtering**: API support for filtering by userId, category, and techStack

## Technology Stack

### Frontend
- React 18
- CSS3 with responsive design
- Fetch API for HTTP requests
- React Hooks (useState, useEffect)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS enabled
- RESTful API architecture

## Project Structure

```
student-portfolio/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Achievement.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── projects.js
│   │   └── achievements.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProfileHeader.js
│   │   │   ├── ProjectCard.js
│   │   │   ├── SkillTag.js
│   │   │   ├── AchievementModal.js
│   │   │   ├── PortfolioGrid.js
│   │   │   └── [CSS files]
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/student-portfolio
NODE_ENV=development
```

4. Start MongoDB service (if using local MongoDB):
```bash
mongod
```

5. Start the backend server:
```bash
npm start
```
Or for development with auto-reload:
```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Projects
- `GET /api/projects` - Get all projects (supports filtering)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

Query parameters for filtering:
- `userId` - Filter by user
- `category` - Filter by category
- `techStack` - Filter by technology

### Achievements
- `GET /api/achievements` - Get all achievements
- `GET /api/achievements/:id` - Get achievement by ID
- `POST /api/achievements` - Create new achievement
- `PUT /api/achievements/:id` - Update achievement
- `DELETE /api/achievements/:id` - Delete achievement

Query parameters:
- `userId` - Filter by user

## React Components

### ProfileHeader
- Displays user profile information
- Edit mode for updating profile
- Image upload for profile picture
- Skills management with add/remove functionality

### ProjectCard
- Displays individual project details
- Edit mode for updating projects
- Tech stack tags
- Links to repository and live demo

### SkillTag
- Reusable tag component for skills and technologies
- Optional remove functionality in edit mode

### AchievementModal
- Modal popup for detailed achievement view
- Full-screen image display
- Formatted date display

### PortfolioGrid
- Main container for projects and achievements
- Filter controls for category and tech stack
- Forms for adding new items
- Grid layout for responsive display

## Features in Detail

### Dynamic Editing
- Edit profile, projects, and achievements inline
- Image uploads with preview
- Add/remove skills and tech stack tags

### Filtering
- Filter projects by category
- Filter projects by technology
- Real-time filtering updates

### Responsive Design
- Mobile-first approach
- Breakpoints at 480px, 768px, and 1024px
- Flexible grid layouts
- Touch-friendly interfaces

## Usage

1. **Profile Setup**: Edit your profile to add name, branch, bio, skills, and profile picture
2. **Add Projects**: Click "Add Project" to create new portfolio items with images, descriptions, and tech stack
3. **Add Achievements**: Click "Add Achievement" to showcase your accomplishments
4. **Filter**: Use the filter dropdowns to view projects by category or technology
5. **Edit/Delete**: Each item has edit and delete options for management

## Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

## Future Enhancements
- User authentication and authorization
- File upload to cloud storage (AWS S3, Cloudinary)
- Search functionality
- Export portfolio as PDF
- Social sharing features
- Comments and likes system
- Analytics dashboard

## License
MIT

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Author
Student Portfolio Platform Team
