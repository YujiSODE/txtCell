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
* - wkScrpt: a filename of a script for Web Worker.
* - [optional] dataName: name of a data set. timestamp is default value.
* - [optional] map1 and map2: map data. random map with 0 or 1 (n x n data) is default value.
*   map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9.
*=== Returned function ===
* - function(): function that returns Log object.
*   Log object has following values:
*   - map0: initial data map.
*   - map1: the current data map.
*   - map2: additional data map.
*   - step: the current step.
*   - dataName: name of a data set. timestamp is default value.
*   - stat: counted results expressed as an array.
*     n-th element shows number of n. initial value is [0,0,0,0,0,0,0,0,0,0].
*=== Method of returned function ===
* - function run(maxStep): it simulates only "maxStep" steps. 1 is default value.
* - function stat(): method to count result data of 0 to 9: _Log.map1. Returned value is an array; n-th element shows number of n.
* === List of scripts for Web Worker ===
* - "Conway's Game of Life": 'txtCell_lifeGame.js'
* - "Growing life game": 'txtCell_growingLifeGame.js'
*/
//============================================================================
function txtCell(wkScrpt,dataName,map1,map2){
  var slf=window,W,r9=slf.Math.random().toFixed(9).replace(/\./g,''),
      bd=slf.document.getElementsByTagName('body')[0],
      I=0,_Map,_Log={map0:undefined,map1:undefined,map2:undefined,step:0,dataName:undefined,stat:[0,0,0,0,0,0,0,0,0,0]},
      Div,Name,pStep,I=0,J=0,P,pRnd=0,step=0,dStep=0,max=0,tId,F,
      f,dMap,wkMsg;
  //element generator
  f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};
  //data mapping function that returns mapped data
  dMap=function(d){
    //[optional] d='xxx...x@xxx...x@...'; x is integer between 0 to 9
    if(!d){
      //d=false: default random map with 0 or 1 (n x n data)
      var n=slf.prompt('n x n data; n is between 2 to 100: n=?',50);
      n=/^[1-9](?:[0-9]+)?$/.test(n)?+n:50;
      n=(+n<2||+n>100)?50:n;
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
  wkMsg=function(v){
    /*
    * max > 1000: dt = 10 millisecond
    * max > 100: dt = 50 millisecond
    * max > 0: dt = 250 millisecond
    */
    var dt=max>100?(max>1000?10:50):250;
    tId=slf.setTimeout(function(){W.postMessage(v);},dt);
  };
  //============================================================================
  dataName=!dataName?slf.Date():dataName;
  //name of a data set
  _Log.dataName=dataName;
  bd.id='body'+r9;
  Div=f('div','txtCell'+r9,bd.id),bd.removeAttribute('id');
  Name=f('p','pName'+r9,Div.id),Name.innerHTML='\"'+dataName+'\":\"'+wkScrpt+'\"';
  pStep=f('p','pStep'+r9,Div.id),pStep.innerHTML='step:0';
  //=== data mapping ===
  P=f('p','p'+r9,Div.id);
  P.style.cssText='overflow:scroll;width:30vw;height:30vh;border:1px dashed #000f;resize:both;';
  //=== map data ===
  _Map=dMap(map1);
  _Log.map0=_Map;
  _Log.map1=_Map;
  _Log.map2=map2;
  //=== worker event ===
  W=new Worker(wkScrpt);
  W.addEventListener('error',function(e){console.log(e.message),W.terminate();},true);
  W.addEventListener('message',function(e){
    //e.data='xxx...x@xxx...x@...'; x is integer between 0 to 9
    _Map=dMap(e.data),_Log.map1=_Map,step+=1,dStep+=1,_Log.step+=1;
    pStep.innerHTML='step:'+step;
    if(dStep<max){
      wkMsg([_Map,map2]);
    }else{
      //resetting parameters
      dStep=0,max=0;
    }
  },true);
  //=== returned function ===
  F=function(){return _Log;};
  //method to run simulation
  F.run=function(maxStep){
    maxStep=/^[1-9](?:[0-9]+)?$/.test(maxStep)?maxStep:1;
    max=maxStep;
    wkMsg([P.innerHTML.replace(/<br>/g,'@'),map2]);
  };
  //method to count result data of 0 to 9: _Log.map1
  //returned value is an array; n-th element shows number of n
  F.stat=function(){
    if(!!_Log.map1){
      var S=[0,0,0,0,0,0,0,0,0,0],L=_Log.map1.replace(/@/,''),n=L.length,i=0;
      while(i<n){
        S[L[i]]+=1,i+=1;
      }
      _Log.stat=S;
      return S;
    }
  };
  return F;
}
//=== examples ===
//var y=txtCell('txtCell_lifeGame.js');
//var y=txtCell('txtCell_lifeGame.js','sample','000@111@000');
