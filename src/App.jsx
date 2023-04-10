import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './App.css'; // Import your CSS file with class names here

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code'); // Get the canvas element
    const dataURL = canvas.toDataURL('image/png'); // Convert canvas to data URL
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = `${formData.firstName}_${formData.lastName}_qrcode.png`; // Set download name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className="App">
      <h1 className="title">QR Code Generator</h1>
      <form>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" name="firstName" onChange={handleChange} />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" name="lastName" onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" name="phoneNumber" onChange={handleChange} />
        <button type="button" onClick={downloadQRCode} className="form-button">
          Download QR Code
        </button>
      </form>
      <div className="qr-code-container">
        <QRCode
          id="qr-code" // Add an ID to the QRCode component for referencing
          value={`BEGIN:VCARD\nVERSION:3.0\nFN:${formData.firstName} ${formData.lastName}\nEMAIL:${formData.email}\nTEL:${formData.phoneNumber}\nEND:VCARD`}
          size={256}
          fgColor="#000000"
          bgColor="#FFFFFF"
          className="qr-code"
        />
      </div>
    </div>
  );
}

export default App;
