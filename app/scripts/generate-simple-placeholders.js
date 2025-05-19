// Simple script to generate basic HTML-based placeholder images
const fs = require('fs');
const path = require('path');

// Configuration
const width = 800;
const height = 450;

// List of placeholder images to generate
const images = [
  { filename: 'idea1.jpg', title: 'Idea 1' },
  { filename: 'idea2.jpg', title: 'Idea 2' },
  { filename: 'idea3.jpg', title: 'Idea 3' },
  { filename: 'achievement1.jpg', title: 'Achievement 1' },
  { filename: 'achievement2.jpg', title: 'Achievement 2' },
  { filename: 'achievement3.jpg', title: 'Achievement 3' },
  { filename: 'club1.jpg', title: 'Club 1' },
  { filename: 'club2.jpg', title: 'Club 2' },
  { filename: 'club3.jpg', title: 'Club 3' },
  { filename: 'blog1.jpg', title: 'Blog 1' },
  { filename: 'blog2.jpg', title: 'Blog 2' },
  { filename: 'blog3.jpg', title: 'Blog 3' },
];

// Create placeholder directory if it doesn't exist
const placeholderDir = path.join(__dirname, '..', 'public', 'placeholder');
if (!fs.existsSync(placeholderDir)) {
  fs.mkdirSync(placeholderDir, { recursive: true });
}

// Generate a simple SVG for each placeholder
images.forEach(image => {
  const { filename, title } = image;
  
  // Generate SVG content with gradient background and text
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  
  const svgContent = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
    <rect width="100%" height="100%" fill="url(#grid)" />
    <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="40" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${title}</text>
    <text x="50%" y="50%" dy="40" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" dominant-baseline="middle">BSU SSTCC</text>
  </svg>`;
  
  // Write SVG file
  const outputPath = path.join(placeholderDir, filename.replace('.jpg', '.svg'));
  fs.writeFileSync(outputPath, svgContent);
  
  console.log(`Generated: ${outputPath}`);
});

// Create a grid pattern SVG
const gridSvgContent = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.05)" stroke-width="1"/>
</svg>`;
fs.writeFileSync(path.join(placeholderDir, 'grid.svg'), gridSvgContent);

console.log('All SVG placeholder images have been generated successfully.');

// Helper function to generate random color
function getRandomColor() {
  const colors = [
    '#4f46e5', // Indigo
    '#7c3aed', // Violet
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#ef4444', // Red
    '#f59e0b', // Amber
    '#10b981', // Emerald
    '#06b6d4', // Cyan
    '#3b82f6'  // Blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
