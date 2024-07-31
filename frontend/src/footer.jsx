import React from 'react';
import { FaFacebook, FaTelegram, FaWhatsapp, FaInstagram, FaApple, FaGooglePlay,FaTwitter } from 'react-icons/fa';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className='footerimg'>
            <img src="https://oxu.az/media/img/logo-big.svg?v=1" alt="Logo" className="footer-logo" />
          </div>
          <div className='generalynews'>
            <p>Bütün hüquqlar qorunur © 2013-2024</p>
            <p className='aboutfooter'>
              Oxu.Az 24 saat ərzində, Azərbaycan və rus dillərində, ölkədə və
              dünyada baş verən ən aktual və maraqlı hadisələr barədə operativ
              xəbərlər, oxucuları və cəmiyyəti maraqlandıran suallara cavablar,
              analitik məqalələr, foto və video hesabatlar hazırlayır.
            </p>
            <ul>
            <div className='socialmedia'>
              <div className='socialmediafooter'>
          <li className='facebook'><a href="https://www.facebook.com/oxu.azz" target="_blank" rel="noopener noreferrer"><FaFacebook /></a></li>
          <li className='twitter'><a href="https://x.com/oxuaz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a></li>
          <li className='telegram'><a href="https://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaTelegram /></a></li>
          <li className='whatsapp'><a href="https://wa.mehttps://t.me/oxuaze" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a></li>
          <li className='instagram'><a href="https://www.instagram.com/oxuaz/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a></li>
          <li className='apple'><a href="https://apps.apple.com/us/app/oxu-az-azerbaycan-xeberleri/id634362981" target="_blank" rel="noopener noreferrer"><FaApple /></a></li>
          <li className='https://play.google.com/store/apps/details?id=az.start.android.oxu&pli=1'><a href="https://play.google.com" target="_blank" rel="noopener noreferrer"><FaGooglePlay /></a></li>
        </div>
        </div>
        </ul>
          </div>
        </div>
        <div className="footer-right">
          <div className='karyeraandsorgu'>
            <div>
              <h4>Karyera</h4>
              <a href="mailto:cv@oxu.az">cv@oxu.az</a>
            </div>
            <div>
              <h4>Ümumi sorğular üçün</h4>
              <a href="mailto:editor@oxu.az">editor@oxu.az</a>
              <p>055 224 76 86</p>
            </div>
          </div>
          <div className="footer-links">
            <a href="#">Saytda reklam</a>
            <a href="#">Bizimlə əlaqə</a>
            <a href="#">Məxfilik siyasəti</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
