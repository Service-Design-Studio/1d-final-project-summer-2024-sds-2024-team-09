// generate_manifest.js

const fs = require('fs');
const path = require('path');

// Define your asset mapping here
const manifest = {
  'application.js': '/packs/application.js',
  'application.css': '/packs/application.css',
  // Add other assets as needed
};

// Path where the manifest file will be generated
const manifestPath = path.resolve(__dirname, 'public', 'packs', 'manifest.json');

// Write the manifest to JSON file
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`Manifest file generated at ${manifestPath}`);
