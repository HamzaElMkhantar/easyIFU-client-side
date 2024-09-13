// import React, { useEffect, useState } from "react";
// import { moment } from "moment";
// import { convertDateToYYMMDD } from "./convertDateToYYMMDD";
// import DateFormat from "./FormatDate";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   Button,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import SearchIcon from "@mui/icons-material/Search";
// import { formatDateTime } from "./formatDateTime";

// const PrintLogsAccordion = ({
//   LOTNumber,
//   hasLotNumber,
//   printLogs,
//   serialNumber,
//   onSerialNumberChange,
// }) => {
//   const [printedInfo, setPrintedInfo] = useState({
//     num: printLogs ? printLogs[printLogs?.length - 1].startPrint : null,
//     printedBy: printLogs ? printLogs[printLogs.length - 1].printedBy : {},
//     printDate: printLogs ? printLogs[printLogs.length - 1].printDate : null,
//     printStatus: printLogs ? printLogs[printLogs.length - 1].printStatus : null,
//   });

//   const [searchNumber, setSearchNumber] = useState("");
//   const [filteredLogs, setFilteredLogs] = useState(printLogs);
//   console.log({ printLogs });
//   // console.log({filteredLogs})
//   const handleSerialNumberChange = (newSerialNumber, data) => {
//     onSerialNumberChange(newSerialNumber, data);
//     setPrintedInfo(data);
//   };

//   const handleSearch = () => {
//     const num = parseInt(searchNumber, 10);
//     if (isNaN(num)) {
//       setFilteredLogs(printLogs);
//       return;
//     }

//     if (num >= 1 && num <= printLogs[0].endPrint) {
//       // Filter the printLogs to only include logs where the search number is in the range
//       const matchingLogs = printLogs.filter((log) =>
//         generatePrintRange(log.startPrint, log.endPrint).includes(num)
//       );

//       if (matchingLogs.length > 0) {
//         // Get the first matching log
//         const log = matchingLogs[0];

//         // Find the specific serial number in the matching log's range
//         const foundNum = generatePrintRange(log.startPrint, log.endPrint).find(
//           (n) => n === num
//         );

//         let data = {
//           num: foundNum || log.startPrint,
//           printedBy: log.printedBy,
//           printDate: log.printDate,
//           printStatus: log.printStatus,
//         };
//         // Set the printedInfo state with the relevant details from the log
//         setPrintedInfo(data);

//         onSerialNumberChange(data.num, data);
//       }

//       setFilteredLogs(matchingLogs);
//     } else {
//       setFilteredLogs(printLogs);
//     }
//   };

//   let objData = {
//     num: printLogs ? printLogs[printLogs?.length - 1].startPrint : null,
//     printedBy: printLogs ? printLogs[printLogs.length - 1].printedBy : {},
//     printDate: printLogs ? printLogs[printLogs.length - 1].printDate : null,
//     printStatus: printLogs ? printLogs[printLogs.length - 1].printStatus : null,
//   };
//   useEffect(() => {
//     let logs = printLogs ? printLogs[printLogs.length - 1].startPrint : null;

//     onSerialNumberChange(logs, objData);
//   }, [printLogs]);

//   // Reverse the printLogs array
//   const reversedLogs = filteredLogs && [...filteredLogs].reverse();

//   // Helper function to generate the print range
//   const generatePrintRange = (start, end) => {
//     const range = [];
//     for (let i = start; i <= end; i++) {
//       range.push(i);
//     }
//     return range;
//   };

