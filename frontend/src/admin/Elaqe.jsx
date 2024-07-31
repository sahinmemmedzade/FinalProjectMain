import React, { useState, useEffect } from 'react';
import './ElaqeyeOptions.css'; // Ensure this CSS file is created
import { MdMoreHoriz } from 'react-icons/md';
import axios from 'axios'; // Ensure axios is imported

const ElaqeyeOptions = () => {
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [showOptionsMenu, setShowOptionsMenu] = useState(null);
  const [contacts, setContacts] = useState([]); // Add state for contacts

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleViewMessage = (id) => {
    setSelectedContactId(id);
    setShowOptionsMenu(null);
  };

  const handleDeleteMessage = async (id) => {
    try {
      await axios.delete(`/api/contact/${id}`);
      alert('Mesaj uğurla silindi'); // Uğurla silindiyi barədə bildiriş
      fetchContacts(); // Yenidən məlumatları gətir
      setShowOptionsMenu(null);
      setSelectedContactId(null); // Mesaj detalını gizlət
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Mesajı silərkən xəta baş verdi'); // Xəta baş verdiyi barədə bildiriş
    }
  };

  const handleBack = () => {
    setSelectedContactId(null);
  };

  return (
    <div className="elaqeye-options">
      <h2>Əlaqə Listəsi</h2>
      {selectedContactId === null ? (
        <div className="contact-table">
          <div className="contact-header">
            <div className='contactcompanyName'>Sirketin Adi</div>
            <div className='contactsubject'>Sirketin Movzusu</div>
            <div className='contactemail'>Email</div>
            <div className='contactmessage'>Mesaj</div>
            <div className="optionselaqe">Options</div>
          </div>
          {contacts.map(contact => (
            <div key={contact._id} className="contact-row">
              <div className='contactcompanyName'>{contact.companyName}</div>
              <div className='contactsubject'>{contact.subject}</div>
              <div className='contactemail'>{contact.email}</div>
              <div className='contactmessage'>{contact.message.length > 50 ? `${contact.message.substring(0, 50)}...` : contact.message}</div>
              <div className="optionselaqe">
                <MdMoreHoriz
                  className="more-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowOptionsMenu(showOptionsMenu === contact._id ? null : contact._id);
                  }}
                />
                {showOptionsMenu === contact._id && (
                  <div className="options-menu">
                    <button
                      className="view-message-button"
                      onClick={() => handleViewMessage(contact._id)}
                    >
                      Mesaja Ferdi Bax
                    </button>
                    <button
                      className="delete-button-elaqe"
                      onClick={() => handleDeleteMessage(contact._id)}
                    >
                      Sil
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="contact-detail">
          {contacts.filter(contact => contact._id === selectedContactId).map(contact => (
            <div key={contact._id} className="contact-detail-content">
              <h3>{contact.Name}</h3>
              <p><strong>Subject:</strong> {contact.subject}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Message:</strong> {contact.message}</p>
              <button
                className="back-button"
                onClick={handleBack}
              >
                Geri
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteMessage(contact._id)}
              >
                Sil
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ElaqeyeOptions;
