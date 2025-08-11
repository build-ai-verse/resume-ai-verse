import { useDimension } from "@/hooks/useDimension";
import { cn } from "@/lib/utils";
import { ResumeValues } from "@/lib/validation";
import React, { useRef } from "react";

type ResumePreviewProps = {
  resumeData: ResumeValues;
  className?: string;
};

const ResumePreviewer = ({ resumeData, className }: ResumePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { width } = useDimension(containerRef);

  return (
    <div
      className={cn(
        "bg-white text-black h-fit w-full aspect-[210/297]",
        className
      )}
      ref={containerRef}
    >
      <div
        className={cn("space-y-6 p-6", !width && "invisible")}
        style={{
          zoom: (1 / 794) * width,
        }}
      >
        <h1 className="p-6 text-3xl font-bold">
          This text should change with the size of the container fiv
        </h1>
      </div>
    </div>
  );
};

type ResumeSectionProps = {
  resumeData: ResumeValues;
};

export default ResumePreviewer;
