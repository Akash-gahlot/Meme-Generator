import React from 'react';
import Header from './components/Header'; 
import Form from './components/Form';
import Footer from './components/Footer';
import './App.css';



export default function App() {
  console.log("App running")
  return (
    <div className="App">
      <Header/>
      <Form />
      <Footer/>
    </div>
  );
}


