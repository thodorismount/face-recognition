import React, { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';

import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: 'e9f0c3fa288141e2b78c5618cf094c24'
});

const particlesOptions = {
  particles: {
    number: {
      value: '60',
      density: {
        enable: true,
        value_area: '800'
      }
    }
  }
};

function App(props) {
  const [input, setInput] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImgUrl(input);
    console.log(imgUrl);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function (response) {
        console.log(response.outputs[0].data.regions.length);
      },
      function (error) {}
    );
  };

  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
      <FaceRecognition imgUrl={imgUrl} />
    </div>
  );
}

export default App;
