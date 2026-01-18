# BeDrop - Bedwetting Tracking Website

A comprehensive modern web application for tracking and managing bedwetting incidents with detailed analytics and support features. Built with Next.js 14, TypeScript, and modern web technologies.

## 🚀 Features

### 🔐 User Management
- Secure authentication with NextAuth.js
- User registration and login
- Profile management and customization
- Data privacy and security

### 📝 Incident Logging
- Log bedwetting incidents with detailed information:
  - Date and time
  - Sleep and wake times
  - Quantity (small, medium, large)
  - Smell intensity
  - Mood tracking with emojis
  - Personal notes
  - Custom questions

### 📅 Calendar View
- Interactive calendar displaying incident history
- Visual markers for dry nights vs. incidents
- Month-by-month navigation
- Daily incident details

### 💧 Drink Tracker
- Log drinks with type, amount, and time
- Track daily fluid intake
- Identify patterns between drinking and incidents

### 🎯 Goal Setting & Progress
- Set personalized dry night goals
- Track progress with visual indicators
- Weekly and monthly statistics
- Celebrate achievements

### ⏰ Reminders & Notifications
- Set custom reminders for routines
- Firebase Cloud Messaging for push notifications
- Configurable repeat schedules

### 💡 Daily Tips
- Receive motivational messages
- Educational content about managing bedwetting
- Best practices and expert advice

### 📊 Data Export
- Export incident data as CSV
- Generate PDF reports for healthcare providers
- Comprehensive incident history

### 📚 Educational Resources
- MDX-based content
- Understanding bedwetting causes
- Management strategies
- When to seek professional help

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI + Headless UI
- **Animations**: Framer Motion
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation

### Features & Libraries
- **Calendar**: FullCalendar
- **Charts**: Recharts
- **Emoji Picker**: emoji-mart
- **Authentication**: NextAuth.js
- **Notifications**: Firebase Cloud Messaging
- **Export**: FileSaver.js + jsPDF
- **Content**: MDX

### Development & Testing
- **Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright
- **Linting**: ESLint + TypeScript ESLint
- **Formatting**: Prettier

### Deployment
- **Containerization**: Docker + Docker Compose
- **Build Tool**: Next.js built-in

## 📁 Project Structure

```
bedrop_website/
├── app/                      # Next.js 14 App Router
│   ├── (auth)/              # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── forgot-password/
│   ├── dashboard/           # Protected dashboard routes
│   │   ├── calendar/
│   │   ├── incidents/
│   │   ├── drinks/
│   │   ├── goals/
│   │   ├── resources/
│   │   └── settings/
│   ├── api/                 # API routes
│   │   ├── auth/
│   │   ├── incidents/
│   │   ├── drinks/
│   │   └── goals/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/              # React components
│   ├── ui/                 # Shadcn/UI components
│   ├── layout/
│   ├── calendar/
│   ├── charts/
│   ├── forms/
│   └── export/
│
├── features/               # Feature modules
│   ├── auth/
│   ├── incidents/
│   ├── drinks/
│   ├── moods/
│   └── goals/
│
├── lib/                    # Utilities
│   ├── utils.ts
│   ├── constants.ts
│   ├── validation.ts
│   ├── auth.ts
│   └── fetcher.ts
│
├── hooks/                  # Custom React hooks
├── tests/                  # Test files
├── public/                 # Static assets
├── docker/                 # Docker configuration
├── middleware.ts           # Next.js middleware
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+
- Docker (optional, for containerization)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dushriane/bedrop_website.git
   cd bedrop_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-key
   # ... other Firebase config
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

### Run with Docker

```bash
# Build and run
npm run docker:build
npm run docker:run

# Stop
npm run docker:down
```

## 🧪 Testing

### Unit Tests
```bash
npm test
npm run test:watch
```

### E2E Tests
```bash
npm run test:e2e
npm run test:e2e:ui
```

## 📝 User Stories Implemented

✅ Create and update user profile with secure storage  
✅ Log bedwetting incidents with comprehensive details  
✅ View calendar of incidents for pattern tracking  
✅ Record feelings using emojis and notes  
✅ Log drinks with timestamps  
✅ Receive daily tips and motivational messages  
✅ Set reminders with notifications  
✅ Export incident data (CSV/PDF)  
✅ Data privacy and security  
✅ Customize incident questions  
✅ Access educational resources  
✅ Set goals and track progress  

## 🎨 Design System

This project uses Shadcn/UI components built on top of Radix UI primitives, styled with Tailwind CSS. The design system includes:

- Consistent color palette
- Typography scale
- Spacing system
- Responsive breakpoints
- Dark mode support (planned)

## 🔒 Security

- Authentication via NextAuth.js
- Protected API routes
- CSRF protection
- Environment variable validation
- Secure password handling
- Data encryption (planned)

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Docker
```bash
docker build -t bedrop-app .
docker run -p 3000:3000 bedrop-app
```

### Other Platforms
The app can be deployed to any platform that supports Node.js and Next.js:
- AWS
- Google Cloud
- Azure
- Railway
- Render

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [Shadcn/UI](https://ui.shadcn.com/)
- Icons from [Heroicons](https://heroicons.com/)

## 📞 Support

For questions or issues, please open an issue on GitHub or refer to the educational resources section within the app.

## 🔮 Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Data synchronization across devices
- [ ] Healthcare provider portal
- [ ] AI-powered pattern recognition
- [ ] Community features (optional)

---

**Remember**: Bedwetting is common and manageable. This tool is designed to help you track patterns and make progress, but always consult healthcare professionals for medical advice.