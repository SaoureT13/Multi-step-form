/**
 *
 * @param {HTMLElement} email
 * @returns boolean
 * Fonction pour verifier la conformité de l'email de l'utilisateur.
 */
export function ValidEmail(email) {
  const [name, domaine] = email.value.split("@");
  const validDomaines = ["yahoo.fr", "gmail.com", "outlook.com"];

  if (name.length >= 4 && validDomaines.includes(domaine)) {
    return true;
  } else {
    return false;
  }
}


const string = ["+", "$", "/", "r", "y", "o", "m", "'"];

export function calculateSum(char) {
  for (let c of string) {
    char = char.replaceAll(c, "");
  }
  return parseInt(char, 10);
}



