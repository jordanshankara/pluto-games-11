import React from "react";
import AvatarEditor from "react-avatar-editor";
import { PropTypes } from "prop-types";
import { Input } from "reactstrap";

function ImageCrop({ imageSrc, setEditorRef, scaleValue, onScaleChange }) {
  return (
    <div className="d-flex flex-column align-items-center">
      <AvatarEditor
        image={imageSrc}
        border={50}
        scale={scaleValue}
        ref={setEditorRef}
      />
      <Input
        style={{ width: "100" }}
        type="range"
        value={scaleValue}
        min="1"
        max="10"
        onChange={onScaleChange}
      />
    </div>
  );
}
ImageCrop.propTypes = {
  imageSrc: PropTypes.string,
  scaleValue: PropTypes.number,
  setEditorRef: PropTypes.string,
  onScaleChange: PropTypes.string,
};

export default ImageCrop;
