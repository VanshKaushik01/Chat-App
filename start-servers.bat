@echo off
echo Starting Chat App Servers...
echo.

echo Killing any existing processes on ports 5001 and 5173...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5001') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5173') do taskkill /f /pid %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /f /pid %%a 2>nul

echo.
echo Starting Backend Server...
start "Backend Server" cmd /k "cd Backend && npm run dev"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd vite-project && npm run dev"

echo.
echo Servers are starting...
echo Backend will be available at: http://localhost:5001
echo Frontend will be available at: http://localhost:5173 or http://localhost:5174
echo.
echo Press any key to close this window...
pause >nul 