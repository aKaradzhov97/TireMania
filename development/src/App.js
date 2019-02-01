import React, { Component } from 'react';
import Header from './components/common/Header';
import AppRouter from './components/AppRouter';
import Footer from './components/common/Footer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AppRouter />
        <Footer />
      </div>
    );
  }
}

export default App;
