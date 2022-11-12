import bcrypt from "bcryptjs";
export const hashToken = async(token:any)=>{
    const hash =  bcrypt.hashSync(token,8);
    console.log(hash);
    return hash;
    
}