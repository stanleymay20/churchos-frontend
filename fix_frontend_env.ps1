# CHURCHOS™ Frontend Environment Fix Script for Windows
# Sacred Operating System for Prophetic Church Governance

Write-Host "🕊️ CHURCHOS™ Frontend Environment Setup" -ForegroundColor Green
Write-Host "Setting up sacred frontend environment..." -ForegroundColor Yellow

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

# Check if npm is available
try {
    $npmVersion = npm --version
    Write-Host "✅ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found. Please ensure npm is installed with Node.js" -ForegroundColor Red
    exit 1
}

# Check Node.js version
$nodeMajorVersion = (node --version).Split('.')[0].Substring(1)
if ([int]$nodeMajorVersion -lt 18) {
    Write-Host "❌ Node.js version 18+ required. Current version: $nodeVersion" -ForegroundColor Red
    exit 1
}

# Clean existing node_modules and package-lock.json
Write-Host "🧹 Cleaning existing dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules"
    Write-Host "✅ Removed existing node_modules" -ForegroundColor Green
}

if (Test-Path "package-lock.json") {
    Remove-Item "package-lock.json"
    Write-Host "✅ Removed existing package-lock.json" -ForegroundColor Green
}

# Clear npm cache
Write-Host "🗑️  Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force
Write-Host "✅ npm cache cleared" -ForegroundColor Green

# Install dependencies with legacy peer deps
Write-Host "📦 Installing dependencies with legacy peer deps..." -ForegroundColor Yellow
npm install --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green

# Install TypeScript 4.9.5 specifically
Write-Host "📝 Installing compatible TypeScript version..." -ForegroundColor Yellow
npm install typescript@4.9.5 --save-dev --legacy-peer-deps
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install TypeScript" -ForegroundColor Red
    exit 1
}
Write-Host "✅ TypeScript 4.9.5 installed" -ForegroundColor Green

# Create .env file if it doesn't exist
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creating .env file from template..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ .env file created. Please edit with your configuration." -ForegroundColor Green
    } else {
        Write-Host "⚠️  .env.example not found. Creating basic .env file..." -ForegroundColor Yellow
        $envContent = @"
# CHURCHOS™ Frontend Environment Variables
REACT_APP_API_URL=http://localhost:8000
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_OPENAI_API_KEY=your_openai_api_key
"@
        $envContent | Out-File -FilePath ".env" -Encoding UTF8
        Write-Host "✅ Basic .env file created. Please edit with your configuration." -ForegroundColor Green
    }
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Test TypeScript compilation
Write-Host "🧪 Testing TypeScript compilation..." -ForegroundColor Yellow
npm run type-check
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  TypeScript compilation has warnings/errors. Check the output above." -ForegroundColor Yellow
} else {
    Write-Host "✅ TypeScript compilation successful" -ForegroundColor Green
}

# Create run script
Write-Host "📝 Creating run script..." -ForegroundColor Yellow
$runScript = @"
# CHURCHOS™ Frontend Run Script
# Start the development server

Write-Host "🕊️ Starting CHURCHOS™ Frontend..." -ForegroundColor Green

# Start the development server
npm start
"@

$runScript | Out-File -FilePath "run_frontend.ps1" -Encoding UTF8
Write-Host "✅ Run script created: run_frontend.ps1" -ForegroundColor Green

# Create build script
Write-Host "📝 Creating build script..." -ForegroundColor Yellow
$buildScript = @"
# CHURCHOS™ Frontend Build Script
# Build for production

Write-Host "🕊️ Building CHURCHOS™ Frontend for production..." -ForegroundColor Green

# Build the application
npm run build

Write-Host "✅ Build complete! Files are in the build/ directory" -ForegroundColor Green
"@

$buildScript | Out-File -FilePath "build_frontend.ps1" -Encoding UTF8
Write-Host "✅ Build script created: build_frontend.ps1" -ForegroundColor Green

# Display next steps
Write-Host ""
Write-Host "🎉 CHURCHOS™ Frontend Environment Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Edit .env file with your configuration" -ForegroundColor White
Write-Host "2. Run: .\run_frontend.ps1" -ForegroundColor White
Write-Host "3. Or manually: npm start" -ForegroundColor White
Write-Host "4. Access app at: http://localhost:3000" -ForegroundColor White
Write-Host "5. Build for production: .\build_frontend.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Available Scripts:" -ForegroundColor Yellow
Write-Host "- npm start / npm run dev: Start development server" -ForegroundColor White
Write-Host "- npm run build: Build for production" -ForegroundColor White
Write-Host "- npm test: Run tests" -ForegroundColor White
Write-Host "- npm run lint: Check code quality" -ForegroundColor White
Write-Host "- npm run type-check: Check TypeScript types" -ForegroundColor White
Write-Host ""
Write-Host "📜 Sacred Technology for Prophetic Church Governance" -ForegroundColor Cyan
Write-Host "© 2024 CHURCHOS™. All rights reserved." -ForegroundColor Cyan 