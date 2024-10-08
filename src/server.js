import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  guestLoginHandler
} from "./backend/controllers/AuthController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
    },

    seeds(server) {
      server.logging = false;
      server.create("user", {
        name: "testuser",
        email: "testuser@gmail.com",
        password: "testpassword",
      });
    },

    routes(){
        this.namespace = "api";
        this.post("/auth/signup", signupHandler.bind(this))
        this.post("/auth/login", loginHandler.bind(this))
        this.post("/auth/guest-login", guestLoginHandler.bind(this));


        this.passthrough("https://mocki.io/*");
        this.passthrough("https://maps.googleapis.com/**");
        
    }
  });
}
