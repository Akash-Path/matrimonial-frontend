import React from 'react';

const ProfilePreview = ({ formData, setShowPreview }) => {
  const handleClose = () => {
    setShowPreview(false);
  };

  return (
    <div>
      <h2>Profile Preview</h2>
      <div>
        <span onClick={handleClose} style={{ cursor: 'pointer' }}>
          Close
        </span>
      </div>
      <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
      <p>Gender: {formData.gender}</p>
      <p>Location: {formData.location}</p>
      {/* Display other profile details */}
    </div>
  );
};

export default ProfilePreview;
