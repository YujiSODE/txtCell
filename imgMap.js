/*txtCell
* imgMap.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//the interface to convert "map data" into canvas "image" or canvas "image" into "map data".
/*=== Parameters ===
* - canvasId: id of canvas tag; canvas tag is generated when there is not target tag.
*=== Returned function ===
* - function(): function that returns Log Object.
*   Log object has following values:
*   - canvasId: id of target canvas tag.
*     -----------------------------------
*   - inputMap: input data map with method map2Cvs(map).
*   - mapImage: data URI for input data map with method map2Cvs(map).
*     -----------------------------------
*   - outputMap: output data map with method cvs2Map().
*   - abcd: parameters to convert image into mapdata with method cvs2Map().
*     v=f(RGBa-value)=a*R+b*G+c*B+d*a.
*=== Method of returned function ===
* - function map2Cvs(map): method to convert map data into canvas image; map is map data.
*   "color chart" between blue(0) and red(9) is default output.
* - function cvs2Map(): method to convert canvas image into map data.
*=== Map data format ===
* map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9.
*/
//============================================================================
function imgMap(canvasId){
  canvasId=!canvasId?'img2Map_cvs':canvasId;
  var slf=window,r9=slf.Math.random().toFixed(9).replace(/\./g,''),
      cvs=slf.document.getElementById(canvasId),c,bd,
      _Log={canvasId:canvasId,inputMap:undefined,mapImage:undefined,outputMap:undefined,abcd:undefined},
      W=0,H=0,f,F,spt,B,U,Wk,colorChart;
  //element generator
  f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};
  //============================================================================
  if(!cvs){
    bd=slf.document.getElementsByTagName('body')[0],bd.id='bd'+r9;
    cvs=f('canvas',canvasId,bd.id),bd.removeAttribute('id');
  }
  c=cvs.getContext('2d');
  //returned function that returns Log Object
  F=function(){return _Log;};
  //method to convert map data into canvas image; "color chart" between blue(0) and red(9) is default output
  F.map2Cvs=function(map){
    //map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9
    map=!map?colorChart:map;
    var d=map.split(/@/),img;
    W=d[0].length,H=d.length;
    cvs.width=W,cvs.height=H;
    //img.data: image data
    img=c.createImageData(W,H);
    /*=== <generation of worker> ===*/
    /* === Rank ===
    * #0: 255*0.1=25.5
    * #1: 255*0.2=51
    * #2: 255*0.3=76.5
    * #3: 255*0.4=102
    * #4: 255*0.5=127.5
    * #5: 255*0.6=153
    * #6: 255*0.7=178.5
    * #7: 255*0.8=204
    * #8: 255*0.9=229.5
    * #9: 255*1.0=255
    */
    spt=[
      'var slf=this,i=0,j=0,W='+W+',H='+H+',arr=[],Rank=[25.5,51,76.5,102,127.5,153,178.5,204,229.5,255],d;',
      /*head part of eventlistener*/
      'slf.addEventListener(\'message\',function(e){d=e.data.split(/@/);',
      /*it converts map data into RGBa-data*/
      'while(i<H){j=0;',
      /*RGBa-value*/
      'while(j<W){arr.push(Rank[d[i][j]]),arr.push(0),arr.push(255-Rank[d[i][j]]),arr.push(255),j+=1;}',
      'i+=1;}',
      /*tail part of eventlistener*/
      'slf.postMessage(arr);slf=i=j=W=H=arr=Rank=d=null;},true);'
    ].join('');
    B=new Blob([spt],{type:'text/javascript'});
    U=slf.URL.createObjectURL(B);
    Wk=new Worker(U);
    slf.window.URL.revokeObjectURL(U);
    Wk.addEventListener('message',function(e){
      img.data.set(e.data);
      c.putImageData(img,0,0),_Log.inputMap=map,_Log.mapImage=cvs.toDataURL();
      spt=B=U=Wk=null;
    },true);
    //if error in worker
    Wk.addEventListener('error',function(e){console.log(e.message);},true);
    Wk.postMessage(map);
    /*=== </generation of worker> ===*/
  };
  //method to convert canvas image into map data
  F.cvs2Map=function(){};
  //=== color chart ===
  colorChart="0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999";
  return F;
}
