import React, { useState } from "react";
import "./style.css";
import * as Color from "./Colors";

function ColorFlipper() {
  const [bgColor, setColor] = useState(Color.getRandomColor());
  const [hexInput, setHEXInput] = useState(Color.toHEX(bgColor));
  const [rgbInput, setRGBInput] = useState(Color.toRGB(bgColor));
  const [hslInput, setHSLInput] = useState(Color.toHSL(bgColor));
  const [cmykInput, setCMYKInput] = useState(Color.toCMYK(bgColor));

  function getColor() {
    if (
      0.5 >
      1 -
        (0.299 * bgColor.red + 0.587 * bgColor.green + 0.114 * bgColor.blue) /
          255
    )
      return { color: "black" };
    else return { color: "white" };
  }

  function setAll(color, target) {
    if (color) {
      color = {
        red: Math.floor(color.red),
        green: Math.floor(color.green),
        blue: Math.floor(color.blue)
      };
      console.log("Setting color ", color);
      setColor(color);
      if (target !== "hex") setHEXInput(Color.toHEX(color));
      if (target !== "cmyk") setCMYKInput(Color.toCMYK(color));
      if (target !== "rgb") setRGBInput(Color.toRGB(color));
      if (target !== "hsl") setHSLInput(Color.toHSL(color));
    }
  }

  function handleHEXChange(value) {
    setHEXInput(value);
    setAll(Color.fromHEX(value), "hex");
  }
  function handleRGBChange(value) {
    setRGBInput(value);
    setAll(Color.fromRGB(value), "rgb");
  }
  function handleHSLChange(value) {
    setHSLInput(value);
    setAll(Color.fromHSL(value), "hsl");
  }

  function handleCMYKChange(value) {
    setCMYKInput(value);
    setAll(Color.fromCMYK(value), "cmyk");
  }

  function handleChange(event) {
    let { name, value } = event.target;
    switch (name) {
      case "hex":
        handleHEXChange(value);
        break;
      case "rgb":
        handleRGBChange(value);
        break;
      case "hsl":
        handleHSLChange(value);
        break;
      case "cmyk":
        handleCMYKChange(value);
        break;
      default:
        break;
    }
  }

  function handleClick() {
    setAll(Color.getRandomColor(), "");
  }

  return (
    <div className="main-app" style={{ backgroundColor: Color.toRGB(bgColor) }}>
      <div className="input-box">
        <label htmlFor="hex" style={getColor()}>
          HEX
        </label>
        <br />
        <input
          type="text"
          name="hex"
          value={hexInput}
          style={getColor()}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="rgb" style={getColor()}>
          RGB
        </label>
        <br />
        <input
          type="text"
          name="rgb"
          id=""
          value={rgbInput}
          style={getColor()}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="hsl" style={getColor()}>
          HSL
        </label>
        <br />
        <input
          type="text"
          name="hsl"
          id=""
          value={hslInput}
          style={getColor()}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="cmyk" style={getColor()}>
          CMYK
        </label>
        <br />
        <input
          type="text"
          name="cmyk"
          id=""
          value={cmykInput}
          style={getColor()}
          onChange={handleChange}
        />
        <br />
        <button
          onClick={handleClick}
          className="custom-btn"
          style={{
            backgroundColor: Color.toRGB(Color.getOppositeColor(bgColor)),
            ...getColor()
          }}
        >
          Random Color
        </button>
      </div>
    </div>
  );
}

export default ColorFlipper;
