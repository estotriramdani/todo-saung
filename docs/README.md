# Todo Saung - Comprehensive Documentation

## Project Overview

**Todo Saung** is a full-stack web application built with Node.js and Express.js that provides a comprehensive todo management system. The application allows users to create, read, update, and delete todos with user authentication and categorization features.

## Architecture

### Technology Stack
- **Backend Framework**: Express.js v5.1.0
- **Database**: MySQL (using mysql2 v3.14.2)
- **Runtime**: Node.js
- **Development Tool**: Nodemon v3.1.10
- **Frontend**: Vanilla HTML, CSS (Bootstrap 5.3.8), JavaScript

### Project Structure
```
todo-saung/
├── client/                 # API testing files (HTTP requests)
├── config/                 # Database configuration
├── docs/                   # Documentation (this directory)
├── models/                 # Database models and ORM layer
├── public/                 # Static assets (CSS, JS, images)
├── quizzes/               # Quiz files
├── routes/                # Express route handlers
├── sql/                   # Database schema and migrations
├── views/                 # HTML templates
├── index.js               # Main application entry point
├── package.json           # Dependencies and scripts
└── coba-database.js       # Database testing utility
```

## Database Design

### Tables Structure

#### 1. Users Table
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    nickname VARCHAR(256) NOT NULL,
    password VARCHAR(256) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `name`: Full name of the user
- `nickname`: Display name/username
- `password`: User password (stored as plain text - **Security Issue**)
- `created_at`: Account creation timestamp

#### 2. Todos Table
```sql
CREATE TABLE todos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(256) NOT NULL,
    description TEXT,
    is_completed BOOLEAN DEFAULT FALSE,
    due_date TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);
```

**Fields:**
- `id`: Primary key, auto-incrementing
- `user_id`: Foreign key referencing users table
- `title`: Todo title/name
- `description`: Detailed description (optional)
- `is_completed`: Boolean flag for completion status
- `due_date`: Target completion date
- `created_at`: Creation timestamp
- `updated_at`: Last modification timestamp

**Relationships:**
- One-to-Many: Users → Todos (one user can have multiple todos)
- Cascade delete: When a user is deleted, all their todos are also deleted

### Database Configuration

The application connects to a remote MySQL database hosted on `sql.freedb.tech`:

```javascript
const DB_HOST = 'sql.freedb.tech';
const DB_USER = 'freedb_saung_esto';
const DB_PASSWORD = '*?ZYMGC27n2W*53';
const DB_NAME = 'freedb_todo_saung_esto';
const DB_PORT = 3306;
```

**Connection Management:**
- Uses `mysql2/promise` for async/await support
- Each database operation creates a new connection
- Connections are properly closed after operations
- Error handling with try-catch blocks

## Application Architecture

### Model-View-Controller (MVC) Pattern

#### Models Layer (`/models/`)

**1. Database Connection (`models/index.js`)**
- Centralized database connection management
- Connection pooling and error handling
- Exports `connectToDb()` function for other modules

**2. User Model (`models/user.model.js`)**
```javascript
class UserModel {
  async getUsers()                    // Get all users
  async getUserById(id)               // Get user by ID
  async createUser(userData)          // Create new user
  async updateUser(id, userData)      // Update existing user
  async deleteUser(id)                // Delete user
}
```

**3. Todo Model (`models/todo.model.js`)**
```javascript
class TodoModel {
  async getTodos()                    // Get all todos with user info
  async getTodoById(id)               // Get specific todo
  async getTodosByUserId(userId)      // Get todos for specific user
  async createTodo(todoData)          // Create new todo
  async updateTodo(id, todoData)      // Update existing todo
  async deleteTodo(id)                // Delete todo
  async markTodoAsCompleted(id)       // Mark todo as completed
  async markTodoAsIncomplete(id)      // Mark todo as incomplete
}
```

#### Routes Layer (`/routes/`)

**1. User Routes (`routes/users.js`)**
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

