import React, { useEffect, useRef } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { IFrame } from "../../types";
import { doc, getFirestore, updateDoc } from "firebase/firestore";

interface Props {
  frame: IFrame;
}

const Frame: React.FC<Props> = ({ frame }) => {
  const width = frame?.width;
  const height = frame?.height;
  const resizeDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const db = getFirestore();

    const updateFrame = async () => {
      const docRef = doc(db, "frames", frame.id);

      await updateDoc(docRef, {
        width: resizeDiv.current?.clientWidth,
        height: resizeDiv.current?.clientHeight,
      });
    };

    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver(() => {
      updateFrame();
    });

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
        width: width,
        height: height,
        resize: "both",
        overflow: "auto",
      }}
    >
      <div
        className="
  absolute
  top-1
  text-sm
  font-medium
  text-gray-600
  my-1
  mx-3
  "
      >
        {frame?.name}
      </div>
      <div
        className="
    absolute
    top-1
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
          className="text-gray-400 group-hover:text-gray-600"
          onClick={
            () => {}
            // setOpen((prev) => {
            //   return !prev;
            // })
          }
        />
      </div>

      <webview
        src={frame?.link}
        className="
      h-full
      w-full
      resize-both
      overflow-auto
      rounded-xl
      shadow-md
    "
      />
    </div>
  );
};

export default Frame;
