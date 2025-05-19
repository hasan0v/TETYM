// Simple script to generate placeholder images for dev
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Configuration
const width = 800;
const height = 450;
const backgroundColor = '#e2e8f0';
const textColor = '#1e293b';

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

function generatePlaceholderImage(filename, title) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
  
  // Add grid pattern
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1;
  
  // Draw vertical lines
  for (let x = 0; x < width; x += 20) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  
  // Draw horizontal lines
  for (let y = 0; y < height; y += 20) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Add title text
  ctx.fillStyle = textColor;
  ctx.font = 'bold 40px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(title, width / 2, height / 2);
  
  // Add SSTCC text
  ctx.font = 'normal 24px sans-serif';
  ctx.fillText('BSU SSTCC', width / 2, height / 2 + 60);

  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  const outputPath = path.join(__dirname, 'public', 'placeholder', filename);
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Generated: ${outputPath}`);
}

// Create placeholder directory if it doesn't exist
const placeholderDir = path.join(__dirname, 'public', 'placeholder');
if (!fs.existsSync(placeholderDir)) {
  fs.mkdirSync(placeholderDir, { recursive: true });
}

// Generate all images
images.forEach(image => {
  generatePlaceholderImage(image.filename, image.title);
});

console.log('All placeholder images have been generated successfully.');
