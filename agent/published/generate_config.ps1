  #
# ===================================================================
# Purpose:           installing yarastation agent
# Parameters:        none
# Prerequests:       Administrative privilages
# Revsion:           version 0.1
# ===================================================================
#


write-host '###################################################' -ForegroundColor yellow
write-host '#####  Welcome To yaratation service installer ########' -ForegroundColor yellow
write-host '#####  ' -NoNewline -ForegroundColor yellow 
write-host 'This Script requires Administrative '  -NoNewline -ForegroundColor darkgray 
write-host '########' -ForegroundColor yellow 
write-host '#####  ' -NoNewline -ForegroundColor yellow 
write-host '########' -ForegroundColor yellow 
write-host '###################################################' -ForegroundColor yellow

if (! (Test-Path -path "ys_config.txt")) {
    write-host '[!] Config file does not exisit..' -ForegroundColor yellow
    write-host '[!] Creating config  file.' -ForegroundColor yellow
    write-host '[!] Please provide the following:.' -ForegroundColor green

    write-host '[!!] Agent token (this needs to be created from the yara station server): .' -ForegroundColor green
    $token= Read-Host 
    write-host '[!!] Temp file location (will be used for policies and loki.exe): .' -ForegroundColor green
    $tempFile= Read-Host 
    write-host '[!!] Entity Name (This MUST match the entity created in yarastation upload functon. ): .' -ForegroundColor green
    $entity= Read-Host 
    write-host '[!!] Yarastation server ip: : .' -ForegroundColor green
    $server_ip = Read-Host 

    Add-Content -path ".\ys_config.txt" ("mac_address:" + (getmac /FO CSV).split(",")[2].trim('"'))
    Add-Content -path ".\ys_config.txt" ("hostname:" + (hostname))
    Add-Content -path ".\ys_config.txt" ("OS:Windows")
    Add-Content -path ".\ys_config.txt" ("ip_add:" + (Get-NetIPAddress -AddressFamily IPV4 | findstr.exe "IPAddress").split(":")[1].trim())
    Add-Content -path ".\ys_config.txt" ("status:1")

    Add-Content -path ".\ys_config.txt" ("ys_server:" + $server_ip)
    Add-Content -path ".\ys_config.txt" ("token:" + $token)
    Add-Content -path ".\ys_config.txt" ("tempDownloadLocation=" + $tempFile)
    Add-Content -path ".\ys_config.txt" ("entity:" + $entity)
} else {
    write-host "[!] config is already created,, skipping config intiation." -ForegroundColor yellow
}