/*txtCell
* txtCell.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//the interface for text based Cellular Automaton.
/*=== Parameters ===
* - dataName: name of a data set.
* - wkScrpt: a filename of a script for Web Worker.
* - [optional] map1 and map2: map data.
*   map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9.
*=== returned function ===
*
* === List of wkScrpt ===
* - "overflow simulation with +1": 'txtCell_+1.js'
* - "Conway's Game of Life": './txtCell_lifeGame.js'
*/
//============================================================================
function txtCell(dataName,wkScrpt,map1,map2){
  var slf=window,W,r9=slf.Math.random().toFixed(9).replace(/\./g,''),
      bd=slf.document.getElementsByTagName('body')[0],
      dataN=0,I=0,_Map,_Log={map0:undefined,map1:undefined,map2:undefined,step:0},
      Div,Name,pStep,I=0,J=0,P,pRnd=0,mp=[],mpN=0,mpM=0,pSt,step=0,dStep=0,max=0,tId,F;
  //element generator
  var f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};
  //data mapping function that returns mapped data
  var dMap=function(d){
    if(!d){
      //d=false: default random map with 0 or 1 (n x n data)
      var n=slf.prompt('n x n data: n=?',3);
      n=/^[1-9](?:[0-9]+)?$/.test(n)?+n:3;
      I=0;
      while(I<n){
        J=0;
        while(J<n){
          pRnd=Math.floor(2*Math.random());
          P.innerHTML+=J<n-1?pRnd:(I<n-1?pRnd+'<br>':pRnd),J+=1;
        }
        I+=1;
      }
    }else{
      //d='xxx...x@xxx...x@...'; x is integer between 0 to 9
      P.innerHTML=d.replace(/@/g,'<br>');
    }
    return P.innerHTML.replace(/<br>/g,'@');
  };
  //function that a posts message to web worker
  var wkMsg=function(v){
      tId=slf.setTimeout(function(){W.postMessage(v);},1000);
  };
  //============================================================================
  bd.id='body'+r9;
  //Data=!Data?'123456789':Data;
  Div=f('div','txtCell'+r9,bd.id),bd.removeAttribute('id');
  Name=f('p','pName'+r9,Div.id),Name.innerHTML='\"'+dataName+'\":\"'+wkScrpt+'\"';
  pStep=f('p','pStep'+r9,Div.id),pStep.innerHTML='step:0';
  //=== data mapping ===
  P=f('p','p'+r9,Div.id);
  P.style.cssText='overflow:scroll;width:30vw;height:30vh;border:1px dashed #000f;';
  //=== map data ===
  _Map=dMap(map1);
  _Log.map0=_Map;
  _Log.map1=_Map;
  //=== worker event ===
  W=new Worker('./'+wkScrpt);
  W.addEventListener('error',function(e){console.log(e.message),W.terminate();},true);
  W.addEventListener('message',function(e){
    //e.data='xxx...x@xxx...x@...'; x is integer between 0 to 9
    //P.innerHTML=e.data.replace(/@/g,'<br>'),step+=1,dStep+=1;
    _Map=dMap(e.data),_Log.map1=_Map,step+=1,dStep+=1,_Log.step+=1;
    pStep.innerHTML='step:'+step;
    if(dStep<max){
      wkMsg(_Map);
      //W.postMessage(_Map);
    }else{
      //resetting parameters
      dStep=0,max=0;
    }
  },true);
  //=== returned ===
  //return function(){return _Log;};
  F=function(){return _Log;};
  F.run=function(maxStep){
    maxStep=/^[1-9](?:[0-9]+)?$/.test(maxStep)?maxStep:1;
    max=maxStep;
    //W.postMessage(P.innerHTML.replace(/<br>/g,'@'));
    wkMsg(P.innerHTML.replace(/<br>/g,'@'));
  };
  return F;
}
//=== examples ===
var y=txtCell('sample','txtCell_lifeGame.js');
//var y=txtCell('sample','txtCell_lifeGame.js','000@111@000');
