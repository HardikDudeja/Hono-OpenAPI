import { z } from '@hono/zod-openapi';

// Define a schema using zod library
export const ParamSchema = z.object({
    // Define an 'id' field which is a string with a minimum length of 3 characters
    id: z.string().min(3).openapi({
      // OpenAPI metadata for the 'id' parameter
      param: {
        name: 'id', // Name of the parameter
        in: 'path'  // Location of the parameter (in the URL path)
      },
      example: '123' // Example value for the parameter
    })
  })
  
  
  // Define a schema for a User using zod library
  export const UserSchema = z.object({
    // Define an 'id' field which is a string with an example value of '123'
    id: z.string().openapi({example: '123'}),
    // Define a 'name' field which is a string with an example value of 'John Doe'
    name: z.string().openapi({example: 'John Doe'}),
    // Define an 'age' field which is a number with an example value of 30
    age: z.number().openapi({example: 30}),
  }).openapi('User') // Provide OpenAPI metadata for the User schema