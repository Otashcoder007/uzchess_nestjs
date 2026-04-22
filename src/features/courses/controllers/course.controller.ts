import { Controller, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '../../../core/guards/authentication.guard';

@Controller('course')
@UseGuards(AuthenticationGuard)
export class CourseController {}
