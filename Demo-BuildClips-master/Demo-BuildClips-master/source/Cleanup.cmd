@echo off
setlocal
CD /d "%~dp0"

::Test If script has Admin Privileges/is elevated
REG QUERY "HKU\S-1-5-19"
IF %ERRORLEVEL% NEQ 0 (
    ECHO Please run this script as an administrator
    pause
    EXIT /B 1
)
cls

REM --------- Variables ---------
SET powerShellDir=%WINDIR%\system32\windowspowershell\v1.0
echo.

echo.
echo ========= Setting PowerShell Execution Policy ========= 
%powerShellDir%\powershell.exe -NonInteractive -Command "Set-ExecutionPolicy unrestricted"
echo Setting Execution Policy Done!
echo.
cls

call %powerShellDir%\powershell.exe -Command "&'.\Setup\tasks\show-consent-message.ps1' -CleanupAzure -CleanupLocal"; exit $LASTEXITCODE
IF %ERRORLEVEL% == 1 GOTO exit
cls

call %powerShellDir%\powershell.exe -Command "&'.\Setup\tasks\show-config-xml-message.ps1' Config.Azure.xml"; exit $LASTEXITCODE
IF %ERRORLEVEL% == 1 GOTO exit
cls

call %powerShellDir%\powershell.exe -Command "&'.\Setup\tasks\show-config-xml-message.ps1' Config.Local.xml"; exit $LASTEXITCODE
IF %ERRORLEVEL% == 1 GOTO exit
cls

REM cleanup Azure
%powerShellDir%\powershell.exe -NonInteractive -command ".\setup\cleanup.azure.ps1" ".\Config.Azure.xml" 


REM cleanup Local
%powerShellDir%\powershell.exe -NonInteractive -command ".\setup\cleanup.local.ps1" ".\Config.Local.xml" 


:exit

echo.

@pause