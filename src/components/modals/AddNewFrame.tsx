import React, { useState } from "react";
import toast from "react-hot-toast";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
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
  groupId: string;
}

const AddNewFrame: React.FC<Props> = ({ open, setOpen, groupId }) => {
  const db = getFirestore(firebaseApp);
  const user = useUser();
  const [link, setLink] = useState("");
  const [errorMessages, setErrorMessages] = useState<string>();
  const [frame, setFrame] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [width, setWidth] = useState<number>(500);
  const [height, setHeight] = useState<number>(500);
  const [yPosition, setYPosition] = useState<number>(0);
  const [xPosition, setXPosition] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1);

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

    if (name === "") {
      setErrorMessages("Name is required");
      return;
    }
    if (width === 0) {
      setErrorMessages("Width is required");
      return;
    }
    if (height === 0) {
      setErrorMessages("Height is required");
      return;
    }

    const id = uuid();

    await setDoc(
      doc(db, "frames", id),
      {
        user: user.uid,
        groupId: groupId,
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
    const webView = document.getElementById("webview-frame");
    if (!webView) {
      return;
    }
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition});`);
  };

  const handleXScroll = () => {
    const webView = document.getElementById("webview-frame");
    if (!webView) {
      return;
    }
    // @ts-ignore
    webView.executeJavaScript(`window.scrollTo(${xPosition}, ${yPosition});`);
  };

  function setZoomFactor(zoom: number) {
    const webView = document.getElementById("webview-frame");
    if (!webView) {
      return;
    }

    // @ts-ignore
    webView.setZoomFactor(zoom);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white min-w-[90vw] max-w-[90vw] h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-left">
            New Frame
          </DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="w-full">
            <form className="flex gap-x-4">
              <input
                type="text"
                className="w-full bg-transparent border-slate-400 border rounded-xl p-3  px-8 "
                placeholder="Frame link"
                value={link}
                onChange={(e) => {
                  setErrorMessages("");
                  setLink(e.target.value);
                }}
              />
              <button
                type="submit"
                className="bg-transparent border-slate-400 border rounded-xl p-3  px-8 "
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
              <p className="text-red-500 text-xs">{errorMessages}</p>
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
                    p-1
                    flex
                    items-center
                    justify-between
                    gap-3
                    border
                  border-slate-400
                    
                    mb-3
                    "
                >
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="Frame Name"
                    className="
                      w-full
                      bg-transparent
                      
                      rounded-xl
                      p-3
                      px-8
                      
                    "
                  />
                </div>
                {/* name - end */}
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
                        className="
                        w-full
                        bg-transparent
                        accent-[#111]
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
            <div
              className=" h-[70vh]  overflow-y-auto "
              style={{
                width: `${width}px`,
              }}
            >
              <div
                style={{
                  width: `100%`,
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
                    id="webview-frame"
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
              className="bg-transparent border border-slate-400  hover:opacity-75"
            >
              <span className="text-darkgray">cancel</span>
            </Button>
            <Button
              onClick={async () => {
                await addNewFrame();
                setOpen(false);
              }}
            >
              <span className="text-white">Create</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewFrame;
