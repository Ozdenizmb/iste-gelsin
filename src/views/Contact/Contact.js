import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faInstagram, faWhatsapp, faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import './Contact.css';
import Footer from '../../Components/Footer';
const ContactPage = () => {
    return (
        <div id='contact' className="container-fluid row justify-content-center align-items-center">
            <header className="text-center mb-5 col-md-12">
                <div className="title-wrapper">
                    <h1>BİZE ULAŞIN</h1>
                </div>
            </header>
            <div className="col-md-12">
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-md-4">
                        <div className="content-form ps-5">
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faMapMarker} size="2x" />
                                </div>
                                <div>
                                    <h2>Adres</h2>
                                    <p>
                                        Lorem ipsum dolor sit. <br />
                                        Lorem, ipsum dolor. <br />
                                        lorem
                                    </p>
                                </div>
                            </section>
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faPhone} size="2x" />
                                </div>
                                <div>
                                    <h2>Telefon</h2>
                                    <p>123-456-78901548</p>
                                </div>
                            </section>
                            <section className="contact-info d-flex align-items-center mb-4">
                                <div className="icon-background bg-dark text-white">
                                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                                </div>
                                <div>
                                    <h2>E-mail</h2>
                                    <p>istegelsin@temporary.net</p>
                                </div>
                            </section>
                            </div>
                    </div>
                    <div className='col-md-4'></div>
                    <div className="col-md-4">
                        <form className="form d-flex flex-column align-items-center">
                            <div className="contact-form">
                                <div className="input-wrapper mb-3">
                                    <input type="text" className="form-control" placeholder="Adınız" required />
                                </div>
                                <div className="input-wrapper mb-3">
                                    <input type="email" className="form-control" placeholder="E-mail" required />
                                </div>
                                <div className="message-wrapper mb-3">
                                    <textarea className="form-control" placeholder="Mesajınızı Yazınız...." required></textarea>
                                </div>
                                <div className="button-wrapper">
                                    <input type="submit" name="submit" className="btn btn-primary" value="Gönder" />
                                </div>
                            </div>
                            <div className="text-center mb-0">
                                <ul className="list-inline mb-1">
                                    <li className="list-inline-item"><FontAwesomeIcon icon={faFacebookSquare} size="2x" /></li>
                                    <li className="list-inline-item"><FontAwesomeIcon icon={faInstagram} size="2x" /></li>
                                    <li className="list-inline-item"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></li>
                                    <li className="list-inline-item"><FontAwesomeIcon icon={faTwitterSquare} size="2x" /></li>
                                </ul>
                            </div>
                            </form>

                    </div>
                </div>
                
            </div>
            <Footer />
        </div>
    );
}

export default ContactPage;