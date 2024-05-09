import React from 'react';
import Footer from '../../Components/Footer';
import './Home.css';
import AdvertCardFeed from '../../Components/AdvertCardFeed';
import homePageImage from '../../images/homePageImage.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import SliderHomePage from '../../Components/SliderHomePage';

const HomePage = () => {

    return (
        <div>
            <div>
                <SliderHomePage />
            </div>
            <div className="container my-5">
                <div className="card h-100 border rounded-3 shadow home-page-card">
                    <Link to={"/ads-page"} className="card-link nav-link d-flex">
                        <div className="card-body pb-0">
                            <h1 className="card-title text-center mt-5">
                                <span className="fw-bold" style={{ fontSize: '1.1em' }}>İş Fırsatlarını Keşfet</span>
                            </h1>
                        </div>
                        <div className="image-container-for-home-page">
                            <img src={homePageImage} className="card-img-top rounded-2 img-fluid" alt={"job advert iş"} />
                        </div>
                    </Link>
                </div>
            </div>

            <div className='d-flex justify-content-center align-items-center'>
                <div className="w-75 h-100">

                    <AdvertCardFeed feedsLocation={"HomePage"} workModel={"0"} />

                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>

        </div>
    );
};

export default HomePage;
