import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import './index.css';


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

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const downloadQRCode = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas.toDataURL("image/png");
    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${formData.firstName}-${formData.lastName}-qr-code.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="App">
      <h1 className="title">QR Code Generator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <button type="button" onClick={downloadQRCode}>
          Download QR Code
        </button>
      </form>
      <div className="qr-code-container">
        <QRCode
          id="qr-code"
          value={`BEGIN:VCARD\nVERSION:3.0\nFN:${formData.firstName} ${formData.lastName}\nEMAIL:${formData.email}\nTEL:${formData.phoneNumber}\nEND:VCARD`}
          size={256}
          level={"H"}
          includeMargin={true}
        />
      </div>
    </div>
  );
}

export default App;
