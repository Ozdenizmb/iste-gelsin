import React from 'react';
import Footer from '../../Components/Footer';
import './Contact.css'; // Import CSS file here
import BannerImage from '../../images/webp.jpg';

const ContactPage = () => {
    return (
        <section className="ftco-section img bg-hero" style={{ backgroundImage: `url(${BannerImage})` }}>
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
                                        <div className="contact-form">
                                            <form action="" id="contact-form">
                                                <h2>Send Message</h2>
                                                <div className="mb-3">
                                                    <label htmlFor="fullname" className="form-label">Full Name</label>
                                                    <input type="text" className="form-control" id="fullname" required />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="email" className="form-control" id="email" required />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="message" className="form-label">Message</label>
                                                    <textarea className="form-control" id="message" rows="3" required></textarea>
                                                </div>

                                                <button type="submit" className="btn btn-primary">Send</button>
                                            </form>
                                        </div>

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
