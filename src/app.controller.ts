import {
  Controller,
  Get,
  Param,
  Query,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import db from './db';

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
  }
