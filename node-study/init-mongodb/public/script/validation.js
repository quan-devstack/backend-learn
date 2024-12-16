const checkPassword = () => {
  const password = document.getElementById("password").value;
  const retype = document.getElementById("retype").value;
  const error = document.getElementById("retype-error");

  if (retype != password) {
    error.innerHTML = "Password is not match !";
    return false;
  } else {
    error.innerHTML = "";
    return true;
  }
};
