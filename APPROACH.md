# DSA Sheet - Technical Approach & Database Design

## Project Overview

The DSA Sheet application is a full-stack web application designed to help users track their progress in learning Data Structures and Algorithms across multiple technical domains. The application provides a comprehensive platform for managing learning resources, tracking completion status, and visualizing progress through analytics.

## Architecture

### Application Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   Browser (Client)                           │
│  - Interactive UI (React Client Components)                  │
│  - Optimistic Updates                                        │
│  - Theme Toggle                                              │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Initial HTML (SSR)
                       │ + Hydration
                       │
┌──────────────────────▼──────────────────────────────────────┐
│              Server Layer (Next.js Server)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   Server Components (SSR)                            │   │
│  │   - Topics Page (Direct DB Access)                   │   │
│  │   - Progress Page (Statistics Calculation)           │   │
│  │   - Profile Page (User Data)                         │   │
│  │   - Loading States                                   │   │
│  │   - Error Boundaries                                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │   API Routes (Serverless Functions)                  │   │
│  │   - Authentication (JWT)                             │   │
│  │   - Topics Management                                │   │
│  │   - Progress Tracking                                │   │
│  │   - Statistics & Analytics                           │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       │ Mongoose ODM
                       │
┌──────────────────────▼──────────────────────────────────────┐
│                   Database Layer (MongoDB)                   │
│  - Users Collection                                          │
│  - Topics Collection                                         │
│  - Subtopics Collection                                      │
│  - UserProgress Collection                                   │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|  
| Rendering | Next.js Server Components | Server-side rendering with direct DB access |
| Frontend | Next.js 16 (App Router) | React framework with SSR/SSG |
| UI Components | Shadcn UI + Tailwind CSS | Modern, accessible components |
| State Management | Redux Toolkit | Client-side state (minimal usage) |
| API Layer | Next.js API Routes | Serverless API endpoints |
| Database | MongoDB + Mongoose | NoSQL database with ODM |
| Authentication | JWT + bcryptjs | Secure token-based auth |
| Styling | Tailwind CSS | Utility-first CSS framework |
| Theme | next-themes | Dark/Light mode support |

## Database Design

### Database Schema

The application uses MongoDB with four main collections:

#### 1. Users Collection

Stores user account information.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Primary key | Auto-generated |
| `name` | String | User's full name | Required, max 60 chars |
| `email` | String | User's email address | Required, unique, email format |
| `mobile` | String | User's mobile number | Required |
| `password` | String | Hashed password | Required, bcrypt hashed |
| `createdAt` | Date | Account creation timestamp | Auto-generated |
| `updatedAt` | Date | Last update timestamp | Auto-updated |

**Indexes:**
- `email` (unique)

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "mobile": "1234567890",
  "password": "$2a$10$...",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

#### 2. Topics Collection

Stores high-level topic categories.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Primary key | Auto-generated |
| `name` | String | Topic name | Required, unique |
| `createdAt` | Date | Creation timestamp | Auto-generated |
| `updatedAt` | Date | Last update timestamp | Auto-updated |

**Indexes:**
- `name` (unique)

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "name": "Algorithms",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

#### 3. Subtopics Collection

Stores individual problems/subtopics within each topic.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Primary key | Auto-generated |
| `topicId` | ObjectId | Reference to Topic | Required, ref: 'Topic' |
| `name` | String | Subtopic name | Required |
| `leetCodeLink` | String | LeetCode problem link | Optional |
| `youtubeLink` | String | YouTube tutorial link | Optional |
| `articleLink` | String | Article/blog link | Optional |
| `level` | String | Difficulty level | Enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' |
| `createdAt` | Date | Creation timestamp | Auto-generated |
| `updatedAt` | Date | Last update timestamp | Auto-updated |

