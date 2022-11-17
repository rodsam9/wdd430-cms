var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req, res, next) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json({
        message: 'Contacts retrieved successfully!',
        contacts: contacts
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Oops! An Error Ocurred!',
        error: error
      });
    });
});

router.post('/', (req, res, next) => {
  const maxContactId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  contact.save()
    .then(createdContact => {
      res.status(201).json({
        message: 'Contact was added successfully',
        contact: createdContact
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Oops! An error occurred!',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;

      Contact.updateOne({
          id: req.params.id
        }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact was updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact could not be found.',
        error: {
          contact: 'Contact could not be found'
        }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Contact.findOne({
      id: req.params.id
    })
    .then(contact => {
      Contact.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Contact was deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Contact could not be found.',
        error: {
          contact: 'Contact could not be found'
        }
      });
    });
});

module.exports = router;