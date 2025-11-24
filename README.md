# DSA Sheet - Data Structures & Algorithms Progress Tracker

A comprehensive web application for tracking your Data Structures and Algorithms learning journey. Built with Next.js, MongoDB, and modern UI components.

## 🚀 Features

- **User Authentication**: Secure login and registration with JWT
- **Server-Side Rendering**: Fast page loads with data fetched on the server
- **Topic Management**: Browse 10+ comprehensive DSA topics
- **Progress Tracking**: Track completion status for 80+ subtopics
- **Difficulty Levels**: Problems categorized as Easy, Medium, or Hard
- **Resource Links**: Direct links to LeetCode, YouTube tutorials, and articles
- **Progress Dashboard**: Visual analytics showing overall and difficulty-based completion
- **Loading States**: Professional skeleton loaders during data fetching
- **Error Handling**: Graceful error boundaries with retry functionality
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Optimistic Updates**: Instant UI feedback for better user experience

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Tech Stack](#tech-stack)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **pnpm** package manager
- **MongoDB** (local installation or MongoDB Atlas account)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dsa-sheet
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

## ⚙️ Environment Setup

1. **Create environment file**
   
   Copy the example environment file:
   ```bash
   cp env.example .env.local
   ```

2. **Configure environment variables**
   
   Open `.env.local` and update the following variables:

   ```env
   # MongoDB Connection String
   MONGODB_URI=mongodb://localhost:27017/dsa-sheet
   # For MongoDB Atlas, use:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/dsa-sheet

   # JWT Secret Key (use a strong random string in production)
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   ```

   **Important**: 
   - Replace `MONGODB_URI` with your actual MongoDB connection string
   - Generate a strong random string for `JWT_SECRET` in production
   - Never commit `.env.local` to version control

## 🌱 Database Seeding

The application includes a comprehensive seed script that populates the database with 10 topics and 80 subtopics across various technical domains.

### Topics Included:
1. **Algorithms** - Sorting, Binary Search, Dynamic Programming, etc.
2. **Data Structures** - Arrays, Linked Lists, Trees, Graphs, etc.
3. **Databases** - SQL, NoSQL, Normalization, Indexing, etc.
4. **Machine Learning** - Regression, Neural Networks, NLP, etc.
5. **Operating Systems** - Process Management, Memory, Deadlocks, etc.
6. **Computer Networks** - OSI Model, HTTP, TCP/UDP, etc.
7. **System Design** - Load Balancing, Caching, Microservices, etc.
8. **Web Development** - HTML/CSS, React, Node.js, Security, etc.
9. **DevOps** - Docker, Kubernetes, CI/CD, Monitoring, etc.
10. **Cloud Computing** - AWS, Serverless, VPC, IAM, etc.

### Running the Seed Script

```bash
npm run seed
# or
pnpm run seed
```

**What the seed script does:**
- Clears existing topics and subtopics from the database
- Creates 10 comprehensive topics
- Adds 8 subtopics to each topic (80 total)
- Includes LeetCode links, YouTube tutorials, and article references
- Sets appropriate difficulty levels (Easy, Medium, Hard)

**Note**: The seed script will delete all existing topics and subtopics before inserting new data.

## 🏃 Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
# or
pnpm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
npm run build
npm run start
# or
pnpm run build
pnpm run start
```

## 📁 Project Structure

```
dsa-sheet/
├── app/
│   ├── (authenticated)/        # Protected routes (SSR)
│   │   ├── layout.tsx         # Authenticated layout with header/footer
│   │   ├── profile/
│   │   │   ├── page.tsx       # Server component (SSR)
│   │   │   ├── profile-client.tsx  # Client component
│   │   │   ├── loading.tsx    # Loading skeleton
│   │   │   └── error.tsx      # Error boundary
│   │   ├── topics/
│   │   │   ├── page.tsx       # Server component (SSR)
│   │   │   ├── topics-client.tsx   # Client component
│   │   │   ├── loading.tsx    # Loading skeleton
│   │   │   └── error.tsx      # Error boundary
│   │   └── progress/
│   │       ├── page.tsx       # Server component (SSR)
│   │       ├── progress-client.tsx # Client component
│   │       ├── loading.tsx    # Loading skeleton
│   │       └── error.tsx      # Error boundary
│   ├── api/                   # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── topics/            # Topics CRUD
│   │   ├── subtopics/         # Subtopics CRUD
│   │   ├── user-progress/     # Progress tracking
│   │   └── stats/             # Statistics and analytics
│   ├── login/                 # Login page
│   ├── register/              # Registration page
│   └── layout.tsx             # Root layout with theme provider
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── Header.tsx             # Navigation header
│   ├── Footer.tsx             # Footer component
│   ├── AuthProvider.tsx       # Authentication context
│   ├── theme-provider.tsx     # Theme provider
│   └── ToggleTheme.tsx        # Theme toggle button
├── lib/
│   ├── db.ts                  # MongoDB connection
│   ├── server-utils.ts        # Server-side utilities
│   ├── store.ts               # Redux store
│   └── features/              # Redux slices
├── models/
│   ├── User.ts                # User schema
│   ├── Topic.ts               # Topic schema
│   ├── Subtopic.ts            # Subtopic schema
│   └── UserProgress.ts        # Progress tracking schema
├── scripts/
│   └── seed-topics.ts         # Database seeding script
├── middleware.ts              # Route protection
└── package.json               # Dependencies and scripts
```

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed database with topics |

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router and SSR
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn UI** - Component library
- **Redux Toolkit** - State management (client-side only)
- **next-themes** - Dark mode support

### Backend
- **Next.js Server Components** - Server-side rendering
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB with direct server queries
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static typing
- **tsx** - TypeScript execution

## 🔐 Authentication Flow

1. **Registration**: Users create an account with name, email, mobile, and password
2. **Login**: Credentials are validated and a JWT token is issued
3. **Session**: Token is stored in HTTP-only cookies
4. **Protection**: Middleware validates tokens on protected routes
5. **Logout**: Token is cleared from cookies

## 📊 Data Models

### User
- Name, Email, Mobile, Password (hashed)
- Timestamps (createdAt, updatedAt)

### Topic
- Name
- Timestamps

### Subtopic
- Name, Topic Reference
- Links (LeetCode, YouTube, Article)
- Difficulty Level (Easy/Medium/Hard)
- Timestamps

### UserProgress
- User Reference, Subtopic Reference, Topic Reference
- Status (Completed)
- Completion Date
- Timestamps

## 🎨 UI Features

- **Server-Side Rendering**: All pages render on the server for optimal performance
- **Loading Skeletons**: Animated placeholders during data fetching
- **Error Boundaries**: Graceful error handling with retry buttons
- **Accordion-based Topics**: Expandable sections for each topic
- **Interactive Tables**: Sortable subtopic listings with optimistic updates
- **Progress Bars**: Visual representation of completion with custom colors
- **Badges**: Color-coded difficulty and status indicators
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: System preference detection with manual toggle

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your Atlas connection string is correct
- Check firewall settings if using MongoDB Atlas
- Verify network access in Atlas dashboard

### Seed Script Fails
- Ensure `.env.local` file exists with valid `MONGODB_URI`
- Check MongoDB connection
- Verify you have write permissions to the database

### Authentication Issues
- Clear browser cookies and try again
- Verify `JWT_SECRET` is set in `.env.local`
- Check that the API routes are accessible

## 📞 Support

For issues and questions, please open an issue on the repository.
