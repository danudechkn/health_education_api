declare namespace env {
  interface ProcessEnv {
    DB_NAME: string;
    DB_USER: string;
    DB_PASS: string;

    DB_HOST: string;
    DB_DIALECT: string;
    DB_PORT: number;

    PORTAPP: string;
    SUPERADMIN_USER: string;
    SUPERADMIN_PASS: string;
    JWT_SECRET: string;
  }
}
