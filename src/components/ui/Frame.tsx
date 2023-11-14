import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IFrame } from "../../types";
import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import FrameMenu from "../DropDowns/FrameMenu";
import toast from "react-hot-toast";
import UpdateFrame from "../modals/UpdateFrame";

interface Props {
  frame: IFrame;
}

const Frame: React.FC<Props> = ({ frame }) => {
  const [open, setOpen] = useState(false);
  const [updateFrameOpen, setUpdateFrameOpen] = useState(false);
  const resizeDiv = useRef<HTMLDivElement | null>(null);
  const db = getFirestore();
  const [dragging, setDragging] = useState(false);
  const [menu, setMenu] = useState(false);
  const id = useId();

  const deleteFrame = async () => {
    try {
      await deleteDoc(doc(db, "frames", frame.id));
      toast.success("Frame deleted successfully");
      console.log("Frame deleted successfully");
    } catch (error) {
      console.error("Error deleting Frame:", error.code);
      toast.error(error.code);
    }
  };

  // eslint-disable-next-line
  const handleWebViewAction = useCallback(
    (action: any) => {
      const webView = document.getElementById(`${id}`) as any;
      if (webView) {
        webView.addEventListener("dom-ready", () => {
          action(webView);
        });
      }
    },
    [id]
  );

  useEffect(() => {
    const setZoomFactor = (zoomFactor: number) => {
      handleWebViewAction((webView) => {
        // @ts-ignore
        webView.setZoomFactor(zoomFactor);
      });
    };

    const handleXScroll = () => {
      handleWebViewAction((webView) => {
        // @ts-ignore
        webView.executeJavaScript(`window.scrollTo(${frame.xPosition}, 0)`);
      });
    };

    const handleYScroll = () => {
      handleWebViewAction((webView) => {
        // @ts-ignore
        webView.executeJavaScript(`window.scrollTo(0, ${frame.yPosition})`);
      });
    };

    const getScroll = () => {
      handleWebViewAction((webView) => {
        // @ts-ignore
        webView
          .executeJavaScript(`window.scrollY`)
          .then((yPosition: number) => {
            // @ts-ignore
            webView
              .executeJavaScript(`window.scrollX`)
              .then((xPosition: number) => {
                console.log("xPosition", xPosition, "yPosition", yPosition);
              });
          });
      });
    };
    if (frame.zoom) {
      setZoomFactor(frame.zoom);
    }
    if (frame.xPosition) {
      handleXScroll();
    }
    if (frame.yPosition) {
      handleYScroll();
    }
    getScroll();

    // return () => {
    //   clearInterval(interval);
    // };
  }, [
    frame.zoom,
    frame.xPosition,
    frame.yPosition,
    dragging,
    handleWebViewAction,
  ]);

  useEffect(() => {
    const updateFrame = async () => {
      const docRef = doc(db, "frames", frame.id);

      await updateDoc(docRef, {
        width: resizeDiv.current?.clientWidth,
        height: resizeDiv.current?.clientHeight,
      });
    };

    const resizeObserver = new ResizeObserver(updateFrame);

    if (resizeDiv.current) {
      resizeObserver.observe(resizeDiv.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [frame, resizeDiv]);

  return (
    <div
      id="resizableDiv"
      onMouseDown={() => {
        console.log("dragging");
        setDragging(true);
      }}
      onMouseUp={() => {
        console.log("dragging done");
        setDragging(false);
      }}
      className="
        p-1
        rounded-xl
        shadow-sm
        bg-slate-200
        relative
        pt-8
      "
      key={frame?.id}
      ref={resizeDiv}
      style={{
        width: frame?.width,
        height: frame?.height,
        resize: "both",
        overflow: "auto",
      }}
    >
      <div
        onMouseEnter={() => {
          console.log("over menu");
          setMenu(true);
        }}
        onMouseLeave={() => {
          console.log("out of menu");
          setMenu(false);
        }}
        className="
        absolute
         z-10
        top-1
        text-sm
        font-semibold
        uppercase
        text-gray-600
        my-1
        mx-3
        "
      >
        {frame?.name}
      </div>
      <div
        onMouseEnter={() => {
          console.log("over menu");
          setMenu(true);
        }}
        onMouseLeave={() => {
          console.log("out of menu");
          setMenu(false);
        }}
        className="
          absolute
          top-1
          z-10
          right-1
          text-sm
          font-medium
          text-gray-600
          my-1
          mx-3
          cursor-pointer
          "
      >
        <BiDotsVerticalRounded
          size={18}
          className="text-gray-600 group-hover:text-gray-800"
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        />
        <FrameMenu
          open={open}
          setOpen={setOpen}
          deleteFrame={deleteFrame}
          setIsUpdateFrameOpen={setUpdateFrameOpen}
        />
      </div>

      <div className="h-full w-full">
        {(menu == false && dragging == true) || updateFrameOpen == true ? (
          <div className="bg-gray h-full w-full text-black/90 flex justify-center items-center text-md flex-col gap-5">
            Resizing
            <div className="h-10 w-10 bg-black/90 animate-spin"></div>
          </div>
        ) : (
          <webview
            src={frame?.link}
            id={`${id}`}
            className="
          h-full
          w-full
          resize-both
          overflow-auto
          rounded-xl
          shadow-md
        "
          />
        )}
      </div>

      <UpdateFrame
        open={updateFrameOpen}
        setOpen={setUpdateFrameOpen}
        frameData={frame}
      />
    </div>
  );
};

export default Frame;
