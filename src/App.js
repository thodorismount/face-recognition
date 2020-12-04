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
  const [box, setBox] = useState([]);

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const calculateFaceLocation = data => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  console.log(box);

  const displayFaceBox = box => {
    setBox(box);
    console.log(box.topRow);
  };

  const onButtonSubmit = () => {
    setImgUrl(input);
    console.log(imgUrl);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then(response => {
        console.log(response.outputs[0].data.regions.length);
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch(err => console.log(err));
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
      <FaceRecognition box={box} imgUrl={imgUrl} />
    </div>
  );
}

export default App;
