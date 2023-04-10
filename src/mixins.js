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
        showCancelButton: false,
        button: false
    }).then(
        function() {},
        function(dismiss) {
            if (dismiss === 'timer') {}
        });
}

export const closeAlert = () => {
    swal.close()
}


export const setConfAlert = (title, successTitle, message, callBack) => {
    swal({
        title: title,
        text: message,
        buttons: [
            'cancel',
            'Submit'
        ],
    }).then(
        function(isConfirm) {
            if (isConfirm) {
                callBack(successTitle)
            }
        });
}