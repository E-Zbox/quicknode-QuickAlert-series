import * as bodyParse from "body-parser";
import express, { Application } from "express";

export default class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParse.urlencoded({ extended: false }));
    this.app.use(express.json());
  }
}
