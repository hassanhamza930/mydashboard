const ColorSelection = ({ color, handleColorChange, selectedColor }) => {
  return (
    <div
      onClick={() => {
        handleColorChange(color.hex);
      }}
      style={{
        backgroundColor: color.hex,
        width: 30,
        height: 30,
        borderRadius: 5,
        border: selectedColor === color.hex ? "2px solid black" : "none",
      }}
    ></div>
  );
};

export default ColorSelection;
