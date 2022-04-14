const config = require('config');
const bcrypt = require('bcrypt');
const yourPassword = "aCMBJCh8TcTHwU4g";

bcrypt.hash(yourPassword, config.JWT.SALT_ROUNDS, (err, hash) => {
  console.log('hash', hash);
});
// lozita
//$2b$10$E1nqbZEL4Eh06
