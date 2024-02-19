import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePreview = ({ formData, setShowPreview }) => {
  const handleClose = () => {
    window.location.reload()
    // navigate("/get-profiles")
    // setShowPreview(false);
  };
  const navigate = useNavigate()

  return (
    <div>
      <h2>Profile Preview</h2>
      <img src={`http://localhost:5000/${encodeURIComponent(formData.profilePicture)}`} alt="Profile" style={{ width: '200px', height: '200px' }} />
      <p>First Name: {formData.firstName}</p>
      <p>Last Name: {formData.lastName}</p>
      <p>Email: {formData.email}</p>
      <p>Mobile No.: {formData.mobile}</p>
      <p>Date of Birth: {formData.birthDate}</p>
      <p>Gender: {formData.gender}</p>
      <p>Height: {formData.height}</p>
      <p>Diet: {formData.diet}</p>
      <p>Living In: {formData.livingIn}</p>
      <p>Language: {formData.language}</p>
      <p>Religion: {formData.religion}</p>
      <p>Marital status: {formData.maritalStatus}</p>
      <p>Community: {formData.community}</p>
      <p>Sub Community: {formData.subCommunity}</p>
      <p>Location: {formData.location}</p>
      <p>Higest Qualification: {formData.highestQualification}</p>
      <p>College Name: {formData.collegeName}</p>
      <p>Work Type: {formData.workType}</p>
      <p>Company Name: {formData.companyName}</p>
      <p>Position: {formData.position}</p>
      <p>Income: {formData.income}</p>
      <p>Express Yourself: {formData.expressYourself}</p>
      <p>Family Type: {formData.familyType}</p>
      <p>Father's Occupation: {formData.fatherOccupation}</p>
      <p>Mother's Occupation: {formData.motherOccupation}</p>
      <p>Siblings: {formData.siblings}</p>
      <p>Family Location: {formData.familyLocation}</p>
      <p>Contact Address: {formData.contactAddress}</p>
      <p>Family About: {formData.familyAbout}</p>
      <div>
      </div>
      <button onClick={handleClose}>Go to Profiles</button>
    </div>
  );
};

export default ProfilePreview;
