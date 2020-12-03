import React from 'react';

const FaceRecognition = props => {
  return (
    <div className='center'>
      <div className='absolute mt2'>
        <img alt='' src={props.imgUrl} width='500px' height='auto' />
      </div>
    </div>
  );
};

export default FaceRecognition;
