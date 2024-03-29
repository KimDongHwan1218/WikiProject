import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";

async function fetchImage(src, updateSrc) {
  // const image = await S3.getimage(src)
  if (!src.includes("downloads")) {
    const image = await Storage.get(src);
    updateSrc(image);
  } else {
    updateSrc(src);
  }
}

const Image = ({ src, ...props }) => {
  const [imageSrc, updateSrc] = useState(null);
  useEffect(() => {
    fetchImage(src, updateSrc);
  }, [src]);

  return imageSrc ? <img src={imageSrc} {...props} /> : null;
};

export default Image;