import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Param, Response, Body } from '@nestjs/common';
import { ProfilesService } from '../../services/profiles/profiles.service';
import { Iprofile } from '../../schemas/profile.schema';
import * as Joi from '@hapi/joi';

@Controller('')
export class AppController {
  constructor(private readonly profilesService: ProfilesService) {}

  private readonly validator = Joi.object({
    rut: Joi.string().required(),
    name: Joi.string().trim().required(),
    last_name: Joi.string().trim().required(),
    phone: Joi.string().pattern(/^(\+?[0-9]{2})?(\s?)(0?9)?(\s?)[9876543]\d{7}$/),
    email: Joi.string().email().required(),
    addresses: Joi.array(),
    sex: Joi.string().uppercase().valid('F', 'M'),
  });

  @Get('/')
  async getMany(@Res() res): Promise<Iprofile[]> {
    return res.status(HttpStatus.OK).json({
      data: await this.profilesService.findAll(),
    });
  }

  @Get('/:id')
  async getOne<T>(@Param('id') id, @Res() res): Promise<Iprofile | { message }> {
     const record: Iprofile | boolean = await this.profilesService.findOne(id);

     if (record) {
       return res.status(HttpStatus.OK).json(record);
     }

     return this.NotFound(res);
  }

  @Post()
  async create<T>(@Body() data, @Res() res): Promise<Iprofile | { message }> {
    const {error, value } = this.validator.validate(data);

    if (error) {
      return res.status(HttpStatus.CONFLICT).json({
        message: error.message,
      });
    }

    return res.status(HttpStatus.CREATED).json({
      data: await this.profilesService.create(value),
    });
  }

  @Put('/:id')
  async update(@Param('id') id, @Body() data, @Res() res): Promise<Iprofile | { message }> {
    const {error, value } = this.validator.validate(data);

    if (error) {
      return res.status(HttpStatus.CONFLICT).json({
        message: error.message,
      });
    }

    const updated: any = await this.profilesService.update(id, value);
    if (updated.nModified) {
      return res.status(HttpStatus.OK).json({
        pk: id,
      });
    }

    return this.NotFound(res);
  }

  @Delete('/:id')
  async destroy(@Param('id') id, @Res() res): Promise<{ message }> {
    const deleted: any = await this.profilesService.destroy(id);

    if (deleted.deletedCount) {
      return res.status(HttpStatus.NO_CONTENT).json({});
    }

    return this.NotFound(res);
  }

  NotFound(res): Promise<{message}> {
    return res.status(HttpStatus.NOT_FOUND).json({
      message: 'record not found',
    });
  }

}
