@echo off
set BACKUP_DIR=backup
if not exist %BACKUP_DIR% mkdir %BACKUP_DIR%
xcopy /E /I /Y index.html %BACKUP_DIR%\index.html
xcopy /E /I /Y style.css %BACKUP_DIR%\style.css
xcopy /E /I /Y script.js %BACKUP_DIR%\script.js
xcopy /E /I /Y README.md %BACKUP_DIR%\README.md
xcopy /E /I /Y docs %BACKUP_DIR%\docs
xcopy /E /I /Y package.json %BACKUP_DIR%\package.json
xcopy /E /I /Y package-lock.json %BACKUP_DIR%\package-lock.json
pause