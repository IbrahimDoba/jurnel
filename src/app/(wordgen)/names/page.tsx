import Name from "@/components/name";
import React from "react";
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Names',
};

function Names() {
  return (
    <div>
      <Name />
    </div>
  );
}

export default Names;
