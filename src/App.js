import axios from 'axios';
import logo from './logo.svg';
import TaskInput from "./taskInput.js"
import TaskList from "./taskList.js"
import UIPlane from "./UIPlane.js"
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [taskList, setTaskList] = useState([]);
  const [du, setdu] = useState([]);
  const [data, setData] = useState({});
  const [dataGraph, setDataGraph] = useState({});
  const [ui, setUI] = useState({});

  function makeid(n) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < n; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  function addEdge(__dataGraph, d1, d2, updateFunc) {
    if(!(d1 in __dataGraph)) __dataGraph[d1] = [];
    if (__dataGraph[d1].includes(d2)) return;

    __dataGraph[d1].push({
      dataID: d2,
      updateFunc: updateFunc
    });
  }

  function removeEdge(d1, d2) {
    return;
//
  }

  function taskInputSubmitted(t) {
    taskList.push({
      text: t
    });

    setTaskList([... taskList]);
    addDU(t);
  }

  function addDU(t) {
    var newItem = {};
    var __du = [ ... du];
    var __data = { ... data};
    var __ui = { ... ui};

    if(t.startsWith("Detect objects")) {
      var id1 = makeid(10);
      var id2 = makeid(10);

      __data[id1] = {
        name: "Image upload",
        size: {
          rows: 1,
          numFeatures: 1
        },
        features: [
          {
            name: "image",
            type: "image"
          }
        ],
        values: [
          {
            image: null
          }
        ]
      }

      __data[id2] = {
        name: "Detected objects",
        size: {
          rows: 1,
          numFeatures: 1
        },
        features: [
          {
            name: "image",
            type: "IMAGE"
          },
          {
            name: "boundary",
            type: "rect"
          }
        ],
        values: [
          {
            image: null,
            boundary: {
              y1: null,
              x1: null,
              y2: null,
              x2: null
            }
          }
        ]
      }

      var id3 = makeid(10);
      var id4 = makeid(10);

      __ui[id3] = {
        uiIndex: 0,
      }

      __ui[id4] = {
        uiIndex: 1,
      }

      __du.push({
        dataIndex: id1,
        uiIndex: id3
      });

      __du.push({
        dataIndex: id2,
        uiIndex: id4
      })

      var __dataGraph = { ... dataGraph }

      addEdge(__dataGraph, id1, id2, async (db, callback) => {
        console.log(db[id1].values[0].image);

        var formData = new FormData();
        formData.append("image", db[id1].values[0].image);
        axios.post('http://localhost:5000/objDetection', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then((res) => {

          var f = document.createElement('img');
          f.src = "data:image/jpeg;base64," + res.data.image;

          console.log(f);
          db[id2].values[0].image = f

          setDataGraph(db);
          callback();

        });
     });

      setData(__data);
      setdu(__du);
      setUI(__ui);
      setDataGraph(__dataGraph);
    }
  }
  
  function updateDU() {
    /* todo */
  }

  function updateDataNodes(__data, dataID) {
    if(!(dataID in dataGraph)) return;

    for(var i=0;i<dataGraph[dataID].length;i++) {
      var dataID2 = dataGraph[dataID][i].dataID;

      dataGraph[dataID][i].updateFunc(__data, () => {
        updateDataNodes(__data, dataID2);
      }); // update the value of data2
    }
  }

  function onDataUpdated(dataID, dataElem) {
    var __data = {... data};
    __data[dataID] = dataElem;

    setData(__data);
    updateDataNodes(__data, dataID);
  }

  return (
    <div className="App">
      <div className='header'> AutoUI </div>
      <div className='leftPlane'> 
        <TaskList taskList={taskList}> </TaskList>
        <TaskInput onMessageSubmitted={taskInputSubmitted}> </TaskInput>
      </div>
      <div className='rightPlane'>
        <UIPlane du={du} ui={ui} data={data} onDataUpdated={onDataUpdated}> </UIPlane>
        <div className='tablePlane'>

        </div>
         </div>
    </div>
  );
}

export default App;
