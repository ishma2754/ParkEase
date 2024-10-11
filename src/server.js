import { Server, Model, RestSerializer } from "miragejs";
import {
  loginHandler,
  signupHandler,
  guestLoginHandler
} from "./backend/controllers/AuthController";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
     // Serializer defines how to format the server's response data
     //A serializer is responsible for transforming the server's response data into a specific format
    serializers: {
      //The RestSerializer is a built-in serializer that formats responses in a RESTful manner, 
      //typically as JSON objects that represent resources.
      application: RestSerializer,
    },

    // Environment determines the mode in which the server is running (development, testing, etc.)
    environment,

    // Define the data models for the server 
    models: {
      user: Model,
    },

    // Seeds are used to populate the database with initial data when the server starts
    seeds(server) {
      server.logging = false; // Disable logging to keep the output clean
      server.create("user", {
        name: "testuser",
        email: "testuser@gmail.com",
        password: "testpassword",
      });
    },

    routes(){
        this.namespace = "api"; // Set a namespace for all API routes, so they start with '/api'
        this.post("/auth/signup", signupHandler.bind(this))
        this.post("/auth/login", loginHandler.bind(this))
        this.post("/auth/guest-login", guestLoginHandler.bind(this));

        // Allow passthrough for external API requests
        // Passthrough allows requests to specific URLs to bypass the Mirage server
        //useful when want to integrate real API calls alongside  mock data without fully blocking external requests
        this.passthrough("https://mocki.io/*");
        this.passthrough("https://maps.googleapis.com/**");
        
    }
  });
}