**Indexes:**
- `topicId`
- `level`

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "topicId": "507f1f77bcf86cd799439012",
  "name": "Binary Search",
  "leetCodeLink": "https://leetcode.com/tag/binary-search/",
  "youtubeLink": "https://youtube.com/results?search_query=binary+search",
  "articleLink": "https://geeksforgeeks.org/binary-search/",
  "level": "Easy",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "updatedAt": "2025-01-01T00:00:00.000Z"
}
```

#### 4. UserProgress Collection

Tracks user completion status for each subtopic.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `_id` | ObjectId | Primary key | Auto-generated |
| `userId` | ObjectId | Reference to User | Required, ref: 'User' |
| `subtopicId` | ObjectId | Reference to Subtopic | Required, ref: 'Subtopic' |
| `topicId` | ObjectId | Reference to Topic | Required, ref: 'Topic' |
| `status` | String | Completion status | Enum: ['Completed'], default: 'Completed' |
| `completedAt` | Date | Completion timestamp | Default: Date.now |
| `createdAt` | Date | Record creation timestamp | Auto-generated |
| `updatedAt` | Date | Last update timestamp | Auto-updated |

**Indexes:**
- `userId`
- `subtopicId`
- Compound unique index: `{ userId: 1, subtopicId: 1 }`

**Sample Document:**
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "userId": "507f1f77bcf86cd799439011",
  "subtopicId": "507f1f77bcf86cd799439013",
  "topicId": "507f1f77bcf86cd799439012",
  "status": "Completed",
  "completedAt": "2025-01-15T10:30:00.000Z",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

### Entity Relationship Diagram

```
┌─────────────┐
│    User     │
│─────────────│
│ _id (PK)    │
│ name        │
│ email       │
│ mobile      │
│ password    │
└──────┬──────┘
       │
       │ 1:N
       │
┌──────▼──────────┐
│  UserProgress   │
│─────────────────│
│ _id (PK)        │
│ userId (FK)     │
│ subtopicId (FK) │──┐
│ topicId (FK)    │  │
│ status          │  │
│ completedAt     │  │
└─────────────────┘  │
                     │ N:1
                     │
              ┌──────▼──────┐
              │  Subtopic   │
              │─────────────│
              │ _id (PK)    │
              │ topicId(FK) │──┐
              │ name        │  │
              │ leetCodeLink│  │
              │ youtubeLink │  │
              │ articleLink │  │
              │ level       │  │
              └─────────────┘  │
                               │ N:1
                               │
                        ┌──────▼──────┐
                        │    Topic    │
                        │─────────────│
                        │ _id (PK)    │
                        │ name        │
                        └─────────────┘
```

## API Endpoints

### Authentication APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/auth/register` | POST | Register new user | No |
| `/api/auth/login` | POST | Login user | No |
| `/api/auth/logout` | POST | Logout user | Yes |
| `/api/auth/me` | GET | Get current user | Yes |

### Topics APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/topics` | GET | Get all topics with subtopics | Yes |
| `/api/topics` | POST | Create new topic | Yes |

### Subtopics APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/subtopics` | POST | Create new subtopic | Yes |

### User Progress APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/user-progress` | GET | Get user's completed subtopics | Yes |
| `/api/user-progress` | POST | Toggle subtopic completion | Yes |

### Statistics APIs

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/api/stats` | GET | Get user progress statistics | Yes |

## Key Features Implementation

### 1. User Authentication

**Approach:**
- JWT-based authentication with HTTP-only cookies
- Passwords hashed using bcryptjs
- Middleware protection for authenticated routes
- Redux state management for user session

**Flow:**
1. User registers → Password hashed → User document created
2. User logs in → Credentials validated → JWT token generated → Token stored in cookie
3. Protected routes → Middleware validates token → Request proceeds or redirects to login

### 2. Progress Tracking

**Approach:**
- Separate `UserProgress` collection for scalability
- Optimistic UI updates for better UX
- Compound unique index prevents duplicate progress entries

**Flow:**
1. User checks/unchecks subtopic → Optimistic UI update
2. API call to `/api/user-progress` → Create or delete progress record
3. On failure → Revert UI state

### 3. Statistics & Analytics

**Approach:**
- Real-time calculation of statistics
- Aggregation of progress by difficulty level
- Percentage calculations for visual representation

**Calculations:**
- Overall completion: `(completed / total) * 100`
- Difficulty completion: `(completed_easy / total_easy) * 100`
- Distribution: `(completed_easy / total_completed) * 100`

### 4. Server-Side Rendering (SSR)

**Approach:**
- All authenticated pages use Next.js Server Components
- Direct database queries on the server
- Data fetched before rendering (no client-side loading)
- Separation of server and client components

**Implementation:**
```typescript
// Server Component (page.tsx)
export const dynamic = "force-dynamic";

