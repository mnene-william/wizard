import React, { useState } from 'react';

const WizardForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
   
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    
    
    email: '',
    phone: '',
    address: '',
    city: '',
    
   
    rating: '',
    comments: '',
    subscribe: false
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Form submitted successfully!');
    // Here you would typically send data to an API
  };

  return (
    <div className="wizard-form">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Contact</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Feedback</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <PersonalDetails 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep}
          />
        )}
        
        {step === 2 && (
          <ContactInformation 
            formData={formData} 
            handleChange={handleChange} 
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}
        
        {step === 3 && (
          <Feedback 
            formData={formData} 
            handleChange={handleChange} 
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};


const PersonalDetails = ({ formData, handleChange, nextStep }) => {
  const { firstName, lastName, age, gender } = formData;
  
  const handleNext = (e) => {
    e.preventDefault();
    if (firstName && lastName && age) {
      nextStep();
    } else {
      alert('Please fill in all required fields');
    }
  };
  
  return (
    <div className="form-step">
      <h2>Personal Details</h2>
      <div className="form-group">
        <label>First Name*</label>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name*</label>
        <input
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Age*</label>
        <input
          type="number"
          name="age"
          value={age}
          onChange={handleChange}
          min="1"
          required
        />
      </div>
      <div className="form-group">
        <label>Gender</label>
        <select name="gender" value={gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>
      <button type="button" onClick={handleNext} className="next-btn">
        Next
      </button>
    </div>
  );
};


const ContactInformation = ({ formData, handleChange, nextStep, prevStep }) => {
  const { email, phone, address, city } = formData;
  
  const handleNext = (e) => {
    e.preventDefault();
    if (email && phone) {
      nextStep();
    } else {
      alert('Please fill in all required fields');
    }
  };
  
  return (
    <div className="form-step">
      <h2>Contact Information</h2>
      <div className="form-group">
        <label>Email*</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone*</label>
        <input
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </div>
      <div className="button-group">
        <button type="button" onClick={prevStep} className="prev-btn">
          Back
        </button>
        <button type="button" onClick={handleNext} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );
};


const Feedback = ({ formData, handleChange, prevStep, handleSubmit }) => {
  const { rating, comments, subscribe } = formData;
  
  return (
    <div className="form-step">
      <h2>Feedback</h2>
      <div className="form-group">
        <label>Rating</label>
        <select name="rating" value={rating} onChange={handleChange}>
          <option value="">Select a rating</option>
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very Good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>
      <div className="form-group">
        <label>Comments</label>
        <textarea
          name="comments"
          value={comments}
          onChange={handleChange}
          rows="4"
        />
      </div>
      <div className="form-group checkbox">
        <input
          type="checkbox"
          name="subscribe"
          checked={subscribe}
          onChange={handleChange}
          id="subscribe"
        />
        <label htmlFor="subscribe">Subscribe to our newsletter</label>
      </div>
      <div className="button-group">
        <button type="button" onClick={prevStep} className="prev-btn">
          Back
        </button>
        <button type="submit" onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default WizardForm;