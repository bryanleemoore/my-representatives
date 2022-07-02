import React, { useState, useEffect, useRef } from "react";
import logo from '../images/logo.png'
import "./styles/Startup.css";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(updateQuery, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ['address'], componentRestrictions: { country: "us" } }
  );
  autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.addListener("place_changed", () =>
    handlePlaceSelect(updateQuery)
  );
}

async function handlePlaceSelect(updateQuery) {
  const addressObject = autoComplete.getPlace();
  const query = addressObject.formatted_address;
  updateQuery(query);
}


function Startup({setConstituent}) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  function handleSubmit()
  {
    setConstituent(query);
  }
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyDRZuEFP9Y9rUvs0gJsqB7KDmaHPnv8rTo&libraries=places`,
      () => handleScriptLoad(setQuery, autoCompleteRef)
    );
  }, []);


  return (
    <div>
      <img src ={logo}/>
      <div className="search-location-input">
      
        <input className ="input"
          ref={autoCompleteRef}
          onChange={event => setQuery(event.target.value)}
          placeholder="Enter a City"
          value={query}
        />
       <button onClick={handleSubmit}>
        Search
      </button>
         
      </div>
     
      
    </div>
  );
}

export default Startup;