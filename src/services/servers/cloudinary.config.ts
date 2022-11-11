import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name:process.env.CLOUDNAME,
    api_key:process.env.APIKEY,
    api_secret:process.env.APISECRETKEY,
});

export const uploadImage = async (id:any,file:any)=>{
   const image =  await cloudinary.v2.uploader.upload(file,{
        public_id:id+"_profile",
        width:500,
        height:500,
        crop:"fill",
    });
 if(image){
    console.log(image.url);
    return image.url;
 }else{
    return 0;
 }

}