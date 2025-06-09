const bcrypt = require ('bcrypt') // importing bcrypt dependency    


// hashing password here with bcrypt
const hash = async (textPasword) =>{ 
    const saltRounds = 10; // passing the textpassword into the hashing algorithm 10 times. more times = more secure but slower
    const hashedPassword= await bcrypt.hash(textPasword , saltRounds) // using hash method, requiring the plainpassword and how many salt rounds 
    console.log(`Hashed password: ${hashedPassword}`) 
    return hashedPassword;
}


// comparing hashed password to entered password
const verifyHashed = async (textpassword, hashedPassword) =>{
    const match = await bcrypt.match(textpassword, hashedPassword) // compares the entered pasword to the hashed password the server stored 
    console.log(`Password matched!`) 
    return match // if matched server grants access
}