import { Module } from '@nestjs/common';
import { AppController } from './controllers/main/app.controller';
import { DatabaseProvider } from './providers/database';
import { MongooseModule } from '@nestjs/mongoose';
import { profileSchema } from './schemas/profile.schema';
import { ProfilesService } from './services/profiles/profiles.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nestjs:8QsAviQGYkC0sRcG@nestjs-b0qvh.gcp.mongodb.net/nestjs?retryWrites=true&w=majority',
      { useNewUrlParser: true }),
    MongooseModule.forFeature([{ name: 'Profile', schema: profileSchema }]),
  ],
  controllers: [AppController],
  providers: [DatabaseProvider, ProfilesService],
})
export class AppModule {}