//   return (
//     <div>
//       {/* Search Input */}
//       {!hasLotNumber && (
//         <>
//           <label>Search by Number:</label>
//           <div
//             style={{
//               marginBottom: "20px",
//               paddingLeft: "10px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               backgroundColor: "#fff",
//               width: "100%",
//               height: "40px",
//               border: "1px solid lightGray",
//             }}
//           >
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <p style={{ margin: "0", padding: "0" }}>{serialNumber}-</p>
//               <input
//                 style={{
//                   height: "38px",
//                   fontSize: "16px",
//                   outline: "none",
//                   width: "70px",
//                 }}
//                 placeholder="1"
//                 type="number"
//                 min="0"
//                 max={
//                   printLogs && printLogs?.length > 0 && printLogs[0].endPrint
//                 }
//                 value={searchNumber}
//                 onChange={(e) => setSearchNumber(e.target.value)}
//               />
//             </div>
//             <button
//               onClick={handleSearch}
//               style={{
//                 marginLeft: "0px",
//                 height: "40px",
//                 borderLeft: "",
//                 backgroundColor: "#77BBFF",
//                 width: "70px",
//               }}
//             >
//               <SearchIcon style={{ fontSize: "30px", fontWeight: "900" }} />
//             </button>
//           </div>
//         </>
//       )}

//       {/* Print Logs Accordion */}
//       {printLogs?.length > 0 ? (
//         printLogs?.map((log, index) => (
//           <Accordion
//             key={log._id}
//             style={{ boxShadow: "none", backgroundColor: "#ecf0f3" }}
//           >
//             <AccordionSummary
//               expandIcon={
//                 hasLotNumber ? null : (
//                   <ExpandMoreIcon style={{ fontSize: "30px", color: "#fff" }} />
//                 )
//               }
//               aria-controls={`panel${index}-content`}
//               id={`panel${index}-header`}
//               style={{
//                 backgroundColor: "#062d60",
//                 borderRadius: "1px",
//                 boxShadow: "none",
//                 border: "1px solid lightgray",
//                 marginBottom: "0px",
//                 color: "#ffffff",
//                 height: "70px",
//               }}
//             >
//               <Typography style={{ padding: "0" }}>
//                 <div style={{ fontSize: "14px", margin: "0", padding: "0" }}>
//                   <strong>Date: </strong>
//                   {formatDateTime(log.printDate)}
//                 </div>
//                 <p style={{ fontSize: "14px", margin: "0", padding: "0" }}>
//                   <strong>Printed by: </strong>
//                   {log.printedBy.firstName} {log.printedBy.lastName}
//                 </p>
//                 {!hasLotNumber ? (
//                   <p
//                     style={{
//                       fontSize: "12px",
//                       margin: "0",
//                       padding: "0",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     from{" "}
//                     <strong
//                       style={
//                         log.printStatus === "failed"
//                           ? { color: "#F47560" }
//                           : log.printStatus === "printed"
//                           ? { color: "#6CE786" }
//                           : { color: "gray" }
//                       }
//                     >
//                       {serialNumber}-{log.startPrint}
//                     </strong>{" "}
//                     to{" "}
//                     <strong
//                       style={
//                         log.printStatus === "failed"
//                           ? { color: "#F47560" }
//                           : log.printStatus === "printed"
//                           ? { color: "#6CE786" }
//                           : { color: "gray" }
//                       }
//                     >
//                       {serialNumber}-{log.endPrint}
//                     </strong>
//                   </p>
//                 ) : (
//                   <p
//                     style={{
//                       fontSize: "12px",
//                       margin: "0",
//                       padding: "0",
//                       display: "flex",
//                       justifyContent: "space-between",
//                     }}
//                   >
//                     <strong
//                       style={
//                         log.printStatus === "failed"
//                           ? { color: "#F47560" }
//                           : log.printStatus === "printed"
//                           ? { color: "#6CE786" }
//                           : { color: "gray" }
//                       }
//                     >
//                       {log.numOfPrint} label(s){" "}
//                       {log.printStatus === "failed"
//                         ? "Failed to Print"
//                         : log.printStatus === "printed"
//                         ? "Printed"
//                         : "Start to Print"}
//                     </strong>
//                   </p>
//                 )}
//               </Typography>
//             </AccordionSummary>
//             {!hasLotNumber && (
//               <AccordionDetails
//                 style={{ backgroundColor: "", padding: "0 7px", margin: "0" }}
//               >
//                 <div style={{ width: "100%", margin: "0", padding: "0" }}>
//                   {generatePrintRange(log.startPrint, log.endPrint).map(
//                     (num) => (
//                       <div key={num}>
//                         <button
//                           style={{
//                             backgroundColor:
//                               num === parseInt(searchNumber, 10)
//                                 ? "#FFD700"
//                                 : "lightGray", // Highlight the searched number
//                             width: "100%",
//                             marginTop: "4px",
//                           }}
//                           onClick={() =>
//                             handleSerialNumberChange(num, {
//                               num: num,
//                               printedBy: log.printedBy,
//                               printDate: log.printDate,
//                               printStatus: log.printStatus,
//                             })
//                           }
//                         >
//                           {`${serialNumber}-${num}`}
//                         </button>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </AccordionDetails>
//             )}
//           </Accordion>
//         ))
//       ) : (
//         <Typography>No results found</Typography>
//       )}
//     </div>
//   );
// };

