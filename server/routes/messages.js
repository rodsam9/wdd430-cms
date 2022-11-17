var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res, next) => {
  Message.find()
    .catch(error => {
      returnError(res, error);
    });
  res.status(200).json({
    message: 'Messages retreived successfully',
    messages: messages
  });
});

router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message was added successfully',
        message: createdMessage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

router.put('/:id', (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({
          id: req.params.id
        }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message was updated successfully'
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
        message: 'Message could not be found',
        error: {
          message: 'Message could not be found'
        }
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({
      id: req.params.id
    })
    .then(message => {
      Message.deleteOne({
          id: req.params.id
        })
        .then(result => {
          res.status(204).json({
            message: "Message was deleted successfully"
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
        message: 'Message could not be found',
        error: {
          message: 'Message could not be found'
        }
      });
    });
});
module.exports = router;