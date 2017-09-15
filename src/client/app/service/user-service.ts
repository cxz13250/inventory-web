/**
 * Created by ROGK on 2017/9/15.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class UserService {
  constructor(private http:Http) {}
}