**2. Todo Routes (`routes/todos.js`)**
- `GET /api/todos` - List all todos
- `GET /api/todos/:id` - Get specific todo
- `GET /api/todos/user/:userId` - Get todos by user
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/complete` - Mark as completed
- `PATCH /api/todos/:id/incomplete` - Mark as incomplete
- `DELETE /api/todos/:id` - Delete todo

#### View Layer (`/views/` and `/public/`)

**Frontend Structure:**
- `views/todos/index.html` - Main todo list interface
- `public/todos.js` - Client-side JavaScript (currently empty)
- Bootstrap 5.3.8 for responsive UI design

### Main Application (`index.js`)

**Key Features:**
1. **Express Setup**: JSON parsing, static file serving
2. **Route Registration**: API routes for users and todos
3. **Category Endpoints**: Direct category management
4. **Frontend Serving**: HTML page serving for `/todos`
5. **Server Configuration**: Runs on port 5000

## API Documentation

### Authentication
Currently, the application **does not implement authentication**. All endpoints are publicly accessible.

### Users API

#### GET /api/users
**Description**: Retrieve all users
**Response**: Array of user objects
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "nickname": "johndoe",
    "password": "password123",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
]
```

#### GET /api/users/:id
**Description**: Retrieve specific user by ID
**Parameters**: `id` (integer) - User ID
**Response**: Array containing user object

#### POST /api/users
**Description**: Create new user
**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "nickname": "johndoe",
  "password": "password123"
}
```
**Response**: MySQL insert result object

#### PUT /api/users/:id
**Description**: Update existing user
**Parameters**: `id` (integer) - User ID
**Request Body**: Partial user object with fields to update
**Response**: 
```json
{
  "success": true
}
```

#### DELETE /api/users/:id
**Description**: Delete user
**Parameters**: `id` (integer) - User ID
**Response**: 
```json
{
  "success": true
}
```

### Todos API

#### GET /api/todos
**Description**: Retrieve all todos with user information
**Response**: Array of todo objects with joined user data
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Complete project",
    "description": "Finish the todo application",
    "is_completed": false,
    "due_date": "2025-12-31T00:00:00.000Z",
    "created_at": "2025-01-01T00:00:00.000Z",
    "updated_at": "2025-01-01T00:00:00.000Z",
    "user_name": "John Doe",
    "user_nickname": "johndoe"
  }
]
```

#### GET /api/todos/:id
**Description**: Retrieve specific todo by ID
**Parameters**: `id` (integer) - Todo ID
**Response**: Single todo object or 404 error

#### GET /api/todos/user/:userId
**Description**: Retrieve all todos for specific user
**Parameters**: `userId` (integer) - User ID
**Response**: Array of todo objects for the user

#### POST /api/todos
**Description**: Create new todo
**Request Body**:
```json
{
  "user_id": 1,
  "title": "New Todo",
  "description": "Description of the todo",
  "due_date": "2025-12-31"
}
```
**Validation**: `user_id`, `title`, and `due_date` are required
**Response**: 
```json
{
  "success": true,
  "insertId": 5,
  "message": "Todo created successfully"
}
```

#### PUT /api/todos/:id
**Description**: Update existing todo
**Parameters**: `id` (integer) - Todo ID
**Request Body**: Partial todo object with fields to update
**Response**: 
```json
{
  "success": true,
  "message": "Todo updated successfully"
}
```

#### PATCH /api/todos/:id/complete
**Description**: Mark todo as completed
**Parameters**: `id` (integer) - Todo ID
**Response**: 
```json
{
  "success": true,
  "message": "Todo marked as completed"
}
```

#### PATCH /api/todos/:id/incomplete
**Description**: Mark todo as incomplete
**Parameters**: `id` (integer) - Todo ID
**Response**: 
```json
{
  "success": true,
  "message": "Todo marked as incomplete"
}
```

#### DELETE /api/todos/:id
**Description**: Delete todo
**Parameters**: `id` (integer) - Todo ID
**Response**: 
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

### Categories API

#### GET /api/categories
**Description**: Retrieve all categories
**Response**: Array of category objects

