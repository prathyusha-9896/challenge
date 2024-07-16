const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const generateRandomKey = () => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return letters[Math.floor(Math.random() * letters.length)];
};

const caesarCipherEncrypt = (text, key) => {
  let encryptedText = '';
  const shift = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);

  for (let char of text) {
    if (/[a-zA-Z]/.test(char)) {
      if (char >= 'a' && char <= 'z') {
        encryptedText += String.fromCharCode((char.charCodeAt(0) + shift - 97) % 26 + 97);
      } else {
        encryptedText += String.fromCharCode((char.charCodeAt(0) + shift - 65) % 26 + 65);
      }
    } else {
      encryptedText += char;
    }
  }
  return encryptedText;
};

// Endpoint to generate encrypted text
app.get('/encrypt', (req, res) => {
  const key = generateRandomKey();
  const text = "The quick brown fox jumps over the lazy dog"; // Example text
  const encryptedText = caesarCipherEncrypt(text, key);

  res.json({
    key: key,
    encrypted_text: encryptedText
  });
});

// Endpoint to verify decrypted text
app.post('/verify', (req, res) => {
  const { decrypted_text, email, phone_number, name, user_submitted_code } = req.body;

  // Example validation logic (for demonstration purposes)
  const originalText = "The quick brown fox jumps over the lazy dog";
  if (decrypted_text === originalText) {
    res.json({
      message: "Success! Decrypted text is correct.",
      details: {
        email: email,
        phone_number: phone_number,
        name: name,
        user_submitted_code: user_submitted_code
      }
    });
  } else {
    res.json({ message: "Error! Decrypted text is incorrect." });
  }
});

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