// export default PrintLogsAccordion;


import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchIcon from "@mui/icons-material/Search";
import { formatDateTime } from "./formatDateTime";

const PrintLogsAccordion = ({
  LOTNumber,
  hasLotNumber,
  printLogs,
  serialNumber,
  onSerialNumberChange,
}) => {
  const [printedInfo, setPrintedInfo] = useState({
    num: printLogs ? printLogs[printLogs?.length - 1]?.startPrint : null,
    printedBy: printLogs ? printLogs[printLogs.length - 1]?.printedBy : {},
    printDate: printLogs ? printLogs[printLogs.length - 1]?.printDate : null,
    printStatus: printLogs ? printLogs[printLogs.length - 1]?.printStatus : null,
  });

  const [searchNumber, setSearchNumber] = useState("");
  const [filteredLogs, setFilteredLogs] = useState(printLogs);

  const handleSerialNumberChange = (newSerialNumber, data) => {
    onSerialNumberChange(newSerialNumber, data);
    setPrintedInfo(data);
  };

  const handleSearch = () => {
    const num = parseInt(searchNumber, 10);

    // Show all accordions if searchNumber is <= 0 or more than the last endPrint
    if (
      isNaN(num) ||
      num <= 0 ||
      num > (printLogs.length > 0 ? printLogs[0].endPrint : 0)
    ) {
      setFilteredLogs(printLogs); // Reset to show all accordions
      return;
    }

    // Find matching logs based on the search number
    const matchingLogs = printLogs.filter((log) =>
      generatePrintRange(log.startPrint, log.endPrint).includes(num)
    );

    if (matchingLogs.length > 0) {
      const log = matchingLogs[0];
      const foundNum = generatePrintRange(log.startPrint, log.endPrint).find(
        (n) => n === num
      );

      let data = {
        num: foundNum || log.startPrint,
        printedBy: log.printedBy,
        printDate: log.printDate,
        printStatus: log.printStatus,
      };

      setPrintedInfo(data);
      onSerialNumberChange(data.num, data);
    }

    setFilteredLogs(matchingLogs);
  };

  useEffect(() => {
    let logs = printLogs ? printLogs[printLogs.length - 1]?.startPrint : null;
    onSerialNumberChange(logs, printedInfo);
    setFilteredLogs(printLogs)
  }, [printLogs]);

  const reversedLogs = filteredLogs && [...filteredLogs].reverse();

  const generatePrintRange = (start, end) => {
    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div>
      {!hasLotNumber && (
        <>
          <label>Search by Number:</label>
          <div
            style={{
              marginBottom: "20px",
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#fff",
              width: "100%",
              height: "40px",
              border: "1px solid lightGray",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <p style={{ margin: "0", padding: "0" }}>{serialNumber}-</p>
              <input
                style={{
                  height: "38px",
                  fontSize: "16px",
                  outline: "none",
                  width: "70px",
                }}
                placeholder="1"
                type="number"
                min="0"
                max={
                  printLogs && printLogs?.length > 0 && printLogs[0].endPrint
                }
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              style={{
                marginLeft: "0px",
                height: "40px",
                borderLeft: "",
                backgroundColor: "#77BBFF",
                width: "70px",
              }}
            >
              <SearchIcon style={{ fontSize: "30px", fontWeight: "900" }} />
            </button>
          </div>
        </>
      )}

      {filteredLogs?.length > 0 ? (
        filteredLogs?.map((log, index) => (
          <Accordion
            key={log._id}
            style={{ boxShadow: "none", backgroundColor: "#ecf0f3" }}
          >
            <AccordionSummary
              expandIcon={
                hasLotNumber ? null : (
                  <ExpandMoreIcon style={{ fontSize: "30px", color: "#fff" }} />
                )
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              style={{
                backgroundColor: "#062d60",
                borderRadius: "1px",
                boxShadow: "none",
                border: "1px solid lightgray",
                marginBottom: "0px",
                color: "#ffffff",
                height: "70px",
              }}
            >
              <Typography style={{ padding: "0" }}>
                <div style={{ fontSize: "14px", margin: "0", padding: "0" }}>
                  <strong>Date: </strong>
                  {formatDateTime(log.printDate)}
                </div>
                <p style={{ fontSize: "14px", margin: "0", padding: "0" }}>
                  <strong>Printed by: </strong>
                  {log.printedBy.firstName} {log.printedBy.lastName}
                </p>
                {!hasLotNumber ? (
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "0",
                      padding: "0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    from{" "}
                    <strong
                      style={
                        log.printStatus === "failed"
                          ? { color: "#F47560" }
                          : log.printStatus === "printed"
                          ? { color: "#6CE786" }
                          : { color: "gray" }
                      }
                    >
                      {serialNumber}-{log.startPrint}
                    </strong>{" "}
                    to{" "}
                    <strong
                      style={
                        log.printStatus === "failed"
                          ? { color: "#F47560" }
                          : log.printStatus === "printed"
                          ? { color: "#6CE786" }
                          : { color: "gray" }
                      }
                    >
                      {serialNumber}-{log.endPrint}
                    </strong>
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: "12px",
                      margin: "0",
                      padding: "0",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <strong
                      style={
                        log.printStatus === "failed"
                          ? { color: "#F47560" }
                          : log.printStatus === "printed"
                          ? { color: "#6CE786" }
                          : { color: "gray" }
                      }
                    >
                      {log.numOfPrint} label(s){" "}
                      {log.printStatus === "failed"
                        ? "Failed to Print"
                        : log.printStatus === "printed"
                        ? "Printed"
                        : "Start to Print"}
                    </strong>
                  </p>
                )}
              </Typography>
            </AccordionSummary>
            {!hasLotNumber && (
              <AccordionDetails
                style={{ backgroundColor: "", padding: "0 7px", margin: "0" }}
              >
                <div style={{ width: "100%", margin: "0", padding: "0" }}>
                  {generatePrintRange(log.startPrint, log.endPrint).map(
                    (num) => (
                      <div key={num}>
                        <button
                          style={{
                            backgroundColor:
                              num === parseInt(searchNumber, 10)
                                ? "#FFD700"
                                : "lightGray",
                            width: "100%",
                            marginTop: "4px",
                          }}
                          onClick={() =>
                            handleSerialNumberChange(num, {
                              num: num,
                              printedBy: log.printedBy,
                              printDate: log.printDate,
                              printStatus: log.printStatus,
                            })
                          }
                        >
                          {`${serialNumber}-${num}`}
                        </button>
                      </div>
                    )
                  )}
                </div>
              </AccordionDetails>
            )}
          </Accordion>
        ))
      ) : (
        <Typography>No results found</Typography>
      )}
    </div>
  );
};

export default PrintLogsAccordion;
