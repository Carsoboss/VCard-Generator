import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode.react';
import { SketchPicker } from 'react-color';
import download from 'downloadjs';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [qrFGColor, setQrFGColor] = useState('#000000');
  const [qrBGColor, setQrBGColor] = useState('#ffffff');
  const qrRef = useRef();

  const vCardText = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
TEL;TYPE=CELL:${number}
EMAIL:${email}
END:VCARD`;

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas.toDataURL("image/png");

    download(pngUrl, `${firstName}_${lastName}.png`);
  }

  return (
    <div className="app">
      <h1>QR Code Generator</h1>
      <div className="input-form">
        <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="text" placeholder="Number" onChange={(e) => setNumber(e.target.value)} />
      </div>

      <div className="color-pickers">
        <div className="color-picker">
          <p>QR Code Color</p>
          <SketchPicker color={qrFGColor} onChange={(color) => setQrFGColor(color.hex)} />
        </div>
        <div className="color-picker">
          <p>Background Color</p>
          <SketchPicker color={qrBGColor} onChange={(color) => setQrBGColor(color.hex)} />
        </div>
      </div>

      <div ref={qrRef}>
        <QRCode
          value={vCardText}
          size={200}
          fgColor={qrFGColor}
          bgColor={qrBGColor}
          renderAs="canvas"
        />
      </div>

      <button onClick={handleDownload}>Download QR</button>
    </div>
  );
}

export default App;

