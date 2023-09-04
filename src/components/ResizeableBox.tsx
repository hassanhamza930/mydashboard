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
      width={width || 200}
      height={height || 200}
      className={className}
      style={{
        border: "1px solid #ccc",
        resize: "both",
        overflow: "auto",
      }}
    >
      {children}
    </ResizableBox>
  );
};

export default ResizeableBox;
