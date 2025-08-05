class AppError extends Error {
  status: number;
  errors: object;

  constructor(message: string, status: number, errors?: object) {
    super(message);
    this.status = status || 500;
    this.errors = errors || {};
  }
}

export default AppError;
