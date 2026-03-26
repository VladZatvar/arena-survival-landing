@echo off
cd /d %~dp0\..\..
npm install
npm run check
start index.html
pause