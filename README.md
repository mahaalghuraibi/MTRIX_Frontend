# ⚙️ MTRIX Frontend  
**Maintenance Ticketing Reporting Inspection eXecution - Frontend**

---

## 🔹 Project & Repository Descriptions  

### Project Overview
**MTRIX Frontend** is a modern, responsive React Single Page Application (SPA) that serves as the user interface for the MTRIX maintenance ticketing system. The frontend provides intuitive dashboards tailored for different user roles (Staff, Technicians, and Administrators), enabling seamless ticket management, tracking, and communication.

**Main Features:**
- Role-based routing and access control (Admin, Staff, Technician)
- Interactive ticket management system (create, view, edit, delete)
- Real-time work log tracking and updates
- Emoji-based reaction system for ticket feedback
- User profile management with role assignment
- Responsive design for desktop and mobile devices
- Secure JWT-based authentication

### Repository Description

**Frontend Repository (Current):**
- React 19 Single Page Application built with Vite
- React Router 7 for client-side routing
- Component-based architecture with reusable UI components
- API integration layer for backend communication
- Role-based page rendering and navigation
- Modern CSS styling with component-scoped stylesheets

**Key Pages:**
- **HomePage:** Welcome and overview dashboard
- **LoginPage/SignupPage:** User authentication
- **StaffPage:** Staff-specific ticket management interface
- **TechnicianPage:** Technician dashboard for work log management
- **AdminPage:** Administrative control panel
- **TicketsPage:** List view of all tickets
- **TicketDetailPage:** Detailed ticket view with work logs and reactions
- **TicketFormPage:** Create/edit ticket form
- **ReactionPage:** View and manage ticket reactions
- **ProfilePage:** User profile and role management

---

## 🔹 Tech Stack  

### Core Technologies
- **Framework:** React
- **Router:** React Router
- **Build Tool:** Vite
- **Language:** JavaScript (ES6+)

### Development Tools
- **Bundler:** Vite (fast HMR and optimized builds)
- **Linting:** ESLint
- **Package Manager:** npm
- **React Plugins:** @vitejs/plugin-react

### Additional Libraries
- **AOS (Animate On Scroll):** For scroll animations
- **React Hooks:** Built-in state management and lifecycle hooks

### Architecture
- **Component Structure:** Modular components organized by feature
- **API Layer:** Centralized API utility functions (`utilities/`)
- **Routing:** Protected routes with role-based access control
- **State Management:** React hooks (useState, useEffect, useContext)

---

## 🔹 Backend Repository Link  
👉 [Backend Repository - GitHub](https://github.com/mahaalghuraibi/MTRIX_backend)

**Backend API Documentation:**  
See the Backend README for complete API endpoint documentation and routing table.

---

## 🔹 Frontend Repository Link  
👉 [Frontend Repository - GitHub](https://github.com/mahaalghuraibi/MTRIX_Frontend)

**Frontend Live Site:**  
🔗 [_website url_](http://localhost:5173/)

---
## 🔹 Installation Instructions

### Prerequisites
- Node.js (version 18 or higher)
- npm (version 9 or higher) or yarn
- Git (for cloning the repository)
- Backend API running (see Backend README for setup)

---

### ⚛️ Frontend Setup (Standard)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mahaalghuraibi/MTRIX_Frontend.git
   cd MTRIX_Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file in the root directory
   # Add the following:
   VITE_API_BASE=http://localhost:8000
   ```
   
   For production, update the API base URL:
   ```bash
   VITE_API_BASE=https://your-backend-api-url.com
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   - Frontend will be available at: `http://localhost:5173`
   - The app will automatically reload when you make changes

---

### 🐳 Frontend Setup (Docker - Optional)

If you prefer to run the frontend in a Docker container:

1. **Create a Dockerfile** (if not already present):
   ```dockerfile
   FROM node
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 5173
   CMD ["npm", "run", "dev", "--", "--host"]
   ```

2. **Create docker-compose.yml** (if not already present):
   ```yaml
   services:
     frontend:
       build: .
       container_name: mtrix_frontend
       ports:
         - "5173:5173"
       volumes:
         - .:/app
         - /app/node_modules
       env_file:
         - .env
       environment:
         - VITE_API_BASE=http://localhost:8000
   ```

3. **Build and run:**
   ```bash
   docker compose up -d
   ```

4. **Access the application:**
   - Frontend will be available at: `http://localhost:5173`

---

### 📦 Build for Production

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Preview the production build:**
   ```bash
   npm run preview
   ```

3. **Deploy:**
   - The `dist/` folder contains the production-ready static files
   - Deploy to Vercel, Netlify, or any static hosting service
   - Update `VITE_API_BASE` environment variable in your hosting platform

---

### 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/`)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

---

### 🛑 Troubleshooting

**Port already in use:**
```bash
# Kill process on port 5173 (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Or change port in vite.config.js
```

**API connection issues:**
- Ensure backend is running on the port specified in `VITE_API_BASE`
- Check CORS settings in backend if getting CORS errors
- Verify JWT token is being stored correctly in localStorage

**Module not found errors:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🔹 IceBox Features (Future Enhancements)

These are planned features for future releases:

- **📊 Dashboard Analytics**
  - Interactive charts showing ticket statistics
  - Visual representation of ticket status distribution
  - Performance metrics and reports

- **🎯 Advanced Ticket Features**
  - Ticket priority levels (Low, Medium, High) with visual indicators
  - Ticket assignment to specific technicians
  - Ticket templates for common issues

- **🔔 Real-time Notifications**
  - In-app notification system
  - Browser push notifications
  - Email notifications integration

- **🔍 Enhanced Search & Filters**
  - Full-text search across tickets
  - Advanced filtering (by status, date, technician, priority)
  - Saved filter presets
  - Export filtered results

- **📎 File Upload & Attachments**
  - Image upload for tickets
  - Document attachments support
  - Image preview and gallery

- **🎨 UI/UX Improvements**
  - Dark mode theme
  - Customizable user preferences
  - Keyboard shortcuts
  - Drag-and-drop interface

- **📈 Advanced Features**
  - Ticket comments and threaded discussions
  - Ticket history and audit logs
  - Bulk operations (bulk update, delete)
  - Ticket templates and quick actions

---

## 📝 Additional Notes

### Project Structure
```
MTRIX_Frontend/
├── src/
│   ├── assets/          # Images, logos, static assets
│   ├── components/      # Reusable UI components
│   │   ├── Forms/      # Form components
│   │   ├── Navbar/     # Navigation component
│   │   ├── ReactionList/
│   │   └── TicketCard/
│   ├── pages/          # Page components (routes)
│   ├── utilities/      # API functions and utilities
│   └── main.jsx        # Application entry point
├── public/             # Public static files
├── dist/               # Production build output
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

### API Integration
- All API calls are centralized in `src/utilities/` directory
- Uses JWT tokens stored in localStorage for authentication
- Token refresh handled automatically via `users-api.js`
- Error handling implemented in `sendRequest.js`

### Role-Based Access
- **Staff:** Can create and manage own tickets, view reactions
- **Technician:** Can view all tickets, add work logs, manage assigned tickets
- **Admin:** Full access to all features, user management, system settings

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---