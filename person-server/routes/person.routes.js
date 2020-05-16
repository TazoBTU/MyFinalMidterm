const express = require('express');
const { param, body, query, validationResult } = require('express-validator');
const Person = require('../models/person.model');

const router = express.Router();

const personValidator = [
  body('firstName').exists().notEmpty(),
  body('lastName').exists().notEmpty(),
  body('age').isNumeric(),
  body('height').isNumeric(),
];

router.get(
  '/',

  query('visibility').isIn(['', 'all', 'active', 'completed']),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const visibility = req.query.visibility;
    let filter = {};
    // prettier-ignore
    switch (visibility) {
      case 'all': filter = {}; break;
      case 'active': filter = { completed: false }; break;
      case 'completed': filter = { completed: true }; break;
    }

    const persons = await Person.find(filter);
    res.json(persons);
  }
);

router.post(
  '/store',

  personValidator,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const person = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      height: req.body.height,
    };

    console.log(person);

    const createdPerson = await Person.create(person);

    res.status(200).json(createdPerson);
  }
);

router.put(
  '/:id/update',
  param('id').isMongoId(),

  personValidator,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const person = await Person.findById(req.params.id);

    person.firstName = req.body.firstName;
    person.lastName = req.body.lastName;
    person.age = req.body.age;
    person.height = req.body.height;

    const updatedPerson = await person.save();

    res.status(200).json(updatedPerson);
  }
);

router.delete('/:id/delete', param('id').isMongoId(), async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const result = await Person.findByIdAndDelete(req.params.id);

  res.status(204).json(result);
});

module.exports = router;
