/*txtCell
* txtCell_growingLifeGame.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//============================================================================
//this is Web Worker interface for Cellular Automaton.
//Growing life game
//Growing life game is based on "Conway's Game of Life". A living cell grows from 1 to 9 by step.
/*
* <rule of "Growing life game">
* [surrounding sum:012345678]
* [_current cell=0:000100000]
* [_current cell=1:002200000]
* [_current cell=2:003300000]
* [_current cell=3:004400000]
* [_current cell=4:005500000]
* [_current cell=5:006600000]
* [_current cell=6:007700000]
* [_current cell=7:008800000]
* [_current cell=8:009900000]
* [_current cell=9:009900000]
* Cell with value of 9 means that it has lasted for 9 or more steps.
* Cell with value 0 in map2 will be 0 if additional map: map2 is available
*/
var slf=this,
    c={c0:0,c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0},
    _rule=['000100000','002200000','003300000','004400000','005500000','006600000','007700000','008800000','009900000','009900000'];
//=== message event ===
slf.addEventListener('message',function(e){
  //e.data='xxx...x@xxx...x@...'; x is integer between 0 to 9
  //d1 and d2: map1 and map2
  var d1=e.data[0].split(/@/),d2=!e.data[1]?undefined:e.data[1].split(/@/),
      P=[],H=0,W=0,Y=0,X=0,i=1,s=0;
  W=d1[0].length,H=d1.length;
  while(Y<H){
    X=0,P[Y]='';
    while(X<W){
      /*=== Moore neighborhood: c.c0 to c.c8 ===
      * [c1|c2|c3]
      * [c4|c0|c5]
      * [c6|c7|c8]
      */
      c.c0=+d1[Y][X];
      if(!d2){
        //without additional map: map2
        c.c1=(Y!=0&&X!=0)?+d1[Y-1][X-1]:0;
        c.c2=(Y!=0)?+d1[Y-1][X]:0;
        c.c3=(Y!=0&&X!=W-1)?+d1[Y-1][X+1]:0;
        c.c4=(X!=0)?+d1[Y][X-1]:0;
        c.c5=(X!=W-1)?+d1[Y][X+1]:0;
        c.c6=(Y!=H-1&&X!=0)?+d1[Y+1][X-1]:0;
        c.c7=(Y!=H-1)?+d1[Y+1][X]:0;
        c.c8=(Y!=H-1&&X!=W-1)?+d1[Y+1][X+1]:0;
      }else{
        //with additional map: map2
        c.c1=(Y!=0&&X!=0)?(+d2[Y-1][X-1]>0?+d1[Y-1][X-1]:0):0;
        c.c2=(Y!=0)?(+d2[Y-1][X]>0?+d1[Y-1][X]:0):0;
        c.c3=(Y!=0&&X!=W-1)?(+d2[Y-1][X+1]>0?+d1[Y-1][X+1]:0):0;
        c.c4=(X!=0)?(+d2[Y][X-1]>0?+d1[Y][X-1]:0):0;
        c.c5=(X!=W-1)?(+d2[Y][X+1]>0?+d1[Y][X+1]:0):0;
        c.c6=(Y!=H-1&&X!=0)?(+d2[Y+1][X-1]>0?+d1[Y+1][X-1]:0):0;
        c.c7=(Y!=H-1)?(+d2[Y+1][X]>0?+d1[Y+1][X]:0):0;
        c.c8=(Y!=H-1&&X!=W-1)?(+d2[Y+1][X+1]>0?+d1[Y+1][X+1]:0):0;
      }
      i=1,s=0;
      while(i<9){
        s+=+c['c'+i]>0?1:0,i+=1;
      }
      if(!d2){
        P[Y]+=_rule[c.c0][s];
      }else{
        P[Y]+=+d2[Y][X]>0?_rule[c.c0][s]:0;
      }
      X+=1;
    }
    Y+=1;
  }
  slf.postMessage(P.join('@'));
  d1=d2=P=H=W=Y=X=i=s=null;
},true);
