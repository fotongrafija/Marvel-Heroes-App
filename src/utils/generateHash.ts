import md5 from 'md5'



export const publicKey = process.env.VITE_PUBLIC_KEY!
const privateKey = process.env.VITE_PRIVATE_KEY!


export const generateHash = (ts: number) => {
  
  return md5(ts + privateKey + publicKey)
  
};




