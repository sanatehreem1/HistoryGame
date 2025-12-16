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

```txt
the-ghost-of-henry-viii/
├── backend/
│   ├── src/
│   │   ├── api/
│
