# The Grand Pursuit

**Creator:** Alana Henden  
**Project:** Spring 2026 Computer Science Capstone  
**Institution:** California State University, Monterey Bay

---

## Project Overview

**The Grand Pursuit** is a full-stack web application adaptation of a strategy game originally played in-person at a summer camp in Wisconsin. The project recreates the game as an interactive browser-based experience, allowing players to simulate territorial expansion, strategic competition, and turn-based gameplay in a digital environment.

Players compete as historical French voyager trading teams, claiming connected portages across a map, protecting territory, stealing from opponents under specific rules, and advancing through rounds while tracking score.

This project was designed as both a technical capstone and a portfolio demonstration of cloud-based full-stack development.

---

## Technical Purpose

This project showcases practical application of cloud computing and web development skills developed through two certification pathways:

### Frontend (Microsoft Certified: Azure Fundamentals)
Frontend hosting and deployment demonstrate concepts learned through Microsoft Azure certification coursework, including:

- Static web application hosting
- Cloud deployment workflows
- GitHub integration / CI/CD deployment
- Production frontend hosting practices

### Backend (AWS Certified Developer--Associate)
Backend infrastructure demonstrates AWS cloud development skills, including:

- AWS Lambda serverless functions
- API Gateway REST API configuration
- DynamoDB persistent storage
- IAM permissions and cloud resource management
- SAM (Serverless Application Model) deployment workflows
- Cross-service backend architecture

---

## Architecture

Frontend:
- React
- Vite
- Azure Static Web Apps

Backend:
- AWS API Gateway
- AWS Lambda
- Amazon DynamoDB
- AWS SAM

Version Control / Deployment:
- GitHub
- GitHub Actions (Azure deployment integration)

---

## Core Features

- Turn-based strategy gameplay
- Territory claiming (Discover)
- Opponent territory capture (Steal)
- Protected territory saving (Save)
- Score tracking
- Persistent game state storage
- Reset game functionality
- Cloud-hosted frontend + backend integration

---

## Game Summary

Players represent competing voyager teams attempting to control the most valuable trade routes across the map.

Gameplay includes:

- **Discover:** Claim unowned connected territory
- **Steal:** Capture eligible territory from opponents
- **Save:** Protect owned territory from future theft
- **Rounds:** Progress turn-by-turn with state persistence
- **Scoring:** Earn points through territorial control and strategic protection

The game emphasizes strategic expansion, resource control, and competitive decision-making.

---

## Future Development Plans

Planned future improvements include:

- Multiplayer support
- User authentication / player accounts
- Expanded scoring mechanics
- Improved game rule enforcement on backend
- Shared game sessions / lobby system
- Better UI/UX polish and animations
- Mobile responsiveness
- Game history / analytics
- Expanded map and gameplay features

---

## Author Note

This capstone project was developed to demonstrate full-stack cloud engineering skills across multiple cloud platforms, combining frontend deployment with Microsoft Azure and backend infrastructure with Amazon Web Services in a single integrated application.
