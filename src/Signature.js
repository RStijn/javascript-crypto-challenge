const _sodium = require('libsodium-wrappers');





async function ready() {
    await _sodium.ready;
}

let publicKey, privateKey;

exports.sign = async function(msg){
    await ready()
    return _sodium.crypto_sign(msg, privateKey)
}

exports.verifyingKey = async function(){
    await ready()
  
    if (privateKey == null) {
        let keyPair = _sodium.crypto_sign_keypair()

        privateKey = keyPair.privateKey
        publicKey = keyPair.publicKey
    }
  

    return publicKey}

