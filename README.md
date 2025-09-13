# TETYM - Technology Education Platform

A modern, responsive web platform for Technology Education for Tomorrow's Youth & Minds (TETYM). Built with Next.js 15, React 19, and TypeScript, featuring a comprehensive educational ecosystem with courses, projects, achievements, and community features.

## 🚀 Live Demo

**Production Site:** [https://tetym.space](https://tetym.space)

## 🎯 Features

### 📚 Educational Content
- **Students Section**: Profile showcases with skills, projects, and achievements
- **Projects Showcase**: Comprehensive project gallery with technology tags and team information
- **Clubs Directory**: Student clubs with membership management and event listings
- **Achievements Gallery**: Awards, certifications, and recognition showcase
- **Blog Platform**: Tech articles, tutorials, and expert insights
- **Course Catalog**: Technology courses with detailed descriptions and enrollment

### 🎨 Design & UX
- **Modern UI/UX**: Clean, professional design with gradient themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion powered interactions and transitions
- **Consistent Branding**: TETYM-specific color schemes and visual identity
- **Accessibility**: WCAG compliant design patterns

### 🔧 Technical Features
- **Next.js 15 App Router**: Latest Next.js features with server-side rendering
- **React 19**: Modern React features and concurrent rendering
- **TypeScript**: Full type safety and enhanced developer experience
- **Tailwind CSS v4**: Utility-first styling with custom configurations
- **Framer Motion**: Professional animations and micro-interactions
- **Supabase Integration**: Database and authentication infrastructure

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, PostCSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Icons**: Heroicons
- **Package Manager**: npm

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd tetym-website
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment Setup**
Create a `.env.local` file in the root directory:
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. **Run development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open application**
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
tetym-website/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (routes)/          # Page routes
│   │   │   ├── students/      # Student profiles and listings
│   │   │   ├── projects/      # Project showcase
│   │   │   ├── clubs/         # Club directory
│   │   │   ├── achievements/  # Achievement gallery
│   │   │   ├── blog/          # Blog platform
│   │   │   ├── about/         # About page
│   │   │   └── contact/       # Contact page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components (buttons, cards, etc.)
│   │   └── custom/           # Custom components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── tailwind.config.js       # Tailwind configuration
├── next.config.js           # Next.js configuration
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue to Purple gradients
- **Secondary**: Green, Orange, Red variants
- **Neutral**: Gray scale for text and backgrounds
- **Accent**: TETYM brand colors

### Components
- **Cards**: Consistent card layouts with hover effects
- **Buttons**: Multiple variants (primary, secondary, outline)
- **Forms**: Professional form styling with validation
- **Navigation**: Responsive navigation with mobile support
- **Animations**: Smooth transitions and micro-interactions

## 🚀 Deployment

### Vercel Deployment (Current)
The application is deployed on Vercel with automatic deployments from the main branch.

**Live URL**: [https://tetym-5u2whc1nn-ali-hasanovs-projects.vercel.app](https://tetym-5u2whc1nn-ali-hasanovs-projects.vercel.app)

### Manual Deployment
```bash
# Build the application
npm run build

# Deploy to Vercel
vercel --prod
```

## 📊 Key Sections

### 🏠 Homepage
- Hero section with animated particles
- Feature cards with statistics
- Technology showcase
- Call-to-action sections

### 👥 Students
- Student profile cards with skills and achievements
- Detailed individual student pages
- Search and filter functionality
- Technology skill tags

### 🚀 Projects
- Project showcase with images and descriptions
- Technology stack information
- Team member details
- Project status and timeline

### 🎯 Clubs
- Club directory with categories
- Membership information
- Event listings and schedules
- Leadership team details

### 🏆 Achievements
- Award and recognition showcase
- Achievement categories and levels
- Detailed achievement stories
- Timeline and impact information

### 📝 Blog
- Technology articles and tutorials
- Expert insights and industry news
- Search and category filtering
- Author profiles and social sharing

### ℹ️ About & Contact
- Company history and mission
- Team member profiles
- Contact forms and information
- FAQ section

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking and safety
- **Prettier**: Code formatting (if configured)
- **Git Hooks**: Pre-commit validation (if configured)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support and questions:
- **Email**: support@tetym.az
- **Website**: [TETYM Live Site](https://tetym-5u2whc1nn-ali-hasanovs-projects.vercel.app)
- **Issues**: GitHub Issues tab

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Heroicons for beautiful icons
- Supabase for backend infrastructure

---

**Built with ❤️ for TETYM - Technology Education for Tomorrow's Youth & Minds**
