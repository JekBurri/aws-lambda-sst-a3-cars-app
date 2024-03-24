import { StackContext, Api, StaticSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  

  const api = new Api(stack, "api", {
   
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
      "GET /cars": "packages/functions/src/cars.handler",
      "POST /cars": "packages/functions/src/cars.handler",
      
    },
  });

  const web = new StaticSite(stack, "web", {
      path: "packages/web",
      buildOutput: "dist",
      buildCommand: "npm run build",
      environment: {
        VITE_APP_API_URL: api.url,
      },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    WebsiteURL: web.url,
  });
}
