import CryptoJS from "crypto-js";
import swal from 'sweetalert';
export function encryptHandle(handle) {
    return encodeURIComponent(CryptoJS.AES.encrypt(handle, 'dotseemple').toString())
}

/**
 * Decrypts handle from being encrypted via the admin
 * @param {String} handle 
 * @returns 
 */
export function decryptHandle(handle) {
    return CryptoJS.AES.decrypt(decodeURIComponent(handle), 'dotseemple').toString(CryptoJS.enc.Utf8)
}

export const setAlert = (title, message) => {
    swal({
        title: title,
        text: message,
        timer: 2500,
        showCancelButton: false,
        button: false
    }).then(
        function() {},
        function(dismiss) {
            if (dismiss === 'timer') {}
        });
}