#### GET /api/categories/:id
**Description**: Retrieve specific category by ID
**Parameters**: `id` (integer) - Category ID
**Response**: Array containing category object

## Frontend Implementation

### User Interface

The frontend is a single-page application located at `/todos` that displays a Bootstrap-styled table of todos.

**Features:**
1. **Todo List Display**: Shows todos in a responsive table
2. **User Information**: Displays user names and nicknames
3. **Action Buttons**: Edit and Delete functionality
4. **Real-time Updates**: Fetches data from API on page load
5. **Delete Confirmation**: Confirms before deleting todos

**JavaScript Functionality:**
```javascript
// Main functions in views/todos/index.html
function getTodos()        // Fetch and display todos
function deleteTodo(id)    // Delete todo with confirmation
```

**Current Limitations:**
- No create/edit forms implemented
- Edit button is non-functional
- No user authentication/session management
- Static category handling

## Security Considerations

### Current Security Issues

1. **Password Storage**: Passwords are stored in plain text
   - **Risk**: High - Complete account compromise
   - **Recommendation**: Implement bcrypt hashing

2. **SQL Injection**: Some queries use string concatenation
   - **Risk**: Medium - Found in category endpoints
   - **Recommendation**: Use parameterized queries everywhere

3. **No Authentication**: All endpoints are public
   - **Risk**: High - Unauthorized access to all data
   - **Recommendation**: Implement JWT or session-based auth

4. **Database Credentials**: Hardcoded in config
   - **Risk**: Medium - Credentials exposed in code
   - **Recommendation**: Use environment variables

5. **No Input Validation**: Limited server-side validation
   - **Risk**: Medium - Data integrity issues
   - **Recommendation**: Implement comprehensive validation

6. **CORS**: No CORS configuration
   - **Risk**: Low - Potential cross-origin issues
   - **Recommendation**: Configure appropriate CORS policy

## Development Workflow

### Running the Application

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Uses nodemon for auto-reloading
   - Server runs on http://localhost:5000

3. **Database Setup**:
   - Database is already configured on remote server
   - Schema is defined in `sql/2025-07-27.sql`

### Testing

**API Testing**: Use `.http` files in `/client/` directory:
- `client/users.http` - User endpoint tests
- `client/todos.http` - Todo endpoint tests
- `client/categories.http` - Category endpoint tests

**Database Testing**: Use `coba-database.js` for database connection testing

### Code Organization

**Best Practices Implemented:**
1. **Separation of Concerns**: Models, routes, and views are separated
2. **Modular Architecture**: Each model/route is in its own file
3. **Consistent Naming**: Clear, descriptive function and variable names
4. **Error Handling**: Try-catch blocks in route handlers
5. **Connection Management**: Proper database connection cleanup

**Areas for Improvement:**
1. **Environment Configuration**: Use .env files
2. **Logging**: Implement structured logging
3. **Testing**: Add unit and integration tests
4. **Documentation**: Add JSDoc comments
5. **Validation**: Implement request validation middleware

## Performance Considerations

### Current Performance Characteristics

**Database Operations:**
- Creates new connection for each operation
- No connection pooling implemented
- Proper connection cleanup after operations

**Query Optimization:**
- Uses JOINs for related data (todos with user info)
- Indexes on primary keys (auto-generated)
- No additional indexes for common queries

**Frontend Performance:**
- Single-page application with minimal JavaScript
- Bootstrap CDN for styling
- No client-side caching implemented

### Recommended Optimizations

1. **Database Connection Pooling**: Implement connection pooling
2. **Caching**: Add Redis or in-memory caching for frequently accessed data
3. **Pagination**: Implement pagination for large todo lists
4. **Indexes**: Add indexes on commonly queried fields (user_id, due_date)
5. **Compression**: Enable gzip compression for responses
6. **Static Asset Optimization**: Implement asset minification and caching

## Conclusion

Todo Saung is a well-structured todo management application that demonstrates solid understanding of Express.js, MySQL integration, and MVC architecture patterns. While functional, it requires security enhancements and additional features to be production-ready. The codebase provides a strong foundation for further development and feature expansion.