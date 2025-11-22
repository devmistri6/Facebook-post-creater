import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

const ImageUpload = ({ imagePreview, onImageChange }) => {
  const fileInputRef = useRef(null);

  const handleUploadClick = () => {
    if (imagePreview) {
      if (window.confirm('Do you want to change the image?')) {
        fileInputRef.current.click();
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onImageChange(files[0]);
    }
  };

  return (
    <div className="image-upload-container">
      <div
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`upload-area ${imagePreview ? 'has-image' : ''}`}
      >
        {!imagePreview ? (
          <div className="upload-content">
            <div className="upload-icon-wrapper">
              <Upload className="upload-icon" />
            </div>
            <div className="upload-text-container">
              <div className="upload-text">Click to upload image</div>
              <div className="upload-subtext">PNG, JPG, GIF up to 16MB</div>
            </div>
          </div>
        ) : (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input"
        />
      </div>
    </div>
  );
};

export default ImageUpload;