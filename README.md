# txtCell
the interface for text based Cellular Automaton.  
https://github.com/YujiSODE/txtCell

>Copyright (c) 2017 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

### Scripts
1. `txtCell.js`: the interface for text based Cellular Automaton.
2. `imgMap.js`: the interface to convert "map data" into canvas "image" or canvas "image" into "map data".
3. `txtCell_lifeGame.js` and `txtCell_growingLifeGame.js`: Web Worker interfaces for Cellular Automaton.
### Map data format
Map data:`'xxx...x@xxx...x@...'`;`x` is integer between 0 to 9.

### 1.`txtCell.js`
The interface for text based Cellular Automaton.
#### Function
`function txtCell(wkScrpt[,dataName][,map1][,map2])`  
Parameters
- wkScrpt: a filename of a script for Web Worker.
- [optional] dataName: name of a data set. timestamp is default value.
- [optional] map1 and map2: map data. random map with 0 or 1 (n x n data) is default value.

Returned function  
- function(): function that returns Log object.  
    Log object has following values:  
    - map0: initial data map.
    - map1: the current data map.
    - map2: additional data map.
    - step: the current step.
    - dataName: name of a data set. timestamp is default value.
    - stat: counted results expressed as an array. n-th element shows number of n. initial value is [0,0,0,0,0,0,0,0,0,0].  
    
Method of returned function  
- function run(maxStep): it simulates only "maxStep" steps. 1 is default value.
- function stat(): method to count result data of 0 to 9: map1 in Log object. Returned value is an array; n-th element shows number of n.

### 2.`imgMap.js`
The interface to convert "map data" into canvas "image" or canvas "image" into "map data".
#### Function
`function imgMap(canvasId)`

### 3.`txtCell_lifeGame.js` and `txtCell_growingLifeGame.js`
Web Worker interfaces for Cellular Automaton.  
- "Conway's Game of Life":`txtCell_lifeGame.js`  
  Rule of "Conway's Game of Life"  
  `[surrounding sum:012345678]`  
  `[_current cell=0:000100000]`  
  `[_current cell=1:001100000]`  
  
- "Growing life game":`txtCell_growingLifeGame.js`  
  Growing life game is based on "Conway's Game of Life". A living cell grows from 1 to 9 by step.  
  Rule of "Growing life game"  
  `[surrounding sum:012345678]`  
  `[_current cell=0:000100000]`  
  `[_current cell=1:002200000]`  
  `...`  
  `[_current cell=7:008800000]`  
  `[_current cell=8:009900000]`  
  `[_current cell=9:009900000]`  
  A cell with value of 9 means that it has lasted for 9 or more steps.  
  