async function getData() {
  await dbConnect();
  const userId = await getServerUserId();
  const data = await Model.find({ userId }).lean();
  return data;
}

export default async function Page() {
  const data = await getData();
  return <ClientComponent data={data} />;
}
```

**Benefits:**
- Faster initial page loads
- SEO-friendly (content in HTML)
- Reduced client-side JavaScript
- Fresh data on every request
- Better security (sensitive operations server-side)

### 5. Loading & Error States

**Approach:**
- `loading.tsx` files for skeleton loaders
- `error.tsx` files for error boundaries
- Follows Next.js App Router conventions

**Loading States:**
- Animated skeleton placeholders
- Match page layout structure
- Dark mode support

**Error Handling:**
- User-friendly error messages
- Retry functionality
- Console logging for debugging

### 6. Data Seeding

**Approach:**
- Comprehensive seed script with 10 topics and 80 subtopics
- Clears existing data before seeding
- Includes real resource links (LeetCode, YouTube, articles)

**Topics Coverage:**
- Algorithms, Data Structures, Databases
- Machine Learning, Operating Systems
- Computer Networks, System Design
- Web Development, DevOps, Cloud Computing

## Security Considerations

| Aspect | Implementation |
|--------|----------------|
| Password Storage | bcryptjs hashing with salt rounds |
| Authentication | JWT tokens in HTTP-only cookies |
| Route Protection | Middleware validates tokens |
| API Security | Token verification on all protected endpoints |
| Input Validation | Mongoose schema validation |
| CORS | Next.js default CORS handling |

## Performance Optimizations

| Optimization | Description |
|--------------|-------------|
| Server-Side Rendering | Pages rendered on server with data pre-fetched |
| Direct Database Access | Server components query MongoDB directly |
| Database Indexing | Indexes on frequently queried fields |
| Connection Pooling | Mongoose connection caching |
| Optimistic Updates | Immediate UI feedback for interactions |
| Force Dynamic | `force-dynamic` ensures fresh data on each request |
| Code Splitting | Next.js automatic code splitting |
| Loading States | Skeleton loaders improve perceived performance |
| Lean Queries | `.lean()` for faster MongoDB queries |

## Future Enhancements

1. **Search & Filtering**: Add search functionality for topics/subtopics
2. **Sorting**: Custom sorting options (by difficulty, completion, etc.)
3. **Notes**: Allow users to add personal notes to subtopics
4. **Streaks**: Track daily/weekly learning streaks
5. **Leaderboard**: Compare progress with other users
6. **Export**: Export progress as PDF/CSV
7. **Reminders**: Email/push notifications for incomplete topics
8. **Custom Topics**: Allow users to create custom topics
9. **Tags**: Add tagging system for better organization
10. **Analytics**: More detailed progress analytics and insights

## Deployment Considerations

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment (development/production)

### Recommended Hosting
- **Frontend/Backend**: Vercel (optimized for Next.js)
- **Database**: MongoDB Atlas (managed MongoDB service)
- **CDN**: Vercel Edge Network (automatic)

### Production Checklist
- [ ] Set strong `JWT_SECRET`
- [ ] Use MongoDB Atlas or production MongoDB instance
- [ ] Enable HTTPS
- [ ] Configure proper CORS policies
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure rate limiting
- [ ] Set up backup strategy for database
- [ ] Enable MongoDB authentication
- [ ] Review and update security headers

## Conclusion

The DSA Sheet application provides a robust, scalable platform for tracking learning progress. The architecture separates concerns effectively, the database design supports efficient queries, and the implementation follows modern web development best practices.
