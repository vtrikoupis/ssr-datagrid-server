const express = require("express");
const monk = require("monk");
const joi = require('@hapi/joi');
const Joi = require("@hapi/joi");

const db = monk(process.env.MONGO_URI);
const users = db.get('users');
const settings = db.get('settings')

const user_schema = Joi.object({
  '_id': Joi.string().trim().required(),
  uid: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  role: Joi.string().trim().allow(''),
  email: Joi.string().trim(),
  modules: Joi.string().trim(),
  details: Joi.string().trim(),
});

const settings_schema = Joi.object({
  '_id': Joi.string().trim().required(),
  filters: Joi.string().trim()
});

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await users.find({})
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// READ ALL but don't retrieve the role col

router.get('/no-role', async (req, res, next) => {
  try {
    // const items = await users.find({}, { fields: { role: 0 } })
    const items = await users.find({})
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.get('/no-role/settings', async (req, res, next) => {
  try {
    // const items = await settings.find({}, { fields: { role: 0 } })
    const items = await settings.find({})
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// READ ONE 
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const item = await users.findOne({

    })
    console.log("here")
    console.log(item)
    if (!item) return next();
    return res.json(item)
  } catch (error) {
    next(error)
  }
})

// CREATE ONE 
router.post('/', async (req, res, next) => {
  try {
    const value = await user_schema.validateAsync(req.body)
    const inserted = await users.insert(value)
    res.json(inserted)
  } catch (error) {
    next(error)
  }
})

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await user_schema.validateAsync(req.body)
    const item = await users.findOne({
      _id: id,
    })
    if (!item) return next();
    await users.update({
      _id: id,
    }, {
      $set: value
    });
    res.json(value)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/no-role/settings', async (req, res, next) => {

  const { _id, filters } = req.body

  try {
    console.log(req.body)
    const value = await settings_schema.validateAsync(req.body)
    const { _id, filters } = value
    await settings.update({
      _id: _id,

    }, {
      $set: {
        filters: filters
      }
    });
    res.json(value)
  } catch (error) {

    next(error)
    console.log("ERRROR")
    console.log(filters)
    console.log(_id)
    console.log(error)
  }
})

// DELETE
router.delete('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    await users.remove({ _id: id });
    res.json({
      message: 'Success'
    })
  } catch (error) {
    next(error)

  }
})

module.exports = router;