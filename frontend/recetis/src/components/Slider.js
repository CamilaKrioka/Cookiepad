import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';

const Slider = ()=> (

    <Carousel>

        <Carousel.Item>

            <img
            className="d-block w-100"
            src="https://scontent-eze1-1.xx.fbcdn.net/v/t1.0-9/102919182_10220668240834028_3666911125473183734_o.jpg?_nc_cat=109&_nc_sid=730e14&_nc_ohc=0KuLCRsRk7UAX-6MRVb&_nc_ht=scontent-eze1-1.xx&oh=d52989f611c3ca30c01bffd3b8bccbc6&oe=5F05CCD5"
            alt="First Slide"
            />

        </Carousel.Item>

        <Carousel.Item>

            <img
            className="d-block w-100"
            src="https://scontent-eze1-1.xx.fbcdn.net/v/t1.0-9/103863338_10220668240754026_1975861276307029451_o.jpg?_nc_cat=103&_nc_sid=730e14&_nc_ohc=xArck6DZAOgAX-vOlyh&_nc_ht=scontent-eze1-1.xx&oh=1a10f30bc3b0e365fcc4758cf0b7dbbe&oe=5F078B40"
            alt="First Slide"
            />

        </Carousel.Item>

     </Carousel>
)

export default Slider;
