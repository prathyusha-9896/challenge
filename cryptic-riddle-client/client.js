const axios = require('axios');

// Step 1: Retrieve the Encrypted Text and Key
const url = "http://localhost:3000/encrypt";

axios.get(url)
  .then(response => {
    if (response.status === 200) {
      const data = response.data;
      const key = data.key;
      const encryptedText = data.encrypted_text;
      console.log(`Key: ${key}`);
      console.log(`Encrypted Text: ${encryptedText}`);

      // Step 2: Decrypt the Encrypted Text
      const decryptCaesarCipher = (encryptedText, key) => {
        let decryptedText = "";
        for (let char of encryptedText) {
          if (/[a-zA-Z]/.test(char)) {
            const shift = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
            if (char >= 'a' && char <= 'z') {
              decryptedText += String.fromCharCode((char.charCodeAt(0) - shift - 97 + 26) % 26 + 97);
            } else {
              decryptedText += String.fromCharCode((char.charCodeAt(0) - shift - 65 + 26) % 26 + 65);
            }
          } else {
            decryptedText += char;
          }
        }
        return decryptedText;
      };

      const decryptedText = decryptCaesarCipher(encryptedText, key);
      console.log(`Decrypted Text: ${decryptedText}`);

      // Step 3: Verify the Decrypted Text and Submit Details
      const verifyUrl = "http://localhost:3000/verify";
      const userDetails = {
        decrypted_text: decryptedText,
        email: "user@example.com",
        phone_number: "1234567890",
        name: "User Name",
        user_submitted_code: "paste your code here"
      };

      axios.post(verifyUrl, userDetails)
        .then(verifyResponse => {
          if (verifyResponse.status === 200) {
            console.log(verifyResponse.data);
          } else {
            console.log("Failed to verify and submit details");
          }
        })
        .catch(error => {
          console.log("Error verifying and submitting details:", error);
        });
    } else {
      console.log("Failed to retrieve encrypted text and key");
    }
  })
  .catch(error => {
    console.log("Error retrieving encrypted text and key:", error);
  });
