import './objDetectionResult.css';
import {useState, useEffect} from 'react';

function ObjDetectionResult(props) {
  return (
    <div className="objDetectionResult">
      {
        props.dataElem.values[0].image == null ? '' 
        : 
          <div className='objDetectionImage'>
            <img src={URL.createObjectURL(props.dataElem.values[0].image)} />
          </div>
      }
    </div>
  );
}

export default ObjDetectionResult;
