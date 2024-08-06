import React, {useState} from 'react';
import './index.css'; 
import { AiFillEnvironment } from 'react-icons/ai';
import GuestDropdown from '../GuestDropdown';
import { Helmet } from "react-helmet";
import {useLocation} from "react-router-dom";



const SearchForm = ({ customClass ,params}) => {

    const [children, setChildren] = useState(0);
    const [parents, setParents] = useState(0);

    const handleChildren = (newState) => {
        setChildren(newState);
    };


    const handleParents = (newState) => {
        setParents(newState);
    };
  return (

    <form className={`search-form ${customClass}`} action={`/Hotels`}>
        <Helmet>
            <script src="autocomplete.js" type="text/javascript"></script>
        </Helmet>
          <div className="input-container">
              <input type="text" placeholder="Destination" className="form-input" id="destination_id" autocomplete="off"
                     name="destination_id"/>
              <AiFillEnvironment className="input-icon"/>
          </div>
          <input type="date" placeholder="Check-in" className="form-input" id="checkin" name="checkin"/>
          <input type="date" placeholder="Check-out" className="form-input" id="checkout" name="checkout"/>
          <GuestDropdown handleChildren={handleChildren} handleParents={handleParents}  params= { params } />
          <div id="result"></div>
          <input type="hidden" id="adultchildren" name="adultchildren" value="0,0"/>
          <input type="hidden" id="destination_name" name="destination_name" value=""/>
          <button type="submit" className="form-submit">Search</button>


      </form>
  );
};

export default SearchForm;
