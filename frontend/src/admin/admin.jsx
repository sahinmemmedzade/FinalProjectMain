import React, { useState } from 'react';
import { FaAd, FaNewspaper, FaThList, FaPhoneAlt, FaVideo, FaFileAlt, FaRegNewspaper } from 'react-icons/fa';
import './admin.css';
import { MdLiveTv, MdOutlineRateReview } from 'react-icons/md';
import ReklamOptions from './ReklamEmeliyyatlari';
import SonXeberOptions from './Sonxeberler';
import KateqoriyaOptions from './Kateoqriya';
import ElaqeyeOptions from './Elaqe';
import Xeberler from './Xeberler';
import CanliVideoAdmin from './Canlivideo';
import KoseXeberleri from './KoseXeberleri';
import VideoManagement from './video';
import ReviewSection from './Review';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState(null);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className='admin'>
      <div className="admin-panel">
        <h1>O</h1>
        <div onClick={() => handleSectionClick('reklam')}>
          <FaAd className="icon" title='Reklam'/>
          <h3>Reklam</h3>
        </div>
        <div onClick={() => handleSectionClick('sonxeberler')}>
          <FaNewspaper className="icon" title='Sonxeberler' />
          <h3>Sonxeberler</h3>
        </div>
        <div onClick={() => handleSectionClick('kateqoriya')}>
          <FaThList className="icon" title='Kateqoriya' />
          <h3>Kateqoriya</h3>
        </div>
        <div onClick={() => handleSectionClick('elaqeye')}>
          <FaPhoneAlt className="icon" title='Elaqe' />
          <h3>Elaqe</h3>
        </div>
        <div onClick={() => handleSectionClick('xeberler')}>
          <FaFileAlt className="icon" title='Xeberler'/>
          <h3>Xeberler</h3>
        </div>
        
        <div onClick={() => handleSectionClick('kosexeberleri')}>
          <FaRegNewspaper className="icon" title='KoseXeberleri'/>
          <h3>KoseXeberleri</h3>
        </div>
        <div onClick={() => handleSectionClick('yorumlar')}>
          <MdOutlineRateReview className="icon" title='Yorumlar'/>
          <h3>Yorumlar</h3>
        </div>
        <div onClick={() => handleSectionClick('video')}>
          <FaVideo className="icon" title='Video' />
          <h3>Video</h3>
        </div>
      </div>

      <div className='options'>
        {activeSection === 'reklam' && <ReklamOptions />}
        {activeSection === 'sonxeberler' && <SonXeberOptions />}
        {activeSection === 'kateqoriya' && <KateqoriyaOptions />}
        {activeSection === 'elaqeye' && <ElaqeyeOptions />}
        {activeSection === 'xeberler' && <Xeberler />}
        {activeSection === 'canlivideo' && <CanliVideoAdmin />}
        {activeSection === 'kosexeberleri' && <KoseXeberleri />}
        {activeSection === 'yorumlar' && <ReviewSection />} {/* Add the VideoManagement component */}

        {activeSection === 'video' && <VideoManagement />} {/* Add the VideoManagement component */}
      </div>
    </div>
  );
}

export default AdminPanel;
