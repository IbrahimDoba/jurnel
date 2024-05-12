import Quote from "@/components/quote";
import React from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quotes',
};

function Quotes() {
  return (
    <div>
      <Quote />
    </div>
  );
}

export default Quotes;
