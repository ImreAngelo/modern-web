@echo off
setlocal enabledelayedexpansion

:: Load environment
@REM if exist ".env" (
@REM     for /f "tokens=1* delims==" %%A in (.env) do (
@REM         set "%%A=%%B"
@REM     )
@REM )

:: Add local IP address to cert
set ip_address_string="IPv4 Address"
set "ip_list=" 

for /f "usebackq tokens=2 delims=:" %%f in (`ipconfig ^| findstr /c:%ip_address_string%`) do (
    set "ip_list=!ip_list! %%f"
)

:: Download mkcert binary
if exist "scripts\ssl\mkcert.exe" (
    echo mkcert is installed
) else (
	echo Installing mkcert for Windows...
	powershell -command "Invoke-WebRequest -Uri 'https://dl.filippo.io/mkcert/v1.4.4?for=windows/amd64' -OutFile './scripts/ssl/mkcert.exe'"
)

:: Trust and use mkcert
scripts\\ssl\\mkcert.exe -install
scripts\\ssl\\mkcert.exe -cert-file ./services/nginx/ssl/localhost.com.crt -key-file ./services/nginx/ssl/localhost.com.key localhost 127.0.0.1 example.com !ip_list!

endlocal