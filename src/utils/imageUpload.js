import axios from "axios"

export const checkImage = (file) => {
    let err = ""
    if(!file) return err = "File does not exist."

    if(file.size > 1024 * 1024) // 1mb
    err = "The largest image size is 1mb."

    if(file.type !== 'image/jpeg' && file.type !== 'image/png' )
    err = "Image format is incorrect."
    
    return err;
}

export const imageUpload = async(images) =>{
    console.log(images)
    let imgarr=[];
    for(const item of images){
        const formData=new FormData();
        if(item.camera){
            formData.append("file",item.camera);
        }else{
        formData.append("file",item);
        }
       // formData.append("upload_present","gfikz9ba");
       // formData.append("cloud_name","dhzh0vxzv");
        formData.append("upload_preset", "upload");
       
        const data = await axios.post(
            "https://api.cloudinary.com/v1_1/dhzh0vxzv/upload",
            formData
          );


        console.log(data);
imgarr.push({public_id:data.data.public_id,url:data.data.secure_url})
    }
    console.log(imgarr);
    return imgarr;
}