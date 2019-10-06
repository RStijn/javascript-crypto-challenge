const _sodium = require('libsodium-wrappers');
let theKey;



beforeAll(async() => {
    await _sodium.ready;
    theKey = _sodium.crypto_sign_keypair();
});

exports.sign = async function(msg){
    return _sodium.crypto_sign(msg, theKey.privateKey);
}

exports.verifyingKey = async function(){
    return theKey.publicKey;
}

