import React from "react";

function camelCaseToSpaced(string) {
    let outString = "";
    let character = string.charAt(0);
    outString = outString + character.toUpperCase();
    for (let i=1; i < string.length; i++) {
      character = string.charAt(i);
      if (!isNaN(character * 1)){
        outString = outString + character;
      }else{
        if (character == character.toUpperCase()) {
            outString = outString + " " + character;
        }
        if (character == character.toLowerCase()){
            outString = outString + character;
        }
      }
    }
    return outString;
  }

function AmenitiesList({amenities}) {
    const keyList = Object.keys(amenities);
    return (
        keyList.map(function(key, i) {
            if (amenities[keyList[i]] == true) {
                return <div>{camelCaseToSpaced(keyList[i])}</div>
            }
        })
    );
}

export default AmenitiesList;