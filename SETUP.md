# Setup Guide - BeDrop Website

This guide will help you set up and run the BeDrop website on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Docker** (optional) - [Download](https://www.docker.com/)

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dushriane/bedrop_website.git
cd bedrop_website
```

### 2. Install Dependencies

```bash
npm install
```

This will install all the required packages including:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- All other dependencies listed in package.json

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file and add your configuration:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Generate a secret key with:
# openssl rand -base64 32

# Firebase Configuration (for push notifications)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note**: Firebase configuration is optional. The app will work without it, but push notifications won't be available.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production (Optional)

```bash
npm run build
npm start
```

## Docker Setup (Alternative)

If you prefer using Docker:

### 1. Build the Docker Image

```bash
docker build -t bedrop-app .
```

Or use the npm script:

```bash
npm run docker:build
```

### 2. Run with Docker Compose

```bash
docker-compose up
```

Or use the npm script:

```bash
npm run docker:run
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 3. Stop Docker Containers

```bash
docker-compose down
```

Or:

```bash
npm run docker:down
```

## Development Workflow

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with UI

### Project Structure

```
bedrop_website/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, register)
│   ├── dashboard/         # Protected dashboard pages
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
│
├── components/            # React components
│   ├── ui/               # Shadcn/UI components
│   └── ...               # Other components
│
├── lib/                  # Utilities and configurations
│   ├── utils.ts          # Helper functions
│   ├── constants.ts      # App constants
│   ├── validation.ts     # Zod schemas
│   └── auth.ts           # NextAuth config
│
├── features/             # Feature-specific modules
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── tests/                # Test files
├── public/               # Static files
└── docker/               # Docker configuration
```

## Testing

### Unit Tests

Run unit tests with Jest:

```bash
npm test
```

Watch mode for development:

```bash
npm run test:watch
```

### End-to-End Tests

Run Playwright tests:

```bash
npm run test:e2e
```

Run with UI:

```bash
npm run test:e2e:ui
```

## Troubleshooting

### Common Issues

**1. Port 3000 is already in use**

```bash
# Find and kill the process using port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

**2. Module not found errors**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Type errors**

```bash
# Check for TypeScript errors
npm run type-check
```

**4. Build errors**

```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

## Firebase Setup (Optional)

To enable push notifications:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a web app to your project
4. Copy the configuration values
5. Add them to your `.env` file
6. Enable Cloud Messaging in Firebase Console

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy

### Other Platforms

The app can be deployed to:
- AWS (Amplify, EC2, ECS)
- Google Cloud (Cloud Run, App Engine)
- Azure (App Service)
- Railway
- Render
- DigitalOcean

## Next Steps

1. **Create an account** - Register at http://localhost:3000/register
2. **Explore features** - Navigate through the dashboard
3. **Customize** - Modify components and styling as needed
4. **Add features** - Extend the functionality
5. **Deploy** - Deploy to your preferred platform

## Getting Help

- **Documentation**: Check the README.md
- **Issues**: Open an issue on GitHub
- **Community**: Join discussions on GitHub

## Contributing

We welcome contributions! Please see the main README.md for contribution guidelines.

---

**Happy tracking! 💧**
