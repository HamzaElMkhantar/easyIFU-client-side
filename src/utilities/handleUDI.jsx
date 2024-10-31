import JsBarcode from "jsbarcode";
import { convertDateToYYMMDD } from "./convertDateToYYMMDD";

export const handleUDI = (props = {}) => {
  const {
    projectInfo,
    customWidth,
    customHeight,
    customFontSize,
    marginTop,
    hideParagraph,
    activeSerialNumber,
  } = props;
  console.log({projectInfo})
  if (!projectInfo) return <p style={{ fontSize: "6px" }}>missing udi info</p>;
  if (projectInfo?.labelData) {
    const {
      udiDI,
      dateOfManufacture,
      useByDate,
      serialNumber,
      LOTNumber,
      aidc,
      haDateOfManufacture,
      hasLotNumber,
      haSerialNumber,
    } = projectInfo?.labelData;

    let handleSerialNumber = serialNumber;
    if (haSerialNumber) {
      if (activeSerialNumber) {
        handleSerialNumber = `(21)${serialNumber}-${activeSerialNumber}`;
      } else {
        handleSerialNumber = `(21)${serialNumber}`;
      }
    } else {
      handleSerialNumber = "";
    }

    let handleLotNumber = "";
    if (hasLotNumber) {
      handleLotNumber = serialNumber ? `(10)${serialNumber}` : "";
    } else {
      handleLotNumber = "";
    }

    let handleDateOfManufacture = "";
    if (haDateOfManufacture) {
      handleDateOfManufacture = dateOfManufacture
        ? `(11)${dateOfManufacture}`
        : "";
    } else {
      handleDateOfManufacture = "";
    }

    let udiData =
      (udiDI && udiDI !== "" ? "(01)" + udiDI : "") +
      (haDateOfManufacture ? dateOfManufacture : handleDateOfManufacture) +
      (useByDate && useByDate !== ""
        ? "(17)" + convertDateToYYMMDD(useByDate)
        : "") +
      (hasLotNumber ? handleLotNumber : "") +
      (haSerialNumber ? handleSerialNumber : "");

    // (hasLotNumber && LOTNumber && LOTNumber !== ""
    //   ? "(10)" + "XXXXXXXX"
    //   : "") +
    // (haSerialNumber && serialNumber && serialNumber !== ""
    //   ? "(21)" + "XXXXXXXX"
    //   : "");

    // (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
    //   ? "(11)" + "XXXXXXXX"
    //   : "") +
    let udiPI =
      (haDateOfManufacture ? handleDateOfManufacture : "") +
      (useByDate && useByDate !== ""
        ? "(17)" + convertDateToYYMMDD(useByDate)
        : "") +
      (hasLotNumber ? handleLotNumber : "") +
      (haSerialNumber ? handleSerialNumber : "");
    // (hasLotNumber && LOTNumber && LOTNumber !== ""
    //   ? "(10)" + "XXXXXXXX"
    //   : "") +
    // (haSerialNumber && serialNumber && serialNumber !== ""
    //   ? "(21)" + "XXXXXXXX"
    //   : "");

    if (projectInfo.labelData.udiFormat === "GS1") {
      if (projectInfo.labelData.udiType === "GS1 (1D Bar Code)") {
        JsBarcode("#gs1-barcode", udiData, {
          format: "CODE128",
          width: customWidth ? customWidth : 0.35, // Set the width of the bars
          height: customHeight ? customHeight : 40, // Set the height of the bars
          displayValue: true, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: customFontSize,
        });

        // console.log(udiData, udiDI, dateOfManufacture, useByDate, serialNumber, LOTNumber, aidc)
        return (
          <div style={{ textAlign: "center", width: "100%" }}>
            <svg id="gs1-barcode" style={{ width: "100%" }}></svg>
            {!hideParagraph && (
              <p
                style={{
                  fontSize: customFontSize ? customFontSize : "7px",
                  fontWeight: "600",
                }}
              >
                {udiData}
              </p>
            )}
          </div>
        );
      }
      if (projectInfo.labelData.udiType === "GS1 (Separate Bar Code)") {
        JsBarcode("#gs1-barcode-udiDI", udiDI, {
          format: "CODE128",
          width: customWidth ? customWidth : 0.35, // Set the width of the bars
          height: customHeight ? customHeight : 20, // Set the height of the bars
          displayValue: false, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: customFontSize,
        });

        JsBarcode("#gs1-barcode-udiPI", udiPI, {
          format: "CODE128",
          width: customWidth ? customWidth : 0.35, // Set the width of the bars
          height: customHeight ? customHeight : 20, // Set the height of the bars
          displayValue: true, // Show the human-readable value below the barcode
          background: "white", // Set the background color of the SVG
          lineColor: "black", // Set the color of the bars });
          fontSize: customFontSize,
        });
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "",
              alignItems: "center",
              flexWrap: "wrap",
              gridGap: "5px",
              width: "100%",
            }}
          >
            <div style={{ textAlign: "center", margin: "0" }}>
              <svg id="gs1-barcode-udiDI" style={{ width: "100%" }}></svg>
              {!hideParagraph && (
                <p
                  style={{
                    fontSize: customFontSize ? customFontSize : "6px",
                    fontWeight: "900",
                  }}
                >
                  (01){udiDI}
                </p>
              )}
            </div>
            <div style={{ textAlign: "center", margin: "0" }}>
              <svg id="gs1-barcode-udiPI" style={{ width: "100%" }}></svg>
              {!hideParagraph && (
                <p
                  style={{
                    fontSize: customFontSize ? customFontSize : "6px",
                    fontWeight: "900",
                  }}
                >
                  {udiPI}
                </p>
              )}
            </div>
          </div>
        );
      }
      // if(projectInfo.labelData.udiType == 'GS1 (Data Matrix)'){
      //     let canvas = document.createElement("canvas");
      //      bwipjs.toCanvas(canvas, {
      //       bcid: "datamatrix", // Barcode type
      //       text: aidc, // Text to encode
      //       scale: 5, // 3x scaling factor
      //       height: 10, // Bar height, in millimeters
      //       includetext: true, // Show human-readable text
      //       textxalign: "center" // Always good to set this
      //     });
      //     setImageSrc(canvas.toDataURL("image/png"));
      //   return (
      //     <div style={{display:'flex', alignItems:'center'}}>
      //       {imageSrc &&
      //         <>
      //         <img  width={"100px"} src={imageSrc} alt={`data matrix from`} />
      //         <div style={{fontSize:'12px'}}>
      //           {dateOfManufacture !== '' && <p style={{margin:'2px 10px'}}>{"(11)" + convertDateToYYMMDD(projectInfo.labelData.dateOfManufacture)}</p>}
      //           {useByDate !== '' && <p style={{margin:'2px 10px'}}>{"(17)" + convertDateToYYMMDD(projectInfo.labelData.useByDate)}</p>}
      //           {LOTNumber !== '' && <p style={{margin:'2px 10px'}}>{"(10)" + projectInfo.labelData.LOTNumber}</p>}
      //           {serialNumber !== '' && <p style={{margin:'2px 10px'}}>{"(21)" + projectInfo.labelData.serialNumber}</p>}
      //           </div>
      //         </>
      //       }
      //     </div>
      //   )
      // }
    }

    if (projectInfo.labelData.udiFormat === "HIBCC") {
      JsBarcode("#hibcc-barcode", udiData, {
        format: "CODE128",
        width: customWidth ? customWidth : 0.35, // Set the width of the bars
        height: customHeight ? customHeight : 40, // Set the height of the bars
        displayValue: true, // Show the human-readable value below the barcode
        background: "white", // Set the background color of the SVG
        lineColor: "black", // Set the color of the bars });
        fontSize: customFontSize,
      });
      return (
        <div style={{ textAlign: "center", width: "100%" }}>
          <svg id="hibcc-barcode" style={{ width: "100%" }}></svg>
          {!hideParagraph && (
            <p
              style={{
                fontSize: customFontSize ? customFontSize : "7px",
                fontWeight: "600",
              }}
            >
              {udiData}
            </p>
          )}
        </div>
      );
    }
    if (projectInfo.labelData.udiFormat === "ICCBBA") {
      JsBarcode("#iccbba-barcode", udiData, {
        format: "CODE128",
        width: customWidth ? customWidth : 0.35, // Set the width of the bars
        height: customHeight ? customHeight : 40, // Set the height of the bars
        displayValue: true, // Show the human-readable value below the barcode
        background: "white", // Set the background color of the SVG
        lineColor: "black", // Set the color of the bars });
        fontSize: customFontSize,
      });
      return (
        <div style={{ textAlign: "center", width: "100%" }}>
          <svg id="iccbba-barcode" style={{ width: "100%" }}></svg>
          {!hideParagraph && (
            <p
              style={{
                fontSize: customFontSize ? customFontSize : "7px",
                fontWeight: "600",
              }}
            >
              {udiData}
            </p>
          )}
        </div>
      );
    }
    if (projectInfo.labelData.udiFormat === "IFA") {
      JsBarcode("#ifa-barcode", udiData, {
        format: "CODE128",
        width: customWidth ? customWidth : 0.35, // Set the width of the bars
        height: customHeight ? customHeight : 40, // Set the height of the bars
        displayValue: true, // Show the human-readable value below the barcode
        background: "white", // Set the background color of the SVG
        lineColor: "black", // Set the color of the bars });
        fontSize: customFontSize,
      });
      return (
        <div style={{ textAlign: "center", width: "100%" }}>
          <svg id="ifa-barcode" style={{ width: "100%" }}></svg>
          {!hideParagraph && (
            <p
              style={{
                fontSize: customFontSize ? customFontSize : "7px",
                fontWeight: "600",
              }}
            >
              {udiData}
            </p>
          )}
        </div>
      );
    }
  }
  return null;
};
