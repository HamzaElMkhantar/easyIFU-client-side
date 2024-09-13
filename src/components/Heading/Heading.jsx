

const Heading = ({ children }) => {
  return (
    <div
      className="py-1 px-3"
      style={{
        backgroundColor: "#021d41",
        borderTop: "0.1px solid lightGray",
      }}
    >
      <h2
        className="container"
        style={{
          fontSize: "15px",
          color: "#ecf0f3",
          marginBottom: "0px",
          marginTop: "-2px",
          fontWeight: "600",
        }}
      >
        ~Dashboard / {children}
      </h2>
    </div>
  );
};

export default Heading;