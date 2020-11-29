const express = require("express");
const monk = require("monk");
const joi = require('@hapi/joi');
const Joi = require("@hapi/joi");

const db = monk(process.env.MONGO_URI);
const grids = db.get('grids');

const user_schema = Joi.object({
  id: Joi.string().trim().required(),
  name: Joi.string().trim().required(),
  role: Joi.string().trim().required(),
});

const router = express.Router();

// READ ALL
router.get('/', async (req, res, next) => {
  try {
    const items = await grids.find({})
    res.json(items)
  } catch (error) {
    next(error)
  }
})

// READ ONE 
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await grids.findOne({
      _id: id,
    })
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
    const inserted = await grids.insert(value)
    res.json(inserted)
  } catch (error) {
    next(error)
  }
})

// UPDATE
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const value = await user_schema.validateAsync(req.body)
    const item = await grids.findOne({
      _id: id,
    })
    if (!item) return next();
    await grids.update({
      _id: id,
    }, {
      $set: value
    });
    res.json(value)
  } catch (error) {
    next(error)
  }
})

// DELETE
router.delete('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    await grids.remove({ _id: id });
    res.json({
      message: 'Success'
    })
  } catch (error) {
    next(error)

  }
})

module.exports = router;