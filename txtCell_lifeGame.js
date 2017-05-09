/*txtCell
* txtCell_lifeGame.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//============================================================================
//this is Web Worker interface for Cellular Automaton.
//"Conway's Game of Life".
/*
* <rule of "Conway's Game of Life">
* [surrounding sum:012345678]
* [_current cell=0:000100000]
* [_current cell=1:001100000]
*/
var slf=this,
    c={c0:0,c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0},
    _rule=['000100000','001100000'];
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
      c.c1=(Y!=0&&X!=0)?+d1[Y-1][X-1]:0;
      c.c2=(Y!=0)?+d1[Y-1][X]:0;
      c.c3=(Y!=0&&X!=W-1)?+d1[Y-1][X+1]:0;
      c.c4=(X!=0)?+d1[Y][X-1]:0;
      c.c5=(X!=W-1)?+d1[Y][X+1]:0;
      c.c6=(Y!=H-1&&X!=0)?+d1[Y+1][X-1]:0;
      c.c7=(Y!=H-1)?+d1[Y+1][X]:0;
      c.c8=(Y!=H-1&&X!=W-1)?+d1[Y+1][X+1]:0;
      i=1,s=0;
      while(i<9){
        s+=+c['c'+i]>0?1:0,i+=1;
      }
      P[Y]+=_rule[c.c0>0?1:0][s];
      X+=1;
    }
    Y+=1;
  }
  slf.postMessage(P.join('@'));
  d1=d2=P=H=W=Y=X=i=s=null;
},true);
