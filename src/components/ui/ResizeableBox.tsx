import { ResizableBox } from "react-resizable";

interface Props {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  minConstraints?: [number, number];
  maxConstraints?: [number, number];
}

const ResizeableBox: React.FC<Props> = ({
  children,
  className,
  width,
  height,
}) => {
  return (
    <ResizableBox
      width={width || 400}
      height={height || 900}
      className={className}
      style={{
        border: "1px solid #ccc",
        resize: "horizontal",
        overflow: "hidden",
      }}
    >
      {children}
    </ResizableBox>
  );
};

export default ResizeableBox;
