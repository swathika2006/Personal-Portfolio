// ============================================
// Database Seeder — Sample data
// ============================================
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Testimonial = require('../models/Testimonial');

// ---- Sample Data ----

const adminUser = {
  name: 'Eswari Swathika.N',
  email: 'admin@portfolio.com',
  password: 'admin123456',
  role: 'admin',
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform with payment integration, cart management, and admin dashboard.',
    longDescription: 'Built a comprehensive e-commerce platform featuring user authentication, product catalog with search and filtering, shopping cart, Stripe payment integration, order tracking, and a complete admin panel for managing products, orders, and users. Implemented responsive design for seamless mobile experience.',
    category: 'fullstack',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    githubLink: 'https://github.com/swathika2006/ecommerce-platform',
    liveLink: '#',
    features: ['User Authentication', 'Product Search & Filter', 'Shopping Cart', 'Payment Integration', 'Order Tracking', 'Admin Dashboard'],
    featured: true,
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team features.',
    longDescription: 'Developed a project management tool that enables teams to create, assign, and track tasks in real-time. Features include drag-and-drop kanban boards, deadline notifications, file attachments, and team collaboration tools.',
    category: 'fullstack',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redux'],
    githubLink: 'https://github.com/swathika2006/task-manager',
    liveLink: '#',
    features: ['Kanban Board', 'Real-time Updates', 'Team Collaboration', 'File Attachments', 'Deadline Notifications'],
    featured: true,
  },
  {
    title: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with 7-day forecasts, interactive maps, and location search.',
    longDescription: 'Created an interactive weather dashboard that displays current conditions, hourly and 7-day forecasts using the OpenWeather API. Features include location search, interactive maps, severe weather alerts, and saved favorite locations.',
    category: 'frontend',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'CSS3'],
    githubLink: 'https://github.com/swathika2006/weather-dashboard',
    liveLink: '#',
    features: ['7-Day Forecast', 'Interactive Maps', 'Location Search', 'Weather Alerts', 'Favorites'],
    featured: true,
  },
  {
    title: 'Blog Platform API',
    description: 'A RESTful API for a blog platform with authentication, CRUD operations, and commenting.',
    longDescription: 'Designed and built a robust RESTful API for a blogging platform. Supports user registration, JWT authentication, CRUD for blog posts, commenting system, categories, tags, and full-text search capabilities.',
    category: 'backend',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
    githubLink: 'https://github.com/swathika2006/blog-api',
    liveLink: '#',
    features: ['JWT Auth', 'CRUD Operations', 'Comments', 'Search', 'API Documentation'],
    featured: false,
  },
  {
    title: 'Portfolio Website',
    description: 'A modern, responsive developer portfolio with admin panel and dynamic content management.',
    longDescription: 'This very portfolio website! Built with React, Tailwind CSS, and Framer Motion on the frontend, with a Node.js/Express backend and MongoDB database. Features include dynamic project management, contact form, theme switching, and a full admin dashboard.',
    category: 'fullstack',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/swathika2006/portfolio',
    liveLink: '#',
    features: ['Responsive Design', 'Dark/Light Mode', 'Admin Dashboard', 'Contact Form', 'Animated UI'],
    featured: false,
  },
];

const skills = [
  // Frontend
  { name: 'React.js', category: 'frontend', proficiency: 90, icon: 'FaReact', order: 1 },
  { name: 'JavaScript', category: 'frontend', proficiency: 88, icon: 'SiJavascript', order: 2 },
  { name: 'TypeScript', category: 'frontend', proficiency: 75, icon: 'SiTypescript', order: 3 },
  { name: 'HTML5', category: 'frontend', proficiency: 95, icon: 'FaHtml5', order: 4 },
  { name: 'CSS3', category: 'frontend', proficiency: 90, icon: 'FaCss3Alt', order: 5 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 85, icon: 'SiTailwindcss', order: 6 },
  // Backend
  { name: 'Node.js', category: 'backend', proficiency: 85, icon: 'FaNodeJs', order: 1 },
  { name: 'Express.js', category: 'backend', proficiency: 82, icon: 'SiExpress', order: 2 },
  { name: 'Python', category: 'backend', proficiency: 78, icon: 'FaPython', order: 3 },
  { name: 'REST APIs', category: 'backend', proficiency: 88, icon: 'FaServer', order: 4 },
  // Database
  { name: 'MongoDB', category: 'database', proficiency: 82, icon: 'SiMongodb', order: 1 },
  { name: 'MySQL', category: 'database', proficiency: 75, icon: 'SiMysql', order: 2 },
  { name: 'PostgreSQL', category: 'database', proficiency: 70, icon: 'SiPostgresql', order: 3 },
  // Tools
  { name: 'Git & GitHub', category: 'tools', proficiency: 88, icon: 'FaGitAlt', order: 1 },
  { name: 'VS Code', category: 'tools', proficiency: 92, icon: 'SiVisualstudiocode', order: 2 },
  { name: 'Docker', category: 'tools', proficiency: 65, icon: 'FaDocker', order: 3 },
  { name: 'Figma', category: 'tools', proficiency: 70, icon: 'FaFigma', order: 4 },
  { name: 'Postman', category: 'tools', proficiency: 85, icon: 'SiPostman', order: 5 },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Project Lead',
    company: 'Tech University',
    message: 'Swathika is an incredibly talented developer. Her attention to detail and ability to deliver clean, functional code on time makes her a standout team member. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Rahul Kumar',
    role: 'Senior Developer',
    company: 'CodeCraft Labs',
    message: 'Working with Swathika was a great experience. She picks up new technologies quickly and always brings creative solutions to complex problems.',
    rating: 5,
  },
  {
    name: 'Ananya Iyer',
    role: 'UI/UX Designer',
    company: 'DesignFlow Studio',
    message: 'Swathika has a great eye for design and seamlessly translates mockups into pixel-perfect responsive interfaces. A pleasure to collaborate with!',
    rating: 4,
  },
];

// ---- Seed Function ----

const seedDB = async () => {
  try {
    await connectDB();
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed admin user
    await User.create(adminUser);
    console.log('👤 Admin user created (email: admin@portfolio.com, password: admin123456)');

    // Seed projects
    await Project.insertMany(projects);
    console.log(`📂 ${projects.length} projects created`);

    // Seed skills
    await Skill.insertMany(skills);
    console.log(`🎯 ${skills.length} skills created`);

    // Seed testimonials
    await Testimonial.insertMany(testimonials);
    console.log(`💬 ${testimonials.length} testimonials created`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Admin Login Credentials:');
    console.log('   Email: admin@portfolio.com');
    console.log('   Password: admin123456');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
