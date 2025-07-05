@echo off
echo Setting up Chat App...
echo.

echo Installing backend dependencies...
cd Backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies
    pause
    exit /b 1
)

echo.
echo Installing frontend dependencies...
cd ..\vite-project
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies
    pause
    exit /b 1
)

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Create a .env file in the Backend directory
echo 2. Start MongoDB (if using local MongoDB)
echo 3. Run 'npm run dev' in the Backend directory
echo 4. Run 'npm run dev' in the vite-project directory
echo.
pause 