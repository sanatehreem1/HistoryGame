# Historic Hauntings 
**Project Alpha – Week 5**

An elimination-based, mystery-driven educational history game designed to improve engagement and knowledge retention in non-STEM subjects.

---

## Project Overview

**Historic Hauntings** is a full-stack web-based educational game created for the Hive group of secondary schools.

The game places students inside a mystery narrative set in Henry VIII’s court, where a restless spirit haunts the manor. Players must use historical reasoning, clues, and deduction to uncover which of Henry VIII’s wives has returned from the grave.

The project prioritises:

- **Student enjoyment**
- **Active learning**
- **Knowledge retention**
- **Short, classroom-friendly gameplay**

---

## Problem Statement

The Hive group of secondary schools identified a decline in engagement and enjoyment in non-STEM subjects.

Feedback from stakeholders highlighted:
- Repetitive lesson formats
- Over-reliance on textbook learning
- Difficulty retaining large volumes of content
- Reduced enjoyment and motivation

The Hive Foundation requested a solution that:
- Places enjoyment at the centre of learning
- Encourages critical thinking and deduction
- Improves recall in non-STEM subjects
- Fits within limited lesson time

---

## Our Solution

We designed a **short, narrative-driven educational history game** that:

- Uses **mystery and elimination mechanics**
- Encourages **deductive reasoning**, not rote memorisation
- Allows optional access to **historical fact files**
- Can be completed during lesson time.

Students eliminate suspects round by round until only one historical figure fits all the clues.

---

## Target Users

- **Students** – engaging, interactive learning experience  
- **Teachers** – curriculum-aligned, time-efficient classroom tool  
- **Parents** – improved enjoyment and confidence in learning  
- **Hive Group** – scalable, measurable engagement solution  

---

## Gameplay Summary

1. Student logs in
2. Intro narrative sets the mystery
3. Player progresses through riddles whilst also reading through factfiles
4. Player then goes on to guess who the suspect is
5. Incorrect suspects are eliminated
6. Fact files are accessible via navigation
7. Player makes a final accusation
8. The ghost is revealed with historical explanation

---

## Architecture Overview

The project uses a **layered architecture** with clear separation of concerns:

- **Frontend** – UI rendering and user interaction
- **Backend API** – validation, logic orchestration
- **Game Logic** – elimination and correctness checking
- **Database** – structured historical and user data

### Logical Data Separation

A PostgreSQL database (hosted on Supabase) stores:
- Users
- Stories (riddles)
- Characters (wives and fact files)

---

## Project Structure

### Root

```txt
HistoryGame/
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

### Backend Architecture 

```txt
Backend/
├── controller/
│   ├── characters.js
│   ├── stories.js
│   └── users.js
│
├── database/
│   ├── connection.js
│   ├── setup.js
│   └── setup.sql
│
├── middleware/
│   ├── authenticator.js
│   └── logger.js
│
├── models/
│   ├── Character.js
│   ├── Story.js
│   └── User.js
│
├── routers/
│   ├── characters.js
│   ├── stories.js
│   └── user.js
│
├── app.js
├── index.js
└── package.json
```
Backend Flow:
```txt
Client Request
     ↓
   Router
     ↓
 Controller
     ↓
    Model
     ↓
  Database
