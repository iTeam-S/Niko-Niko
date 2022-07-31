import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { GroupeModule } from './groupe/groupe.module';
import { AppartenanceModule } from './appartenance/appartenance.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: "mariadb",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + "/output/entities/*.js"],
      autoLoadEntities: true
    }),
    AuthModule,
    GroupeModule,
    AppartenanceModule,
  ]
})
export class AppModule {}
