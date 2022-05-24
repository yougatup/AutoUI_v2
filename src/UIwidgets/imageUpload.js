import './imageUpload.css';
import { FileUploader } from "react-drag-drop-files";

import {useState, useEffect} from 'react';

const fileTypes = ["JPG", "PNG", "GIF"];

function ImageUpload(props) {
  const [file, setFile] = useState(null);

  const handleChange = (file) => {
    console.log(file);

    var _dataElem = props.dataElem;

    _dataElem.values[0].image = file;
    props.onDataUpdated(props.dataID, _dataElem);
  };

  return (
    <div className="imageUpload">
      {
        props.dataElem.values[0].image == null ? 
         <FileUploader classes="fileUploadBox" handleChange={handleChange} name="file" types={fileTypes} />
         :
         <div className='uploadedImage'>
           <img src={URL.createObjectURL(props.dataElem.values[0].image)} />
         </div>
      }
    </div>
  );
}

export default ImageUpload;
