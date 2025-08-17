import ResumePreviewer from "@/components/ResumePreviewer";
import { ResumeValues } from "@/lib/validation";
import React from "react";
import ColorPicker from "./ColorPicker";
import BorderStyleButton from "./BorderStyleButton";

type ResumePreviewSectionProps = {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
};

const ResumePreviewerSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="group relative hidden w-1/2 md:flex">
      <div
        className="
        opacity-50
        xl:opacity-100 
        group-hover:opacity-100
        transition-opacity
        absolute left-1 top-1 flex flex-col gap-3 flex-none lg:left-3 lg:top-3"
      >
        <ColorPicker
          color={resumeData.colorHex}
          onChange={(color) =>
            setResumeData({ ...resumeData, colorHex: color.hex })
          }
        />
        <BorderStyleButton
          borderStyle={resumeData.borderStyle}
          onChange={(borderStyle) =>
            setResumeData({ ...resumeData, borderStyle: borderStyle })
          }
        />
      </div>
      <div className="flex w-full justify-center overflow-y-auto bg-secondary p-3">
        <ResumePreviewer
          className="max-w-2xl shadow-md"
          resumeData={resumeData}
        ></ResumePreviewer>
      </div>
    </div>
  );
};

export default ResumePreviewerSection;
