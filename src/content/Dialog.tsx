import Content from "./Content";

const Main = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "100px", // 自由に変えて良い
        top: "100px", // 自由に変えて良い
        width: "200px",
        height: "200px",
        backgroundColor: "red",
        boxShadow: "0 0 10px rgba(0,0,0,.3);",
        borderColor: "black",
        zIndex: 2147483550,
      }}
    >
      <Content />
    </div>
  );
};

export default Main;
