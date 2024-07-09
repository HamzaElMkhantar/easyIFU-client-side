import React from 'react'

const ImageBase64 = ({manufacturerLogo, width}) => {
  return (
    <img style={{width:`${width}`}} src={"data:image/jpeg;base64,"+manufacturerLogo} alt="" />
  )
}

export default ImageBase64