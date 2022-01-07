import crypto from "crypto";

const iv = Buffer.alloc(16, 0);
const algorithm = "aes-256-gcm";

const encrypt = (body, key) => {
  if(!body) {
    throw new Error("Body could not be null or undefined");
  }
  if(!key) {
    throw new Error("Key could not be null or undefined");
  }
  if(!key.match(/[0-9a-f]{32}/)) {
    throw new Error("Key should be a 32 hexa length");
  }
  const stringBody = JSON.stringify(body);
  const encryptedBody = crypto
    .createCipheriv(algorithm, key, iv)
    .update(stringBody, "utf-8", "hex");
  return encryptedBody;
};

const decrypt = (key) => (req, res, next) => {
  if(!key) {
    throw new Error("Key could not be null or undefined");
  }
  if (!key.match(/[0-9a-f]{32}/)) {
    throw new Error("Key should be a 32 hexa length");
  }
  const encryptedBody = req.body;
  const decrypted = crypto.createDecipheriv(algorithm, key, iv)
    .update(encryptedBody, "hex", "utf-8");
  const stringDecrypted = JSON.parse(decrypted);
  req.body = stringDecrypted;
  next();
};

export default {
    encrypt,
    decrypt
}
