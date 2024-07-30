import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
import { join } from "path";
// .
import { app, httpServer, io } from "./app";
// initialize env
config({ path: join(__dirname, `../.env.${process.env.NODE_ENV}`) });

const { PORT } = process.env;

// middlewares
import { checkForInvalidRoutes } from "./middlewares";
// routes
import notificationRoutes from "./routes/notificationRoutes";
import webhookRoutes from "./routes/webhookRoutes";

app.get("/alive", (req, res) => {
  return res.status(200).json({
    message: "I'm alive",
    success: true,
  });
});

const baseURL = "/api/v1";

app.use(`${baseURL}/notification`, notificationRoutes);
app.use(`${baseURL}/webhook`, webhookRoutes);

app.use("/*", checkForInvalidRoutes);

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
    case "MissingEnvError":
      statusCode = 500;
      response = {
        ...response,
        error: "Something went wrong. Contact support!",
      };
      break;
    case "ReferenceError":
      statusCode = 500;
      response = {
        ...response,
        error: error.message,
      };
      break;
    case "RequestBodyError":
      statusCode = 400;
      response = {
        ...response,
        error: error.message,
      };
      break;
    case "RequestURLError":
      statusCode = 404;
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

httpServer.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
