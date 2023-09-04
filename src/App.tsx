import { Rnd } from "react-rnd";
import ResizeableBox from "./components/ResizeableBox";

const webviewArr: string[] = [
  "https://github.com",
  "https://www.linkedin.com",
  "https://www.google.com",
];

function App() {
  return (
    <div className="relative flex flex-wrap h-screen w-full justify-start items-start gap-0 ">
        {webviewArr.map((item, index) => {
          return (
            <Rnd
            default={{
              x: 320*index,
              y: 0,
              width: 320,
              height: 200,
            }}
            
            maxHeight={"50%"}
            style={{position:"relative"}}
            className="flex justify-end items-end relative"
          >
            <webview
                key={index}
                src={item}
                className="flex h-full w-full"
              />
          </Rnd>
          );
        })}
      </div>
  );
}

export default App;
