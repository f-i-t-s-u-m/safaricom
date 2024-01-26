

import { AES, enc } from 'crypto-js'

export function encryptDate(text) {
  const cipher = AES.encrypt(text, process.env.ENCRYPTION_KEY).toString()
  return cipher 
}

export function decryptDate(encrypted) {
  const bytes = AES.decrypt(encrypted, process.env.ENCRYPTION_KEY)
   const stringRes =  bytes.toString(enc.Utf8)

   try {
     return JSON.parse(stringRes)
    } catch {
      return ""
    }

}