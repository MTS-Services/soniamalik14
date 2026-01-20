import React from 'react';
import { useSelector } from 'react-redux';
import {
  Code,
  Zap,
  Shield,
  Smartphone,
  Palette,
  Database,
  Settings,
  Github,
  ExternalLink,
  CheckCircle,
  ArrowRight,
  Rocket,
  Terminal,
  Package,
} from 'lucide-react';

const HomeView = () => {
  const productsState = useSelector((state) => state.products);

  const features = [
    {
      icon: <Code className="h-6 w-6" />,
      title: 'React 19',
      description: 'Latest React with hooks support and modern features',
      color: 'text-blue-500',
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: 'Redux Toolkit',
      description: 'Simplified state management with Redux Toolkit',
      color: 'text-purple-500',
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: 'Tailwind CSS 4',
      description: 'Utility-first CSS framework for rapid UI development',
      color: 'text-cyan-500',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Vite',
      description: 'Lightning-fast build tool and development server',
      color: 'text-yellow-500',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'ESLint & Prettier',
      description: 'Code quality and formatting tools',
      color: 'text-green-500',
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: 'Responsive Design',
      description: 'Mobile-first responsive components',
      color: 'text-indigo-500',
    },
  ];

  const quickStartSteps = [
    {
      step: '1',
      title: 'Clone Repository',
      command: 'git clone <repository-url>',
      description: 'Clone this boilerplate to your local machine',
    },
    {
      step: '2',
      title: 'Install Dependencies',
      command: 'npm install',
      description: 'Install all required dependencies',
    },
    {
      step: '3',
      title: 'Start Development',
      command: 'npm run dev',
      description: 'Start the development server at localhost:5173',
    },
    {
      step: '4',
      title: 'Start Building',
      command: 'Edit src/pages/public/public_Home/HomeView.jsx',
      description: 'Start building your amazing application!',
    },
  ];

  const folderStructure = [
    {
      name: 'src/components/',
      description: 'Reusable UI components (common & ui folders)',
      icon: <Package className="h-4 w-4" />,
    },
    {
      name: 'src/features/',
      description: 'Redux slices and API logic (store.js, auth/, counter/, products/)',
      icon: <Database className="h-4 w-4" />,
    },
    {
      name: 'src/pages/',
      description: 'Page components organized by access level (admin/, auth/, public/)',
      icon: <Code className="h-4 w-4" />,
    },
    {
      name: 'src/router/',
      description: 'Routing configuration with guards and layouts',
      icon: <Settings className="h-4 w-4" />,
    },
    {
      name: 'src/services/',
      description: 'API services with axios instance and HTTP methods',
      icon: <ExternalLink className="h-4 w-4" />,
    },
    {
      name: 'src/utils/',
      description: 'Helper functions, validators, and utility modules',
      icon: <Terminal className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      

     
    </div>
  );
};

export default HomeView;
