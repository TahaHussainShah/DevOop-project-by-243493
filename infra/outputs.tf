output "vm_public_ip" {
  value = azurerm_linux_virtual_machine.vm.public_ip_address
}

output "frontend_url" {
  value = "http://${azurerm_linux_virtual_machine.vm.public_ip_address}:3000"
}

output "backend_url" {
  value = "http://${azurerm_linux_virtual_machine.vm.public_ip_address}:5000/api/status"
}

output "ssh_command" {
  value = "ssh -i C:\\Users\\syedt\\.ssh\\id_rsa ubuntu@${azurerm_linux_virtual_machine.vm.public_ip_address}"
}
