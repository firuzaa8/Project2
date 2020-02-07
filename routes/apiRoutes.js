var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/examples", function(req, res) {
    db.User.findAll({
      order:[
        ['clickScore', 'ASC'],
      ],
      limit: 10,
    }).then(function(eMatch) {
      res.json(eMatch);
    });
  });

  // Create a new user
  app.post("/api/examples", function(req, res) {
    db.User.create(req.body).then(function(eMatch) {
      res.json(eMatch);
    });
  }); 
  
  //updating user db
  app.put("/api/search", function(req, res) {
    db.User.update(req.body, {where: { userId: req.body.userId}}).then(function(eMatch) {
      res.json(eMatch);
    });
  });



  
};
