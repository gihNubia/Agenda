db = db.getSiblingDB('TODO_List_DB');

db.createCollection('TODO_List_Collection');

db.TODO_List_Collection.insertOne({
    description: "Complete Robbyson's technical challenge", 
    end_date: "2025-02-20", 
    completed: false, 
    archived: false 
});

print("Database e collection created");
