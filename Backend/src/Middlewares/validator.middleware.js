export const validateShema = (schema) => async (req, res, next) => {
    try {
      console.log("Request Body Before Validation:", req.body);
      const parsebody = await schema.parseAsync(req.body);
      // req.body = parsebody;  
      next();
    } catch (error) {
      console.log("Validation Error:", error);
      res.status(400).json({ msg: 'Validation failed from Zod', error });
    }
  }
  