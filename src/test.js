import restEncryption from './index.js';
import assert from 'assert';
import sinon from 'sinon';

const key = "9ce38f65be1eb7eb3f6e19af7baed453";
const invalidKey = "8qnfkru";

describe('Testing restEncryption library', function() {
    const keyIsNullOrUndefined = "Key could not be null or undefined";
    const keyIsInvalid = "Key should be a 32 hexa length";

    describe('Encrypt message', function() {
        const bodyIsNullOrUndefined = "Body could not be null or undefined";

        it("should return be7db03c252b70f1f4 when the message to encrypt is testing", function () {
            const encryptedMessage = restEncryption.encrypt("testing", key);
            assert.equal(typeof(encryptedMessage), "string");
            assert.equal(encryptedMessage, "be7db03c252b70f1f4");
        });
        it('should return e72ba12a22363caca258d07953 when the message to encrypt is {"test": true}', function () {
            const encryptedMessage = restEncryption.encrypt({"test": true}, key);
            assert.equal(typeof(encryptedMessage), "string");
            assert.equal(encryptedMessage, "e72ba12a22363caca258d07953");
        });
        it("should return error when the message to encrypt is null", function () {
            try {
                const encryptedMessage = restEncryption.encrypt(null, key);
            } catch(e) {
                assert.equal(bodyIsNullOrUndefined, e.message);
            }
        });
        it("should return error when the message to encrypt is undefined", function () {
            try {
                let undefinedBody;
                const encryptedMessage = restEncryption.encrypt(undefinedBody, key);
            } catch (e) {
                assert.equal(bodyIsNullOrUndefined, e.message);
            }
        });
        it("should return error when the key is null", function () {
            try {
                const encryptedMessage = restEncryption.encrypt("testing", null);
            } catch (e) {
                assert.equal(keyIsNullOrUndefined, e.message);
            }
        });
        it("should return error when the key is undefined", function () {
            try {
                let undefinedKey;
                const encryptedMessage = restEncryption.encrypt("testing", undefinedKey);
            } catch (e) {
                assert.equal(keyIsNullOrUndefined, e.message);
            }
        });
        it("should return error when the key is not a 32 hexa length", function () {
            try {
                const encryptedMessage = restEncryption.encrypt("testing", invalidKey);
            } catch (e) {
                assert.equal(keyIsInvalid, e.message);
            }
        });
    })
    
    describe('Decrypt message', function() {
        const mw = restEncryption.decrypt(key);
        
        describe('request handler creation', function() {
            it('should return a function()', function() {
                assert(typeof(mw), "function");
            });

            it('should accept three arguments', function() {
                assert.equal(mw.length, 3);
            });
        });

        describe('request handler calling', function() {
            let nextSpy = sinon.spy();
           
            it("should return error when the key is null", function () {
                try {
                    const nullKeyMw = restEncryption.decrypt(null);
                    nullKeyMw({}, {}, nextSpy);
                } catch(e) {
                    assert.equal(keyIsNullOrUndefined, e.message);
                }
            });
            it("should return error when the key is undefined", function () {
                try {
                    let undefinedKey;
                    const undefinedKeyMw = restEncryption.decrypt(undefinedKey);
                    undefinedKeyMw({}, {}, nextSpy);
                } catch (e) {
                    assert.equal(keyIsNullOrUndefined, e.message);
                }
            });
            it("should return error when the key is not a 32 hexa length", function () {
                try {
                    const invalidKeyMw = restEncryption.decrypt(invalidKey);
                    invalidKeyMw({}, {}, nextSpy);
                } catch (e) {
                    assert.equal(keyIsInvalid, e.message);
                }
            });
            describe('text encrypted: testing', function() {
                nextSpy = sinon.spy();
                const fakeReq = {
                  body: "be7db03c252b70f1f4",
                };
                mw(fakeReq, {}, nextSpy);
                it("should call next() once", function () {
                    assert.equal(nextSpy.calledOnce, true);
                });
                it("should return a string", function () {
                    assert.equal(typeof(fakeReq.body), "string");
                });
                it("should return testing when the message to decrypt is be7db03c252b70f1f4", function () {
                    assert.equal(fakeReq.body, "testing");
                });

            });

            describe('json encrypted: { "test": true }', function() {
                nextSpy = sinon.spy();
                const fakeReq = {
                    body: "e72ba12a22363caca258d07953",
                };
                mw(fakeReq, {}, nextSpy);
                it("should call next() once", function () {
                    assert.equal(nextSpy.calledOnce, true);
                });
                it("should return a object", function () {
                    assert.equal(typeof(fakeReq.body), "object");
                });
                it('should return {"test": true} when the message to decrypt is e72ba12a22363caca258d07953', function () {
                    assert.deepEqual(fakeReq.body, {"test": true});
                });

            });
        });
        
  });
});
