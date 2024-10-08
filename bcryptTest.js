// import bcrypt from 'bcrypt';

// const plainPassword = 'contraseña';

// // Crear un nuevo hash para la contraseña
// bcrypt.hash(plainPassword, 10, (err, newHashedPassword) => {
//     if (err) {
//         console.error('Error hashing password:', err);
//     } else {

//         // Comparar la contraseña en texto plano con el nuevo hash
//         bcrypt.compare(plainPassword, newHashedPassword, (err, result) => {
//             if (err) {
//                 console.error('Error comparing passwords:', err);
//             } else {
//                 console.log('Password match with new hash:', result); 
//             }
//         });
//     }
// });