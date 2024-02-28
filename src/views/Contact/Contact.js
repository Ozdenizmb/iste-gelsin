import React from 'react';
import Footer from '../../Components/Footer';
import './Contact.css'; // Burada stil dosyanızı ekleyin
import ContactImage from '../../images/contact.jpeg';

const ContactPage = () => {
    return (
        <div className="bg-background">
            <div className="container py-5">
                <div className="row py-5 g-3">

                    <div className="col-md-6 first_col ">
                        <h1 className="text-center mt-3 ">BİZE ULAŞIN</h1>
                        <form className="p-4 mt-3">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Ad Soyad</label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='Adınız Soyadınız *' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">E-mail </label>
                                <input type="text" className="form-control" id="exampleFormControlInput1" placeholder='mail@mail.com *' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">İletişim Numarası </label>
                                <input type="tel" className="form-control" id="exampleFormControlInput1" placeholder='+90 *' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">Mesaj </label>
                                <textarea type="text" className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Mesajınız *'></textarea>
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary">GÖNDER</button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-6 sec_col">
                        <img src={ContactImage} className="img-fluid" alt="Contact" />
                    </div>
                </div>
                <div className="row-last">
                    <div className="row row-cols-1 row-cols-md-3 p-3 text-white mt-4">
                        <div className="col">
                            <h4>CALL US</h4>
                            <p>Phone: +123456789</p>
                            <p>Email: example@example.com</p>
                        </div>
                        <div className="col">
                            <h4>LOCATION</h4>
                            <p>Address: 123 Street, City, Country</p>
                        </div>
                        <div className="col">
                            <h4>Email</h4>
                            <p>Email: example@example.com</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
};

export default ContactPage;
