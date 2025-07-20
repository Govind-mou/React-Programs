import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    age: '',
    gender: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    return '';
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Invalid email format';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone) return 'Phone is required';
    if (!phoneRegex.test(phone)) return 'Phone must be 10 digits';
    return '';
  };

  const validateAge = (age) => {
    if (!age) return 'Age is required';
    if (isNaN(age) || age < 18 || age > 100) return 'Age must be between 18 and 100';
    return '';
  };

  const validateGender = (gender) => {
    if (!gender) return 'Gender is required';
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    let error = '';
    switch (name) {
      case 'name':
        error = validateName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'password':
        error = validatePassword(value);
        break;
      case 'confirmPassword':
        error = validateConfirmPassword(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'age':
        error = validateAge(value);
        break;
      case 'gender':
        error = validateGender(value);
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const isFormValid = () => {
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword);
    const phoneError = validatePhone(formData.phone);
    const ageError = validateAge(formData.age);
    const genderError = validateGender(formData.gender);

    const allErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      phone: phoneError,
      age: ageError,
      gender: genderError,
    };

    setErrors(allErrors);

    return Object.values(allErrors).every((error) => error === '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      // Reset the form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        age: '',
        gender: '',
      });
      setErrors({});
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="container">
      <h1>Registration Form</h1>
      {submitted && <p className="success-msg">Form submitted successfully!</p>}
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="form-control">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="form-control">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="form-control">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

        {/* Phone */}
        <div className="form-control">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        {/* Age */}
        <div className="form-control">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.age && <p className="error">{errors.age}</p>}
        </div>

        {/* Gender */}
        <div className="form-control">
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="">--Select--</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <p className="error">{errors.gender}</p>}
        </div>

        {/* Submit */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
