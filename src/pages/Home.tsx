import { Rnd } from "react-rnd";

const webviewArr: string[] = [
  "https://www.linkedin.com",
  "https://www.google.com",
];

export const Home = () => {
  return (
    <>
      <div className="relative flex flex-wrap h-screen w-full justify-start items-start gap-0 ">
        {webviewArr.map((item, index) => {
          return (
            <Rnd
              default={{
                x:index*320,
                y: 0,
                width: 320,
                height: 200,
              }}
              maxHeight={"50%"}
              style={{ position: "relative" }}
              className="flex justify-end items-end m-1 relative"
            >
              <div>
                <webview
                  key={index}
                  src={item}
                  style={{ width: "100%", height: "50vh", background: "#fff" }}
                />
              </div>{" "}
            </Rnd>
          );
        })}
      </div>
    </>
  );
};
