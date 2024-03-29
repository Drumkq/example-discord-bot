import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: '1jvc19Dk',
  database: 'database_development',
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/db/*-migrations.js'],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
