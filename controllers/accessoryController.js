const { body, validationResult } = require('express-validator');
const Accessory = require('../models/accessory');

exports.accessory_list = (req, res, next) => {
  Accessory.find({}, 'name')
  .sort({title: 1})
  .exec(function(err, accessory_list) {
    if (err) { return next(err); }
    res.render('accessory_list', { title: "Accessory List", accessory_list });
  })
};

exports.accessory_detail = (req, res, next) => {
  Accessory.findById(req.params.id)
  .exec(function(err, accessory) {
    if (err) { return next(err); }

    if (accessory == null) {
      const err = new Error('Accessory Not Found');
      err.status = 404;
      return next(err);
    }

    res.render('accessory_detail', { title: 'Accessory Details', accessory })
  })
};

exports.accessory_create_get = (req, res, next) => {
  res.render('accessory_form', {title: 'Create Accessory'});
};

exports.accessory_create_post = [
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Accessory name must be specified'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Accessory description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Accessory price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-stock must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('accessory_form', { title: 'Create Accessory', accessory: req.body, errors: errors.array() });
      return;
    }

    const accessory = new Accessory({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
    });
    accessory.save((err) => {
      if (err) { return next(err); }
      res.redirect('/catalog/accessories')
    })
  }
];

exports.accessory_delete_get = (req, res, next) => {
  Accessory.findById(req.params.id)
  .exec(function(err, accessory) {
    if (err) { return next(err); }

    if (accessory == null) {
      res.redirect('/catalog/accessories')
    }

    res.render('accessory_delete', { title: 'Delete Accessory', accessory })
  })
};

exports.accessory_delete_post = (req, res, next) => {
  Accessory.findByIdAndRemove(req.body.accessoryid, function deleteAccessory(err) {
    if (err) { return next(err); }
    res.redirect('/catalog/accessories')
  })
};

exports.accessory_update_get = (req, res, next) => {
  // res.send('NOT IMPLEMENTED: Accessory Update Get');
  Accessory.findById(req.params.id)
  .exec(function(err, accessory) {
    if (err) { return next(err); }
    res.render('accessory_form', { title: 'Update Accessory', accessory})
  })
};

exports.accessory_update_post = [
  // res.send('NOT IMPLEMENTED: Accessory Update Post');
  body('name').trim().isLength({ min: 1 }).escape().withMessage('Accessory name must be specified'),
  body('description').trim().isLength({ min: 1 }).escape().withMessage('Accessory description must be specified'),
  body('price').trim().isLength({ min: 1 }).escape().withMessage('Accessory price must be specified'),
  body('instock').trim().isLength({ min: 1 }).escape().withMessage('In-stock must be specified'),

  (req, res, next) => {
    const errors = validationResult(req);

    const accessory = new Accessory({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      instock: req.body.instock,
      _id: req.params.id,
    })

    if (!errors.isEmpty()) {
      res.render('accessory_form', { title: 'Update Accessory', accessory, errors: errors.array() })
    }

    Accessory.findByIdAndUpdate(req.params.id, accessory, {}, function (err, theaccessory) {
      if (err) { return next(err); }
      res.redirect(accessory.url)
    })
  }
];