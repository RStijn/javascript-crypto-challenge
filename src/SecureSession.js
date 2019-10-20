const _sodium = require('libsodium-wrappers')

async function init() {
    await _sodium.ready
}

let sleutel, serverPublicKey, serverPrivateKey
let rx, tx

module.exports = {
    setClientPublicKey: function (clientPublicKey) {
        if (sleutel != null && sleutel !== clientPublicKey) {
            throw "client public key already set"
        }
        else {
            sleutel = clientPublicKey
        }
    },

    serverPublicKey: function () {
        const keyPair = _sodium.crypto_kx_keypair()
        serverPrivateKey = keyPair.privateKey
        serverPublicKey = keyPair.publicKey

        const sharedKeys = _sodium.crypto_kx_server_session_keys(
            serverPublicKey,
            serverPrivateKey,
            sleutel
        )
        rx = sharedKeys.sharedRx
        tx = sharedKeys.sharedTx

        return serverPublicKey
    },

    decrypt: async function (ciphertext, nonce) {
        return _sodium.crypto_secretbox_open_easy(ciphertext, nonce, rx)
    },

    encrypt: async function (msg) {
        let nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES)
        let ciphertext = _sodium.crypto_secretbox_easy(msg, nonce, tx)
        return {ciphertext, nonce}
    }
}