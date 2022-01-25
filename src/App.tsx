import React, { useState, useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import PDF from "react-pdf-js";
import SignaturePad from 'signature_pad';
import Draggable from "react-draggable";

function App() {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  let [signInput, setSignInput]: any = useState(null)
  let [postion, setPostion]: any = useState(null)


  let [button, setButton]: any = useState({
    sign: false,
    clear: false,
    revoke: false
  })

  const myRef = useRef(null);

  const onClick = () => {
    const canvas = document.getElementsByTagName('canvas')[0];
    if (canvas) {
      const ctx = canvas.getContext('2d');

      // Create circle
      const circle = new Path2D();
      circle.arc(150, 75, 50, 0, 2 * Math.PI);
      if (ctx) {
        var body = document.getElementsByClassName('App')[0];

        let elements: any = [];
        canvas.addEventListener('click', function (event) {
          var x = event.pageX - canvas.offsetLeft,
            y = event.pageY - canvas.offsetTop;
          var div = document.createElement('div');
          div.style.position = "absolute";
          div.style.left = event.pageX + 'px';
          div.style.top = event.pageY + 'px';
          div.innerHTML = `<canvas id="sig-canvas" width="620" height="160">
          Get a better browser, bro.
        </canvas>`;
          if (body) {
            body.append(div);
          }
          let canvasa = document.getElementById("sig-canvas") as HTMLCanvasElement;
          if (canvasa) {
            let canvasa = document.getElementById("sig-canvas") as HTMLCanvasElement,
              widget = new SignaturePad(canvasa, {
                minWidth: .2,
                maxWidth: 3,
              });
            if (!signInput) {
              setSignInput(widget);
              setPostion({ x: event.pageX, y: event.pageY })
            }
            widget.clear();
          }
        });
      };
    };
  }

  // useEffect(() => {
  //   let canvas = document.getElementById("sig-canvas") as HTMLCanvasElement;
  //   if (canvas) {
  //     let canvasa = document.getElementById("sig-canvas") as HTMLCanvasElement,
  //       widget = new SignaturePad(canvasa, {
  //         minWidth: .2,
  //         maxWidth: 3,
  //       });
  //     if (!signInput) {
  //       setSignInput(widget);

  //     }
  //   }

  // }, []);

  const bindSignature = () => {
    console.log('signInput', signInput)
    if (!signInput) return false;



    let image = signInput.toDataURL(),
      container = document.getElementById("img-sign"),
      img = document.createElement("img"),
      onClick = (e: any) => {
        if (container) {
          container.removeChild(e.target);
        }
      };
    if (container) {
      img.src = image;
      img.alt = "Double Click to Remove Signature";
      container.style.position = "absolute";
      container.style.width = '10px';
      container.style.height = '10px';
      container.style.left = postion.x + 'px';
      container.style.top = postion.y + 'px';
      let a = document.getElementById("sig-canvas") as HTMLCanvasElement;
      if (a) {
        a.remove()
      }
      // const canvas = document.getElementsByTagName('canvas')[0];
      // var ctx = canvas.getContext("2d");
      // if (ctx) {
      //   ctx.clearRect(0, 0, canvas.width, canvas.height);
      //   ctx.drawImage(img, 0, 0, 500, 500);
      // }

      // img.setAttribute("left", postion.x + 'px');
      // img.setAttribute("top", postion.y + 'px');
      // img.setAttribute("position", "absolute");
      // container.setAttribute("left", postion.x + 'px');
      // container.setAttribute("top", postion.y + 'px');
      // container.setAttribute("position", "absolute");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      // container.children.length ? container.removeChild(container.children[0]) : null;
      container.appendChild(img);
      // img.removeEventListener("dblclick", onClick);
      // img.addEventListener("dblclick", onClick);
    };
  }
  const renderPagination = () => {
    return (
      <>
        <button
          onClick={() => {
            let newPage = page - 1;
            newPage = newPage > 0 ? newPage : 1;
            setPage(newPage);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            let newPage = page + 1;
            newPage = newPage > pages ? pages : newPage;
            setPage(newPage);
          }}
        >
          Next
        </button>
      </>
    );
  }

  const download = () => {
    // const canvas = document.getElementsByClassName('App')[0];
    // var url = canvas.toDataURL("image/png");
    // var link = document.createElement('a');
    // link.download = 'filename.png';
    // link.href = url;
    // link.click();
  };

  return (
    <div className="App" onClick={() => { onClick() }}>
      {/* <canvas id="canvas" width="500" height="400" ></canvas> */}

      <PDF
        file="/sampleMulti.pdf"
        page={page}
        onDocumentComplete={pages => {
          console.log(pages);
          setPages(pages);
          setPage(1);
        }}
      />
      {renderPagination()}
      {/* <canvas className='signature-input' id="sig-canvas" width="620" height="160"></canvas> */}
      <div className='btn btn-success pull-left' onClick={() => bindSignature()}>Sign</div>
      <Draggable>
        <div id="img-sign" />
      </Draggable>
      {/* <button onClick={() => download()}>Download!</button> */}

    </div >
  );
}

export default App;
