// // convert-heic.js
// const fs = require('fs');
// const path = require('path');
// const sharp = require('sharp');

// const inputDir = './src/Assets/images/Photos-001';
// const outputDir = './src/Assets/images/Photos-001';

// fs.readdirSync(inputDir).forEach(file => {
//   const ext = path.extname(file).toLowerCase();
//   if (ext === '.heic') {
//     const inputPath = path.join(inputDir, file);
//     const outputFileName = path.basename(file, '.heic') + '.jpg';
//     const outputPath = path.join(outputDir, outputFileName);

//     sharp(inputPath)
//       .jpeg({ quality: 90 })
//       .toFile(outputPath)
//       .then(() => console.log(`Converted: ${file} -> ${outputFileName}`))
//       .catch(err => console.error(`Failed to convert ${file}:`, err));
//   }
// });

// console.log('Conversion process completed.');

const fs = require('fs');
const path = require('path');
const decode = require('@saschazar/wasm-heic');

const inputDir = path.join(__dirname, 'Assets/images/Photos-001');
const outputDir = path.join(__dirname, 'Assets/images/Converted-JPGs');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdirSync(inputDir).forEach(async (file) => {
  if (file.toLowerCase().endsWith('.heic')) {
    const inputPath = path.join(inputDir, file);
    const buffer = fs.readFileSync(inputPath);

    try {
      const decoded = await decode(buffer);
      const jpegData = decoded.data;
      const jpegFilePath = path.join(outputDir, file.replace(/\.heic$/i, '.jpg'));

      fs.writeFileSync(jpegFilePath, Buffer.from(jpegData));
      console.log(`✅ Converted ${file} → ${jpegFilePath}`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err);
    }
  }
});