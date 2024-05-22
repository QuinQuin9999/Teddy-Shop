import { FormOutlined } from "@ant-design/icons";
const CustomizedContent = ({ data, colors, setKeySelected }) => {
  // Check if data is undefined or null
  if (!data) return null;

  return (
    <div style={{ display: "flex", gap: "40px", justifyContent: "center" }}>
      {Object.keys(data).map((item) => (
        <div
          key={item}
          style={{
            width: 300,
            background: `linear-gradient(${
              colors && colors[item] ? colors[item][0] : ""
            }, ${colors && colors[item] ? colors[item][1] : ""})`,
            height: 200,
            display: "flex",
            gap: 20,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => setKeySelected(item)}
        >
          <span style={{ color: "#fff", fontSize: 30 }}>
            {item === "reviews" && <FormOutlined />}
          </span>
          <span
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: "bold",
              textTransform: "uppercase",
            }}
          >
            {item}
          </span>
          {typeof data[item] !== "object" && (
            <span
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {data[item]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default CustomizedContent;
