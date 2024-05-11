import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { CvHistoryService } from './history.service';
  import { cvHistoryDto } from './dto/create-history.dto';
  import { UpdateHistoryDto } from './dto/update-history.dto';
  
  @Controller('cv-history')
  export class CvHistoryController {
    constructor(private readonly cvHistoryService: CvHistoryService) {}
  
    @Post()
    create(@Body() createCvHistoryDto: cvHistoryDto) {
      return this.cvHistoryService.create(createCvHistoryDto);
    }
  
    @Get()
    findAll() {
      return this.cvHistoryService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.cvHistoryService.findOne(+id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateCvHistoryDto: UpdateHistoryDto,
    ) {
      return this.cvHistoryService.update(+id, updateCvHistoryDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.cvHistoryService.remove(+id);
    }
  }
  