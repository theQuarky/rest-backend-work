import * as multer from "multer";
import path = require("path");
import * as _ from "lodash";

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, callback) => {
        console.log("fasdfsda: "+file.);
        callback(null, './'+Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage });

export default upload;