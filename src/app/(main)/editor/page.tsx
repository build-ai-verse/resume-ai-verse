import { Metadata } from "next";
import React, { Suspense } from "react";
import ResumeEditor from "./ResumeEditor";

export const metadata: Metadata = {
  title: "Design your resume",
};

const Page = () => {
  return (
    <Suspense>
      <ResumeEditor />
    </Suspense>
  );
};

export default Page;
