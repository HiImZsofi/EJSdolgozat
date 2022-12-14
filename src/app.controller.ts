import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Redirect,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';
import { MacskaDto } from './macska.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  async listCats(@Query('szem_szin') szem_szin : string) { //?????????
    if (szem_szin != undefined) {
      const [ rows ] = await db.execute(
        'SELECT szem_szin, suly FROM macskak WHERE szem_szin = ?',
        [szem_szin]
        )
  
      return {
        macskak: rows
      }
    }else{
      const [ rows ] = await db.execute(
        'SELECT szem_szin, suly FROM macskak ORDER BY suly DESC'
        );

        return {
          macskak: rows
        }
      }
    }


    @Get('macska/new')
    @Render('form')
    ujCicaForm() {
    return {};
  }

  @Post('macska/new')
  @Redirect()
  async newMacska(@Body() macska: MacskaDto){
    const [result]: any = await db.execute(
      'INSERT INTO macskak (szem_szin, suly) VALUES (?, ?)',
      [ macska.szem_szin, macska.suly ]
    );
    return{
      url: '/',
    }
  }
  }
