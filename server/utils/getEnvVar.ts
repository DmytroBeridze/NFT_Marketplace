export const getEnvVar = (key: string): string => {
  const value = process.env[key] as string;

  if (!value) {
    throw new Error("JWT_SECRET is not defined in .env");
  }
  return value;
};
