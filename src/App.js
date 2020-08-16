import React from 'react';
import Carousel from './components/Carousel';

function App() {
    return <>
        <Carousel slides={[
            {
                title: 'title',
                description: 'description',
                src: 'https://specials-images.forbesimg.com/imageserve/5d35eacaf1176b0008974b54/960x0.jpg?cropX1=790&cropX2=5350&cropY1=784&cropY2=3349',
            },
            {
                title: 'title',
                description: 'description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description description ',
                src: 'https://www.motoringresearch.com/wp-content/uploads/2019/09/01-fastest-cars.jpg',
            },
            {
                title: 'title',
                description: 'description',
                src: 'https://i1.rozetka.ua/goods/3188797/disney_cars_fgn48_images_3188797151.jpg',
            },
        ]}/>
    </>
}

export default App;
