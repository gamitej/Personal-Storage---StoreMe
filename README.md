# StoreMe – Full Stack Application

StoreMe is a full-stack web application built with a modern containerized architecture. The project uses **Docker** and **Docker Compose** to simplify local development, ensure environment consistency, and make onboarding easy for new developers.

---

## 🚀 Tech Stack

### Frontend

* React.js & Typescript
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* Sequelize ORM

### Database

* PostgreSQL (containerized)

### DevOps

* Docker
* Docker Compose

---

## 📂 Project Structure (High Level)

```
StoreMe/
├── frontend/        # React frontend
├── backend/         # Node.js + Express backend
├── docker-compose.dev.yaml
├── .env
└── README.md
```

---

## 🛠 Prerequisites

Make sure you have the following installed on your system:

* **Docker** (v20+ recommended)
* **Docker Compose** (v2+)
* **Git**

Verify installation:

```bash
docker --version
docker compose version
```

---

## ▶️ Running the Application (Development)

To start the complete application (frontend, backend, and database), run:

```bash
docker-compose -f docker-compose.dev.yaml up --build
```

### What this command does:

* Builds fresh Docker images for frontend and backend
* Starts all required services
* Sets up networking between containers
* Runs the app in development mode

---

## 🌐 Accessing the Application

After successful startup:

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5001](http://localhost:5001)
* **PostgreSQL:** localhost:5432

> Ports may vary based on your `docker-compose.dev.yaml` configuration.

---

## ⚙️ Environment Variables

Create a `.env` file in the root or respective service directories.

### Example `.env`

```env
DB_HOST=postgres
DB_PORT=5432
DB_NAME=storeme
DB_USER=postgres
DB_PASSWORD=password
NODE_ENV=development
```

> Docker Compose automatically injects these variables into the containers.

---

## 🗄 Database & Migrations

* Sequelize automatically connects to the PostgreSQL container
* Models are synced at application startup (based on configuration)
* You can extend this setup with Sequelize migrations and seeders

---

## 🧑‍💻 Useful Docker Commands

### Stop containers

```bash
docker-compose -f docker-compose.dev.yaml down
```

### Remove volumes (reset database)

```bash
docker-compose -f docker-compose.dev.yaml down -v
```

### View running containers

```bash
docker ps
```

### Enter a running container

```bash
docker exec -it <container_name> sh
```

---

## 🔄 Hot Reloading

* Frontend supports hot reload via Vite
* Backend restarts automatically on code changes (using nodemon)

This ensures a smooth development experience without rebuilding images repeatedly.

---

## 📦 Future Enhancements

* Authentication & authorization
* File upload support
* Role-based access control
* Production-ready Docker setup
* CI/CD pipeline

---

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create a new branch (`feature/your-feature`)
3. Commit changes with meaningful messages
4. Open a Pull Request
