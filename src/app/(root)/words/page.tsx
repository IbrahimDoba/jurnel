import Word from "@/components/word";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Words",
};

function Words() {
  return (
    <div className="my-10 flex flex-col gap-8">
      <Word />
    </div>
  );
}

export default Words;
