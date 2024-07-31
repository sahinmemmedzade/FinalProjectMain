import React, { useState } from 'react';
import axios from 'axios';
import './AdComponent.css';

const AdComponent = () => {
    const [fontSize, setFontSize] = useState(16);
    const [formData, setFormData] = useState({
        companyName: '',
        subject: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const increaseFontSize = () => setFontSize(fontSize + 1);
    const decreaseFontSize = () => setFontSize(fontSize - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/contact', formData);
            setSuccessMessage('Mesajınız uğurla göndərildi!');
            setErrors({});
            setFormData({
                companyName: '',
                subject: '',
                email: '',
                message: ''
            });
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'Serverdə xəta baş verdi!' });
            }
        }
    };

    return (
        <div className='anouncement-us-wrapper'>
            <div className="ad-container" style={{ fontSize: `${fontSize}px` }}>
                <div className="ad-content">
                    <div className='reklamvebutton'>
                        <h1>Reklam</h1>
                    </div>
                    <p>
                        Azərbaycanın ən oxunaqlı, məşhur, stabil artım nümayiş etdirən xəbər resurslarından biri olan OXU.AZ saytında reklam yerləşdirmək brendləriniz, məhsullarınız, xidmətləriniz, aksiyalarınız və əhəmiyyətli hadisələr barədə məlumatı geniş auditoriyaya çatdırmağınız üçün ən əlverişli üsullardan biridir. İllik oxucu auditoriyası 11 milyon unikal IP və 495 milyon səhifə baxışı təşkil edən OXU.AZ bu göstəricilərlə media sahəsində aparıcı mövqedə dayanmaqdadır.
                    </p>
                    <p>
                        Siz OXU.AZ-da reklam yerləşdirməklə həm brendinizin tanınmasını nəzərəçarpacaq dərəcədə artırmağa nail olacaq, şirkətlərinizin internet saytlarının ziyarətçi sayının artımını təmin etmək şansı əldə edəcəksiniz.
                    </p>
                    <p>
                        Sizinlə əməkdaşlığa şad olarıq!
                    </p>
                </div>
                <div className="contact-info">
                    <div className='elaqe'>
                        <h2>Əlaqə</h2>
                        <div className='elaqeinfo'>
                            <p><strong>Ünvan:</strong> Rəsul Rza küçəsi 75, Winter Park Plaza, AZ 1014, Bakı, Azərbaycan</p>
                            <p><strong>Telefon:</strong> (+99455) 457-02-03</p>
                            <p><strong>E-mail:</strong> pr@oxu.az</p>
                        </div>
                    </div>
                    <div className='banner'>
                        <h2>Banner reklamı:</h2>
                        <p><strong>Telefon:</strong> (+99455) 207-48-51</p>
                        <p><strong>Əlaqə:</strong> (+99412) 597-48-51</p>
                        <p><strong>E-mail:</strong> info@newmedia.az</p>
                    </div>
                </div>
                <div className="contact-form">
                    <h2>Bizimlə Əlaqə</h2>
                    <form onSubmit={handleSubmit}>
                    <label>Şirkətinizin Adı:</label>
<input
    type="text"
    name="companyName" // Bura diqqət edin
    value={formData.companyName}
    onChange={handleChange}
    required
/>

                        {errors.companyName && (
                            <p className="error-message">{errors.companyName}</p>
                        )}

                        <label>Mövzu:</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                        {errors.subject && (
                            <p className="error-message">{errors.subject}</p>
                        )}

                        <label>E-mail:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && (
                            <p className="error-message">{errors.email}</p>
                        )}

                        <label>Mesaj:</label>
                        <textarea
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        {errors.message && (
                            <p className="error-message">{errors.message}</p>
                        )}

                        {errors.global && (
                            <p className="error-message">{errors.global}</p>
                        )}
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        
                        <button type="submit">Göndər</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdComponent;
