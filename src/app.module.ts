import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/modules/users/users.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/modules/auth/passport/jwt-auth.guard';
import { AuthController } from './modules/auth/auth.controller';
import { MoviesModule } from './modules/movies/movies.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { GenresModule } from './modules/genres/genres.module';
import { MovieGenresModule } from './modules/movie_genres/movie_genres.module';
import { ImageModule } from './modules/images/image.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '052454',
      database: 'nestjs',
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrations: ['dist/**/*.migration{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    MoviesModule,
    ReviewsModule,
    CommentsModule,
    LikesModule,
    GenresModule,
    MovieGenresModule,
    ImageModule,
  ],
  controllers: [UsersController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
