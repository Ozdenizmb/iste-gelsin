import React from 'react';
import Footer from '../../Components/Footer';
import './Contact.css'; // Import CSS file here
import BannerImage from '../../images/BannerImage.jpg';

const ContactPage = () => {
    return (
        <section className="ftco-section img bg-hero" style={{backgroundImage: `url(${BannerImage})`}}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center mb-5">
                        <h2>Contact Us</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-11">
                        <div className="wrapper">
                            <div className="row no-gutters justify-content-between">
                                <div className="col-lg-6 d-flex align-items-stretch">
                                    <div className="info-wrap w-100 p-5">
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i className="fas fa-home"></i>
                                            </div>
                                            <div className="text pl-4">
                                                <h4>Address</h4>
                                                <p>198 West 21th Street, Suite 721 New York NY 10016</p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i className="fas fa-phone"></i>
                                            </div>
                                            <div className="text pl-4">
                                                <h4>Phone</h4>
                                                <p><a href="tel://1234567920">+ 1235 235sds5 98</a></p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i className="fas fa-envelope"></i>
                                            </div>
                                            <div className="text pl-4">
                                                <h4>Email</h4>
                                                <p><a href="mailto:info@yoursite.com">info@d.com</a></p>
                                            </div>
                                        </div>
                                        <div className="dbox w-100 d-flex align-items-start">
                                            <div className="icon d-flex align-items-center justify-content-center">
                                                <i className="fas fa-globe"></i>
                                            </div>
                                            <div className="text pl-4">
                                                <h4>Website</h4>
                                                <p><a href="#">yoursite.com</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="contact-wrap w-100 p-md-5 p-4">
                                        <h3 className="mb-4">Get in touch</h3>
                                        <form method="POST" id="contactForm" name="contactForm" noValidate="noValidate">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="name" id="name" placeholder="Name" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control" name="email" id="email" placeholder="Email" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" />
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <textarea name="message" className="form-control" id="message" cols="30" rows="5" placeholder="Message"></textarea>
                                                    </div>
                                                </div>
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <input type="submit" value="Send Message" className="btn btn-primary" />
                                                        <div className="submitting"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8"> {/* Here is the additional div for spacing */}
                <Footer />
            </div>
        </section>
    );
};

export default ContactPage;
