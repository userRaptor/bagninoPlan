import React from 'react';
import CSVReader from 'react-csv-reader';
import axiosClient from '../../axios-client';


function Testing (){

  const handleForce = (data, fileInfo) => {
    console.log(data);
    // Hier können Sie einen POST-Request an Ihren Laravel-Server senden, um die Daten zu speichern
    axiosClient
      .post("/groceriescsv", data)
      .then((response) => {

      })
      .catch((error) => {
          console.log(error);
      });
  }


  return (
    <div className="App">
      <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV with secret Death Star blueprints"
        onFileLoaded={handleForce}
      />
    </div>

  );
}

export default Testing;