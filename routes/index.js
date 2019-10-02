const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const group = []

function onlyUnique(value, index, self) { 
  return self.indexOf(value) === index;
}



// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated,function (req, res){
  User.find({}, function(err, users) {
    if(err){
      res.send('something went really wrong!!');
      next();
    }
    res.render('dashboard', {users: users});
  });
});

router.post('/dashboard',function (req, res){
  
  const usr = req.user;
  const id = usr.id;
  

  group.push(req.body.groupName);

  var unique = group.filter( onlyUnique );

  User.findOne({_id: id}, function(err, foundObject){
    if(foundObject){
      if(req.body.groupName)
        foundObject.groupName = req.body.groupName

      foundObject.save(function(err, updatedObject){ 
        res.render('grouplist', {user: updatedObject, groups : unique});  
      })
    }
  })
})



router.get('/grouplist', ensureAuthenticated,function (req, res){
  res.render('grouplist')
});



module.exports = router;
