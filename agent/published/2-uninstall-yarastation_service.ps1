# Delete and stop the service if it already exists.
if (Get-Service yarastation -ErrorAction SilentlyContinue) {
  $service = Get-WmiObject -Class Win32_Service -Filter "name='yarastation'"
  $service.StopService()
  Start-Sleep -s 1
  $service.delete()
}
