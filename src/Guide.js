import { useEffect ,useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Guide() {
    const navigate = useNavigate();
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [bubbleText, setBubbleText] = useState("false");

    const handleAnimalClick = (name ,src ) => {
localStorage.setItem("supportAnimal", name);
localStorage.setItem("supportAnimal_src",src);
   
setSelectedAnimal({name ,src});
 setBubbleText("true");

 setTimeout(() => {
    setBubbleText("false");
     navigate("/Dashboard");
 }, 3000);
}

    useEffect(() => {
        fetch("http://localhost:3000/9bd186b1-44d3-4d4c-a78f-97b0ba91a44f.jpg")
            .then(response => response.blob())
            .then(blob => {
                const img = new Image();
                img.src = URL.createObjectURL(blob);
            });
    }, []);

  return (
    <div style={page}>
        <div style={container}>
            <h1 style={title}>Welcome!! very exicted to have you!! </h1>
            <p style={subtitle} >
            This is a safe space to track your emtions work on goals and understand yourself!!
            Please select an animal that represents YOU!!
            The animal will be your mascot and cheer you on!!
        
            </p>
            <div style = {animals}>
                <div style ={animalsSelection} onClick={() => handleAnimalClick("Fox","/9bd186b1-44d3-4d4c-a78f-97b0ba91a44f.jpg")}>
                    <img src="/9bd186b1-44d3-4d4c-a78f-97b0ba91a44f.jpg" alt="Fox" style={animalImg} />
                    <p>Fox</p>
                    </div>
                    <div style ={animalsSelection} onClick={() => handleAnimalClick("Dog","/912fe8d1-3d35-4b14-9c71-d8f2b61934a6.jpg")}>
                    <img src="/912fe8d1-3d35-4b14-9c71-d8f2b61934a6.jpg" alt="Dog" style={animalImg} />
                        <p>Dog</p>
                         </div>
                        <div style = {animalsSelection} onClick={() => handleAnimalClick("Penguin","/2095.jpg")}>
                            <img src="/2095.jpg" alt="Penguin" style={animalImg} />
                             <p>Penguin</p>
                              </div>
                            <div style = {animalsSelection} onClick={() => handleAnimalClick("Cat","/2026-03-04 144228.png")}>
                            <img src="/Screenshot 2026-03-04 144228.png" alt="Cat" style={animalImg} />
                            <p>Cat</p>
                          </div>
                              
                                
                            </div>
                   
            
              {bubbleText && selectedAnimal && (
          <div style={bubbleWrap}>
            <div style={bubble}>
              <div style={bubbleRow}>
                <img
                  src={selectedAnimal.src}
                  alt={selectedAnimal.name}
                  style={bubbleAvatar}
                />
                <div>
                  <div style={bubbleTitle}>
                    {selectedAnimal.name} says:
                  </div>
                  <div>"HELLO!! let work together to make your days better!!"</div>
                </div>
              </div>
              <div style={bubbleTail} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
       
const page = {
  minHeight: "100vh",
  background: "linear-gradient(180deg, #dff6f2, #edf9f6)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Georgia, serif",
};

const container = {
  width: "min(900px, calc(100% - 32px))",
  padding: 18,
  borderRadius: 18,
  background: "rgba(255,255,255,0.15)",
};

const title = { margin: 0, 
    fontSize: 32 };

const subtitle = { marginTop: 10, 
    lineHeight: 1.5,
     fontSize: 16 };


const animals = {
display: "grid",
 gridTemplateColumns: "repeat(4, 1fr)",
gap: "20px",
maxWidth: "600px",
    };
const animalsSelection = {
background: "rgba(255, 248, 220, 0.9)",
borderRadius: "12px",
padding: "16px",
textAlign: "center",
cursor: "pointer",
boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};
     
const animalImg = {
width: "100%",
height: "auto",
};

const bubbleWrap = {
    position: "fixed",
    left: 0,
    right:0,
    bottom: 20,
    display: "flex",
    justifyContent: "center",
    zIndex: 9999,
};

const bubble = {
    position: "relative",
     width: "min(520px, calc(100% - 32px))",
  background: "white",
  borderRadius: 16,
  padding: 14,
  boxShadow: "0 12px 30px rgba(0,0,0,0.2)",
};
const bubbleRow = {display: "flex", alignItems: "center", gap: 12};
const bubbleAvatar =
 {width: 40, 
    height: 40, 
    borderRadius: "50%",
     background: "#7b3b7e"
    };
const bubbleTitle = 
{fontWeight: 500,
 fontSize: "0.95rem"};
const bubbleTail = {
    position: "absolute",
    bottom: -10,
    left: 20,
    width: 18,
    height: 18,
    background: "white",
    transform: "rotate(45deg)",
};

