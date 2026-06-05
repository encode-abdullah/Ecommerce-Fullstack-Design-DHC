const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

console.log('Installing dependencies...')

const clientDir = path.join(__dirname, 'client')
const serverDir = path.join(__dirname, 'server')

try {
  console.log('Installing server dependencies...')
  execSync('npm install', { cwd: serverDir, stdio: 'inherit' })
  
  console.log('Installing client dependencies...')
  execSync('npm install', { cwd: clientDir, stdio: 'inherit' })
  
  console.log('All dependencies installed successfully!')
} catch (error) {
  console.error('Installation failed:', error.message)
  process.exit(1)
}