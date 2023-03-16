import React, { useState, useEffect } from "react";
import QRCode from "qrcode";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [qrCodeUrl, setQRCodeUrl] = useState("");

  useEffect(() => {
    const generateQRCode = async () => {
      const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${firstName} ${lastName}
TEL;TYPE=CELL:${phoneNumber}
EMAIL;TYPE=INTERNET:${email}
END:VCARD`;

      try {
        const qrCodeUrl = await QRCode.toDataURL(vcard, { width: 256 });
        setQRCodeUrl(qrCodeUrl);
      } catch (error) {
        console.log(error);
      }
    };

    generateQRCode();
  }, [firstName, lastName, email, phoneNumber]);

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.download = `${firstName}_${lastName}.png`;
    link.href = qrCodeUrl;
    link.click();
  };

  return (
    <div>
      <h1>QR Code Generator</h1>
      <form>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>
      </form>
      {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" />}
      {qrCodeUrl && (
        <button onClick={downloadQRCode}>Download QR Code</button>
      )}
    </div>
  );
}

export default App;

