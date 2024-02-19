import axios from 'axios';
import React, { useState } from 'react';
import ProfilePreview from './ProfilePreview';
import "./profileCreation.css"
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'


const ProfileCreation = () => {

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    birthDate: '',
    age: '',
    religion: '',
    community: '',
    subCommunity: '',
    language: '',
    livingIn: '',
    gender: '',
    location: '',
    maritalStatus: '',
    familyAbout: '',
    diet: '',
    height: '',
    highestQualification: '',
    collegeName: '',
    workType: '',
    companyName: '',
    position: '',
    income: '',
    expressYourself: '',
    familyType: '',
    fatherOccupation: '',
    motherOccupation: '',
    siblings: '',
    familyLocation: '',
    contactAddress: '',
    familyAbout: '',
    profilePicture: null,
    resume: null,

  });
  const [showPreview, setShowPreview] = useState(false);
  // const [file, setFile] = useState({datafile:''});

  const religions = ['Hindu', 'Christian', 'Jain', 'Muslim', 'Buddhist', 'Sikh', 'Parsi', 'Jewish', 'Other', 'No Religion', 'Spritual - not religious'];
  const communities = ['Hindi', 'Marathi','Punjabi','Bengali','Gujarati','Urdu','Telugu','Kannada','English','Tamil','Odia','Marwari','Aka','Arabic',  'Arunachali', 'Assamese', 'Awadhi', 'Baluchi','Bhojpuri','Bhutia','Brahui','Brij','Burmese','Chattisgarhi','Chinese','Coorgi','Dogri','French','Garhwali','Garo','Haryanavi','Himachal / Pahari','Hindko','Kakbarak','Kanauji','Kashmiri','Khandesi','Khasi','Konkani','Koshali','Kumaoni','Kutchi','Ladakhi','Lepcha','Magahi','Maithili','Malay','Malayalam','Manipuri','Miji','Mizo','Monpa','Nepali','Pashto','Persian','Rajasthani','Russian','Sanskrit','Santhali','Seraiki','Sindhi','Sinhala','Sourashtra','Spanish','Swedish','Tagalog','Tulu','Other']
  const languages = ['Hindi','English','Chinese','German']
  const qualifications = ['BE','ME','MBA','BTech','MTech','BA','STEM']
  const works = ['Private Company', 'Government/Public Sector','Defence/Civil Services','Business/Self Employed','Not Working']
  const marriage = ['Never Married', 'Divorced','Widowed', 'Awaiting Divorce','Annulled']

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  // const handleFileChange = (e) => {
  //   setFormData({...formData, datafile: e.target.files[0]});
  // };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePictureChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleResumeChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const config = { headers: { 'Content-Type': 'multipart/form-data' } }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      const response = await axios.post('/create-profile', formDataToSend, config);
      console.log(response.data);
      setShowPreview(true);
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };
  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };


  return (
    <div className='container'>
      <h2 className='profileHeading'>Create Profile</h2>
      {!showPreview ? (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div>
              <h3>Basic Details</h3>
              <div className="form-group">
                <label htmlFor="name">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Contact No.</label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Mobile No."
                  min="1"
                  max="20"
                  value={formData.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Date of Birth</label>
                <input
                  type="date"
                  name="birthDate"
                  placeholder="Date of Birth"
                  value={formData.birthDate}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  type="text"
                  name="age"
                  placeholder="Age"
                  value={calculateAge(formData.birthDate) || "Age"}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Gender</label>
                <input
                  type="text"
                  name="gender"
                  placeholder="Gender"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Height</label>
                <input
                  type="text"
                  name="height"
                  placeholder="Height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Diet</label>
                <select
                  type="text"
                  name="diet"
                  placeholder="Diet"
                  value={formData.diet}
                  onChange={handleChange}
                >
                  <option value="">Veg</option>
                  <option value="">Non-veg</option>
                  <option value="">Occationaly non-Veg</option>
                  <option value="">Eggtarian</option>
                  <option value="">Jain</option>
                  <option value="">Vegan</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name">Living In</label>
                <input
                  type="text"
                  name="livingIn"
                  placeholder="Living In"
                  value={formData.livingIn}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Religion</label>
                <select
                  id="religion"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                >
                  <option value="">Select Religion</option>
                  {religions.map((religion, index) => (
                    <option key={index} value={religion}>{religion}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name">Community</label>
                <select
                  id="community"
                  name="community"
                  value={formData.community}
                  onChange={handleChange}
                >
                  <option value="">Select Community</option>
                  {communities.map((community, index) => (
                    <option key={index} value={community}>{community}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name">Sub Community</label>
                <input
                  type="text"
                  name="subCommunity"
                  placeholder="Sub Community"
                  value={formData.subCommunity}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Language</label>
                <select
                  type="text"
                  name="language"
                  placeholder="Language"
                  value={formData.language}
                  onChange={handleChange}
                >
                  <option value="">Select Language</option>
                  {languages.map((language,index)=>(
                    <option key={index} value={language}>{language}</option>
                  ))}
                </select>
              </div>

            </div>)}
          {step === 2 && (
            <div>
              <h3>Career Details</h3>
              <div className="form-group">
                <label htmlFor="name">Location</label>
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Highest Qualification</label>
                <select
                  type="text"
                  name="highestQualification"
                  placeholder="Highest Qualification"
                  value={formData.highestQualification}
                  onChange={handleChange}
                >
                  <option value="">Highest Education</option>
                  {qualifications.map((qualification,index)=>(
                    <option key={index} value={qualification}>{qualification}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name">College Name</label>
                <input
                  type="text"
                  name="collegeName"
                  placeholder="College Name"
                  value={formData.collegeName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Work Type</label>
                <select
                  type="text"
                  name="workType"
                  placeholder="Work Type"
                  value={formData.workType}
                  onChange={handleChange}
                >
                 <option value="">Select Type</option>
                  {works.map((work,index)=>(
                    <option key={index} value={work}>{work}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="name">Company name</label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="Comapany Name"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Position</label>
                <input
                  type="text"
                  name="position"
                  placeholder="Position at Work"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Income</label>
                <input
                  type="text"
                  name="income"
                  placeholder="Income"
                  value={formData.income}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Express Yourself</label>
                <input
                  type="text"
                  name="expressYourself"
                  placeholder="Express Yourself"
                  value={formData.expressYourself}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Marital Status</label>
                <select
                  type="text"
                  name="maritalStatus"
                  placeholder="Marital Status"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                >
                  <option value="">Marital Status</option>
                  {marriage.map((status,index)=>(
                    <option key={index} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h3>Lifestyle & Family Details</h3>
              <div className="form-group">
                <label htmlFor="name">Family Type</label>
                <input
                  type="text"
                  name="familyType"
                  placeholder="Family Type"
                  value={formData.familyType}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Father's Occupation</label>
                <input
                  type="text"
                  name="fatherOccupation"
                  placeholder="Father's Occupation"
                  value={formData.fatherOccupation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Mother's Occupation</label>
                <input
                  type="text"
                  name="motherOccupation"
                  placeholder="Mother's Occupation"
                  value={formData.motherOccupation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Siblings</label>
                <input
                  type="text"
                  name="siblings"
                  placeholder="Siblings"
                  value={formData.siblings}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Family Location</label>
                <input
                  type="text"
                  name="familyLocation"
                  placeholder="Family Location"
                  value={formData.familyLocation}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Contact Address</label>
                <input
                  type="text"
                  name="contactAddress"
                  placeholder="Contact Address"
                  value={formData.contactAddress}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">About Family</label>
                <input
                  type="text"
                  name="familyAbout"
                  placeholder="About family"
                  value={formData.familyAbout}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <div className="form-group">
                <label htmlFor="name">Image</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleProfilePictureChange}
                  accept=".jpg,.jpeg,.png,.gif"
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Biodata</label>
                <input type="file" name="resume" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
              </div>
            </div>
          )}

          {step > 1 && (
            <button onClick={handlePreviousStep} type='button' className="previous-button">
              Previous
            </button>)}
          {step < 5 && (
            <button onClick={handleNextStep} type='button' className="next-button">
              Next
            </button>
          )}
          {step === 4 && (

            <button type="submit" className="submit-btn">Preview Profile</button>
          )}
        </form>
      ) : (
        <ProfilePreview formData={formData} setShowPreview={setShowPreview} />
      )}
    </div>
  );
};

export default ProfileCreation;
