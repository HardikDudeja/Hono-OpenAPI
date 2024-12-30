import { createRoute, OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { ParamSchema, UserSchema } from './schema';



// Define a route using the createRoute function
const route = createRoute({
  // HTTP method for the route
  method: 'get',
  // Path for the route with a parameter 'id'
  path: '/users/{id}',
  // Define the request object
  request: {
    // Parameters for the request, validated by ParamSchema
    params: ParamSchema
  },
  // Define the possible responses for the route
  responses: {
    // Response for HTTP status 200 (OK)
    200: {
      // Content type of the response
      content: {
        'application/json': {
          // Schema for the response body, validated by UserSchema
          schema: UserSchema
        }
      },
      // Description of the response
      description: "Retrieve the user data"
    }
  }
});


const app = new OpenAPIHono();

// Define an OpenAPI route handler
app.openapi(route, (c) => {
  // Extract the 'id' parameter from the validated request
  const { id } = c.req.valid('param');
  // Return a JSON response with the user data
  return c.json({
    id,
    age: 20,
    name: 'John Doe'
  });
});

// Define the OpenAPI documentation endpoint
app.doc('/doc', {
  openapi: '3.0.0', // OpenAPI version
  info: {
    version: '1.0.0', // API version
    title: 'My Api'   // API title
  }
});

// Serve the Swagger UI at the '/ui' endpoint
app.get('/ui', swaggerUI({ url: '/doc' }));

// Export the app as the default export
export default app;
