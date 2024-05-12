import Word from "@/components/word";
import React from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Words',
};

function Words() {
  return (
    <div>
      <Word />
    </div>
  );
}

export default Words;
