import { Module } from '@nestjs/common';
import { CourseController } from './controllers/course.controller';

@Module({
  imports: [],
  controllers: [CourseController],
})
export class CoursesModule {}
