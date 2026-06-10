# X Sharko AI Website Builder

> Turn ideas into production-ready websites in seconds with AI-powered generation

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-19.2.6-61dafb.svg)
![MongoDB](https://img.shields.io/badge/mongodb-cloud-green.svg)

---

## 📖 Overview

**X Sharko AI** is a full-stack SaaS platform that leverages advanced AI (via OpenRouter) to generate complete, production-ready websites from natural language prompts. Users describe their business idea, and the AI architect "NEXUS" produces stunning, responsive HTML/CSS/JavaScript websites with modern design patterns, animations, SEO optimization, and WCAG accessibility compliance.

The platform includes a Monaco-based code editor for real-time modifications, conversational AI for iterative refinements, one-click deployment with shareable URLs, and a credit-based pricing system powered by Razorpay.

---

## ✨ Features

### 🤖 AI-Powered Generation
- **Natural Language to Website**: Describe your idea in plain English — the AI generates a complete single-page application
- **Industry-Specific Content**: AI infers business type and creates realistic, non-generic copy tailored to your industry
- **Smart Design System**: Automatically selects vibrant color schemes, modern typography (Poppins, Inter, DM Sans), and engaging gradients
- **Responsive by Default**: Mobile-first design with breakpoints for tablets and desktops — zero horizontal scroll guaranteed

### 🎨 Visual Website Editor
- **Live Preview**: Real-time iframe rendering of generated websites
- **Monaco Code Editor**: Industry-standard code editor with syntax highlighting for HTML/CSS/JavaScript
- **Conversational Updates**: Chat with AI to refine your website iteratively (e.g., "Make the header purple", "Add a testimonials section")
- **Multi-View Interface**: Toggle between preview, code view, and full-screen modes

### 🚀 Deployment & Sharing
- **One-Click Deploy**: Instantly publish websites with unique slugs (e.g., `yoursite-abc12345`)
- **Shareable URLs**: Each deployed site gets a public URL for client previews and sharing
- **Copy to Clipboard**: Export full HTML source code for self-hosting or further customization

### 💳 Credit-Based Pricing System
- **Free Tier**: 100 credits for new users to explore the platform
- **Pro Plan**: ₹499 for 500 credits with faster generation and editing capabilities
- **Enterprise Plan**: ₹1499 for 1000 credits with unlimited iterations and priority support
- **Razorpay Integration**: Secure payment processing with signature verification
- **Credit Deduction**: 10 credits per generation, 5 credits per AI update

### 🔐 Authentication & User Management
- **Firebase Google OAuth**: Seamless sign-in with Google accounts
- **JWT Session Management**: HTTP-only cookies with 2-day expiration
- **User Profiles**: Track credits, plan tier, and generated websites per user
- **Dashboard**: Personal workspace displaying all created websites with preview thumbnails

### 📊 Website Management
- **Project Dashboard**: Grid view of all user websites with live previews
- **Conversation History**: Full chat logs preserved for each website's AI interactions
- **Version Control**: Latest code state persisted in MongoDB for each project
- **Thumbnail Previews**: Scaled iframe previews (140% scaled to 72%) for quick visual identification

---

## 🏗 Architecture


### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (React)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Landing    │  │  Dashboard   │  │   Editor     │      │
│  │   (Framer)   │  │  (Projects)  │  │  (Monaco)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┼──────────────────┘              │
│                            ↓                                 │
│                      Redux Store                             │
│                    (User + Persist)                          │
└─────────────────────────────┬───────────────────────────────┘
                              ↓
                         Axios (HTTP)
                              ↓
┌─────────────────────────────┴───────────────────────────────┐
│                      Backend (Express.js)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Auth Routes │  │ Website API  │  │ Payment API  │      │
│  │  (Firebase)  │  │ (OpenRouter) │  │ (Razorpay)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│           │                │                  │              │
│           └────────────────┼──────────────────┘              │
│                            ↓                                 │
│                   Middleware Layer                           │
│               (isAuthorized - JWT Verify)                    │
└─────────────────────────────┬───────────────────────────────┘
                              ↓
                      MongoDB Atlas
                  (User, Website, Payment)
```


### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | React 19.2.6 | UI rendering and component management |
| **UI Library** | Tailwind CSS 4.3.0 | Utility-first styling with custom design system |
| **Animation** | Framer Motion 12.40.0 | Smooth page transitions and micro-interactions |
| **State Management** | Redux Toolkit + Redux Persist | Global user state with localStorage persistence |
| **Code Editor** | Monaco Editor 4.7.0 | VS Code-quality in-browser code editing |
| **Icons** | Lucide React 1.16.0 | Modern, consistent icon set |
| **HTTP Client** | Axios 1.16.1 | API communication with credential support |
| **Routing** | React Router DOM 7.15.1 | Client-side navigation |
| **Backend Framework** | Express.js 5.2.1 | RESTful API server |
| **Database** | MongoDB 9.6.2 (Mongoose) | Document store for users, websites, payments |
| **Authentication** | Firebase Auth 12.13.0 + JWT | Google OAuth + token-based sessions |
| **AI Provider** | OpenRouter API | LLM access for website generation (Gemini, GPT, Claude) |
| **Payment Gateway** | Razorpay 2.9.6 | Payment order creation and verification |
| **Build Tool** | Vite 8.0.12 | Fast frontend bundling and HMR |
| **Process Management** | Nodemon 3.1.14 | Auto-restart on backend code changes |

---

## 📂 Project Structure

```
AI Website Builder/
├── backend/
│   ├── config/
│   │   ├── openRouter.config.js    # AI model configuration
│   │   └── razerPay.config.js      # Razorpay instance setup
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controllers.js      # Google OAuth, logout, profile
│   │   │   ├── website.controllers.js   # Generate, update, deploy, fetch websites
│   │   │   └── payment.controllers.js   # Order creation, payment verification
│   │   ├── middleware/
│   │   │   └── isAuthorized.js          # JWT verification middleware
│   │   ├── models/
│   │   │   ├── user.models.js           # User schema (credits, plan, avatar)
│   │   │   ├── website.models.js        # Website schema (code, conversation, slug)
│   │   │   └── payment.models.js        # Payment transaction records
│   │   ├── routes/
│   │   │   ├── auth.routes.js           # /api/auth endpoints
│   │   │   ├── website.routes.js        # /api/website endpoints
│   │   │   └── payment.routes.js        # /api/payment endpoints
│   │   ├── db/
│   │   │   └── db.js                    # MongoDB connection logic
│   │   └── app.js                       # Express app setup (CORS, JSON parsing)
│   ├── utils/
│   │   └── extractJson.utils.js         # Parse JSON from AI responses
│   ├── .env                             # Environment variables
│   ├── server.js                        # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.jsx               # Navigation bar with auth state
│   │   │   └── LoginModal.jsx           # Firebase Google sign-in modal
│   │   ├── Pages/
│   │   │   ├── Home.jsx                 # Landing page with hero section
│   │   │   ├── Dashboard.jsx            # User's website gallery
│   │   │   ├── Generate.jsx             # AI prompt input + generation UI
│   │   │   ├── WebsiteEditor.jsx        # Monaco editor + live preview + chat
│   │   │   ├── Pricing.jsx              # Credit plans with Razorpay integration
│   │   │   └── LiveSite.jsx             # Public deployed website viewer
│   │   ├── redux/
│   │   │   ├── store.js                 # Redux store with persistence config
│   │   │   └── userSlice.js             # User state management (setUserData)
│   │   ├── assets/                      # Images (hero.png, logos)
│   │   ├── App.jsx                      # Route definitions
│   │   └── main.jsx                     # React root + Redux provider
│   ├── firebase.js                      # Firebase initialization
│   ├── .env                             # Vite environment variables
│   ├── vite.config.js                   # Vite configuration
│   └── package.json
│
└── Reports/                             # Security and audit documentation
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **MongoDB Atlas Account** (or local MongoDB instance)
- **Firebase Project** (for Google OAuth)
- **OpenRouter API Key** (or Gemini API Key)
- **Razorpay Account** (for payment processing)

### Clone Repository

```bash
git clone https://github.com/yourusername/ai-website-builder.git
cd ai-website-builder
```

### Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Configure Environment Variables

Create `.env` files in both backend and frontend directories:

#### Backend `.env`

```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/Ai_Website_Builder
JWT_Secret_Key=your_jwt_secret_key_here
OPENROUTER_API_KEY=sk-or-v1-your_openrouter_key
GEMINI_API_KEY=your_gemini_api_key (optional)
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```


#### Frontend `.env`

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SERVER_URL=http://localhost:3000
VITE_RAZORPAY_API_KEY=your_razorpay_key_id
```

### Run Development Server

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:3000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will start on `http://localhost:5173`

### Build For Production

#### Backend
```bash
cd backend
# Set NODE_ENV=production in your hosting environment
node server.js
```

#### Frontend
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

---

## ⚙ Environment Variables

### Backend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Express server port (default: 3000) | ✅ |
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_Secret_Key` | Secret key for JWT token signing | ✅ |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI generation | ✅ |
| `GEMINI_API_KEY` | Google Gemini API key (alternative) | ❌ |
| `FRONTEND_URL` | Frontend URL for CORS and deployment URLs | ✅ |
| `RAZORPAY_KEY_ID` | Razorpay public key | ✅ |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key for signature verification | ✅ |
| `NODE_ENV` | Environment mode (production/development) | ❌ |

### Frontend Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase project API key | ✅ |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase authentication domain | ✅ |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | ✅ |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket URL | ✅ |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | ✅ |
| `VITE_FIREBASE_APP_ID` | Firebase application ID | ✅ |
| `VITE_SERVER_URL` | Backend API base URL | ✅ |
| `VITE_RAZORPAY_API_KEY` | Razorpay public key (for checkout) | ✅ |

---

## 🔐 Authentication Flow

```
User Initiates Login
        ↓
Firebase Google OAuth
   (Frontend - firebase.js)
        ↓
Google Account Selection
        ↓
Firebase Returns User Data
   (name, email, avatar)
        ↓
POST /api/auth/google
   { name, email, avatar }
        ↓
Backend Checks User Existence
   (MongoDB - User Model)
        ↓
If New → Create User (100 credits)
If Exists → Fetch Existing User
        ↓
Generate JWT Token
   (jwt.sign with 2-day expiry)
        ↓
Set HTTP-Only Cookie
   (token, httpOnly: true, sameSite: strict)
        ↓
Return User Data to Frontend
        ↓
Redux Store Updates
   (setUserData → persisted)
        ↓
Redirect to Dashboard
```

**Protected Routes:**
- All API routes except `/api/auth/google` use the `isAuthorized` middleware
- Middleware verifies JWT from cookies and attaches `req.user`
- Frontend automatically includes credentials with `withCredentials: true`

---

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/google` | ❌ | Google OAuth login/register |
| GET | `/logout` | ❌ | Clear authentication cookie |
| GET | `/me` | ✅ | Get current user profile |

### Website Routes (`/api/website`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/generate` | ✅ | Generate new website from prompt (10 credits) |
| POST | `/update/:id` | ✅ | Update existing website with AI (5 credits) |
| GET | `/getall` | ✅ | Fetch all user's websites |
| GET | `/getbyid/:id` | ✅ | Fetch specific website by ID |
| GET | `/getbyslug/:slug` | ❌ | Fetch deployed website by slug (public) |
| GET | `/deploy/:id` | ✅ | Deploy website and generate slug + URL |

### Payment Routes (`/api/payment`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/order` | ✅ | Create Razorpay order for plan purchase |
| POST | `/verify` | ✅ | Verify payment signature and credit user |

**Example Request - Generate Website:**

```bash
curl -X POST http://localhost:3000/api/website/generate \
  -H "Content-Type: application/json" \
  -H "Cookie: token=your_jwt_token" \
  --data '{
    "prompt": "Create a modern landing page for a coffee shop with menu and contact form"
  }'
```

**Example Response:**

```json
{
  "success": true,
  "websiteId": "64f3a7b2c8e9a123456789ab",
  "reamingCredit": 90,
  "message": "Website Generated Successfully"
}
```

---

## 🗄 Database Schema

### User Model

```javascript
{
  name: String,           // User's full name from Google
  email: String,          // Unique email (lowercase, trimmed)
  avatar: String,         // Google profile picture URL
  credits: Number,        // Available credits (default: 100)
  plan: String,           // "free" | "pro" | "enterprise"
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated
}
```

### Website Model

```javascript
{
  user: ObjectId,              // Reference to User model
  title: String,               // Website title (first 100 chars of prompt)
  latestCode: String,          // Current HTML/CSS/JS code
  conversation: [              // AI chat history
    {
      role: String,            // "user" | "ai"
      content: String,         // Message content
      createdAt: Date
    }
  ],
  deployed: Boolean,           // Deployment status (default: false)
  deploymentUrl: String,       // Public URL (e.g., /site/slug)
  slug: String,                // Unique slug (e.g., coffee-shop-abc12345)
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model

```javascript
{
  userId: ObjectId,            // Reference to User model
  planId: String,              // "free" | "pro" | "enterprise"
  amount: Number,              // Payment amount in INR
  credits: Number,             // Credits to be added
  razorpayOrderId: String,     // Razorpay order ID
  razorpayPaymentId: String,   // Razorpay payment ID
  razorpaySignature: String,   // Payment signature for verification
  status: String,              // "pending" | "success" | "failed"
  createdAt: Date,
  updatedAt: Date
}
```

**Relationships:**
- One User → Many Websites (1:N)
- One User → Many Payments (1:N)

---

## 🎨 UI/UX Highlights

### Design System

- **Color Palette**: Dark theme (#050505 base) with purple/blue gradients (#8B5CF6, #3B82F6)
- **Glassmorphism**: Frosted glass effects with `backdrop-blur-xl` and `bg-white/5`
- **Micro-Interactions**: Framer Motion animations on hover, tap, and page transitions
- **Grid Background**: Subtle grid pattern on landing and generation pages
- **Glow Effects**: Radial blur gradients for depth and visual interest

### Key UX Patterns

1. **Progressive Loading**: Multi-phase progress indicator during AI generation
   - "Analyzing your idea..." → "Designing layout..." → "Writing code..." → "Final checks..."
   
2. **Optimistic UI Updates**: Instant feedback before API responses
   - Messages appear in chat immediately
   - Credit counts update without page reload
   
3. **Responsive Layout**: Mobile-first with hamburger menu and collapsible sidebars
   
4. **Contextual Actions**: Deploy button only shows on undeployed sites, Share button on deployed ones

5. **Monaco Editor Integration**: Full VS Code experience with:
   - Syntax highlighting
   - Auto-indentation
   - Copy code functionality
   - Dark theme matching the UI

6. **Live Preview**: Real-time iframe rendering with:
   - Sandboxed execution (`allow-scripts allow-same-origin allow-forms`)
   - Blob URL generation for performance
   - Scaled thumbnail previews (140% → 72% transform) in dashboard

---

## 🚀 Deployment Guide

### Backend Deployment (Node.js)

**Recommended Platforms**: Railway, Render, Heroku, DigitalOcean

1. **Set Environment Variables** on your hosting platform
2. **Configure DNS Servers** (already handled in `server.js`):
   ```javascript
   dns.setServers(["1.1.1.1", "8.8.8.8"])
   ```
3. **Update CORS Origin** in `src/app.js` to your frontend domain
4. **Deploy Command**: `node server.js`

### Frontend Deployment (React/Vite)

**Recommended Platforms**: Vercel, Netlify, Cloudflare Pages

1. **Build the project**:
   ```bash
   npm run build
   ```
2. **Deploy `dist` folder**
3. **Set environment variables** on the platform
4. **Update Backend CORS** to allow your frontend domain

### MongoDB Atlas Setup

1. Create a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your backend server's IP or use `0.0.0.0/0` for development
3. Create a database user
4. Copy the connection string to `MONGO_URI`

### Firebase Setup

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Google Sign-In** in Authentication
3. Add your frontend domain to **Authorized domains**
4. Copy config values to frontend `.env`

### Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Get API keys from Dashboard → Settings → API Keys
3. For production, use live keys instead of test keys
4. Configure webhook URL for payment notifications (optional)

---

## 📈 Performance Optimizations

### Frontend Optimizations

- **Code Splitting**: React Router lazy loading for pages
- **Image Optimization**: Lazy loading with `loading="lazy"` attribute on AI-generated images
- **Redux Persist**: Local storage caching to avoid redundant profile API calls
- **Debounced Updates**: Prevent excessive API calls during rapid user interactions
- **Blob URLs**: Efficient iframe rendering without re-fetching code
- **Vite HMR**: Instant hot module replacement during development

### Backend Optimizations

- **Mongoose Lean Queries**: Reduced overhead for read-heavy operations
- **JWT Cookie Storage**: Eliminates localStorage XSS risks
- **DNS Server Configuration**: Custom DNS (Cloudflare 1.1.1.1, Google 8.8.8.8) for faster resolution
- **JSON Parsing**: Efficient AI response extraction with custom `extractJson` utility
- **Connection Pooling**: MongoDB driver handles connection reuse automatically

### AI Generation Optimizations

- **Retry Logic**: Up to 2 retries with explicit JSON-only instruction on failure
- **Prompt Engineering**: Structured masterPrompt reduces token waste and improves consistency
- **Response Streaming**: (Not implemented yet, but possible future enhancement)
- **Caching**: Conversation history stored to enable contextual updates without full regeneration

---

## 🔒 Security Features

### Authentication & Authorization

- **HTTP-Only Cookies**: JWT stored in HTTP-only cookies to prevent XSS attacks
- **SameSite Strict**: CSRF protection via `sameSite: "strict"` cookie attribute
- **JWT Expiration**: 2-day token expiry with automatic logout on expiration
- **Middleware Protection**: All sensitive routes protected by `isAuthorized` middleware
- **Firebase OAuth**: Delegates authentication to Google's secure OAuth2 flow

### API Security

- **CORS Configuration**: Restricted to specific frontend origin (`http://localhost:5173` or production URL)
- **Credentials Required**: `credentials: true` enforces authenticated requests
- **Request Validation**: Input validation on all endpoints (prompt existence, credit checks)
- **User Ownership Verification**: Website routes verify `user._id` matches `website.user`

### Payment Security

- **Razorpay Signature Verification**: HMAC-SHA256 signature validation prevents payment tampering
- **Order Validation**: Checks payment status to prevent double-crediting
- **Minimum Amount Enforcement**: `Math.max(amount * 100, 100)` prevents zero-rupee orders
- **Server-Side Credit Updates**: Credits only incremented after successful verification

### Data Protection

- **Environment Variables**: Sensitive keys stored in `.env` files (excluded from version control)
- **MongoDB Connection**: TLS/SSL encryption via MongoDB Atlas default configuration
- **Input Sanitization**: Mongoose schema validation prevents NoSQL injection
- **Error Handling**: Generic error messages in production to avoid information disclosure

### Iframe Security

- **Sandbox Attribute**: Generated websites run in sandboxed iframes with limited permissions
  ```javascript
  sandbox="allow-scripts allow-same-origin allow-forms"
  ```
- **Blob URL Isolation**: Each preview uses unique blob URLs with automatic cleanup

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve X Sharko AI, please follow these guidelines:

### How to Contribute

1. **Fork the repository**
   ```bash
   git fork https://github.com/yourusername/ai-website-builder.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing code style and conventions
   - Test your changes locally

4. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots for UI changes

### Development Guidelines

- **Code Style**: Use ESLint configurations provided in the project
- **Commit Messages**: Follow conventional commits (feat:, fix:, docs:, etc.)
- **Documentation**: Update README.md for new features or API changes
- **Testing**: Ensure all endpoints work before submitting PR

### Areas for Contribution

- 🐛 Bug fixes and error handling improvements
- ✨ New AI prompt templates for specific industries
- 🎨 UI/UX enhancements and animations
- 🔐 Security hardening and audits
- 📝 Documentation improvements
- 🌐 Internationalization (i18n) support
- 🧪 Unit and integration tests

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 X Sharko AI

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 👨‍💻 Author

**Created by Console Tamim**

- **Project Name**: X Sharko AI Website Builder
- **Version**: 1.0.0
- **Contact**: [Add your contact information]
- **Portfolio**: [Add your portfolio URL]

### Acknowledgments

- **OpenRouter** for providing access to state-of-the-art LLMs
- **Firebase** for seamless authentication
- **Razorpay** for secure payment processing
- **MongoDB Atlas** for reliable cloud database hosting
- **Framer Motion** for beautiful animations
- **Monaco Editor** for the incredible code editing experience

---

## 🌟 Show Your Support

If you find this project helpful, please consider:

- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** via GitHub Issues
- 💡 **Suggesting features** you'd like to see
- 📢 **Sharing** with others who might benefit

---

<div align="center">

**Built with ❤️ using React, Express, MongoDB, and AI**

[Report Bug](https://github.com/yourusername/ai-website-builder/issues) · [Request Feature](https://github.com/yourusername/ai-website-builder/issues)

</div>
