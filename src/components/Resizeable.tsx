import React, { useState } from "react";
import { Resizable } from "react-resizable";
import "react-resizable/css/styles.css";

function ResizableDiv() {
  const [width, setWidth] = useState(200); // Initial width of the div
  const [height, setHeight] = useState(200); // Initial height of the div

  return (
    <div className="resizable-container">
      <Resizable
        width={width}
        height={height}
        onResize={(e, { size }) => {
          setWidth(size.width);
          setHeight(size.height);
        }}
        minConstraints={[100, 100]} // Optional: Minimum width and height
        maxConstraints={[400, 400]} // Optional: Maximum width and height
      >
        <div className="resizable-content">hello world</div>
      </Resizable>
    </div>
  );
}

export default ResizableDiv;
