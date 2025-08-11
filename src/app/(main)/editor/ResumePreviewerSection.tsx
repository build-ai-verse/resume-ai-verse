import ResumePreviewer from "@/components/ResumePreviewer";
import { ResumeValues } from "@/lib/validation";
import React from "react";

type ResumePreviewSectionProps = {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
};

const ResumePreviewerSection = ({
  resumeData,
  setResumeData,
}: ResumePreviewSectionProps) => {
  return (
    <div className="hidden w-1/2 md:flex">
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
