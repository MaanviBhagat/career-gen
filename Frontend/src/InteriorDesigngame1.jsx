import  { useState } from "react";

const sofaImage = "https://via.placeholder.com/120?text=Sofa";
const tableImage = "https://via.placeholder.com/120?text=Table";
const lampImage = "https://via.placeholder.com/120?text=Lamp";
const plantImage = "https://via.placeholder.com/120?text=Plant";
const rugImage = "https://via.placeholder.com/120?text=Rug";
const artworkImage = "https://via.placeholder.com/120?text=Art";
const chandelierImage = "https://via.placeholder.com/120?text=Chandelier";
const deskLampImage = "https://via.placeholder.com/120?text=Desk+Lamp";
const floorLampImage = "https://via.placeholder.com/120?text=Floor+Lamp";

const InteriorDesignGame1 = () => {
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState("");
  const [roomLayout, setRoomLayout] = useState([]);
  const [colorChoice, setColorChoice] = useState("");
  const [lightingChoice, setLightingChoice] = useState("");
  const [accessories, setAccessories] = useState([]);
  const [roomDecorated, setRoomDecorated] = useState(false);

  const nextStep = () => {
    if (step === 1) {
      setFeedback("Great! You've arranged the furniture well.");
    } else if (step === 2) {
      setFeedback("Nice color selection! It complements the furniture.");
    } else if (step === 3) {
      setFeedback("Good choice of lighting! It adds warmth to the space.");
    } else if (step === 4) {
      setFeedback("Beautiful accessories! Your room looks great.");
      setRoomDecorated(true);
    }
    setStep(step + 1);
  };

  const isSelected = (item, list) => list.includes(item);

  const imageStyle = (selected) => ({
    width: "120px",
    margin: "0 10px",
    cursor: selected ? "default" : "pointer",
    borderRadius: "12px",
    border: selected ? "4px solid #4CAF50" : "3px dashed #ff9900",
    backgroundColor: selected ? "#d0f0c0" : "#fff8e1",
    opacity: selected ? 0.6 : 1,
  });

  const itemImages = {
    Sofa: sofaImage,
    "Coffee Table": tableImage,
    Lamp: lampImage,
    Plant: plantImage,
    Rug: rugImage,
    Artwork: artworkImage,
    Chandelier: chandelierImage,
    "Desk Lamp": deskLampImage,
    "Floor Lamp": floorLampImage,
  };

  const colorSwatch = {
    "Light Blue": "#B6E3FF",
    "Soft Grey": "#D3D3D3",
    "Mint Green": "#B8E7B3",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Comic Sans MS, cursive", backgroundColor: "#ffe0b3", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px", fontSize: "40px", color: "#ff5a5f", textShadow: "2px 2px #fff" }}>Interior Designer Quest: Level 1</h1>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "30px", color: "#4CAF50", textShadow: "1px 1px #fff" }}>Decorate a Fun Living Room</h2>
      </div>

      {step === 1 && (
        <div style={{ textAlign: "center" }}>
          <h3>Step 1: Arrange the Furniture</h3>
          <p>Click the images below to add furniture to your room.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <img src={sofaImage} alt="Sofa" style={imageStyle(isSelected("Sofa", roomLayout))} onClick={() => !isSelected("Sofa", roomLayout) && setRoomLayout([...roomLayout, "Sofa"])} />
            <img src={tableImage} alt="Coffee Table" style={imageStyle(isSelected("Coffee Table", roomLayout))} onClick={() => !isSelected("Coffee Table", roomLayout) && setRoomLayout([...roomLayout, "Coffee Table"])} />
            <img src={lampImage} alt="Lamp" style={imageStyle(isSelected("Lamp", roomLayout))} onClick={() => !isSelected("Lamp", roomLayout) && setRoomLayout([...roomLayout, "Lamp"])} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ textAlign: "center" }}>
          <h3>Step 2: Choose the Color Palette</h3>
          <p>Select a color for the walls.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            {Object.keys(colorSwatch).map((color) => (
              <button key={color} style={{ backgroundColor: colorSwatch[color], padding: "10px 20px", cursor: colorChoice === color ? "default" : "pointer", borderRadius: "12px", margin: "0 10px", border: colorChoice === color ? "4px solid #4CAF50" : "2px solid #000", opacity: colorChoice === color ? 0.6 : 1 }} onClick={() => setColorChoice(color)}>
                {color} Walls
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ textAlign: "center" }}>
          <h3>Step 3: Select Lighting</h3>
          <p>Pick a lighting style for the room.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            {[{ img: chandelierImage, label: "Chandelier" }, { img: deskLampImage, label: "Desk Lamp" }, { img: floorLampImage, label: "Floor Lamp" }].map(({ img, label }) => (
              <img key={label} src={img} alt={label} style={imageStyle(lightingChoice === label)} onClick={() => setLightingChoice(label)} />
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div style={{ textAlign: "center" }}>
          <h3>Step 4: Add Accessories</h3>
          <p>Click to add accessories to the room.</p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            {[{ img: plantImage, label: "Plant" }, { img: rugImage, label: "Rug" }, { img: artworkImage, label: "Artwork" }].map(({ img, label }) => (
              <img key={label} src={img} alt={label} style={imageStyle(isSelected(label, accessories))} onClick={() => !isSelected(label, accessories) && setAccessories([...accessories, label])} />
            ))}
          </div>
        </div>
      )}

      {roomDecorated && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h3>Your Room is Decorated!</h3>
          <div style={{ textAlign: "left", maxWidth: "500px", margin: "20px auto", backgroundColor: "#fff8e1", padding: "20px", borderRadius: "12px", border: "2px dashed #ff9900" }}>
            <h4>🛋️ Furniture:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>{roomLayout.map((item) => <img key={item} src={itemImages[item]} alt={item} style={{ width: "100px", borderRadius: "8px", border: "2px solid #4CAF50" }} />)}</div>
            <h4>🎨 Color Palette:</h4>
            <p>{colorChoice}</p>
            {colorChoice && <div style={{ width: "80px", height: "30px", backgroundColor: colorSwatch[colorChoice], border: "2px solid #4CAF50", borderRadius: "6px" }}></div>}
            <h4>💡 Lighting:</h4>
            {lightingChoice ? <img src={itemImages[lightingChoice]} alt={lightingChoice} style={{ width: "100px", borderRadius: "8px", border: "2px solid #4CAF50" }} /> : <p>None</p>}
            <h4 style={{ marginTop: "10px" }}>🖼️ Accessories:</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>{accessories.map((item) => <img key={item} src={itemImages[item]} alt={item} style={{ width: "100px", borderRadius: "8px", border: "2px solid #4CAF50" }} />)}</div>
          </div>
          <div style={{ marginTop: "20px" }}>
            <button onClick={() => window.alert("Going to Next Level!")} style={{ padding: "14px 28px", backgroundColor: "#4CAF50", color: "white", border: "2px solid #000", borderRadius: "12px", fontSize: "18px", cursor: "pointer" }}>
              🚀 Next Level
            </button>
          </div>
        </div>
      )}

      {!roomDecorated && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={nextStep} style={{ padding: "14px 28px", backgroundColor: "#4CAF50", color: "white", borderRadius: "12px", fontSize: "18px", cursor: "pointer", border: "2px solid #000" }}>
            {step < 4 ? "Next Step" : "View Room"}
          </button>
        </div>
      )}
    </div>
  );
};

export default InteriorDesignGame1;