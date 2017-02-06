/*txtCell
* txtCell_+1.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//============================================================================
//this is Web Worker interface for Cellular Automaton.
//overflow simulation with +1
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
};
//=== message event ===
slf.addEventListener('message',function(e){
  var d=e.data.split(/@/),P0,P=[],N=0,M=0,I=0,J=0;
  //d[0]:width,d[1]:data, and d[2]:map data
  P0=txt2Arr(d[1],d[0]);
  N=P0.length;
  while(I<N){
    P[I]='',M=P0[I].length,J=0;
    while(J<M){
      P[I]+=+P0[I][J]+1,J+=1;
    }
    I+=1;
  }
  slf.postMessage(P.join(''));
  d=P0=P=N=M=I=J=null
},true);
