const webviewArr: string[] = [
  "https://www.linkedin.com",
  "https://www.google.com",
];

export const Dashboard = () => {
  return (
    <>
      <div className="relative flex flex-wrap  w-full justify-start items-start gap-0 overflow-hidden">
        <div className="flex flex-wrap  w-full justify-start items-start gap-0 overflow-auto">
          {webviewArr.map((item, index) => {
            return (
              <div key={index} style={{ resize: "both", overflow: "auto" }}>
                <webview
                  src={item}
                  className="
                  w-full
                  h-full
                  min-h-[50vh]
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
