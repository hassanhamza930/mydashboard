import React, { useEffect, useState } from "react";
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
  const [link, setLink] = useState(frameData?.link);
  const [errorMessages, setErrorMessages] = useState<string>();
  const [frame, setFrame] = useState<string>(frameData?.link);
  const [name, setName] = useState<string>(frameData?.name);
  const [width, setWidth] = useState<number>(frameData?.width);
  const [height, setHeight] = useState<number>(frameData?.height);
  const [yPosition, setYPosition] = useState<number>(frameData?.yPosition);
  const [xPosition, setXPosition] = useState<number>(frameData?.xPosition);
  const [zoom, setZoom] = useState<number>(frameData?.zoom);

  // handlers
  const addNewFrame = async () => {
    if (link === "") {
      setErrorMessages("Link is required");
      return;
    }
    if (validator.isURL(link) === false) {
      setErrorMessages("Link is not valid url format eg: https://example.com");
      return;
    }
    const id = frameData.id;
    const docRef = doc(db, "frames", id);

    await setDoc(
      docRef,
      {
        user: user.uid,
        groupId: frameData.groupId,
        link: frame,
        name,
        width,
        height,
        yPosition,
        xPosition,
        zoom,
        id: id,
      } as IFrame,
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

  const handleYScroll = () => {
    const webView = document.getElementById("webview-frame-update");
    if (!webView) return;
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition})`);
  };

  const handleXScroll = () => {
    const webView = document.getElementById("webview-frame-update");
    if (!webView) return;
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition})`);
  };

  function setZoomFactor(zoomFactor) {
    const webView = document.getElementById("webview-frame-update");
    if (!webView) return;
    // @ts-ignore
    webView.setZoomFactor(zoomFactor);
  }

  useEffect(() => {
    if (frameData?.zoom) {
      setZoomFactor(zoom);
      handleXScroll();
      handleYScroll();
    }
  }, [frameData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white min-w-[90vw] max-w-[90vw] h-[90vh]">
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
                  setErrorMessages("");
                  setLink(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-transparent border border-slate-400 rounded-xl p-3  px-8 "
                onClick={(e) => {
                  e.preventDefault();

                  setErrorMessages("");
                  if (link === "") {
                    setErrorMessages("Link is required");
                    return;
                  }
                  if (validator.isURL(link) === false) {
                    setErrorMessages(
                      "Link is not valid url format eg: https://example.com"
                    );
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
            {errorMessages && (
              <div className="text-red-500 text-xs">{errorMessages}</div>
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
              h-[70vh]
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
                    p-3
                    flex
                    items-center
                    justify-between
                    gap-3
                    border
                    border-slate-400
                    
                    mb-3
                    "
                >
                  <label
                    htmlFor="name"
                    className="
                    text-gray-600
                    text-md
                    
                    "
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Update Frame name"
                    className=" w-full bg-transparent border border-slate-400 rounded-xl p-3 px-8 
                    "
                  />
                </div>
                {/* name - end */}
                <div
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
                </div>
                <div
                  className=" w-full bg-white rounded-xl p-3  gap-3 border border-slate-400  mb-3
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
                        step="100"
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
                        step="100"
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
            <div
              style={{
                width: `${width}px`,
                height: `${height}px`,
              }}
              className={`
              rounded-xl
              p-3
              relative
              `}
            >
              {frame ? (
                <webview
                  id="webview-frame-update"
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
              onClick={async () => {
                await addNewFrame();
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
