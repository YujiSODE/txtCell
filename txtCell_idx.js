//txtCell_idx.js
//Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com>
(function(n){n=/^[0-9]+$/.test(n)?n:10;var slf=window,x,y,logX,i=0,tF,mp;mp=nXmGen(400,400,2).join('@');tF=function(){var tId;if(i<n){x.run();logX=x();tId=slf.setTimeout(function(){y.map2Cvs(logX.map1);i+=1;tId=slf.setTimeout(tF,1000);},800);}};x=txtCell('txtCell_growingLifeGame.js','Life Game',mp);y=imgMap('Result');logX=x();y.map2Cvs(logX.map0);if(n>0){tF();}
    /*txtCell v1.0.1: Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com> This software is released under the MIT License.*/
    function txtCell(wkScrpt,dataName,map1,map2){var slf=window,W,r9=slf.Math.random().toFixed(9).replace(/\./g,''),bd=slf.document.getElementsByTagName('body')[0],I=0,_Map,_Log={map0:undefined,map1:undefined,map2:undefined,step:0,dataName:undefined,stat:[0,0,0,0,0,0,0,0,0,0]},Div,Name,pStep,I=0,J=0,P,pRnd=0,step=0,dStep=0,max=0,tId,F,f,dMap,wkMsg;f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};dMap=function(d){P.innerHTML=d.replace(/@/g,'<br>');return P.innerHTML.replace(/<br>/g,'@');};wkMsg=function(v){var dt=max>100?(max>1000?10:50):250;tId=slf.setTimeout(function(){W.postMessage(v);},dt);};dataName=!dataName?slf.Date():dataName;_Log.dataName=dataName;bd.id='body'+r9;Div=f('div','txtCell'+r9,bd.id),bd.removeAttribute('id');Name=f('p','pName'+r9,Div.id),Name.innerHTML='\"'+dataName+'\":\"'+wkScrpt+'\"';pStep=f('p','pStep'+r9,Div.id),pStep.innerHTML='step:0';P=f('p','p'+r9,Div.id);P.style.cssText='overflow:scroll;width:30vw;height:30vh;border:1px dashed #000f;resize:both;';_Map=dMap(map1);_Log.map0=_Map;_Log.map1=_Map;_Log.map2=map2;W=new Worker(wkScrpt);W.addEventListener('error',function(e){console.log(e.message),W.terminate();},true);W.addEventListener('message',function(e){_Map=dMap(e.data),_Log.map1=_Map,step+=1,dStep+=1,_Log.step+=1;pStep.innerHTML='step:'+step;if(dStep<max){wkMsg([_Map,map2]);}else{dStep=0,max=0;}},true);F=function(){return _Log;};F.run=function(maxStep){maxStep=/^[1-9](?:[0-9]+)?$/.test(maxStep)?maxStep:1;max=maxStep;wkMsg([P.innerHTML.replace(/<br>/g,'@'),map2]);};F.stat=function(){if(!!_Log.map1){var S=[0,0,0,0,0,0,0,0,0,0],L=_Log.map1.replace(/@/,''),n=L.length,i=0;while(i<n){S[L[i]]+=1,i+=1;}_Log.stat=S;return S;}};return F;}function imgMap(canvasId){canvasId=!canvasId?'img2Map_cvs':canvasId;var slf=window,r9=slf.Math.random().toFixed(9).replace(/\./g,''),cvs=slf.document.getElementById(canvasId),c,bd,_Log={canvasId:canvasId,inputMap:undefined,mapImage:undefined,outputMap:undefined,abcd:undefined},W=0,H=0,f,F,spt,B,U,Wk,colorChart;f=function(elName,elId,targetId){var t=slf.document.getElementById(targetId),E=slf.document.createElement(elName);E.id=elId;return t.appendChild(E);};if(!cvs){bd=slf.document.getElementsByTagName('body')[0],bd.id='bd'+r9;cvs=f('canvas',canvasId,bd.id),bd.removeAttribute('id');}c=cvs.getContext('2d');F=function(){return _Log;};F.reset=function(){_Log.canvasId=canvasId,_Log.inputMap=undefined,_Log.mapImage=undefined,_Log.outputMap=undefined,_Log.abcd=undefined;};F.map2Cvs=function(map){map=!map?colorChart:map;var d=map.split(/@/),img;W=d[0].length,H=d.length;cvs.width=W,cvs.height=H;img=c.createImageData(W,H);spt=['var slf=this,i=0,j=0,W='+W+',H='+H+',arr=[],Rank=[0,26,76,102,127,153,178,204,229,255],d;','slf.addEventListener(\'message\',function(e){d=e.data.split(/@/);','while(i<H){j=0;','while(j<W){if(Rank[d[i][j]]>0){arr.push(Rank[d[i][j]]),arr.push(0),arr.push(255-Rank[d[i][j]]),arr.push(255);}else{arr.push(0),arr.push(0),arr.push(0),arr.push(0);}j+=1;}','i+=1;}','slf.postMessage(arr);slf=i=j=W=H=arr=Rank=d=null;},true);'].join('');B=new Blob([spt],{type:'text/javascript'});U=slf.URL.createObjectURL(B);Wk=new Worker(U);slf.window.URL.revokeObjectURL(U);Wk.addEventListener('message',function(e){img.data.set(e.data);c.putImageData(img,0,0),_Log.inputMap=map,_Log.mapImage=cvs.toDataURL();spt=B=U=Wk=null;},true);Wk.addEventListener('error',function(e){console.log(e.message);},true);Wk.postMessage(map);};F.cvs2Map=function(abcd){abcd=/^[01]{4}$/.test(abcd)?abcd:'1110';W=cvs.width,H=cvs.height,_Log.abcd=abcd;spt=['var slf=this,i=0,j=0,W='+W+',H='+H+',d,map=\'\',','v255s='+abcd[0]+abcd[1]+abcd[2]+abcd[3]+'*255;','v255s='+abcd[0]+'*255+'+abcd[1]+'*255+'+abcd[2]+'*255+'+abcd[3]+'*255;','f=function(A,idx){var v=+('+abcd[0]+'*A[idx]+'+abcd[1]+'*A[idx+1]+'+abcd[2]+'*A[idx+2]+'+abcd[3]+'*A[idx+3])/v255s;','return v>0.1?(v>0.2?(v>0.3?(v>0.4?(v>0.5?(v>0.6?(v>0.7?(v>0.8?(v>0.9?9:8):7):6):5):4):3):2):1):0;};','slf.addEventListener(\'message\',function(e){d=e.data;','while(i<4*W*H){j=0;','while(j<4*W){map+=f(d,i+j),j+=4;}','map+=(i<4*W*(H-1))?\'@\':\'\',i+=4*W;}','slf.postMessage(map);slf=i=j=W=H=v255s=f=d=map=null;},true);'].join('');B=new Blob([spt],{type:'text/javascript'});U=slf.URL.createObjectURL(B);Wk=new Worker(U);slf.window.URL.revokeObjectURL(U);Wk.addEventListener('message',function(e){_Log.outputMap=e.data;spt=B=U=Wk=null;},true);Wk.addEventListener('error',function(e){console.log(e.message);},true);Wk.postMessage(c.getImageData(0,0,W,H).data);};return F;}
    /*nXmGen.js: Copyright (c) 2017 Yuji SODE <yuji.sode@gmail.com> This software is released under the MIT License.*/
    function nXmGen(n,m,max){m=(m!=undefined)?m:n;max=(max!=undefined)?max:1;m=/^[1-9](?:[0-9]+)?$/.test(m)?m:n;max=/^[0-9]$/.test(max)?max:1;var i=0,j=0,arr=[];while(i<m){j=0,arr[i]='';while(j<n){arr[i]+=Math.floor((max+1)*Math.random());j+=1;}i+=1;}return arr;}
}(30));
/*
*          MIT License
*
* Copyright (c) 2017 Yuji Sode
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:

* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/