import React from "react";

const VideoMini = ({source, poster}) => {
  return (
    <video width="320" height="240" poster={poster} controls>
      <source src={source} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoMini;
