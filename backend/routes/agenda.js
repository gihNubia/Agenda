const express = require('express');
const router = express.Router();

const db = require('../services/database.js');
const validator = require('../services/validator.js');

const {ObjectId} = require('mongodb');


// Get all tasks not archived
router.get('/tasks',async (req, res) => {
  try{
    const results = await db.find({archived:false});
        console.log(results)
        res.send(results);
  }
  catch{
    res.status(500).json({ error: "Internal server error" });
  }
    
})

//Get all tasks activities
router.get('/archive', async (req, res) => {
  try{
    const results = await db.find({archived:true});
        console.log(results)
        res.send(results);
  }
  catch{
    res.status(500).json({ error: "Internal server error" });
  }
})

// Create task 
router.post('/task', async (req, res) => {
  /*
    {
      "description": "<string>",
      "date_time": "<date_time>", 
      }
  */  
  try {
    validator.createTask(req);
    const results = await db.insert({ description: req.body.description,
                                      end_date: req.body.end_date,
                                      completed: JSON.parse(false),
                                      archived: JSON.parse(false)
                                    });
    console.log(results);
    res.send(results);  

  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({ error: "Invalid format: ", details: error.message });
    }
    else{
      res.status(500).json({ error: "Internal server error" });
    }   
  } 
})

// Update task 
router.patch('/task/:id', async (req, res) => {
    /*
        {
            "description": "<desc>"
            "date_time": "<date_time>"
        }

    */
    try { 
    validator.updateTask(req);
    
    const results = await db.update({ _id: new ObjectId(req.params.id),
                                      description: req.body.description,
                                      end_date: req.body.end_date
                                    });
    console.log(results);
    res.send(results);  

  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      return res.status(400).json({ error: "Invalid format: ", details: error.message });
    }
    else{
      res.status(500).json({ error: "Internal server error" });
    }   
  } 
})

// Archive task or Conclude task 
router.put('/task/:id', async (req, res) => {
    /*
        {
            "action": <action>
        }
    */
    try { 
      validator.actionTask(req); 
      if(req.body.action === "archive"){
        const item = await db.find({_id: new ObjectId(req.params.id)});
        if(item[0].completed){
          const inversion = !item[0].archived;
                
          var results = await db.update({ _id: new ObjectId(req.params.id),
                                          archived: inversion
          });
        }
        else{
          throw new Error("Invalid input");
        }  
          
      }else if(req.body.action === "complete"){
        const item = await db.find({_id: new ObjectId(req.params.id)});
        const inversion = !item[0].completed;
        var results = await db.update({ _id: new ObjectId(req.params.id),
                                          completed: inversion
        });
      } else {
        console.log("Invalid input")
        throw new TypeError("Invalid input");  //revisar tipo erro
      }
      
      console.log(results);
      res.send(results);  

    } catch (error) {
      console.log(error);
      if (error instanceof TypeError) {
        return res.status(400).json({ error: "Invalid format: ", details: error.message });
      }
      else{
        res.status(500).json({ error: "Internal server error" });
      }   
    } 
  })  

  //delete task
  router.delete('/task/:id', async (req, res) => {
    try {
      validator.deleteTask(req);
      const results = await db.del({ _id: new ObjectId(req.params.id)});
      console.log(results);
      res.send(results);  
  
    } catch (error) {
      if (error instanceof TypeError) {
        return res.status(400).json({ error: "Invalid format: ", details: error.message });
      }
      else{
        res.status(500).json({ error: "Internal server error" });
      }   
    } 
  })  

  router.post('/search/active', async (req, res) => {
    try {
      validator.searchTask(req);
      const results = await db.search(req.body.description, false);
      console.log(results);
      res.send(results);  
  
    } catch (error) {
      if (error instanceof TypeError) {
        return res.status(400).json({ error: "Invalid format: ", details: error.message });
      }
      else{
        res.status(500).json({ error: "Internal server error" });
      }   
    } 
  })

  router.post('/search/archived', async (req, res) => {
    try {
      validator.searchTask(req);
      const results = await db.search(req.body.description, true);
      console.log(results);
      res.send(results);  
  
    } catch (error) {
      if (error instanceof TypeError) {
        return res.status(400).json({ error: "Invalid format: ", details: error.message });
      }
      else{
        res.status(500).json({ error: "Internal server error" });
      }   
    } 
  })

module.exports = router

