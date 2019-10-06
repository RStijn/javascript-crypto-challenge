const _sodium = require('libsodium-wrappers');
let theKey;


exports.setKey = async function(key)
{
    theKey = key;
}


exports.decrypt = async function(ciphertext, nonce)
{
    if (theKey == null){
        throw 'no key';
	}
	await _sodium.ready;
    return _sodium.crypto_secretbox_open_easy(ciphertext, nonce, theKey);
}