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
* tagId: id of target tag
* N: size of a data set
* Data: numerical text data; e.g., '123456789'
* dataName: name of the whole data set
* wkScrpt: a text formatted file path to a script for Web Worker
* map: optional map data
*/
/* === List of wkScrpt ===
* - "overflow simulation with +1": 'txtCell_+1.js'
* - "Conway's Game of Life": './txtCell_lifeGame.js'
*/
/*=== returned object: {run(),v0(),log(),close()} ===
* run(max): it runs system for max-steps; a step as default.
* v0(): it returns initial condition.
* log(): it returns the current log.
* close(): it closes this interface.
*/
//============================================================================
function txtCell(tagId,N,Data,dataName,wkScrpt,map){
  //_step0[0]: initial condition of given data
  //_step0[1]: initial condition of map data
  if(N<1){throw new Error('N<1');}
  var slf=window,Wk,dataN=0,I=0,map0='0',_step0=[],
      r9=slf.Math.random().toFixed(9).replace(/\./g,''),
      Div,Name,R,P,fontSize=0,mpName,mp,csTxt,pSt,step=0,dStep=0,maxStep=0,tId;
  //element generator
  var f=function(elName,elId,targetId){
    var t=slf.document.getElementById(targetId),
        E=slf.document.createElement(elName);
    E.id=elId;
    return t.appendChild(E);
  };
  //function that a posts message to web worker
  var wkMsg=function(){
    if(dStep<maxStep){
      tId=setTimeout(function(){Wk.postMessage(N+'@'+P.innerHTML+'@'+mp.innerHTML),tId=null;},1000);
    }else{
      Wk.removeEventListener('message',wkMsg,true),dStep=0;
    }
  };
  //============================================================================
  Data=!Data?'123456789':Data;
  Div=f('div','div'+r9,tagId);
  Name=f('p','pName'+r9,Div.id).innerHTML=dataName;
  R=f('p','pResult'+r9,Div.id);
  R.innerHTML='\"'+wkScrpt+'\" step:0';
  //=== data mapping ===
  P=f('p','p'+r9,Div.id);
  P.innerHTML=Data.replace(/[^0-9]/g,0);
  _step0[0]=P.innerHTML;
  dataN=P.innerHTML.length;
  if(!map){
    while(I<dataN-1){
      map0+='0',I+=1;
    }
  }
  fontSize=slf.getComputedStyle(P,null)['font-size'].replace(/px/g,'');
  //=== map data ===
  mpName=f('p','pName'+r9,Div.id).innerHTML='Map';
  mp=f('p','mp'+r9,Div.id);
  mp.innerHTML=!map?map0:map.replace(/[^0-9]/g,0);
  _step0[1]=mp.innerHTML;
  //=== value for cssText ===
  csTxt='color:rgba(0,0,255,1);word-break:break-all;letter-spacing:0.5em;';
  csTxt+='width:'+((N+1)*fontSize)+'px;';
  P.style.cssText=csTxt;
  mp.style.cssText=csTxt;
  //=== worker event ===
  Wk=new Worker(wkScrpt);
  Wk.addEventListener('error',function(e){
    console.log(e.message),Wk.terminate();
  },true);
  Wk.addEventListener('message',function(e){
    P.innerHTML=e.data,step+=1,dStep+=1;
    R.innerHTML='\"'+wkScrpt+'\" step:'+step;
  },true);
  //=== returned object: {run(),v0(),log(),close()} ===
  return {
    run:function(max){
      //max: max steps
      if(!Div){throw new Error('there is no target <div>');}
      maxStep=(!max||max<0)?1:max;
      Wk.addEventListener('message',wkMsg,true);
      wkMsg();
    },
    v0:function(){
      //this returns initial condition
      if(!Div){throw new Error('there is no target <div>');}
      return {Name:Name,initialData:_step0[0],dataWidth:N,initialMap:_step0[1],script:wkScrpt};
    },
    log:function(){
      if(!Div){throw new Error('there is no target <div>');}
      var i=0,d=P.innerHTML,n=d.length,o={};
      while(i<10){o[i]=0,i+=1;}
      o.step=step;
      /*o.data="dataWidth@Data@map"*/
      o.data=N+'@'+P.innerHTML+'@'+mp.innerHTML;
      i=0;
      while(i<n){o[d[i]]+=1,i+=1;}
      return o;
    },
    close:function(){
      if(!Div){throw new Error('there is no target <div>');}
      if(!!tId){slf.clearTimeout(tId)}
      var r=Div.parentNode.removeChild(Div);
      r=slf=Wk=dataN=I=map0=_step0=r9=Div=Name=R=P=fontSize=mpName=mp=csTxt=pSt=step=tId=null;
    }
  };
}
//=== examples ===
//var b=document.getElementsByTagName('body')[0];
//b.id='btg';
//===
//var y=txtCell(b.id,3,'123456789','test','./txtCell_+1.js');
//var y=txtCell(b.id,3,'010111010000','test','./txtCell_+1.js','123456789');
//var y=txtCell(b.id,5,['10101','01010','10101','01010','10101'].join(''),'test','./txtCell_lifeGame.js');
/*=== <Some patterns of "Conway's Game of Life"> ===
* These pattern examples are derived from:
* Schiff, J., L. 2008. Cellular Automata: A Discrete View of the World. John Wiley & Sons, Inc.
* Japanese language edition by Umeno, H. and Peper, F. 2011. Kyoritsu Shuppan Co., LTD.
*/
//var y=txtCell(b.id,3,'000111000',Date().replace(/\s/g,'_'),'./txtCell_lifeGame.js','123456789');
//var y=txtCell(b.id,3,'000333000',Date().replace(/\s/g,'_'),'./txtCell_lifeGame.js','123456789');
//var y=txtCell(b.id,4,['0100','1001','1001','0010'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,4,['0010','1100','0011','0100'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,4,['1100','1000','0001','0011'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,5,['11000','10100','00000','00101','00011'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,7,['1100000','1010000','0000000','0010100','0000000','0000101','0000011'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,8,['11000011','10100101','00111100','10100101','11000011'].join(''),'test','./txtCell_lifeGame.js');
//var y=txtCell(b.id,8,['00110000','01001000','01011000','11010110','00001101','00000001','00001110','00001000'].join(''),'test','./txtCell_lifeGame.js');
//=== </Some patterns of "Conway's Game of Life"> ===
//y.run(3);
//y.v0();
//y.log();
//y.close();
