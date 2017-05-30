/*txtCell
* imgMap.js
*
*    Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE or http://opensource.org/licenses/mit-license.php
*/
//interface to convert "map data" into canvas "image" or canvas "image" into "map data".
/*=== Parameters ===
* - canvasId: id of canvas tag; canvas tag is generated when there is not target tag.
*=== Returned function ===
* - function(): function that returns Log Object.
*   Log object has following values:
*   - canvasId: id of target canvas tag.
*     -----------------------------------
*   - inputMap: input data map for method map2Cvs(map).
*   - mapImage: data URI for input data map with method map2Cvs(map).
*     -----------------------------------
*   - outputMap: output data map with method cvs2Map(abcd).
*   - abcd: parameters to convert image into mapdata with method cvs2Map(abcd).
*     v=f(RGBa-value)=a*R+b*G+c*B+d*a.
*=== Method of returned function ===
* - function reset(): method to reset Log Object.
* - function map2Cvs(map): method to convert map data into canvas image; map is map data.
*   "color chart" between blue(1) and red(9), and 0 is default output.
* - function cvs2Map(abcd): method to convert canvas image into map data.
*   abcd is a text expressing values a, b, c, and d that satisfies v=f(RGBa-value)=a*R+b*G+c*B+d*a; e.g., "1011" means v=1*R+0*G+1*B+1*a.
*   "1110" is default value.
*=== Map data format ===
* map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9.
*/
/* === Rank values ===
* #0: 0
* #1: +(255*0.1).toFixed(0)=26
* #2: +(255*0.2).toFixed(0)+25=76
* #3: +(255*0.3).toFixed(0)+25=102
* #4: +(255*0.4).toFixed(0)+25=127
* #5: +(255*0.5).toFixed(0)+25=153
* #6: +(255*0.6).toFixed(0)+25=178
* #7: +(255*0.7).toFixed(0)+25=204
* #8: +(255*0.8).toFixed(0)+25=229
* #9: 255
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
  //method to reset Log Object
  F.reset=function(){_Log.canvasId=canvasId,_Log.inputMap=undefined,_Log.mapImage=undefined,_Log.outputMap=undefined,_Log.abcd=undefined;};
  //method to convert map data into canvas image; "color chart" between blue(1) and red(9), and 0 is default output
  F.map2Cvs=function(map){
    //map data = 'xxx...x@xxx...x@...'; x is integer between 0 to 9
    map=!map?colorChart:map;
    var d=map.split(/@/),img;
    W=d[0].length,H=d.length;
    cvs.width=W,cvs.height=H;
    //img.data: image data
    img=c.createImageData(W,H);
    /*=== <generation of worker:map2Cvs> ===*/
    spt=[
      'var slf=this,i=0,j=0,W='+W+',H='+H+',arr=[],Rank=[0,26,76,102,127,153,178,204,229,255],d;',
      /*head part of eventlistener*/
      'slf.addEventListener(\'message\',function(e){d=e.data.split(/@/);',
      /*it converts map data into RGBa-data*/
      'while(i<H){j=0;',
      /*RGBa-value*/
      'while(j<W){if(Rank[d[i][j]]>0){arr.push(Rank[d[i][j]]),arr.push(0),arr.push(255-Rank[d[i][j]]),arr.push(255);}else{arr.push(0),arr.push(0),arr.push(0),arr.push(0);}j+=1;}',
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
    /*=== </generation of worker:map2Cvs> ===*/
  };
  //method to convert canvas image into map data
  F.cvs2Map=function(abcd){
    //abcd: a text expressing values a,b,c, and d that satisfies v=f(RGBa-value)=a*R+b*G+c*B+d*a;
    //e.g., "1011" means v=1*R+0*G+1*B+1*a
    abcd=/^[01]{4}$/.test(abcd)?abcd:'1110';
     W=cvs.width,H=cvs.height,_Log.abcd=abcd;
    /*=== <generation of worker:cvs2Map> ===*/
    spt=[
      'var slf=this,i=0,j=0,W='+W+',H='+H+',d,map=\'\',',
      'v255s='+abcd[0]+abcd[1]+abcd[2]+abcd[3]+'*255;',
      'v255s='+abcd[0]+'*255+'+abcd[1]+'*255+'+abcd[2]+'*255+'+abcd[3]+'*255;',
      /*function returns Rank of a given array: A with index: idx*/
      'f=function(A,idx){var v=+('+abcd[0]+'*A[idx]+'+abcd[1]+'*A[idx+1]+'+abcd[2]+'*A[idx+2]+'+abcd[3]+'*A[idx+3])/v255s;',
      'return v>0.1?(v>0.2?(v>0.3?(v>0.4?(v>0.5?(v>0.6?(v>0.7?(v>0.8?(v>0.9?9:8):7):6):5):4):3):2):1):0;};',
      /*head part of eventlistener*/
      'slf.addEventListener(\'message\',function(e){d=e.data;',
      /*it converts RGBa-data into map data*/
      'while(i<4*W*H){j=0;',
      'while(j<4*W){map+=f(d,i+j),j+=4;}',
      'map+=(i<4*W*(H-1))?\'@\':\'\',i+=4*W;}',
      /*tail part of eventlistener*/
      'slf.postMessage(map);slf=i=j=W=H=v255s=f=d=map=null;},true);'
    ].join('');
    B=new Blob([spt],{type:'text/javascript'});
    U=slf.URL.createObjectURL(B);
    Wk=new Worker(U);
    slf.window.URL.revokeObjectURL(U);
    Wk.addEventListener('message',function(e){
      _Log.outputMap=e.data;
      spt=B=U=Wk=null;
    },true);
    //if error in worker
    Wk.addEventListener('error',function(e){console.log(e.message);},true);
    Wk.postMessage(c.getImageData(0,0,W,H).data);
    /*=== </generation of worker:cvs2Map> ===*/
  };
  //=== color chart ===
  colorChart="0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999@0000000000111111111122222222223333333333444444444455555555556666666666777777777788888888889999999999";
  return F;
}
