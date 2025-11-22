import React, { useState } from 'react';
import { FileText, Send, AlignLeft } from 'lucide-react';
import ImageUpload from './ImageUpload';

const PostForm = ({ onSubmit, isSubmitting }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const success = await onSubmit({ imageFile, title, description });
    
    if (success) {
      setImageFile(null);
      setImagePreview('');
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="post-card">
      <div>
        <ImageUpload 
          imagePreview={imagePreview} 
          onImageChange={handleImageChange} 
        />

        <div className="form-group">
          <label className="form-label">
            <AlignLeft className="label-icon" />
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your post an eye-catching title"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            <FileText className="label-icon" />
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share your story, add details, or describe your image..."
            className="form-textarea"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="submit-button"
        >
          {isSubmitting ? (
            <>
              <svg className="spinner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>Posting to Facebook...</span>
            </>
          ) : (
            <>
              <Send className="button-icon" />
              <span>Post to Facebook</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PostForm;