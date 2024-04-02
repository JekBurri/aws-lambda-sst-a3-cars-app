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
app.get("/cars", async (c) => {
  try {
    const id = c.req.query('id'); // Get CarId from query params
    const userId = c.req.query('userId'); // Get userId from query params
    
    if (id) {
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
    } else if (userId) {
      console.log("Requested cars for UserId:", userId); // Add this line for logging
      const { Items } = await dynamo.send(
        new ScanCommand({
          TableName: tableName,
          FilterExpression: 'UserId = :userId',
          ExpressionAttributeValues: {
            ':userId': userId,
          },
        })
      );
      return c.json({ cars: Items });
    } else {
      console.log("Requested all cars"); // Add this line for logging
      const { Items } = await dynamo.send(
        new ScanCommand({ TableName: tableName })
      );
      return c.json({ cars: Items });
    }
  } catch (error) {
    console.error("Error retrieving cars:", error);
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
// Handler for POST /cars
app.post("/cars", async (c) => {
  try {
    const requestBody = await c.req.json(); // Parse JSON from the request body

    // Generate a UUID for CarId
    const carId = uuidv4();

    // Add the generated CarId and S3 image URL to the item
    const newItem = {
      CarId: carId,
      Color: requestBody.Color,
      Make: requestBody.Make,
      Model: requestBody.Model,
      Price: requestBody.Price,
      Year: requestBody.Year,
      ImageSrc: requestBody.ImageUrl, // Use the provided ImageUrl from the request
      UserId: requestBody.UserId,
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

// Handler for POST /api/cars/delete
app.post("/cars/delete", async (c) => {
  try {
    const requestBody = await c.req.json(); // Parse JSON from the request body
    const id = requestBody.CarId; // Extract the ID from the request body

    // Check if the ID is provided
    if (!id) {
      return c.json({ message: "Car ID not provided" }, 400);
    }

    // Delete the car listing from the database
    await dynamo.send(
      new DeleteCommand({
        TableName: tableName,
        Key: {
          CarId: id,
        },
      })
    );

    return c.json({ message: "Car listing deleted successfully" });
  } catch (error) {
    console.error("Error deleting car listing:", error);
    return c.json({ message: "Internal server error" }, 500);
  }
});




export const handler = handle(app);
