import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import headerLogo from "../../assets/sideBar_logo.png";
import PublicSideBar from "../../components/header/PublicSideBar";
import { findPublicIFUAction } from "../../redux/actions/IFUsActions";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "lottie-react";
import lottieLoader from "../../assets/lotties/spinner.json";

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
      setMetadata(findPublicIFUData.metadata);
      setAllVersion(findPublicIFUData.allVersions);
    }
  }, [findPublicIFUSuccess, findPublicIFUFail, findPublicIFUData]);
  return (
    <>
      {pdfFile ? (
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
            {pdfFile ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ffffff", // Light background to offset gray
                }}
              >
                <iframe
                  src={`${pdfFile}#100`}
                  width="100%"
                  height="100%"
                  style={{
                    border: "none",
                  }}
                  title="PDF Viewer"
                />
              </div>
            ) : (
              <p>No eIFU selected</p>
            )}
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
          {" "}
          <Lottie animationData={lottieLoader} style={{ width: "20%" }} />
        </div>
      )}
    </>
  );
};

export default PublicIFU;
