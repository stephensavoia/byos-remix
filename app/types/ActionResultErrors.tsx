export type ActionResultErrors = {
  errors?: {
    [key: string]: string | undefined; // Index signature to allow string keys
  };
};
