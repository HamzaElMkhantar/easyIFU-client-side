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

  const [pdfFile, setPdfFile] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [allVersion, setAllVersion] = useState([]);
  let pdfData = pdfFile
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(findPublicIFUAction(IFUId));
  }, []);

  useEffect(() => {
    if (findPublicIFUSuccess) {
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
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfFile(pdfUrl);
      pdfData = pdfUrl
      setMetadata(findPublicIFUData.metadata);
      setAllVersion(findPublicIFUData.allVersions);
    }
  }, [findPublicIFUSuccess, findPublicIFUFail, findPublicIFUData]);

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
              {/* <iframe
                  // src={`${pdfFile}#toolbar=0&view=FitH`}
                  src={pdfFile} 
                  type="application/pdf"
                  style={{ width: '100%', height: '100%', overflowY:'auto' }}
                  title="PDF Viewer"
                />
                */}
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

              {/* <div 
                  className="isMobile m-4"
                  >
                  Your browser does not support eIFU.{" "}
                  Download the eIFU's versions
                  {allVersion.length > 0 &&
                    allVersion.map((item, index) => 
                       (
                        <div key={index}>
                          <p>
                            <a
                              href={pdfFile}
                              download={`${metadata?.IFUName || 'eIFU'} version${item?.ifuVersion}.pdf`}
                            >
                             {index + 1}- version: {item?.ifuVersion}
                            </a>
                            
                          </p>
                        </div>
                      )
                    )}
                </div> */}
              {/* <object
                  // src={`${pdfFile}#toolbar=0&view=FitH`}
                  data={`${pdfFile}#toolbar=0&view=FitH`}
                  type="application/pdf"
                  width="100%"
                  height="100%"
                > */}
              {/* <p style={{marginBottom:'5px'}}>
                      Your browser does not support PDFs.{" "}
                      <a
                        href={pdfData}
                        download={`${metadata?.IFUName || 'eIFU'} version${metadata?.ifuVerssion}.pdf`}
                      >
                        version {metadata?.ifuVerssion}
                      </a>
                      
                    </p> */}

              <div className="isMobile">
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
                    position:'fixed',
                    top:'0',
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
                <div className="container" style={{ marginTop:'100px'}}>
                  <h2
                    className="card p-2"
                    style={{ fontSize: "22px", border: "0", color: "#3F3F3F" }}
                  >
                    {metadata?.IFUName}
                  </h2>

                  <p
                    style={{
                      fontWeight: "600",
                      margin: "0",
                      marginBottom: "5px",
                    }}
                  >
                    description:
                  </p>
                  <p
                    className="card p-2"
                    style={{ border: "0", fontSize: "14px" }}
                  >
                    <span style={{ color: "gray" }}>
                      {metadata?.IFUDescription ||
                        "No description available for this eIFU."}
                    </span>
                  </p>
                  <p
                    className="mb-1"
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {" "}
                    <CheckCircleOutlineIcon
                      style={{
                        width: "20px",
                        marginRight: "5px",
                        color: "#08408B",
                        marginBottom: "1px",
                      }}
                    />
                    Language: {metadata?.language}
                  </p>
                  <p
                    className="mb-1"
                    style={{
                      color: "gray",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    {" "}
                    <CheckCircleOutlineIcon
                      style={{
                        width: "20px",
                        marginRight: "5px",
                        color: "#08408B",
                        marginBottom: "1px",
                      }}
                    />
                    Created by : {metadata?.companyName}
                  </p>

                  {/* <h2 style={{ fontSize: "30px" }}>Select an eIFU Version</h2> */}
                  <h6 className="mt-3">Explore all eIFU document versions:</h6>
                  <div
                    className="card p-2"
                    style={{ fontSize: "22px", border: "0", color: "#3F3F3F" }}
                  >
                    {allVersion.length > 0 &&
                      allVersion.map((item, index) => (
                              
                        <div className="mb-2" key={index} style={{width:'100%', borderTop: index === 0 ? '' : '1px solid lightgray'}}>
                          <a
                            style={{
                              color: "#9A3B39",
                              fontSize: "15px",
                              fontWeight: "500",
                              margin: "0",
                            }}
                            className=" p-2"
                            href={pdfFile}
                            // download={`${metadata?.IFUName || 'eIFU'} version${metadata?.ifuVersion}.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.preventDefault();

                              // Create an anchor element to trigger download
                              const downloadLink = document.createElement("a");
                              downloadLink.href = pdfFile;
                              // downloadLink.download = `${item?.ifuVersion}_IFU.pdf`;
                              downloadLink.click();

                              // Open in a new tab after download
                              window.open(
                                pdfFile,
                                "_blank",
                                "noopener,noreferrer"
                              );
                            }}
                          >
                            <ContentCopySharpIcon
                              style={{
                                width: "20px",
                                marginRight: "5px",
                                color: "#9A3B39",
                                marginBottom: "1px",
                              }}
                            />
                            version: {item?.ifuVersion}
                          </a>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* </object> */}
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
          {/* {" pending"} */}
          <Lottie animationData={lottieLoader} style={{ width: "20%" }} />
        </div>
      )}
    </>
  );
};

export default PublicIFU;