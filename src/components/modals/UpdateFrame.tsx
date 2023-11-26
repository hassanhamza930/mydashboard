import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import validator from "validator";
//
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./Dialog";
import Button from "../ui/Button";
import { firebaseApp } from "../../config/firebase";
import useUser from "../../hooks/useUser";
import { FaSearch } from "react-icons/fa";
import { IFrame } from "../../types";

interface Props {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (arg: boolean) => void;
  frameData: IFrame;
}

const UpdateFrame: React.FC<Props> = ({ open, setOpen, frameData }) => {
  const db = getFirestore(firebaseApp);
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [link, setLink] = useState(frameData?.link);
  const [errorMessages, setErrorMessages] = useState<{
    type: "LINK" | "NAME" | "";
    message: string;
  }>({
    type: "",
    message: "",
  });
  const [frame, setFrame] = useState<string>(frameData?.link);
  const [name, setName] = useState<string>(frameData?.name);
  const [yPosition, setYPosition] = useState<number>(frameData?.yPosition);
  const [xPosition, setXPosition] = useState<number>(frameData?.xPosition);
  const [zoom, setZoom] = useState<number>(frameData?.zoom);

  // handlers
  const addNewFrame = async () => {
    if (link === "" || frame === "") {
      setErrorMessages({
        type: "LINK",
        message: "Link is required",
      });
      return;
    }
    if (validator.isURL(link) === false) {
      setErrorMessages({
        type: "LINK",
        message: "Link is not valid url format eg: https://example.com",
      });
      return;
    }

    if (name === "") {
      setErrorMessages({
        type: "NAME",
        message: "Name is required",
      });
      return;
    }

    setOpen(false);
    const id = frameData.id;
    const docRef = doc(db, "frames", id);

    console.log({
      name,
      yPosition,
      xPosition,
      zoom,
    });

    await setDoc(
      docRef,
      {
        user: user.uid,
        groupId: frameData.groupId,
        link: frame,
        name,
        yPosition,
        xPosition,
        zoom,
        id: id,
      } as Partial<IFrame>,
      {
        merge: true,
      }
    )
      .then(() => {
        toast.success("New frame added");
      })
      .catch((err) => {
        toast.error(err.message);
      });
    setOpen(false);
  };

  const handleYScroll = useCallback(() => {
    const webView = document.getElementById(
      `webview-frame-update ${frameData.id}`
    );
    if (!webView) return;
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition})`);
  }, [xPosition, yPosition, frameData]);

  const handleXScroll = useCallback(() => {
    const webView = document.getElementById(
      `webview-frame-update ${frameData.id}`
    );

    console.log("2");
    if (!webView) return;
    console.log("3");
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition})`);
  }, [xPosition, yPosition, frameData]);

  const setZoomFactor = useCallback(
    (zoomFactor: number) => {
      const webView = document.getElementById(
        `webview-frame-update ${frameData.id}`
      );

      if (!webView) return;
      // @ts-ignore
      webView.setZoomFactor(zoomFactor);
    },
    [frameData]
  );

  useEffect(() => {
    setZoomFactor(zoom);
    handleXScroll();
    handleYScroll();
  }, [frameData, handleXScroll, handleYScroll, zoom, setZoomFactor]);

  useEffect(() => {
    setZoomFactor(zoom);
    handleXScroll();
    handleYScroll();
  }, [yPosition, xPosition, zoom]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white min-w-[60vw] max-w-[90vw] h-[70vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            Update Frame
          </DialogTitle>
        </DialogHeader>
        <div>
          <div className="w-full">
            <form className="flex gap-x-4">
              <input
                type="text"
                className="w-full bg-transparent border border-slate-400 rounded-xl p-3  px-8 "
                placeholder="Frame link"
                value={link}
                onChange={(e) => {
                  setErrorMessages({ type: "", message: "" });
                  setLink(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-transparent border border-slate-400 rounded-xl p-3  px-8 "
                onClick={(e) => {
                  e.preventDefault();

                  setErrorMessages({ type: "", message: "" });

                  if (link === "") {
                    setErrorMessages({
                      type: "LINK",
                      message: "Link is required",
                    });
                    return;
                  }
                  if (validator.isURL(link) === false) {
                    setErrorMessages({
                      type: "LINK",
                      message:
                        "Link is not valid url format eg: https://example.com",
                    });
                    return;
                  }
                  if (link.startsWith("https://") === false) {
                    setFrame(`https://${link}`);
                  } else {
                    setFrame(link);
                  }
                }}
              >
                <FaSearch className="text-gray-400" />
              </button>
            </form>
            {errorMessages.type === "LINK" && (
              <p className="text-red-500 text-xs">{errorMessages.message}</p>
            )}
          </div>
          <hr className="my-4" />
          <div
            className="
          w-full
          bg-white
          rounded-xl
          flex
          items-start
          justify-start
          gap-3
          "
          >
            <div
              className="
              w-1/2
              overflow-y-auto
              h-[50vh]
              rounded-xl
              p-3
              "
            >
              <div>
                {/* name */}
                <div
                  className="
                    w-full
                    bg-white
                    rounded-xl
                    p-1
                    flex
                    items-center
                    justify-between
                    gap-3
                    border
                    border-slate-400
                    "
                >
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Update Frame name"
                    className=" w-full bg-transparent rounded-xl p-3 px-8 
                    "
                  />
                </div>
                {errorMessages.type === "NAME" && (
                  <p className="text-red-500 text-xs">
                    {errorMessages.message}
                  </p>
                )}
                {/* name - end */}
                {/* <div
                  className=" w-full bg-white rounded-xl p-3  gap-3 border border-slate-400  mb-3
                    "
                >
                  <label
                    htmlFor="size1"
                    className=" text-gray-600 text-md mb-4
                  "
                  >
                    Custom Size
                  </label>
                  <div className="flex flex-col">
                    <div>
                      <label htmlFor="width">Width</label>
                      <input
                        id="width"
                        name="width"
                        value={width}
                        onChange={(e) => {
                          setWidth(parseInt(e.target.value));
                        }}
                        type="range"
                        min={10}
                        max={1000}
                        placeholder="Width in px"
                        className=" w-full accent-[#111] bg-transparent border border-slate-400 rounded-xl py-3  mr-2
                        "
                      />
                    </div>
                    <div>
                      <label htmlFor="height">Height</label>
                      <input
                        id="height"
                        name="height"
                        value={height}
                        onChange={(e) => {
                          setHeight(parseInt(e.target.value));
                        }}
                        type="range"
                        min={100}
                        max={1000}
                        placeholder="Height in px"
                        className=" w-full bg-transparent accent-[#111] border border-slate-400 rounded-xl py-3  mr-2
                        "
                      />
                    </div>
                  </div>
                </div> */}
                <div
                  className=" w-full bg-white rounded-xl p-3  gap-3 border border-slate-400  my-3
                    "
                >
                  <label
                    htmlFor="size1"
                    className="
                    text-gray-600
                    text-md
                    mb-4
                  "
                  >
                    Scroll Position
                  </label>
                  <div className="flex flex-col">
                    <div>
                      <label htmlFor="ySlider">Y-Scroll</label>
                      <input
                        name="ySlider"
                        type="range"
                        id="ySlider"
                        min="0"
                        max="10000"
                        step="1"
                        value={yPosition}
                        onChange={(e) => {
                          setYPosition(Number(e.target.value));
                          handleYScroll();
                        }}
                        className=" w-full accent-[#111] bg-transparent border border-slate-400 rounded-xl py-3  mr-2
                        "
                      />
                    </div>
                    <div>
                      <label htmlFor="xSlider">X-Scroll</label>
                      <input
                        name="ySlider"
                        type="range"
                        id="xSlider"
                        min="0"
                        max="10000"
                        step="1"
                        value={xPosition}
                        onChange={(e) => {
                          setXPosition(Number(e.target.value));
                          handleXScroll();
                        }}
                        className="
                        w-full
                        accent-[#111]
                        bg-transparent
                        border
                        border-slate-400
                        rounded-xl
                        py-3
                        
                        mr-2
                        "
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="
                    w-full
                    bg-white
                    rounded-xl
                    p-3
                    
                    gap-3
                    border
                    border-slate-400
                    
                    mb-3
                    "
                >
                  <label
                    htmlFor="size1"
                    className="
                    text-gray-600
                    text-md
                    mb-4
                  "
                  >
                    Custom Zoom
                  </label>
                  <div className="flex flex-col">
                    <input
                      type="range"
                      id="xSlider"
                      min="0.1"
                      max="2"
                      step=".1"
                      value={zoom}
                      onChange={(e) => {
                        setZoom(Number(e.target.value));
                        setZoomFactor(Number(e.target.value));
                      }}
                      className="
                        w-full
                        accent-[#111]
                        bg-transparent
                        border
                        border-slate-400
                        rounded-xl
                        py-3
                        
                        
                        mr-2
                        "
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* frame */}
            <div className=" overflow-y-auto w-full">
              <div
                style={{
                  width: `100%`,
                  height: `50vh`,
                }}
                className={`
              rounded-xl
              p-3
              relative
              `}
              >
                {frame ? (
                  <webview
                    id={`webview-frame-update ${frameData.id}`}
                    src={frame}
                    className="

                w-full
                bg-slate-200
                rounded-xl
                p-3
                h-full
                "
                  />
                ) : (
                  <p className="text-gray-400 text-sm">"No frame selected"</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center gap-x-3">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              className="bg-transparent border border-slate-400 hover:opacity-75"
            >
              <span className="text-darkgray">cancel</span>
            </Button>
            <Button
              loading={loading}
              onClick={async () => {
                setLoading(true);
                await addNewFrame();
                setLoading(false);
              }}
            >
              <span className="text-white">Update</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFrame;
