export const validateShema = (schema) => async (req, res, next) => {
  try {
    const parsebody = await schema.parseAsync(req.body);
    // req.body = parsebody;
    next();
  } catch (err) {
    const status = 400;
    const message = err.issues[0].message;
    const error = { status, message };
    next(error);
  }
};
