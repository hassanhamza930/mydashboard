import ResizeableBox from "./components/ResizeableBox";

const webviewArr: string[] = [
  "https://github.com",
  "https://www.baidu.com",
  "https://www.google.com",
];

function App() {
  return (
    <>
      {" "}
      <div className="flex flex-wrap ">
        {webviewArr.map((item, index) => {
          return (
            <ResizeableBox>
              <webview
                key={index}
                src={item}
                style={{ width: "100%", height: "50vh" }}
              />{" "}
            </ResizeableBox>
          );
        })}
      </div>
    </>
  );
}

export default App;
