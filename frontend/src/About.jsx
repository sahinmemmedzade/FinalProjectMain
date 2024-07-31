import React from 'react';
import './AboutUs.css'; // Import the CSS file for styling
import { FaApple, FaFacebook, FaGooglePlay, FaInstagram, FaTelegram, FaTwitter, FaWhatsapp } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className='about-us-wrapper'>
    <div className="about-us">
      <div className="header">
        <img src="https://oxu.az/media/img/logo-big.svg?v=1" alt="oxu.az" className="logo" />
        <div className="icons">
          <i className="fas fa-info-circle"></i>
        </div>
      </div>
      <div className="content">
        <h1>Haqqımızda</h1>
        <p>"Global Media Group”a daxil olan Oxu.Az xəbər saytı 2013-cü ilin iyul ayından fəaliyyət göstərir. Saytın yaradılmasında məqsəd dünyada və ölkədə baş verən ən vacib və maraqlı xəbərləri geniş auditoriyaya təqdim etməkdir.</p>
        <p>Oxu.Az 24 saat ərzində, Azərbaycan və rus dillərində, ölkədə və dünyada baş verən ən aktual və maraqlı hadisələr barədə operativ xəbərlər, oxucuları və cəmiyyəti maraqlandıran suallara cavablar, analitik məqalələr, foto və video hesabatlar hazırlayır.</p>
        <p>Düzgün seçilmiş informasiya siyasəti, müasir dizaynı, mobil platformalarda və aparıcı sosial şəbəkələrdə təmsil olunması nəticəsində bu gün Oxu.Az Azərbaycanın media məkanında öz layiqli yerini tutub və ən geniş oxucu auditoriyasına malik xəbər portallarından birinə çevrilib.</p>
        <p>Baş redaktor Ülvi Səfərov.</p>
      </div>
      <div className="footerabout">
        <h2>KEYFİYYƏT, SAĞLAMLIQ, ƏMƏYİN TƏHLÜKƏSİZLİYİ VƏ ƏTRAF MÜHİTİN MÜHAFİZƏSİ ÜZRƏ SİYASƏT</h2>
        <p>Azərbaycan Respublikasında fəaliyyət göstərən, operativ və dəqiq məlumatların təmin edilməsi ilə seçilən “OXU.AZ” olaraq fəaliyyət sahəmizdə ətraf mühitin qorunması və əməyin təhlükəsizliyi önəmli yer tutur. “OXU.AZ” MMC keyfiyyət, sağlamlıq, əməyin təhlükəsizliyi və ətraf mühitin mühafizəsi sahəsində aşağıdakı əsas prinsipləri rəhbər tutur:</p>
        <ul>
          <li>Beynəlxalq standartların tələblərinə uyğunluğun təmin edilməsi;</li>
          <li>Müasir metodikaların istifadət etmək, yüksək keyfiyyəti, təhlükəsiz və tələblərə uyğun xidmətin vaxtında təmin edilməsi və müştəri məmnunluğunun qazanılması;</li>
          <li>Xidmətin idarə olunması, planlaşdırma və monitorinq metodlarının təkmilləşdirilməsini, infrastrukturun yaxşılaşdırılmasını;</li>
          <li>Bazarın dəyişikliklərinə çevik uyğunlaşmanın təmin olunmasını və rəqabət qabiliyyətliliyinin artırılmasını;</li>
          <li>Personalın səriştəliliyinin, təhlükəsizliyinin və qərarların qəbulunda iştirakının təminini;
          </li>
          <li>Fəaliyyətdə risk və proses yanaşmasının tətbiqini;
          </li>
          <li>Təchizatçılarla uzunmüddətli və səmərəli münasibətlərin formalaşdırılmasını;
          </li>
        </ul>
        <p>“OXU.AZ” MMC-nin rəhbərliyi keyfiyyət, sağlamlıq, əməyin təhlükəsizliyi və ətraf mühitin mühafizəsi siyasətinin həyata keçirilməsi məqsədi ilə lazımi resurslarla vaxtında təmin olunmanı və hər bir əməkdaşın məlumatlandırılması öhdəliyini öz üzərinə götürür.</p>
        <div className='aboutimage'><img src="https://oxu.az/tuv.svg" alt="" /></div>
        <p>27.12.2022-ci il tarixində, "Oxu.az" xəbər saytı ISO 9001, ISO 14001, ISO 45001 beynəlxalq sertifikatlarına layiq görülmüşdür.

</p>
      </div>
      
      <h2 className='elaqe'>Əlaqə</h2>
      <div className='aboutcontact'>
        <div className='unvan'>
        <h4>
        Ünvan
        </h4>
        <p>Rəsul Rza küçəsi 75, Winter Park Plaza, AZ 1014, Bakı, Azərbaycan</p>
        </div>
        <div className='telefon'>
        <h4>Telefon:</h4>
        <p>(055) 224-76-86</p>
        </div>
        <div className='email'>
        <h4>E-mail:
        </h4>
        <p>Editor@oxu.az</p>
        </div>
      </div>
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
  );
};

export default AboutUs;
