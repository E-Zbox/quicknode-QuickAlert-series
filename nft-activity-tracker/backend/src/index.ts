import cors from "cors";
import { config } from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { join } from "path";
// .
import App from "./app";
// initialize env
config({ path: join(__dirname, `../.env.${process.env.NODE_ENV}`) });

const { PORT } = process.env;
// namespaces
import { instantiateNamespacesIO } from "./namespace";
// routes
import routes, { baseURL } from "./routes";

// app
const app = new App().app;

// server
const httpServer = createServer(app);

// let's bind socket.io to our http server
instantiateNamespacesIO(httpServer);

app.get("/alive", (req, res) => {
  return res.status(200).json({
    message: "I'm alive",
    success: true,
  });
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(`${baseURL}`, routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;

  let response = {
    data: null,
    error: "",
    success: false,
  };

  let error: any;

  if (typeof err === "string") {
    const [name, ...errArray] = String(err).split(":");

    error = {
      name,
      message: errArray.join(":"),
      stack: err,
    };
  } else {
    error = {
      ...err,
      name: err.name,
      message: err.message,
      stack: err.stack,
    };
  }

  switch (error.name) {
    case "ReferenceError":
      statusCode = 500;
      response = {
        ...response,
        error: error.message,
      };
      break;
    default:
      console.log("----");
      console.log(error.name);
      console.log(error);
      response.error = "Something went wrong!!";
  }

  return res.status(statusCode).json(response);
});

const server = httpServer.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
