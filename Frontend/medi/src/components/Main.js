import React, { useState } from 'react';
import axios from 'axios';
import './Main.css';


const Main = () => {
  const [City, setCity] = useState('');
  const [Speciality, setSpeciality] = useState('');
  const [searchResults, setSearchResults] = useState(new Set()); // Use Set for distinct records
  const [errorMessage, setErrorMessage] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSpecialityChange = (e) => {
    setSpeciality(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/search', {
              City,
              Speciality,
      });

  
      setSearchResults(new Set(response.data));
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred while fetching results.');
    }
  };

  return (
    <div className="main-container">
      <select value={City} onChange={handleCityChange}>
        <option value="">Choose City</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Chennai">Chennai</option>
        <option value="Bangalore">Bangalore</option>
        <option value="Delhi">Delhi</option>
      </select>

      <select value={Speciality} onChange={handleSpecialityChange}>
        <option value="">Choose a Speciality</option>
        <option value="Orthopaedic">Orthopaedic</option>
        <option value="Cardiologist">Cardiologist</option>
        <option value="Ophthalmologist">Ophthalmologist</option>
        <option value="Urology">Urology</option>
        <option value="Anesthesiology">Anesthesiology</option>
        <option value="Neurologist">Neurologist</option>
        <option value="Pathology">Pathology</option>
        <option value="Gastroenterology">Gastroenterology</option>
        <option value="General Surgery">General Surgery</option>
        <option value="Gynaecologist">Gynaecologist</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      <div>
        {/* Display fetched records */}
        {errorMessage && <p>{errorMessage}</p>}
        {[...searchResults].map((record) => (
          <div key={record.Id} className="record-container">
          <img
            src={require(`../images/${record.Doctor_Name.replace(/\s/g, '_')}.jpg`)}
            alt={record.Doctor_Name}
            className="record-image"
          />
          <div className="record-details">
          <div>Doctor Name: {record.Doctor_Name}</div>
          <div>City: {record.City}</div>
          <div>Speciality: {record.Speciality}</div>
          <div>Hospital Name: {record.Hospital_Name}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default Main;