@echo off
CD app
echo Building Next.js application...
call npm run build
if %errorlevel% equ 0 (
  echo Build completed successfully.
) else (
  echo Build failed with error code %errorlevel%
)
pause
