import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRCodeHandler({ link, size }) {
  return (
    <QRCodeCanvas
      value={link}      // QR code link
      size={size}        // QR code size
      bgColor="#ffffff"  // Background color
      fgColor="#000000"  // Foreground color
      level="H"          // Error correction level
    />
  );
}

export default QRCodeHandler