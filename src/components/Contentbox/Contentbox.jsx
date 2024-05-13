import React,{useState,useEffect} from "react";
import "./Contentbox.css";

const Contentbox = () => {
  const [textval,setTeextValue]=useState(null);
  const [qrData,setQrData]=useState(``);
  const [qrSize,setQrSize]=useState(`200`);
  const [margin,setMargin]=useState(null);
  const [qzone,setQzone]=useState(null);
  const [qrColor,setQrColor]=useState('#000000');
  const [qrBgColor,setQrBgColor]=useState('#ffffff');
  const [formatType,setFormatType]=useState('png');
  
  const handleDownload = (format) => {

    if(formatType=="png")
      setFormatType("png")
    else if(formatType=="jpeg")
      setFormatType("jpeg")

      const downloadLink = document.createElement("a");
      downloadLink.href = qrData;
      downloadLink.download = `qrcode.${format}`;
      downloadLink.style.display = "none";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
  };

  useEffect(()=>{
    if(textval==null || textval=="")
      setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&margin=${margin}&color=${qrColor.slice(1)}&bgcolor=${qrBgColor.slice(1)}&format=${formatType}&data=Welcome To QRBuilder`)
    else
      setQrData(`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}&margin=${margin}&color=${qrColor.slice(1)}&bgcolor=${qrBgColor.slice(1)}&format=${formatType}&data=${textval}`)
  },[textval,qrSize,margin,qrColor,qrBgColor])


  return (
    <>
      <section className="contentbox">
        <div className="mainbox bg-[#ecf7ff] dark:bg-neutral-950 from-neutral-950 to-[#0F172A]">
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

            <textarea id='userInput' type="text" placeholder="Enter Text Here" onChange={(e)=>{setTeextValue(e.target.value)}} value={textval} />
            <h1 className="dark:text-white">Your QR Code will be generated automatically </h1>
          </div>

          <div className="displaybox">
            <div className="qrbox">
              <img src={qrData} className="qrimg" alt="QR" />
            </div>

            <div className="qrsettings ">
              <div className="dimension">
                <h1> Height X width</h1>
              <input type="number" name="size" id="size" placeholder="Enter dimension" value={qrSize} onChange={(e)=>{setQrSize(e.target.value)}}/>
              <p>Your Dimension : {qrSize}x{qrSize}</p>
              </div>
              <h1>Color</h1>
              <input type="color" name="color" id="color" placeholder="Enter QR Color" value={qrColor} onChange={(e)=>{setQrColor(e.target.value)}} />

              <h1>Backgroung Color</h1>
              <input type="color" name="bgcolor" id="bgcolor" placeholder="Enter Background color" value={qrBgColor} onChange={(e)=>{setQrBgColor(e.target.value)}}/>

              <h1>Margin</h1>
              <input type="number" name="margin" id="marginval" placeholder="Enter Margin Value" value={margin} onChange={(e)=>{ setMargin(e.target.value)}} />
              <h1>QZone</h1>
              <input type="number" name="qrzone" id="qrzone" placeholder="Enter qrzone value"  value={qzone} onChange={(e)=>{ setQzone(e.target.value)}}/>
            </div>

            <div className="qrbuttons">
            <button
            className="qrbutton"
            onClick={() => handleDownload("png")}
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/download.png"
              alt="download"
            />
            PNG
          </button>
          <button
            className="qrbutton"
            onClick={() => handleDownload("jpeg")}
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/download.png"
              alt="download"
            />
            JPEG
          </button>
            </div>


          </div>
        </div>
      </section>
    </>
  );
};

export default Contentbox;
