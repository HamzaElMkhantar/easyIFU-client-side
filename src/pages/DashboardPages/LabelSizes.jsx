import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { documentByIdAction } from "../../redux/actions/projectActions";
import { toast } from "react-toastify";
import { RotatingLines } from "react-loader-spinner";
import { handleUDI } from "../../utilities/handleUDI";
import bwipjs from "bwip-js";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Template1 from "../../templates/template1/Template1";
import { convertDateToYYMMDD } from "../../utilities/convertDateToYYMMDD";
import SideBarLabelInfo from "../../components/header/SideBarLabelInfo";
import { saveToPrintAction } from "../../redux/actions/labelActions";

import Swal from "sweetalert2";
import Modal from "react-modal";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import { utils, writeFile } from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import PrintLogsAccordion from "../../utilities/PrintLogsAccordion";
import { formatDateTime } from "../../utilities/formatDateTime";

const LabelSizes = () => {
  const { documentId } = useParams();
  const token = Cookies.get("eIfu_ATK") || null;
  const decodedToken = token ? jwtDecode(token) : null;
  const [imageSrc, setImageSrc] = useState("");

  const [labelPrintedList, setLabelPrintedList] = useState([]);
  const [size, setSize] = useState("");
  const handleSizeChange = (newSize) => {
    setSize(newSize);
    console.log("Size updated in parent:", newSize);
  };

  const { documentById, saveToPrint } = useSelector((state) => state);
  const {
    documentByIdRequest,
    documentByIdSuccess,
    documentByIdFail,
    document,
  } = documentById;
  const {
    saveToPrintRequest,
    saveToPrintSuccess,
    saveToPrintFail,
    saveToPrintData,
  } = saveToPrint;

  const userId = decodedToken?.userInfo?._id || null;
  const [data, setData] = useState({
    labelId: documentId,
    printedBy: userId,
    isPrinted: false,
    action: "toPrint",
    numOfPrint: 1,
  });
  const [documentInfo, setDocumentInfo] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(documentByIdAction(documentId, token));
  }, []);
  useEffect(() => {
    if (documentByIdSuccess) {
      setDocumentInfo(document);

      if (document.labelData.haSerialNumber) {
        setLabelPrintedList(document.printLogs);
      }
    }

    if (documentByIdFail) {
      toast.warning(`${documentByIdFail.message}`);
    }
  }, [documentByIdSuccess, documentByIdFail]);

  useEffect(() => {
    if (saveToPrintSuccess) {
      navigate(`/dashboard/document/${documentId}`);
    }

    if (saveToPrintFail) {
      toast.warning(`${saveToPrintFail.message}`);
    }
  }, [saveToPrintSuccess, saveToPrintFail]);

  const [dataMatrixValue, setDataMatrixValue] = useState("245");
  //       //  handle dynamic data for label
  //   function formatSumDateToYYYYMMDD(date) {
  //     if (!date || isNaN(date.getTime())) {
  //         console.log("Invalid date");
  //         return ''; // or return some default value
  //     }

  //     const yyyy = date.getFullYear();
  //     const mm = String(date.getMonth() + 1).padStart(2, '0');
  //     const dd = String(date.getDate()).padStart(2, '0');
  //     return `${yyyy}-${mm}-${dd}`;
  // }
  useEffect(() => {
    let projectInfo = documentInfo;
    handleUDI({ projectInfo });
    if (documentInfo && documentInfo.labelData) {
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
      } = documentInfo.labelData;

      let udiData =
        (udiDI && udiDI !== "" ? "(01)" + udiDI : "") +
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + `${dateOfManufacture}`
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");
      let udiPI =
        (haDateOfManufacture && dateOfManufacture && dateOfManufacture !== ""
          ? "(11)" + "XXXXXXXX"
          : "") +
        (useByDate && useByDate !== ""
          ? "(17)" + convertDateToYYMMDD(useByDate)
          : "") +
        (hasLotNumber && LOTNumber && LOTNumber !== ""
          ? "(10)" + "XXXXXXXX"
          : "") +
        (haSerialNumber && serialNumber && serialNumber !== ""
          ? "(21)" + "XXXXXXXX"
          : "");

      setDataMatrixValue(udiData || "123");
    }
  }, [documentInfo]);
  // data matrix
  useEffect(() => {
    if (typeof document !== "undefined" && document?.createElement) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d"); // Get the 2D context of the canvas

      bwipjs.toCanvas(
        canvas,
        {
          bcid: "datamatrix", // Barcode type
          text: dataMatrixValue ? dataMatrixValue : "612975642512", // Text to encode
          scale: 10, // 3x scaling factor
          height: 15, // Bar height, in millimeters
          includetext: true, // Show human-readable text
          textxalign: "center", // Always good to set this
        },
        function (err, cvs) {
          // Callback function with canvas object
          if (err) {
            console.error(err);
            return;
          }
          setImageSrc(cvs.toDataURL("image/png")); // Use `cvs` here instead of `canvas`
        }
      );
    }
  }, [dataMatrixValue]);

  const saveDataToPrint = () => {
    dispatch(saveToPrintAction(data, token));
  };

  // const handleDownload = () => {
  //     // Data mapping with custom headers
  //     const printLogs = documentInfo?.printLogs?.map((log, i) => ({
  //         '#': `${i + 1}`,
  //         'Id': `${documentInfo._id}`,
  //         'Company Name': `${documentInfo.companyId?.companyName}`,
  //         'Label Id': `${documentInfo.shortId}-V${documentInfo.labelVersion}`,
  //         'Printed By': log.printedBy ? `${log.printedBy.firstName} ${log.printedBy.lastName}` : 'N/A',
  //         'Number of print': parseInt(log.numOfPrint),
  //         'Print Status': log.printStatus === "starting" ? "start to print" : log.printStatus,
  //         'Print Date': new Date(log.printDate).toLocaleString()
  //     }));

  //     // Convert data to worksheet
  //     const ws = utils.json_to_sheet(printLogs);
  //     // Insert title row before data rows
  //     // utils.sheet_add_aoa(ws, [titleRow], { origin: 'A1' });

  //     // Adjust column widths
  //     ws['!cols'] = [
  //         { wch: 5 },
  //         { wch: 30 },
  //         { wch: 20 },
  //         { wch: 20 },
  //         { wch: 25 },
  //         { wch: 15 },
  //         { wch: 20 },
  //         { wch: 25 }
  //     ];

  //     // Create a new workbook and add the worksheet
  //     const wb = utils.book_new();
  //     utils.book_append_sheet(wb, ws, 'Print Logs');

  //     // Generate Excel file and trigger download
  //     writeFile(wb, 'PrintLogs.xlsx');
  // };

  // const handleDownload = () => {
  //     // Data mapping with custom fields directly included
  //     const printLogs = documentInfo?.printLogs?.map((log, i) => ({
  //         '#': `${i + 1}`,
  //         'Id': `${documentInfo._id}`,
  //         'Company Name': `${documentInfo.companyId?.companyName || 'N/A'}`,
  //         'Label Id': `${documentInfo.shortId}-V${documentInfo.labelVersion}`,
  //         'Printed By': log.printedBy ? `${log.printedBy.firstName} ${log.printedBy.lastName}` : 'N/A',
  //         'Number of print': parseInt(log.numOfPrint),
  //         'Print Status': log.printStatus === "starting" ? "start to print" : log.printStatus,
  //         'Print Date': new Date(log.printDate).toLocaleString()
  //     }));

  //     // Define headers for the data rows
  //     const headers = [
  //         '#', 'Id', 'Company Name', 'Label Id', 'Printed By', 'Number of print', 'Print Status', 'Print Date'
  //     ];

  //     // Convert data to worksheet
  //     const ws = utils.json_to_sheet(printLogs, { header: headers });

  //     // Insert headers as the first row
  //     utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });

  //     // Adjust column widths
  //     ws['!cols'] = [
  //         { wch: 5 },   // Width for '#'
  //         { wch: 30 },  // Width for 'Id'
  //         { wch: 30 },  // Width for 'Company Name'
  //         { wch: 20 },  // Width for 'Label Id'
  //         { wch: 25 },  // Width for 'Printed By'
  //         { wch: 15 },  // Width for 'Number of print'
  //         { wch: 20 },  // Width for 'Print Status'
  //         { wch: 25 }   // Width for 'Print Date'
  //     ];

  //     // Apply styles to the header row
  //     headers.forEach((header, colIndex) => {
  //         const cellAddress = utils.encode_cell({ r: 0, c: colIndex });
  //         ws[cellAddress] = { v: header, s: { font: { bold: true, sz: 18 }, fill: { fgColor: { rgb: 'FFFF00' } }, alignment: { horizontal: 'left' } } };
  //     });

  //     // Apply specific alignment to 'Number of print' column (left alignment example)
  //     const numberOfPrintColumnIndex = headers.indexOf('Number of print');
  //     printLogs.forEach((log, rowIndex) => {
  //         const cellAddress = utils.encode_cell({ r: rowIndex + 1, c: numberOfPrintColumnIndex });
  //         ws[cellAddress] = { v: log['Number of print'], s: { alignment: { horizontal: 'left' } } };  // Set alignment to left
  //     });

  //     // Create a new workbook and add the worksheet
  //     const wb = utils.book_new();
  //     utils.book_append_sheet(wb, ws, 'Print Logs');

  //     // Generate Excel file and trigger download
  //     writeFile(wb, 'PrintLogs.xlsx');
  // };

  const handleDownload = () => {
    // Data mapping with custom fields directly included
    const printLogs = documentInfo?.printLogs?.map((log, i) => ({
      "#": `${i + 1}`,
      Id: `${documentInfo._id}`,
      "Company Name": `${documentInfo.companyId?.companyName || "N/A"}`,
      "Label Id": `${documentInfo.shortId}-V${documentInfo.labelVersion}`,
      "Printed By": log.printedBy
        ? `${log.printedBy.firstName} ${log.printedBy.lastName}`
        : "N/A",
      "Number of print": parseInt(log.numOfPrint),
      "Print Status":
        log.printStatus === "starting" ? "start to print" : log.printStatus,
      "Print Date": new Date(log.printDate).toLocaleString(),
    }));

    // Define headers for the data rows
    const headers = [
      "#",
      "Id",
      "Company Name",
      "Label Id",
      "Printed By",
      "Number of print",
      "Print Status",
      "Print Date",
    ];

    // Convert data to worksheet
    const ws = utils.json_to_sheet(printLogs, { header: headers });

    // Insert headers as the first row
    utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    // Adjust column widths
    ws["!cols"] = [
      { wch: 5 }, // Width for '#'
      { wch: 30 }, // Width for 'Id'
      { wch: 30 }, // Width for 'Company Name'
      { wch: 20 }, // Width for 'Label Id'
      { wch: 25 }, // Width for 'Printed By'
      { wch: 15 }, // Width for 'Number of print'
      { wch: 20 }, // Width for 'Print Status'
      { wch: 25 }, // Width for 'Print Date'
    ];

    // Apply styles to the header row
    headers.forEach((header, colIndex) => {
      const cellAddress = utils.encode_cell({ r: 0, c: colIndex });
      ws[cellAddress] = {
        v: header,
        s: {
          font: {
            bold: true,
            sz: 18,
            name: "Arial",
          },
          fill: { fgColor: { rgb: "FFFF00" } }, // Yellow background
          alignment: { horizontal: "left" },
        },
      };
    });

    // Apply styles to the body rows
    printLogs.forEach((log, rowIndex) => {
      Object.keys(log).forEach((key, colIndex) => {
        const cellAddress = utils.encode_cell({ r: rowIndex + 1, c: colIndex });
        ws[cellAddress] = {
          v: log[key],
          s: {
            font: {
              sz: 14,
              name: "Arial",
            },
            alignment: { horizontal: "left" },
          },
        };
      });
    });

    // Create a new workbook and add the worksheet
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Print Logs");

    // Generate Excel file and trigger download
    writeFile(wb, "PrintLogs.xlsx");
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [activeSerialNumber, setActiveSerialNumber] = useState(0);
  const [printedInfo, setPrintedInfo] = useState(null);

  const handleSerialNumberChange = (newSerialNumber, data) => {
    setActiveSerialNumber(newSerialNumber);
    setPrintedInfo(data);
  };

  return (
    <div
      className=""
      style={{ height: "100%", width: "100%", display: "flex" }}
    >
      <SideBarLabelInfo
        isSidebarOpen={true}
        status={documentInfo?.status}
        hideInfo={true}
        projectId={documentId}
      />
      <main
        style={{
          padding: "20px 10px",
          backgroundColor: "",
          // margin: "0 auto",
          flex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            style={{ height: "35px" }}
            to={"/dashboard/documents"}
            className="label-info-link"
          >
            <ArrowBackIcon /> Back
          </Link>
        </div>
        <div style={{ display: "none" }}>
          <div
            style={{ display: "flex", flexDirection: "column", width: "100px" }}
          >
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="gs1-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="hibcc-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="iccbba-barcode"
              ></svg>
            </div>
            <div
              style={{
                backgroundColor: "#fff",
                textAlign: "center",
                width: "300px",
              }}
            >
              <svg
                style={{
                  width: "100px",
                  backgroundColor: "#fff",
                  textAlign: "center",
                }}
                id="ifa-barcode"
              ></svg>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              gridGap: "10px",
            }}
          >
            <div style={{ textAlign: "center", marginRight: "5px" }}>
              <svg id="gs1-barcode-udiDI"></svg>
            </div>
            <div style={{ textAlign: "center" }}>
              <svg id="gs1-barcode-udiPI"></svg>
            </div>
          </div>

          <img width={"100px"} src={imageSrc} alt={`data matrix from`} />
        </div>
        <div className="row mt-4">
          {!documentByIdRequest ? (
            <>
              {(
                <div className="col-md-3 mt-1">
                  <PrintLogsAccordion
                    onSerialNumberChange={handleSerialNumberChange}
                    printLogs={documentInfo?.printLogs}
                    serialNumber={documentInfo?.labelData.serialNumber}
                    LOTNumber={documentInfo?.labelData.LOTNumber}
                    hasLotNumber={documentInfo?.labelData.hasLotNumber}
                  />
                </div>
              )}
              <div
                className="label-info-data col-md-5"
                style={{ overflow: "scroll" }}
              >
                {documentInfo?.labelTemplate === "Template1" && (
                  <Template1
                    activeSerialNumber={
                      activeSerialNumber ? activeSerialNumber : 1
                    }
                    scale={"1"}
                    width={"100"}
                    height={"150"}
                    projectInfo={documentInfo}
                    handleUDI={handleUDI}
                    imageSrc={imageSrc}
                    onSizeChange={handleSizeChange}
                  />
                )}
              </div>
              <div className="col-md-4" style={{ height: "100%" }}>
                <div className="mt-1" style={{ display: "", gridGap: "10px" }}>
                  <h6 style={{ marginTop: "0px" }}>Print Info :</h6>
                  {documentInfo?.labelData?.haSerialNumber && (
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
                      Serial Number: {documentInfo?.labelData?.serialNumber}-
                      {printedInfo?.num}
                    </p>
                  )}
                  {size && (
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
                      Label Size: {size + "mm"}
                    </p>
                  )}
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
                    Label Id: {documentInfo?.shortId}-V{documentInfo?.labelVersion}
                  </p>
                  {documentInfo?.labelData?.haSerialNumber && <>
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
                      Printed By: {printedInfo?.printedBy?.lastName}{" "}
                      {printedInfo?.printedBy?.firstName}
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
                      Print Date: {formatDateTime(printedInfo?.printDate)}
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
                      Print Status:{" "}
                      {printedInfo?.printStatus === "starting"
                        ? "Start To Print"
                        : printedInfo?.printStatus === "printed"
                        ? "Printed"
                        : "Failed"}
                    </p>
                  </>}

                  <h6 style={{ marginTop: "20px" }}>Other Info :</h6>
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
                    Label Name: {documentInfo?.labelName}
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
                    Version: {documentInfo?.labelVersion}
                  </p>
                  {documentInfo?.labelDescription && (
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
                      Label description: {documentInfo?.labelDescription}
                    </p>
                  )}


                </div>

                <button
                  onClick={openModal}
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: "10px",
                    backgroundColor: "#062D60",
                    width: "100%",
                    height: "35px",
                    borderRadius: "5px",
                    color: "#fff",
                  }}
                >
                  Show Logs
                </button>
                <div style={{ zIndex: "99999", width: "100%" }}>
                  <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Print Logs"
                    style={{
                      minHeight: "600px",
                      border: "0",
                      content: {
                        top: "13%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        marginRight: "-50%",
                        transform: "translate(-50%, 0%)",
                        width: "80%",
                        height: "70%", // Set a fixed height
                        overflowY: "scroll", // Enable vertical scrolling
                        backgroundColor: "#ecf0f3",
                        zIndex: "99999",
                      },
                      overlay: {
                        zIndex: "99999",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        backdropFilter: "blur(2px)",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <h6>Print Logs:</h6>
                      <div>
                        <button
                          className="mx-2"
                          onClick={closeModal}
                          style={{
                            marginTop: "10px",
                            backgroundColor: "#062D60",
                            borderRadius: "5px",
                            color: "#fff",
                          }}
                          variant="contained"
                          color="secondary"
                        >
                          Close
                        </button>
                        <button
                          onClick={handleDownload}
                          style={{
                            backgroundColor: "lightgray",
                            borderRadius: "4px",
                            border: "2px solid #062D60",
                          }}
                        >
                          <DownloadIcon />
                        </button>
                      </div>
                    </div>
                    <TableContainer
                      style={{
                        backgroundColor: "#ecf0f3",
                        boxShadow: "none",
                        border: "0",
                        height: "85%",
                      }}
                      component={Paper}
                    >
                      <Table
                        style={{
                          backgroundColor: "#ecf0f3",
                          boxShadow: "none",
                          border: "0",
                        }}
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              #
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Label Id
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Printed By
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Number of print
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Print Status
                            </TableCell>
                            <TableCell
                              style={{ fontSize: "12px", fontWeight: "600" }}
                            >
                              Print Date
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {documentInfo?.printLogs?.map((log, i) => (
                            <TableRow key={log._id}>
                              <TableCell style={{ fontSize: "12px" }}>
                                {i + 1}
                              </TableCell>
                              <TableCell style={{ fontSize: "12px" }}>
                                {documentInfo.shortId}-V
                                {documentInfo.labelVersion}
                              </TableCell>
                              <TableCell style={{ fontSize: "12px" }}>
                                {log.printedBy &&
                                  `${log.printedBy.firstName} ${log.printedBy.lastName}`}
                              </TableCell>
                              <TableCell style={{ fontSize: "12px" }}>
                                {log.numOfPrint}
                              </TableCell>
                              <TableCell style={{ fontSize: "12px" }}>
                                {log.printStatus === "starting"
                                  ? "start to print"
                                  : log.printStatus}
                              </TableCell>
                              <TableCell style={{ fontSize: "12px" }}>
                                {formatDateTime(log.printDate)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <div
                      style={{
                        backgroundColor: "",
                        width: "100%",
                        marginBottom: "",
                        padding: "5px",
                        borderTop: "1px solid gray",
                      }}
                    >
                      <ul>
                        <li style={{ fontSize: "12px" }}>
                          {" "}
                          <span style={{ color: "#062D60", fontWeight: "600" }}>
                            Start to Print
                          </span>
                          : You have selected labels to print, but haven't
                          started the process.
                        </li>
                        <li style={{ fontSize: "12px" }}>
                          {" "}
                          <span style={{ color: "#066131", fontWeight: "600" }}>
                            Printed
                          </span>
                          : Your labels have been printed successfully.
                        </li>
                        <li style={{ fontSize: "12px" }}>
                          {" "}
                          <span style={{ color: "#F44336", fontWeight: "600" }}>
                            Failed
                          </span>
                          : There was an issue with printing your labels.
                        </li>
                      </ul>
                    </div>
                  </Modal>
                </div>
              
              </div>
            </>
          ) : (
            <div
              style={{
                width: "100%",
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <RotatingLines
                strokeColor="#011d41"
                strokeWidth="5"
                animationDuration="0.75"
                width="90"
                visible={true}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LabelSizes;
