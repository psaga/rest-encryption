# restEncryption
This library will help secure web application requests over http, using AES key for ciphering operations.

### Installing Docker
This project uses Docker so if you haven't installed before please visit https://docs.docker.com/engine/install/ and follow the instructions for your platform.

### Building the docker image
At the project root use the command:

    docker build . -t psaga/restencryption
*The build will use node 14.17.0*

### Running the image
	docker run psaga/restencryption

*The command to run the tests is set as default when the image is initialized.*

## Unit Tests
There are 18 tests developed that allow to validate the operation of the library, covering the encryption and decryption features.

#### Encrypt message
 1. An encrypt simulation with a defined plain text body.
 2. An encrypt simulation with a defined json body.
 3. A message to encrypt cannot be null.
 4. A message to encrypt cannot be undefined.
 5. Key parameter to encrypt cannot be null.
 6. Key parameter to encrypt cannot be undefined.
 7. Key parameter should be compatible with the algorithm used (aes-256-gcm).
#### Decrypt message
8. Decrypt function should return a function like a middleware is.
9. The returned function must accept three arguments.
10. Key parameter to decrypt cannot be null.
11. Key parameter to decrypt cannot be undefined.
12. Key parameter to decrypt should be compatible with the algorithm used (aes-256-gcm).
13. A decrypt simulation with a plain text encrypted should call next() once.
14. A decrypt simulation with a plain text encrypted should return a string
15. A decrypt simulation with a plain text encrypted should return exactly the text encrypted.
16. A decrypt simulation with a json encrypted should call next() once.
17. A decrypt simulation with a json encrypted should return a string
18. A decrypt simulation with a json encrypted should return exactly the json encrypted.

