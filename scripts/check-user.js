window.onload = function () {
  const userData = JSON.parse(localStorage.getItem("user-login"));
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  // Si hay datos de usuario, se mostrará el email en la consola
  if (userData) {
    console.log("Email del usuario:", userData.email);

    // Buscar coincidencia de email en la lista de usuarios existentes
    const matchedUser = existingUsers.find(
      (user) => user.email === userData.email
    );

    // Si hay una coincidencia, mostrar los detalles del usuario
    if (matchedUser) {
      console.log("Detalles del usuario encontrado:");
      console.log("Nombre:", matchedUser.name);
      console.log("Email:", matchedUser.email);
      console.log("Contraseña:", matchedUser.password);
      console.log("Carrito:", matchedUser.cart);
    } else {
      console.log(
        "No se encontró un usuario coincidente en la lista de usuarios."
      );
    }
  } else {
    console.log("No hay usuario logueado.");
  }
};
