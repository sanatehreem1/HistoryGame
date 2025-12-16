# The Haunted Manor 
**Project Alpha – Week 5**

An elimination-based, mystery-driven educational history game designed to improve engagement and knowledge retention in non-STEM subjects.


## Project Overview

**The Haunted Manor** is a web-based educational game created for the Hive group of secondary schools.  
The game places students in a mystery narrative where a restless spirit haunts Henry VIII’s court, and players must use historical reasoning, clues, and deduction to uncover which of Henry VIII’s wives has returned from the grave.

The project prioritises **student enjoyment**, **active learning**, and **knowledge retention**, while remaining practical for classroom use within limited lesson time.

---

## Problem Statement

The Hive group of secondary schools has identified a decline in student engagement and enjoyment in non-STEM subjects. Feedback from students, parents, and teachers highlights:

- Repetitive lesson formats
- Over-reliance on textbook learning
- Difficulty retaining large volumes of content
- Reduced enjoyment of learning

The Hive Foundation requested a solution that:
- Places enjoyment at the centre of learning
- Encourages critical thinking
- Improves recall and engagement in non-STEM subjects

---

## Our Solution

We designed a **short, narrative-driven history game** that:

- Uses **mystery and elimination mechanics**
- Encourages **deductive reasoning**, not rote memorisation
- Allows optional access to **historical fact files** for learning support
- Can be completed in **under 10 minutes**, making it classroom-friendly

Students progress through riddles and multiple-choice questions, eliminating suspects until only one historical figure remains.

---

## Target Users

- **Students (Primary users)** – engaging, interactive learning experience
- **Teachers** – curriculum-aligned, time-efficient resource
- **Parents** – increased enjoyment and confidence in learning
- **Hive Group (School Management)** – scalable, measurable engagement solution

---

## Gameplay Summary

1. Student logs in
2. Intro narrative sets the mystery
3. Player progresses through **8 riddle rounds**
4. Each round includes:
   - A mysterious clue
   - A multiple-choice historical question
5. Incorrect suspects are eliminated
6. Fact files are available at any time via the navigation bar
7. Player makes a final accusation
8. The ghost is revealed with historical explanation

---

## Architecture Overview

The project uses a **layered architecture** with clear separation of concerns:

- **Frontend:** UI rendering and user interaction
- **Backend API:** Game flow, validation, and logic orchestration
- **Game Logic Engine:** Elimination and scoring logic
- **Database:** Structured historical and game data

### Logical Data Separation
One PostgreSQL database with **three schemas**:
- `auth` – user authentication
- `game` – riddles, questions, eliminations
- `characters` – wives and fact files

---

## Project Structure

The project is organised into a **clear frontend and backend separation**, following MVC principles and RESTful API design.

### Root Structure

```txt
HistoryGame/
├── Backend/
├── Frontend/
├── .gitignore
└── README.md
```

## Backend Architecture
The backend is built using Node.js and Express, structured to ensure clear separation of concerns.
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

Backend Flow (MVC Pattern)
The backend follows a Model–Controller–Router pattern:
Client Request
 ↓
Router
 ↓
Controller
 ↓
Model
 ↓
Database

## Responsibilities
1. Routers
- Define API endpoints
-    Apply middleware (auth, logging)
2. Controllers
-    Handle request logic
-    Validate input
-    Coordinate responses
3. Models
-    Interact with the SQL database
-    Contain query logic
4. Middleware
-    Authentication
-    Request logging

## Authentication
User authentication is implemented using:
- Secure password hashing (bcrypt)
- JSON Web Tokens (JWT)
- Protected routes using custom middleware
# Authentication Flow
1. User registers or logs in
2. Server validates credentials
3. JWT token is issued
4. Token is required for protected game routes

## Database Setup

The project uses an **SQL database** to store users, game stories (riddles), and characters (wives).

### Database Files

- **`setup.sql`**
  - Creates all database tables
  - Defines relationships between entities

- **`setup.js`**
  - Runs the database setup from Node.js
  - Executes the SQL schema programmatically

- **`connection.js`**
  - Handles database connection pooling
  - Manages communication between the backend and the database

### Logical Data Separation

Although the project uses a **single database**, data is logically separated into the following domains:

- **Users**
  - Authentication and authorisation data

- **Stories**
  - Riddles, clues, and multiple-choice questions

- **Characters**
  - Henry VIII’s wives and their associated fact files

This approach ensures **maintainability and clarity** while keeping deployment simple and reliable.

---

## Game Content Structure

### Characters (Wives)

Each character includes:
- Name
- Historical fate
- Fact file content

Characters are used for:
- Navigation dropdown fact files
- Elimination logic during gameplay

---

### Stories (Riddles)

Each story round contains:
- Mysterious narrative clues
- Multiple-choice questions
- Elimination rules
- Ordered progression through the game

This structure encourages **deductive reasoning** rather than simple recall.

---

## Frontend Overview

The frontend is built using **HTML, CSS, and JavaScript**, with a focus on clarity, accessibility, and student engagement.

### Key Features

- Login page
- Intro narrative page
- Navigation bar with fact file dropdown
- Riddle and question pages
- Final reveal screen

Fact files are accessible at any time to support learning **without breaking the mystery**.

---

## UX & Design Principles

- Mystery-driven narrative design
- Progressive disclosure of information
- Optional learning support via fact files
- Simple, readable UI suitable for school environments
- Designed for short classroom sessions

Wireframes were created in **Figma** before development began.

---

## Testing

- Backend endpoints tested manually and with automated tests
- Testing focuses on:
  - Authentication
  - Game progression
  - Data retrieval

Target test coverage: **60%+**

---

## Agile Process & Project Management

- Daily stand-ups
- Kanban board used to track progress
- Feature freeze enforced mid-week
- Regular retrospectives
- Clear MVP scope defined early

All documentation and planning materials are stored and maintained via **GitHub**.





