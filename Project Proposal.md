# Project Proposal – Project Management REST API

## 1. Project Concept
The Project Management REST API is a backend application that allows users to organize work using Projects, Tasks, and Comments. It provides core operations such as creating projects, assigning tasks, and commenting on different items to support collaboration and productivity. The system also includes authentication, authorization, validation, and structured routing using a layered architecture.

## 2. Purpose of the API
- To manage multiple **projects** for different users.
- To maintain **tasks** under each project.
- To add **comments** on projects or tasks for team communication.
- To offer a secure, role-based backend that can be used by any frontend or mobile app.

## 3. Main Resources
The API contains **three core resources** :
1. **Projects**
2. **Tasks**
3. **Comments**

Each resource supports CRUD operations following RESTful principles.

## 4. Planned Functionality
### Projects
- Create a project
- View a project
- List all projects
- Update project details
- Delete (admin-only)

### Tasks
- Create a task under a project
- View task details
- List tasks by project
- Update task
- Delete task

### Comments
- Add comments to a project or task
- List comments for a project or task
- Delete comment

### Authentication
- Firebase Authentication for login/signup
- Role-based access control using Firebase Custom Claims  
  - Admins can delete  
  - Regular users can only access their own data

### Additional Planned Features
- Input validation using Joi
- Swagger documentation for all endpoints
- Rate limiting for basic security
- File upload for task attachments (Milestone 3)
- Pagination and caching (Milestone 3)

## 5. Database Structure (Firestore)
Collections:
- `projects`
  - id, name, description, ownerId, timestamps
- `tasks`
  - id, projectId, title, description, assigneeId, status, timestamps
- `comments`
  - id, resourceType, resourceId, authorId, text, timestamps

Some are obviously not required

All collections follow normalized structure for easy scaling.

## 6. Alignment With Course Content
This project uses all technologies and methods required by the course:
- Node.js + TypeScript + Express
- Layered Architecture (routes => controllers => services => repositories)
- Firebase Authentication + Firestore database
- Joi Validation
- Swagger Documentation
- Jest Unit Testing
- GitHub Project Board + Git workflow (main, development, feature branches)
- Error handling middleware
- Security using helmet, CORS
- Rate limiting (Milestone 2 requirement: New Component)

Optional advanced features (Milestone 3):
- Multer File Uploads
- Caching
- Pagination

## 7. Scope of Milestone Work
### Milestone 1
- Initial project setup
- CRUD for Projects
- Swagger documentation
- Unit tests with ≥65% coverage
- GitHub issues + branches established

### Milestone 2
- Added Tasks and Comments resources
- Added Rate Limiting component
- Working MVP of the API
- Sprint demo preparation
- All tests passing

### Milestone 3 (Planned)
- File uploads (Multer)
- Caching & Pagination
- Final API documentation cleanup
- Deployment-ready structure

## 8. GitHub Workflow
- `main` => production-ready code
- `development` => collective milestone work
- `feature/*` => each resource, feature, or fix
- Issues created for every feature/task
- Commits follow convention: `feat:`, `fix:`, `chore:`

## 9. Expected Outcome
At the end of the project, we will have:
- A fully functional, secure, well-documented REST API
- Complete CRUD for all major resources
- Authentication + Authorization
- Automated testing + CI workflow
- Ready-to-deploy backend service

