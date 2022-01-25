import React, { useState, useEffect, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";
import PDF from "react-pdf-js";
import SignaturePad from "signature_pad";
import Draggable from "react-draggable";
import { useReactToPrint } from "react-to-print";
import { Rnd } from "react-rnd";

function App() {
  let [signInput, setSignInput]: any = useState(null);
  let [listSign, setListSign]: any = useState([]);

  const myRef = useRef(null);

  useEffect(() => {
    let canvas = document.getElementById("sig-canvas") as HTMLCanvasElement;
    if (canvas) {
      let canvasa = document.getElementById("sig-canvas") as HTMLCanvasElement,
        widget = new SignaturePad(canvasa, {
          minWidth: 0.2,
          maxWidth: 3,
        });
      if (!signInput) {
        setSignInput(widget);
      }
    }
  }, []);

  const bindSignature = () => {
    // if (!signInput) return false;

    let image = signInput.toDataURL();
    setListSign([...listSign, { src: image, width: "", height: "" }]);

    //   container = document.getElementById("img-sign"),
    //   img = document.createElement("img");
    // if (container) {
    //   img.src = image;
    //   img.alt = "Double Click to Remove Signature";
    // container.style.position = "absolute";
    // container.style.width = "10px";
    // container.style.height = "10px";
    // container.style.left = postion.x + "px";
    // container.style.top = postion.y + "px";
    // let a = document.getElementById("sig-canvas") as HTMLCanvasElement;
    // if (a) {
    //   a.remove();
    // }
    // const canvas = document.getElementsByTagName("canvas")[0];
    // var ctx = canvas.getContext("2d");
    // if (ctx) {
    //   console.log("img", img);
    //   ctx.drawImage(img, postion.x, postion.y);
    // }

    // img.setAttribute("left", postion.x + "px");
    // img.setAttribute("top", postion.y + "px");
    // img.setAttribute("position", "absolute");
    // container.setAttribute("left", postion.x + "px");
    // container.setAttribute("top", postion.y + "px");
    // container.setAttribute("position", "absolute");
    // container.children.length
    //   ? container.removeChild(container.children[0])
    //   : null;
    // container.appendChild(img);
    // console.log("img", img);
    // img.removeEventListener("dblclick", onClick);
    // img.addEventListener("dblclick", onClick);
    // }
  };

  const handlePrint = useReactToPrint({
    content: () => myRef.current,
  });
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "solid 1px #ddd",
    // background: "#f0f0f0",
  };
  return (
    <div
      className="App"
      onClick={() => {
        // onClick();
      }}
    >
      <canvas
        className="signature-input"
        id="sig-canvas"
        width="620"
        height="160"
      ></canvas>
      <button
        className="btn btn-success pull-left"
        onClick={() => bindSignature()}
      >
        Sign
      </button>
      <button onClick={handlePrint}>Download</button>

      <div
        className="book"
        id="pdf-element"
        ref={myRef}
        style={{ position: "absolute" }}
      >
        {listSign.length > 0 &&
          listSign.map((item: any, idx: any) => {
            return (
              <Rnd
                style={style}
                default={{
                  x: 0,
                  y: 0,
                  width: 620,
                  height: 160,
                }}
                onResize={(e, direction, ref, delta, position) => {
                  // let cloneList = listSign;
                  // cloneList[idx].width = ref.offsetWidth;
                  // cloneList[idx].height = ref.offsetHeight;
                  // setListSign(cloneList);
                }}
              >
                {/* <div style={{ position: "relative" }}> */}
                <img
                  src={item.src}
                  alt=""
                  style={{ width: item.width, height: item.height }}
                />
                {/* </div> */}
              </Rnd>
            );
          })}
        <div
          className="page"
          style={
            {
              // width: "21cm",
              // minHeight: "29.7cm",
              // padding: "2cm",
              // border: "1px #D3D3D3 solid",
              // borderRadius: 5,
              // background: "white",
              // boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
            }
          }
        >
          <h1>
            HTML PDF API <span>Features</span>
          </h1>
          <div>Web fonts</div>
          <div>Base 64</div>
          <div>Header/Footer</div>
          <div>CSS and javascript</div>
          <div>URL, File or HTML String</div>
          <div>REST API</div>
        </div>
        {/* <Draggable></Draggable> */}
      </div>
    </div>
  );
}

export default App;