```
---
## Authentication
Authentication is implemented using:
- Secure password hashing (bcrypt)
- JSON Web Tokens (JWT)
- Protected routes via middleware
Authentication Flow:
- User registers or logs in
- Credentials are validated
- JWT token is issued
- Token is required for protected routes
- Logout clears client-side session data

## Database Setup

The project uses a **relational SQL database** to store user data, narrative content, and historical character information.

### Key Files

- **`setup.sql`**  
  Creates all database tables and defines relationships between entities.

- **`setup.js`**  
  Executes the SQL schema programmatically from the backend.

- **`connection.js`**  
  Manages pooled database connections between the backend and the database.

### Database Entities

- **Users**  
  Stores authentication credentials and user profile data.

- **Stories**  
  Contains riddle text, narrative content, and game progression data.

- **Characters**  
  Stores information about Henry VIII’s wives, including historical fact files.

---

## Frontend Overview

The frontend is built using **HTML, CSS, and JavaScript**, with a focus on clarity, accessibility, and student engagement.

### Pages

- Login / Register  
- Intro narrative page  
- Fact file pages  
- Wife picker (final guess)  
- Result feedback screens  

Fact files are accessible at any time during gameplay to support learning **without breaking narrative immersion**.

---

## UX & Design Principles

- Mystery-driven narrative design
- Progressive disclosure of information
- Optional learning support via fact files
- Clear, readable UI suitable for school environments
- Designed for short classroom sessions

Wireframes were created using **Figma** prior to development to guide layout, navigation, and user flow.

## Installation & Usage

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL / Supabase account

---

### Backend Setup

```bash
cd backend
npm install
```

### Create a .env file:
```
PORT=3000
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_secret_key
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
```
### Set up the database:
```
node database/setup.js
```
### Run the backend server:
```
npm run dev
```
### Backend runs on:
```
http://localhost:3001
```
### Frontend Setup 
```
cd Frontend
```
### Open index.html using:
- Live Server (VS Code recommended)
- OR deployed frontend URL

## 🧪 Testing

- Unit and integration tests written using **Jest**
- API endpoints tested manually using **Postman**
- Database reset scripts used to maintain test consistency
- Target test coverage: **60%+**

### Run Tests

```bash
npm test
```
## Technologies

### Frontend
- HTML5  
- CSS3  
- JavaScript (ES6+)  
- Bootstrap  
- Google Fonts  

### Backend
- Node.js  
- Express.js  
- PostgreSQL  
- Supabase  
- JWT Authentication  
- bcrypt  
- dotenv  

### Tooling & Workflow
- Git & GitHub  
- GitHub Projects (Kanban)  
- Jest  
- Postman  

---

## Architecture & Process

The project follows an **MVC architecture**:

- **Models** – Database queries and business logic  
- **Controllers** – Request handling and validation  
- **Routers** – API endpoint definitions  
- **Middleware** – Authentication and request logging  
- **Frontend** – User interface and client-side logic  

### Development Process

- Agile workflow with weekly planning  
- GitHub Projects used as a Kanban board  
- Regular stand-ups and retrospectives  
- Feature-driven commits with version control  

---

## Planning & Design

- Stakeholder and problem analysis  
- User journey mapping  
- Wireframes for all main pages  
- Database schema (ERD)  
- High-level system architecture diagram  

These artefacts informed both UX and technical decisions throughout development.

---

## Screenshots

*(Screenshots of the homepage, factfile, and gameplay screens can be added here)*

---

## Wins & Challenges

### Wins
- Successfully implemented a full authentication flow  
- Clean separation of concerns using MVC architecture  
- Dynamic content loading from the database  
- Smooth frontend ↔ backend integration  
- Strong narrative-driven user experience  

## Challenges

- Transitioning from index-based logic to database IDs  
- JWT token handling across frontend routes  
- Ensuring consistency between deployed and local environments  
- Balancing scope within a one-week timeframe  

Each challenge was addressed through debugging, refactoring, and iterative testing.

---

## Known Bugs / Limitations

- No password reset functionality  
- Limited accessibility testing  
- Score persistence not yet implemented  

---

## Future Features

- Multiple stories and difficulty levels  
- User progress tracking and scoring  
- Teacher dashboard for classroom use  
- Accessibility improvements  
- Mobile-first redesign  
- Multiplayer or collaborative modes  

---

## Contribution Guide

This project was developed as part of a one-week educational sprint.

Future contributions could include:
- UI/UX improvements  
- Additional historical content  
- Expanded test coverage  

---

## What We Learned

- How to design and deliver a full-stack application under time constraints  
- Practical application of MVC architecture  
- Importance of aligning frontend logic with backend data models  
- Agile project management and team collaboration  
- Communicating technical decisions clearly to non-technical stakeholders  

---

## Meet the Team

*(Add team member names and roles here)*

---

## License

This project was created for educational purposes as part of the **Week 5 – Project Alpha** curriculum.




