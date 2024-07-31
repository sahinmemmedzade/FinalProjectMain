import Contact from '../model/contact.model.js';
import User from '../model/auth.model.js';

// Create a new contact message

export const createContactMessage = async (req, res) => {
    try {
        const { message, companyName, email, subject } = req.body;

        // Debugging req.body
        console.log(req.body);

        const errors = {};

        // Yoxlamalar
        if (!email || !email.includes('@')) errors.email = 'Invalid email address';
        if (!email || email.length < 8) errors.email = 'Email must be at least 8 characters long';
        if (!message || !companyName || !subject) errors.global = 'Please provide all required fields';
        if (companyName && /\d/.test(companyName)) errors.companyName = 'Company name cannot contain numbers';
        if (companyName && companyName.length < 3) errors.companyName = 'Company name must be at least 3 characters long';

        // Əgər səhvlər varsa
        if (Object.keys(errors).length) return res.status(400).send(errors);

        // Yeni Contact yaradın
        const newContact = new Contact({ message, companyName, email, subject });
        await newContact.save();

        // Uğur mesajı
        res.status(201).send(newContact);
    } catch (error) {
        // Xəta mesajı
        console.error('Server error:', error);
        res.status(500).send({ global: error.message });
    }
};


// Get all contact messages
export const getAllContacts = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        // Uncomment the following lines if only admins should access all contacts
        // if (!user || !user.isAdmin) {
        //     return res.status(403).send({ error: 'You do not have permission to view all contacts' });
        // }

        const contacts = await Contact.find();
        res.status(200).send(contacts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Get a single contact message by ID
export const getSingleContact = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        // Uncomment the following lines if only admins should access single contacts
        // if (!user || !user.isAdmin) {
        //     return res.status(403).send({ error: 'You do not have permission to view this contact' });
        // }

        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).send({ error: 'Contact not found' });
        }

        res.status(200).send(contact);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Delete a contact message by ID
export const deleteContact = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        // Uncomment the following lines if only admins should delete contacts
        // if (!user || !user.isAdmin) {
        //     return res.status(403).send({ error: 'You do not have permission to delete this contact' });
        // }

        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return res.status(404).send({ error: 'Contact not found' });
        }

        res.status(200).send({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
