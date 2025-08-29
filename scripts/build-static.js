//// scripts/build-static.js
//const fs = require('fs');
//const path = require('path');
//const { execSync } = require('child_process');
//
//console.log('🚀 Starting static build process...');
//
//const apiPath = path.join(__dirname, '..', 'src', 'app', 'api');
//const apiBackupPath = path.join(__dirname, '..', 'src', 'app', 'api-backup');
//
//try {
//  // Step 1: Backup API directory if it exists
//  if (fs.existsSync(apiPath)) {
//    console.log('📁 Temporarily moving API directory...');
//    fs.renameSync(apiPath, apiBackupPath);
//  }
//
//  // Step 2: Set environment variables and build
//  console.log('🔨 Building static export...');
//  const env = {
//    ...process.env,
//    NEXT_PUBLIC_STATIC_BUILD: 'true',
//    NODE_ENV: 'production'
//  };
//
//  execSync('next build', {
//    stdio: 'inherit',
//    env: env
//  });
//
//  console.log('✅ Static build completed successfully!');
//
//} catch (error) {
//  console.error('❌ Build failed:', error.message);
//  process.exit(1);
//} finally {
//  // Step 3: Always restore API directory
//  if (fs.existsSync(apiBackupPath)) {
//    console.log('🔄 Restoring API directory...');
//    if (fs.existsSync(apiPath)) {
//      fs.rmSync(apiPath, { recursive: true, force: true });
//    }
//    fs.renameSync(apiBackupPath, apiPath);
//    console.log('✅ API directory restored!');
//  }
//}
//
//console.log('🎉 Process completed!');





//// scripts/build-static.js
//const fs = require('fs');
//const path = require('path');
//const { execSync } = require('child_process');
//
//console.log('🚀 Starting static build process...');
//
//const apiPath = path.join(__dirname, '..', 'src', 'app', 'api');
//const tempApiPath = path.join(__dirname, '..', 'temp-api-backup'); // Move outside src/app
//
//try {
//  // Step 1: Backup API directory if it exists
//  if (fs.existsSync(apiPath)) {
//    console.log('📁 Temporarily moving API directory outside app folder...');
//    fs.renameSync(apiPath, tempApiPath);
//  }
//
//  // Step 2: Set environment variables and build
//  console.log('🔨 Building static export...');
//  const env = {
//    ...process.env,
//    NEXT_PUBLIC_STATIC_BUILD: 'true',
//    NODE_ENV: 'production'
//  };
//
//  execSync('next build', {
//    stdio: 'inherit',
//    env: env
//  });
//
//  console.log('✅ Static build completed successfully!');
//
//} catch (error) {
//  console.error('❌ Build failed:', error.message);
//  process.exit(1);
//} finally {
//  // Step 3: Always restore API directory
//  if (fs.existsSync(tempApiPath)) {
//    console.log('🔄 Restoring API directory...');
//    if (fs.existsSync(apiPath)) {
//      fs.rmSync(apiPath, { recursive: true, force: true });
//    }
//    fs.renameSync(tempApiPath, apiPath);
//    console.log('✅ API directory restored!');
//  }
//}
//
//console.log('🎉 Process completed!');




//// scripts/build-static.js
//const fs = require('fs');
//const path = require('path');
//const { execSync } = require('child_process');
//
//console.log('🚀 Starting static build process...');
//
//const apiPath = path.join(__dirname, '..', 'src', 'app', 'api');
//const tempApiPath = path.join(__dirname, '..', 'temp-api-backup');
//const nextCachePath = path.join(__dirname, '..', '.next');
//
//try {
//  // Step 1: Clean build cache to remove any references to API routes
//  if (fs.existsSync(nextCachePath)) {
//    console.log('🧹 Cleaning build cache...');
//    fs.rmSync(nextCachePath, { recursive: true, force: true });
//  }
//
//  // Step 2: Backup API directory if it exists
//  if (fs.existsSync(apiPath)) {
//    console.log('📁 Temporarily moving API directory outside app folder...');
//    fs.renameSync(apiPath, tempApiPath);
//  }
//
//  // Step 3: Set environment variables and build
//  console.log('🔨 Building static export...');
//  const env = {
//    ...process.env,
//    NEXT_PUBLIC_STATIC_BUILD: 'true',
//    NODE_ENV: 'production'
//  };
//
//  execSync('next build', {
//    stdio: 'inherit',
//    env: env
//  });
//
//  console.log('✅ Static build completed successfully!');
//
//} catch (error) {
//  console.error('❌ Build failed:', error.message);
//  process.exit(1);
//} finally {
//  // Step 4: Always restore API directory
//  if (fs.existsSync(tempApiPath)) {
//    console.log('🔄 Restoring API directory...');
//    if (fs.existsSync(apiPath)) {
//      fs.rmSync(apiPath, { recursive: true, force: true });
//    }
//    fs.renameSync(tempApiPath, apiPath);
//    console.log('✅ API directory restored!');
//  }
//}
//
//console.log('🎉 Process completed!');





// scripts/build-static.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting static build process...');

const apiPath = path.join(__dirname, '..', 'src', 'app', 'api');
const tempApiPath = path.join(__dirname, '..', 'temp-api-backup');
const nextCachePath = path.join(__dirname, '..', '.next');

try {
  // Step 1: Clean build cache to remove any references to API routes
  if (fs.existsSync(nextCachePath)) {
    console.log('🧹 Cleaning build cache...');
    fs.rmSync(nextCachePath, { recursive: true, force: true });
  }

  // Step 2: Backup API directory if it exists
  if (fs.existsSync(apiPath)) {
    console.log('📁 Temporarily moving API directory outside app folder...');
    fs.renameSync(apiPath, tempApiPath);
  }

  // Step 3: Set environment variables and build
  console.log('🔨 Building static export...');
  const env = {
    ...process.env,
    NEXT_PUBLIC_STATIC_BUILD: 'true',
    NODE_ENV: 'production'
  };

  execSync('next build', {
    stdio: 'inherit',
    env: env
  });

  console.log('✅ Static build completed successfully!');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
} finally {
  // Step 4: Always restore API directory
  if (fs.existsSync(tempApiPath)) {
    console.log('🔄 Restoring API directory...');
    if (fs.existsSync(apiPath)) {
      fs.rmSync(apiPath, { recursive: true, force: true });
    }
    fs.renameSync(tempApiPath, apiPath);
    console.log('✅ API directory restored!');
  }
}

console.log('🎉 Process completed!');