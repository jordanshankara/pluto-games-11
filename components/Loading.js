import React from "react";
import loading from "../public/assets/loading.gif";
import Image from "next/image";

export default function Loading() {
  return <Image src={loading} alt="Loading" />;
}
