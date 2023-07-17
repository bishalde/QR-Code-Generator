import React,{useState,useEffect} from "react";
import "./Contentbox.css";

const Contentbox = () => {
  const [textval,setTeextValue]=useState(null);
  const [qrData,setQrData]=useState(``);

  useEffect(()=>{
    if(textval==null)
      setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Welcome To QRBuilder`)
    else
      setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${textval}`)
  },[textval])


  return (
    <>
      <section className="contentbox">
        <div className="mainbox">
          <div className="sliderbox">
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/link.png"
              alt="link"
            />

            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/text.png"
              alt="text"
            />

            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/new-post.png"
              alt="new-post"
            />

            <img
              width="64"
              height="64"
              src="https://img.icons8.com/arcade/64/bitcoin.png"
              alt="bitcoin"
            />

            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/speech-bubble-with-dots.png"
              alt="speech-bubble-with-dots"
            />
            <img
              width="94"
              height="94"
              src="https://img.icons8.com/3d-fluency/94/document.png"
              alt="document"
            />
            <img width="94" height="94" src="https://img.icons8.com/3d-fluency/94/contacts.png" alt="contacts"/>
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/color/48/ellipsis.png"
              alt="ellipsis"
            />
          </div>
          <div className="textbox">

            <textarea type="text" placeholder="Enter Text Here" onChange={(e)=>{setTeextValue(e.target.value)}} value={textval} />
            <h1>Your QR Code will be generated automatically</h1>
          </div>

          <div className="displaybox">
            <div className="qrbox">
              <img src={qrData} alt="QR" />
            </div>

            <div className="qrsettings">
              <div className="dimension">
              <input type="text" name="size" id="size" placeholder="Enter dimension"/>
              <p>Your Dimension : 200x200</p>
              </div>
              <input type="text" name="color" id="color" placeholder="Enter QR Color" />
              <input type="text" name="bgcolor" id="bgcolor" placeholder="Enter Background color" />

              <input type="text" name="margin" id="marginval" placeholder="Enter Margin Value" />
              <input type="text" name="qrzone" id="qrzone" placeholder="Enter qrzone value" />
            </div>

            <div className="qrbuttons">
              <button className="qrbutton"><img width="48" height="48" src="https://img.icons8.com/fluency/48/download.png" alt="download"/>PNG</button>
              <button className="qrbutton"><img width="48" height="48" src="https://img.icons8.com/fluency/48/download.png" alt="download"/>JPEG</button>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Contentbox;
