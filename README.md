# 🏢 Employee Management & Analytics System

A full-stack web application for managing employees, departments, and viewing real-time analytics. Built with modern technologies for optimal performance and user experience.

---

## 🌟 Features

### Core Functionality
- ✅ **Employee Management** - Create, read, update, delete employee records
- ✅ **Department Management** - Organize employees by departments
- � **Real-time Analytics** - Visual dashboards with charts and metrics
- ✅ **Salary Statistics** - Average, minimum, and maximum salary tracking
- ✅ **Department Analytics** - Headcount and employee distribution by department

### Technical Features
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Role-based Access Control** - Secure endpoints with Spring Security
- ✅ **Pagination** - Efficient data loading with page-based pagination
- ✅ **Input Validation** - Server-side validation using Bean Validation
- ✅ **Global Exception Handling** - Centralized error management
- ✅ **CORS Configuration** - Secure cross-origin requests
- ✅ **Responsive Design** - Mobile-friendly UI with Bootstrap 5
- ✅ **Smooth Animations** - Modern animations and transitions
- ✅ **Beautiful Landing Page** - Animated particle background with interactive elements

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.2
- **Language:** Java 17
- **Database:** MySQL 8
- **ORM:** Hibernate/JPA
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security 6
- **Build Tool:** Maven
- **API:** RESTful Architecture

### Frontend
- **Library:** React 19
- **Routing:** React Router v6
- **UI Framework:** Bootstrap 5
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Icons:** React Icons (Feather)
- **Styling:** Custom CSS with animations
- **Package Manager:** npm

### DevOps & Tools
- **Version Control:** Git
- **IDE:** VS Code / IntelliJ IDEA

