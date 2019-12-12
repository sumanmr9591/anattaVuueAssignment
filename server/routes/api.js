//get dependencies
const express = require('express');
const mongojs = require('mongojs');
const router = express.Router();
const db = mongojs('mongodb://suman:suman123@ds353358.mlab.com:53358/anatta-vue-assignment');
var objectId = require('mongojs').ObjectID;

//get all Users
router.get('/users',function(req,res,next){
   db.users.find(function(err,users){
     if(err){
     	res.send(err);
     }
     res.json(users);
   })
});

//get single data
router.get('/user/:id',function(req,res,next){
 db.tasks.findOne({_id:objectId(req.params.id)},function(err,user){
 	if(err){
 		res.send(err);
 	}
 	res.json(user);
 })
});


//Authenticate user
router.get('/authenticate', function(req,res,next){
  db.login.find(function(err,users){
  	if(err){
  		res.send(err);
  	}
  	res.json(users);
  })
});

//Register new user
router.post('/register', function(req,res,next){
    var user = req.body;
    db.users.save(user, function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    })
  });

  //Add login credentials
router.post('/addlogin', function(req,res,next){
    var user = req.body;
    db.login.save(user, function(err,user){
        if(err){
            res.send(err);
        }
        res.json(user);
    })
  });

//delete User
router.delete('/user/:id',function(req,res,next){
   db.users.remove({_id:objectId(req.params.id)},function(err,task){
     if(err){
     	res.send(err);
     }
     res.json(task);
   });
});

//update User
router.put('/user/:id',function(req,res){
    var user = req.body;
    
    if(!user){
    	res.status(400);
    	res.json({
    		"error":"add data"
    	});
    }else{
    	db.users.update({_id:objectId(req.params.id)},user,{},function(err,task){
    		if(err){
    			res.send(err);
    		}
    		res.json(task);
    	})
    }
});

module.exports = router;