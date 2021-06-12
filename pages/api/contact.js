import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
        res.status(422).json({ message: 'Invalid Input' });
        return;
    }

    const newMessage = {
        email,
        name,
        message
    }

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ihft9.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    // mongodb+srv://girish:<password>@cluster0.ihft9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

    try{
        client = await MongoClient.connect(connectionString);
    }catch(error){
        res.status(500).json({ message: 'Could not connect to database.' });
        return;
    }

    const db = client.db();

    try{
        const result = await db.collection('messages').insertOne(newMessage);
        newMessage.id = result.insertedId;
    }catch(error){
        db.close();
        res.status(500).json({ message: 'Storing Message Failed!' });
        return;
    }

    client.close();

    res.status(201).json({ message: 'Successfully Stored Message', message: newMessage });
  }
}

export default handler;
