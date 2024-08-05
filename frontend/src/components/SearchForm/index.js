import React, {useState} from 'react';
import './index.css'; 
import { AiFillEnvironment } from 'react-icons/ai';
import GuestDropdown from '../GuestDropdown';
import { Helmet } from "react-helmet";



const SearchForm = ({ customClass }) => {

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
          <div className="input-container">
              <input type="text" placeholder="Destination" className="form-input" id="destination_id"
                     name="destination_id"/>
              <AiFillEnvironment className="input-icon"/>
          </div>
          <input type="date" placeholder="Check-in" className="form-input" id="checkin" name="checkin"/>
          <input type="date" placeholder="Check-out" className="form-input" id="checkout" name="checkout"/>
          <GuestDropdown handleChildren={handleChildren} handleParents={handleParents}/>
          <div id="result"></div>
          <input type="hidden" id="adultchildren" name="adultchildren" value="0,0"/>
          <button type="submit" className="form-submit">Search</button>

          <Helmet>
              <script src="autocomplete.js" type="text/javascript"></script>
          </Helmet>
      </form>
  );
};

export default SearchForm;
