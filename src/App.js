import './App.css';
import Header from './components/header'
import Main from './components/main'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: undefined,
    }
  }

  handleFileUpload = (file) => { 
    this.setState({ image: file }); }

  render() {
    return (
      <div className="App">
        <Header onFileUpload={this.handleFileUpload}/>
        <Main image={this.state.image}/>
      </div>
    );
  }
}

export default App;
