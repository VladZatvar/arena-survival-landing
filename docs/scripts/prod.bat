@echo off
cd /d %~dp0\..\..
npm install
npm run check
npm run docs
git status
pause