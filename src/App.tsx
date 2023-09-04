const webviewArr: string[] = [
  "https://github.com",
  "https://www.baidu.com",
  "https://www.google.com",
];

function App() {
  return (
    <div className="flex items-center justify-center gap-5 ">
      {webviewArr.map((item, index) => {
        return (
          <webview
            key={index}
            src={item}
            style={{ width: "100%", height: "50vh" }}
          />
        );
      })}
    </div>
  );
}

export default App;
