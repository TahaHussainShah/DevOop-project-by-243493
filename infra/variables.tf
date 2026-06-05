variable "location" {
  description = "Azure region"
  type        = string
  default     = "uaenorth"
}

variable "project_name" {
  description = "Prefix for all resources"
  type        = string
  default     = "polyglot"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "Standard_D2_v4"
}

variable "ssh_public_key" {
  description = "SSH public key content"
  type        = string
  sensitive   = true
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH"
  type        = string
  default     = "0.0.0.0/0"
}
