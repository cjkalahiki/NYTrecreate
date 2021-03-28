import React from 'react';
import logo from './logo.svg';
import './App.css';
import NYTFetch from './Components/nytFetch';

function App () {
  document.title = 'New York Times Search Engine'
  return (
    <div className="App">
      <NYTFetch />
    </div>
  );
}

export default App;
