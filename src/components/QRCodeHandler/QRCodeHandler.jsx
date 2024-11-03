import React from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRCodeHandler({ link, size, IFUId }) {
  let val = '';
  if(IFUId){
    val = `https://www.easyifu.com/p-eIFU/${IFUId}`
  }else if(link){
    val = link
  }
  return (
    <QRCodeCanvas
      value={val}      // QR code link
      size={size}        // QR code size
      bgColor="#ffffff"  // Background color
      fgColor="#000000"  // Foreground color
      level="H"          // Error correction level
    />
  );
}

export default QRCodeHandler