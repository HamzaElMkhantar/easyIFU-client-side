import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
// import sidebarBG from "../../assets/sideBrdBG.svg";
import headerLogo from "../../assets/sideBar_logo.png";
import PublicSideBar from "../../components/header/PublicSideBar";
import { findPublicIFUAction } from "../../redux/actions/IFUsActions";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import lottieLoader from "../../assets/lotties/spinner.json";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopySharpIcon from '@mui/icons-material/ContentCopySharp';

import { Worker, Viewer} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const base64ToBlob = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'application/pdf' });
};

const PublicIFU = () => {
  const { IFUId } = useParams();

  const {
    findPublicIFURequest,
    findPublicIFUSuccess,
    findPublicIFUFail,
    findPublicIFUData,
  } = useSelector((state) => state.findPublicIFU);
  console.log({
    findPublicIFURequest,
    findPublicIFUSuccess,
    findPublicIFUFail,
    findPublicIFUData,
  });
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfData, setPdfData] = useState(null);

  const [filerReader, setFileReader] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [allVersion, setAllVersion] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findPublicIFUAction(IFUId));
  }, []);

  useEffect(() => {
    if (findPublicIFUSuccess) {
      setPdfData(findPublicIFUData.pdfData)
      // Decode base64 PDF data
      const pdfBlob = new Blob(
        [
          Uint8Array.from(atob(findPublicIFUData.pdfData), (c) =>
            c.charCodeAt(0)
        ),
      ],
      {
        type: "application/pdf",
      }
    );
    // Create URL for the blob
    // const pdfUrl = URL.createObjectURL(pdfBlob);
    // setPdfFile(pdfUrl);

    try {
      console.log("Base64 length:", findPublicIFUData.pdfData.length);
      const blob = base64ToBlob(findPublicIFUData.pdfData);
      console.log("Blob size:", blob.size); // Check blob size
      const pdfUrl = URL.createObjectURL(blob);
      console.log("Blob URL:", pdfUrl);
      // window.open(pdfUrl); // This should open the PDF directly

      setPdfFile(pdfUrl);
  } catch (error) {
      console.error("Error creating PDF Blob:", error);
  }
    
            //  // Decode base64 PDF data
            //  const binaryString = atob(findPublicIFUData.pdfData);
            //  const len = binaryString.length;
            //  const bytes = new Uint8Array(len);
     
            //  for (let i = 0; i < len; i++) {
            //    bytes[i] = binaryString.charCodeAt(i);
            //  }
     
            //  const mobilePdfBlob = new Blob([bytes], { type: 'application/pdf' });
            //  console.log("Blob created:", mobilePdfBlob);
             
            //  const url = URL.createObjectURL(mobilePdfBlob);
            //  console.log("Blob URL:", pdfUrl);
            //  setFileReader(url);


    // const read = new FileReader();
    // read.readAsDataURL(pdfBlob);
    // read.onload = (e) => {
    //   setFileReader(e.target.result);
    // } 

      setMetadata(findPublicIFUData.metadata);
      setAllVersion(findPublicIFUData.allVersions);
      // Cleanup the object URL after component unmounts
      return () => {
        URL.revokeObjectURL(pdfUrl);
      };
    }
  }, [findPublicIFUSuccess, findPublicIFUFail, findPublicIFUData]);

   // Convert base64 PDF data to a Blob URL
   const getBlobUrl = () => {
    if (!pdfData) return null;
    const pdfBlob = new Blob([new Uint8Array(atob(pdfData).split("").map(c => c.charCodeAt(0)))], { type: 'application/pdf' });
    return URL.createObjectURL(pdfBlob);
  };

  const pdfUrl = getBlobUrl();

  // useEffect(() => {
  //   if (findPublicIFUSuccess && findPublicIFUData?.pdfData) {
  //     try {
  //       const pdfBlob = new Blob(
  //         [Uint8Array.from(atob(findPublicIFUData.pdfData), (c) => c.charCodeAt(0))],
  //         { type: "application/pdf" }
  //       );
  //       const pdfUrl = URL.createObjectURL(pdfBlob);
  //       // const _ = URL.createObjectURL(new Blob(
  //       //   [Uint8Array.from(atob(pdfFile), (c) => c.charCodeAt(0))],
  //       //   { type: "application/pdf" }
  //       // ));
  //       setPdfFile(pdfUrl);
  //       setMetadata(findPublicIFUData.metadata);
  //       setAllVersion(findPublicIFUData.allVersions);
  //     } catch (error) {
  //       console.error("Error creating PDF Blob:", error);
  //     }
  //   }
  // }, [findPublicIFUSuccess, findPublicIFUData]);

  return (
    <>
      {!findPublicIFURequest ? (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
          <PublicSideBar metaData={metadata} allVersion={allVersion} />
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Shadow effect
            }}
          >
            <div style={{ overflow: "auto", width: "100%", height: "100dvh" }}>
              <div
                className="isLaptop"
                style={{
                  overflow: "auto",
                  width: "100%",
                  height: "100dvh",
                  textAlin: "center",
                }}
              >
                <object
                  data={pdfFile}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                >
                  <p style={{ marginBottom: "10px" }}>
                    Your browser does not support PDFs.{" "}
                    <a
                      href={pdfFile}
                      download={`${metadata?.IFUName || "eIFU"} version${
                        metadata?.ifuVerssion
                      }.pdf`}
                    >
                      Download the eIFU
                    </a>
                  </p>
                </object>
              </div>

              <div
                style={{
                  height: "100dvh",
                  width: "100dvw",
                  paddingTop: "80px",
                  margin:'auto'
                }}
                className="isMobile"
              >
                <div
                  className=""
                  style={{
                    height: "80px",
                    width: "100%",
                    backgroundColor: "#021d41",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                    position: "fixed",
                    top: "0",
                    zIndex: 1000,
                  }}
                >
                  <div
                    className="container"
                    style={{
                      height: "80px",
                      width: "100%",
                      backgroundColor: "#021d41",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px 0",
                    }}
                  >
                    <Link to="/">
                      <img
                        src={headerLogo}
                        style={{ width: "70px" }}
                        alt="Sidebar Background"
                      />
                    </Link>
                  </div>
                </div>  
                  <Worker style={{border:'0'}} workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
                    <div className=""
                      style={{
                        width: "100dvw",
                        height: "100%",
                        overflowY: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: "10px",
                        border:'0'
                      }}
                    >
                      {pdfFile && (
                        <Viewer style={{border:'0'}} 
                          fileUrl={pdfFile}
                          plugins={[defaultLayoutPluginInstance]}
                        />
                      )}
                    </div>
                  </Worker>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie animationData={lottieLoader} style={{ width: "20%" }} />
        </div>
      )}
    </>
  );
};

export default PublicIFU;