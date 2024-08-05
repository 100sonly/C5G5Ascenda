import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <ClipLoader size={50} color={"#123abc"} loading={true} />
      <p>Fetching you the best prices...</p>
    </div>
  );
};

export default Loader;