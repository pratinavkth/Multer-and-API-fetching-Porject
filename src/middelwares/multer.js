const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const upload = multer({
    storage:storage,
    limits:{fieldSize:5*1024*1024},
    fileFilter:(req,file,cb)=>{
        const ext = path.extname(file.originalname).toLowerCase();
        if(ext!== '.png'&&ext!== '.jpg'&&ext!== '.jpeg'&&ext!== '.pdf'){
            return cb(new Error('Only images and PDFs are allowed'), false);
        }
        cb(null,true);
    }
})

module.exports = upload;