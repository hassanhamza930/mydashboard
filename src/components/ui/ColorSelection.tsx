const ColorSelection = ({ color, handleColorChange, selectedColor }) => {
  return (
    <div
      className={` cursor-pointer
    ${selectedColor === color.hex ? "shadow-md" : ""}
    `}
      onClick={() => {
        handleColorChange(color.hex);
      }}
      style={{
        backgroundColor: color.hex,
        width: 30,
        height: 30,
        borderRadius: 5,
        border: selectedColor === color.hex ? "2px solid gray" : "none",
      }}
    ></div>
  );
};

export default ColorSelection;
