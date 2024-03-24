import { Hono } from "hono";
import { handle } from "hono/aws-lambda";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid';


const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);
const tableName = "Cars"; 

const app = new Hono();

// Handler for GET /cars/{id}
app.get("/cars/:id", async (c) => {
  try {
    const id = c.req.param('id'); // Access the parameter directly from req.params
    console.log("Requested CarId:", id); // Add this line for logging
    const { Item } = await dynamo.send(
      new GetCommand({
        TableName: tableName,
        Key: {
          CarId: id,
        },
      })
    );
    if (!Item) {
      return c.json({ message: "Car not found" }, 404);
    }
    return c.json({ car: Item });
  } catch (error) {
    console.error("Error retrieving car:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

// Handler for GET /cars
app.get("/cars", async (c) => {
  try {
    const { Items } = await dynamo.send(
      new ScanCommand({ TableName: tableName })
    );
    return c.json({ cars: Items });
  } catch (error) {
    console.error("Error retrieving cars:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

// Handler for POST /cars
app.post("/cars", async (c) => {
  try {
    const requestBody = await c.req.parseBody();
    
    // Generate a UUID for CarId
    const carId = uuidv4();
    
    // Add the generated CarId to the item
    const newItem = {
      CarId: carId,
      Make: requestBody.Make,
      Model: requestBody.Model,
      Year: requestBody.Year,
      Color: requestBody.Color
    };
    
    // Send the item to DynamoDB
    await dynamo.send(
      new PutCommand({
        TableName: tableName,
        Item: newItem,
      })
    );
    
    return c.json({ message: "Car created successfully", car: newItem });
  } catch (error) {
    console.error("Error creating car:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});

export const handler = handle(app);
