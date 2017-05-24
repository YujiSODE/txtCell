# txtCell ![growingLifeGame_SS20170522_tri.png](https://cloud.githubusercontent.com/assets/19919184/26339311/1147321c-3fc2-11e7-87ee-54346ac74e91.png)  
the interface for text based Cellular Automaton.  
https://github.com/YujiSODE/txtCell  
wiki: https://github.com/YujiSODE/txtCell/wiki

>Copyright (c) 2017 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

### Scripts
1. [`txtCell.js`](#1txtcelljs): the interface for text based Cellular Automaton.
2. [`imgMap.js`](#2imgmapjs): the interface to convert "map data" into canvas "image" or canvas "image" into "map data".
3. [`txtCell_lifeGame.js` and `txtCell_growingLifeGame.js`](#3txtcell_lifegamejs-and-txtcell_growinglifegamejs): Web Worker interfaces for Cellular Automaton.
### Map data format
Map data:`'xxx...x@xxx...x@...'`;`x` is integer between 0 to 9.

### 1.`txtCell.js`
The interface for text based Cellular Automaton.
#### Function
`function txtCell(wkScrpt[,dataName][,map1][,map2])`  
Parameters  
- `wkScrpt`: a filename of a script for Web Worker.
- [optional] `dataName`: name of a data set. timestamp is default value.
- [optional] `map1` and `map2`: map data. random map with 0 or 1 (n x n data) is default value.

Returned function  
- `function()`: function that returns Log object.  
    Log object has following values:  
    - `map0`: initial data map.
    - `map1`: the current data map.
    - `map2`: additional data map.
    - `step`: the current step.
    - `dataName`: name of a data set. timestamp is default value.
    - `stat`: counted results expressed as an array. n-th element shows number of n. initial value is [0,0,0,0,0,0,0,0,0,0].  
    
Method of returned function  
- `function run(maxStep)`: it simulates only `maxStep` steps. 1 is default value.
- `function stat()`: method to count result data of 0 to 9:`map1` in Log object. Returned value is an array; n-th element shows number of n.

### 2.`imgMap.js`
The interface to convert "map data" into canvas "image" or canvas "image" into "map data".
#### Function
`function imgMap(canvasId)`  
Parameters  
- canvasId: id of canvas tag; canvas tag is generated when there is not target tag.

Returned function  
- `function()`: function that returns Log Object.  
  Log object has following values:  
  - `canvasId`: id of target canvas tag.  
    \-----------------------------------
  - `inputMap`: input data map for method `map2Cvs(map)`.
  - `mapImage`: data URI for input data map with method `map2Cvs(map)`.  
    \-----------------------------------
  - `outputMap`: output data map with method `cvs2Map(abcd)`.
  - `abcd`: parameters to convert image into mapdata with method `cvs2Map(abcd)`.  
    v=f(RGBa-value)=a*R+b*G+c*B+d*a.  
    
Method of returned function  
- `function reset()`: method to reset Log Object.
- `function map2Cvs(map)`: method to convert map data into canvas image; map is map data.  
  "color chart" between blue(1) and red(9), and 0 is default output.  
  ![color chart](https://cloud.githubusercontent.com/assets/19919184/26056778/be02ef80-39b1-11e7-88e9-3b07b013c6b8.png)  
  **Figure 1. color chart.**
- `function cvs2Map(abcd)`: method to convert canvas image into map data.  
  `abcd` is a text expressing values a, b, c, and d that satisfies v=f(RGBa-value)=a*R+b*G+c*B+d*a;  
  e.g., "1011" means v=1*R+0*G+1*B+1*a. "1110" is default value.  

### 3.`txtCell_lifeGame.js` and `txtCell_growingLifeGame.js`
Web Worker interfaces for Cellular Automaton.  
- "Conway's Game of Life":`txtCell_lifeGame.js`  
  **Rule of "Conway's Game of Life"**  
  `[surrounding sum:012345678]`  
  `[_current cell=0:000100000]`  
  `[_current cell=1:001100000]`  
  
- "Growing life game":`txtCell_growingLifeGame.js`  
  Growing life game is based on "Conway's Game of Life".  
  A living cell grows from 1 to 9 by step. An additional map can be used  for limiting area;  
  a cell with value of 0 in additional map is not habitable in this life game.  
  **Rule of "Growing life game"**  
  `[surrounding sum:012345678]`  
  `[_current cell=0:000100000]`  
  `[_current cell=1:002200000]`  
  `...`  
  `[_current cell=7:008800000]`  
  `[_current cell=8:009900000]`  
  `[_current cell=9:009900000]`  
  A cell with value of 9 means that it has lasted for 9 or more steps.  
  A cell with value 0 in additional map will be 0 if additional is available.
