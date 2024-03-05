const fs = require('fs');

export default function deleteFile(path){
    try
        {
            fs.unlinkSync(path);
            console.log("File deleted");
        }
        catch(err)
        {
            console.log(err.message);
        }
}