---

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Java 17+** → [Download](https://www.oracle.com/java/technologies/downloads/)
- **Node.js 18+** → [Download](https://nodejs.org/)
- **MySQL 8+** → [Download](https://www.mysql.com/)
- **Git** → [Download](https://git-scm.com/)
- **VS Code** (recommended) → [Download](https://code.visualstudio.com/)

---

## ⚙️ Installation & Setup

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd employee-management-system
```

### Step 2: Database Setup

Open MySQL and create the database:

```bash
mysql -u root -p
```

Create database and exit MySQL.

### Step 3: Backend Configuration

Navigate to the backend directory and update `src/main/resources/application.properties` with your MySQL credentials and JWT configuration.

Build the project:

```bash
./mvnw clean install
```

### Step 4: Frontend Setup

Navigate to frontend:

```bash
cd frontend
npm install
```

### Step 5: Add Test Data

Import the provided SQL file to populate sample data into your database.

---

## 🚀 Running the Application

### Terminal 1: Start Backend

```bash
cd employee-management-system
./mvnw spring-boot:run
```

Backend runs on: **http://localhost:8080**

### Terminal 2: Start Frontend

```bash
cd frontend
npm start
```

Frontend runs on: **http://localhost:3000**

### Access the Application

- **Home Page:** http://localhost:3000
- **Login Page:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard (after login)

---

## 📁 Project Structure

employee-management-system/
├── employee-management-system/          # Backend (Spring Boot)
│   ├── src/main/java/com/ems/
│   │   ├── controller/                  # REST Controllers
│   │   ├── service/                     # Business Logic
│   │   ├── repository/                  # Data Access Layer
│   │   ├── entity/                      # JPA Entities
│   │   ├── dto/                         # Data Transfer Objects
│   │   ├── exception/                   # Custom Exceptions
│   │   ├── security/                    # JWT & Security
│   │   └── config/                      # Spring Configuration
│   ├── src/main/resources/
│   │   └── application.properties       # Configuration
│   └── pom.xml                          # Maven Dependencies
│
└── frontend/                            # React Frontend
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx                 # Landing Page
│   │   ├── Login.jsx                # Authentication
│   │   ├── Dashboard.jsx            # Analytics Dashboard
│   │   ├── Employees.jsx            # Employee Management
│   │   └── Departments.jsx          # Department Management
│   ├── components/
│   │   └── Navbar.jsx               # Navigation Bar
│   ├── services/
│   │   └── api.js                   # Axios API Service
│   ├── App.js                       # Main App Component
│   ├── index.js                     # Entry Point
│   ├── index.css                    # Global Styles
│   └── pages/Home.css               # Landing Page Styles
├── package.json                     # Dependencies
└── .env                             # Environment Variables

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |

### Employees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employees?page=0&size=10` | Get all employees (paginated) |
| GET | `/api/employees/{id}` | Get employee by ID |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/{id}` | Update employee |
| DELETE | `/api/employees/{id}` | Delete employee |
| GET | `/api/employees/analytics/salary-stats` | Get salary statistics |
| GET | `/api/employees/analytics/department-summary` | Get department headcount |

### Departments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/departments` | Get all departments |
| GET | `/api/departments/{id}` | Get department by ID |
| POST | `/api/departments` | Create new department |
| PUT | `/api/departments/{id}` | Update department |
| DELETE | `/api/departments/{id}` | Delete department |

---

## 🔒 Authentication

The application uses **JWT (JSON Web Tokens)** for stateless authentication.

Default credentials are provided in the database setup file.

---

## 🎨 Features Showcase

### Landing Page
- **Animated Particle Background** - Interactive network visualization
- **Beautiful Hero Section** - Gradient text and call-to-action buttons
- **Feature Cards** - Showcase of platform capabilities
- **Statistics Section** - Key metrics and achievements
- **Responsive Design** - Mobile-friendly layout

### Dashboard
- **Stat Cards** - Total employees, average/min/max salary
- **Bar Chart** - Headcount by department
- **Pie Chart** - Department distribution
- **Smooth Animations** - Page transitions and hover effects

### Employee Management
- **Table View** - Sortable and filterable employee list
- **Pagination** - Efficient data loading
- **Add/Edit Modal** - User-friendly forms with validation
- **Status Badges** - Active/Inactive employee status
- **Action Buttons** - Edit and delete functionality

### Responsive UI
- **Mobile Optimized** - Works on all screen sizes
- **Dark Theme** - Modern gradient backgrounds
- **Smooth Animations** - Professional transitions
- **Accessible** - Keyboard navigation support

---

## 📊 Database Schema

The application uses three main tables:

**Users Table** - Stores user accounts with encrypted passwords and roles

**Departments Table** - Stores department information with location details

**Employees Table** - Stores employee records with relationships to departments

---

## 🧪 Testing the Application

### 1. Test User Registration
Register a new user through the login page interface.

### 2. Test User Login
Use registered credentials to login and access the dashboard.

### 3. Test Department Management
Create, view, and delete departments through the departments page.

### 4. Test Employee Management
Add employees, assign them to departments, and manage their information.

### 5. Test Analytics
View real-time analytics including salary statistics and department headcount.

---

## 🐛 Troubleshooting

### Port Already in Use
Kill the process running on the port:
```bash
# For port 8080 (Backend)
lsof -ti:8080 | xargs kill

# For port 3000 (Frontend)
lsof -ti:3000 | xargs kill
```

### MySQL Connection Error
Ensure MySQL is running and credentials in `application.properties` are correct.

### Dependencies Issue
Clear cache and reinstall dependencies.

### CORS Error
Verify that the backend CORS configuration includes the correct frontend URL.

---

## 📦 Deployment

The application can be deployed to various platforms:
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Backend:** Heroku, Railway, AWS, DigitalOcean
- **Database:** AWS RDS, MySQL hosting services

Refer to platform-specific documentation for deployment instructions.

---

## 👨‍💻 Author

**Rahul Yadav**
- Java Backend Developer | Full-Stack Developer
- 2.7+ years of experience in Spring Boot & Microservices
- Strong in competitive programming and system design

---

## 📝 Learnings & Skills Demonstrated

### Backend Skills
- RESTful API Design with Spring Boot
- Database Design & ORM (Hibernate/JPA)
- JWT Authentication & Spring Security
- Exception Handling & Logging
- Pagination & Filtering
- CORS Configuration
- MySQL Database Management

### Frontend Skills
- React Hooks (useState, useEffect, useRef)
- React Router for Navigation
- Axios for HTTP Requests
- Bootstrap 5 for Responsive Design
- Chart Libraries (Recharts)
- CSS Animations & Transitions
- Component-based Architecture

### Full-Stack Skills
- Full CRUD Operations
- Multi-tier Architecture
- State Management
- Form Validation
- Error Handling
- Git Version Control

---

## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repository and submit a pull request.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## ⭐ Support

If you found this project helpful, please consider giving it a star!

---

**Made with ❤️ by Rahul Yadav**

Last Updated: July 2026