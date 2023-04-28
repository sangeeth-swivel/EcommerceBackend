import { Express, Request, Response } from "express";
import { createUserSchema } from "./schema/user.schema";
import requireUser from "./middleware/requireUser";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import { createSessionSchema } from "./schema/session.schema";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from "./controller/session.controller";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => {
    res.send("happy coding!").status(200);
  });

  //user
  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  //sessions
  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);
}

export default routes;
