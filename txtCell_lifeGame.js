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
var slf=this;
//this function converts a given text into an array separated by given text width
//txt and w are given text and text width
var txt2Arr=function(txt,w){
  var a=[],i=0,n=txt.length,j=0;
  while(i<n){
    a[j]=(a[j]!==undefined)?a[j]:'';
    a[j]+=txt[i],i+=1;
    j=((i%w)!=0)?j:j+1;
  }
  return a;
},
    getData=function(v){
      return (v!==undefined)?v:0;
    };
//=== message event ===
slf.addEventListener('message',function(e){
  var d=e.data.split(/@/),P0,P=[],H=0,W=0,Y=0,X=0,i=1,s=0,
      c={c0:0,c1:0,c2:0,c3:0,c4:0,c5:0,c6:0,c7:0,c8:0},
      _rule=['000100000','001100000'];
  //d[0]:width,d[1]:data, and d[2]:map data
  P0=txt2Arr(d[1],d[0]);
  H=P0.length;
  while(Y<H){
    P[Y]='',W=P0[Y].length,X=0;
    while(X<W){
      /*=== Moore neighborhood: c.c0 to c.c8 ===
      * [c1|c2|c3]
      * [c4|c0|c5]
      * [c6|c7|c8]
      */
      c.c0=getData(P0[Y][X]);
      c.c1=(Y!=0||X!=0)?getData(getData(P0[Y-1])[X-1]):0;
      c.c2=(Y!=0)?getData(getData(P0[Y-1])[X]):0;
      c.c3=(Y!=0||X!=(W-1))?getData(getData(P0[Y-1])[X+1]):0;
      c.c4=(X!=0)?getData(getData(P0[Y])[X-1]):0;
      c.c5=(X!=(W-1))?getData(getData(P0[Y])[X+1]):0;
      c.c6=(Y!=(H-1)||X!=0)?getData(getData(P0[Y+1])[X-1]):0;
      c.c7=(Y!=(H-1))?getData(getData(P0[Y+1])[X]):0;
      c.c8=(Y!=(H-1)||X!=(W-1))?getData(getData(P0[Y+1])[X+1]):0;
      /*=== "Conway's Game of Life" ===*/
      i=1,s=0;
      while(i<9){
        s+=c['c'+i]>0?1:0,i+=1;
      }
      P[Y]+=_rule[c.c0>0?1:0][s];
      X+=1;
    }
    Y+=1;
  }
  slf.postMessage(P.join(''));
  d=P0=P=H=W=Y=X=i=s=c=_rule=null;
},true);
