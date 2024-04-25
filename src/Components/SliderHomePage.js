import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../images/sliderImage1.jpg';
import image2 from '../images/sliderImage2.jpg';
import image3 from '../images/sliderImage3.png';
import '../css/Component.css';

const SliderHomePage = () => {

    const sliderRef = useRef();
    const [isSliderLoaded, setIsSliderLoaded] = useState(false);

    useEffect(() => {
        setIsSliderLoaded(true);
        const slider = sliderRef.current;

        const interval = setInterval(() => {
        if (slider) {
            slider.slickNext();
        }
        }, 3000); // 3000ms (3 seconds) aralıklarla kaydırma

        return () => clearInterval(interval);
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Otomatik oynatma özelliği
        autoplaySpeed: 3000, // Otomatik oynatma hızı (3000ms - 3 saniye)
        prevArrow: isSliderLoaded ? <></> : undefined, // sol navigasyon butonunu devre dışı bırak
        nextArrow: isSliderLoaded ? <></> : undefined
    };

    return (
        <Slider ref={sliderRef} {...settings}>
            <div>
                <div className="slider-item">
                <img className="slider-image" src={image1} alt="Image 1" />
                <div className="slider-overlay">
                    <p className="slider-text">
                        <span className="fw-bold" style={{ fontSize: '3rem' }}>
                            Hayalinizdeki işe bir adım daha yaklaşın
                        </span>
                    </p>
                </div>
                </div>
            </div>
            <div>
                <div className="slider-item">
                <img className="slider-image" src={image2} alt="Image 2" />
                <div className="slider-overlay">
                    <p className="slider-text">
                        <span className="fw-bold" style={{ fontSize: '3rem' }}>
                            Kariyerinizi şekillendirecek fırsatlar burada!
                        </span>
                    </p>
                </div>
                </div>
            </div>
            <div>
                <div className="slider-item">
                <img className="slider-image" src={image3} alt="Image 3" />
                <div className="slider-overlay">
                    <p className="slider-text">
                        <span className="fw-bold" style={{ fontSize: '3rem' }}>
                            Sizin için doğru işi bulmanıza yardımcı oluyoruz
                        </span>
                    </p>
                </div>
                </div>
            </div>
        </Slider>
    );
};

export default SliderHomePage;