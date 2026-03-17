// Autor: Alejandro Arteaga
// DTO para el login de usuario, se utiliza para enviar los datos de inicio de sesión al backend
export type LoginDTO = {
  usernameOrEmail: string
  password: string
}
