import React from 'react';
import Carousel from './components/Carousel';
import {slidesArray} from './config';

function App() {
    return <>
        <Carousel width={400} height={300} slides={slidesArray}/>
    </>
}

export default App;
