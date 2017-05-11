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
*   - map: used data map.
*   - canvasId: id of target canvas tag.
*=== Method of returned function ===
* - function map2Cvs(map): method to convert map data into canvas image; "color chart" between blue(0) and red(9) is default output.
*   map is map data.
* - function cvs2Map(): method to convert canvas image into map data.
*=== Map data ===
* map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9.
*/
//============================================================================
//V=a*R+b*G+c*B+d*a
function imgMap(canvasId){
  var slf=window,W,r9=slf.Math.random().toFixed(9).replace(/\./g,''),
      cvs=slf.document.getElementById(canvasId),c,bd,
      _Log={map:undefined,canvasId:canvasId},W=0,H=0,f,F,colorChart;
  //element generator
  f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};
  //============================================================================
  if(!cvs){
    bd=slf.document.getElementsByTagName('body')[0],bd.id='bd'+r9;
    cvs=f('canvas','img2Map_cvs'+r9,bd.id),bd.removeAttribute('id');
  }
  c=cvs.getContext('2d');
  //returned function that returns Log Object
  F=function(){return _Log;};
  //method to convert map data into canvas image; "color chart" between blue(0) and red(9) is default output
  F.map2Cvs=function(map){
    //map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9
    map=!map?colorChart:map;
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
    var d=map.split(/@/),img,arr=[],Rank=[25.5,51,76.5,102,127.5,153,178.5,204,229.5,255],i=0,j=0;
    W=d[0].length,H=d.length;
    cvs.width=W,cvs.height=H;
    img=c.createImageData(W,H);
    while(i<H){
      j=0;
      while(j<W){
        //R
        arr.push(Rank[d[i][j]]);
        //G
        arr.push(0);
        //B
        arr.push(255-Rank[d[i][j]]);
        //alpha
        arr.push(255);
        j+=1;
      }
      i+=1;
    }
    img.data.set(arr);
    c.putImageData(img,0,0),_Log.map=map;
  };
  //method to convert canvas image into map data
  F.cvs2Map=function(){};
  //=== color chart ===
  colorChart="0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999";
  return F;
}
