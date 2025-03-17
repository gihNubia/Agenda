const { MongoClient, MongoError } = require('mongodb');

// Connection URL
//const url = 'mongodb://localhost:27017'; // uncomment this line if you are running on your pc
const url = 'mongodb://mongodb:27017'; // comment this if you are not running on a docker container
const dbName = 'TODO_List_DB';
const collectionName = 'TODO_List_Collection';
const client = new MongoClient(url);

let collection;
let database;

connectToDatabase();


// Start connection
async function connectToDatabase() {
    try {
        if (collection) return;

        await client.connect();  
  
        // Access
        database = client.db(dbName);
        collection = database.collection(collectionName);


    } catch (err) {

      console.error('Connection Error:', err);
      throw new MongoError();

    }
  }

  async function find(filter) {
    try {

        // query
        const documents = await collection.find(filter).toArray();
        console.log('Found documents:', documents);
  
        return documents; 

    } catch (err) {
        console.error('Error finding documents:', err);
        throw new MongoError();
    }
  }

  async function search(filter, state) {
    try {
        const regex = new RegExp(`.*${filter}.*`, 'i');
        const documents = await collection.find({description: {$regex: regex},  archived: state}).toArray();
        console.log('Found documents:', documents);
  
        return documents; 

    } catch (err) {
        console.error('Error finding documents:', err);
        throw new MongoError();
    }
  }
  
  async function insert(item) {
    try {
      // query
        const insertResult = await collection.insertOne(item);
        console.log('Inserted document =>', insertResult);
  
        return insertResult; 

    } catch (err) {
        console.error('Error inserting item:', err);
        throw new MongoError();
    
    }
  }

  async function update(item) {
    try {
      const { _id, ...updates } = item;
      // query
      const updateResult = await collection.updateOne({ _id }, { $set: updates });
      console.log('Updated documents =>', updateResult);
  
        return updateResult; 

    } catch (err) {
        console.error('Error updating item:', err);
        throw new MongoError();
    
    }
  }

  async function del(item) {
    try {
      // query
      const deleteResult = await collection.deleteMany({ _id : item._id });
      console.log('Deleted documents =>', deleteResult);
  
        return deleteResult; 

    } catch (err) {
        console.error('Error updating item:', err);
        throw new MongoError();
    
    }
  }
 
module.exports = {find, insert, update, del, search};