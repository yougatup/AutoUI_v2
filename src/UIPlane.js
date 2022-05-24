import './UIPlane.css';
import ImageUpload from './UIwidgets/imageUpload.js'
import ObjDetectionResult from './UIwidgets/objDetectionResult.js'
import {useState, useEffect} from 'react';

function UIPlane(props) {
  function renderUI(dataID, uiID){
    var dataElem = props.data[dataID];
    var uiElem = props.ui[uiID];

    if(uiElem.uiIndex == 0) {
      return <ImageUpload onDataUpdated={props.onDataUpdated}
                          dataID={dataID}
                          dataElem={dataElem}
             > </ImageUpload>
    }
    else if(uiElem.uiIndex == 1) {
      return <ObjDetectionResult dataID={dataID}
                                 dataElem={dataElem}
             > </ObjDetectionResult>

    }
  }

  return (
    <div className="UIPlane">
      {
        props.du.map( (elem) => {
          return renderUI(elem.dataIndex, elem.uiIndex);
        })
      }
    </div>
  );
}

export default UIPlane;
