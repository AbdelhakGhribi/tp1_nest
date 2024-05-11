import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Sse,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../authentication/Guards/jwt-auth.guard';
import { Request } from 'express';
import { Roles } from '../authentication/decorators/roles.decorator';
import { RolesAuthGuard } from '../authentication/Guards/role-auth.guard';
import { fromEvent, map, Observable } from 'rxjs';
import { OPERATIONS } from 'src/SseEv/cv.events';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { User } from 'src/decorators/user.decorator';


@Controller({
  path: 'cvs', version: '1',
})
export class CvsController {
  constructor(private readonly cvsService: CvsService) {
  }

  @Get('/random') random() {
    return this.cvsService.randomize();
  }

  @UseGuards(JwtAuthGuard) @Post('') create(@Body() createCvDto: CreateCvDto) {
    return this.cvsService.create(createCvDto);
  }

  @Roles('admin') @UseGuards(RolesAuthGuard) @UseGuards(JwtAuthGuard) @Get() findAll(@Req() request: Request) {
    console.log(request.user);
    return this.cvsService.findAll();
  }

  @UseGuards(JwtAuthGuard) @Get('/find/:age/:chaine?') find(@Param('age') age: number, @Param('chaine') chaine: string) {
    return this.cvsService.find(age, chaine);
  }

  @UseGuards(JwtAuthGuard) @Get(':id') findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard) @Patch(':id') update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvsService.update(id, updateCvDto);
  }

  @UseGuards(JwtAuthGuard) @Delete(':id') remove(@Param('id') id: string) {
    return this.cvsService.remove(id);
  }
}

@Controller({
  path: 'cvs', version: '2',
})
export class CvsControllerV2 {
  constructor(private readonly cvsService: CvsService, private eventEmitter: EventEmitter2) {
  }

  @Get('/random') random() {
    return this.cvsService.randomize();
  }

  @Post('') create(@Body() createCvDto: CreateCvDto, @Req() req: Request) {
    let userId = req['userInfo']['user-id'];
    return this.cvsService.createSse(createCvDto, userId);
  }

  @Get() findAll(@Query('pageNumber', ParseIntPipe) pageNumber: number = 1, @Query('pageSize', ParseIntPipe) pageSize: number = 10) {
    return this.cvsService.findAll(pageNumber, pageSize);
  }

  @Get('/find/:age/:chaine?') find(@Param('age') age: number, @Param('chaine') chaine: string) {
    return this.cvsService.find(age, chaine);
  }

  @Get(':id') findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id);
  }

  @Patch(':id') update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto, @Req() req: Request) {
    let userId = req['userInfo']['user-id'];
    return this.cvsService.updateSse(id, updateCvDto, userId);
  }

  @Post('upload') @UseInterceptors(FileInterceptor('file', {
    dest: 'uploads/',
  })) uploadFile(@UploadedFile(new ParseFilePipe({
    validators: [new MaxFileSizeValidator({ maxSize: 1000000 }), new FileTypeValidator({ fileType: /.jpeg|jpg|png$/ })],
  })) file: Express.Multer.File, @Param('id') id: string) {
    console.log(file);
  }

  @Delete(':id') remove(@Param('id') id: string, @Req() req: Request) {
    let userId = req['userInfo']['user-id'];
    return this.cvsService.removeSse(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Sse('sse/testcvs')
  sse(@User() user): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, OPERATIONS.CV_ADD).pipe(
      map((payload: any) => {
      payload.userId = user;
      // console.log(payload);
      if (user.id === payload.cv.userId || user.role === 'admin') {
        return new MessageEvent(OPERATIONS.CV_ADD, { data: payload });
      } else {
        return new MessageEvent('default', { data: null });
      }
    }));
  }
}
