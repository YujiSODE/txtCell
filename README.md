# txtCell
the interface for text based Cellular Automaton.  
https://github.com/YujiSODE/txtCell

>Copyright (c) 2017 Yuji SODE \<yuji.sode@gmail.com\>  
>This software is released under the MIT License.  
>See LICENSE or http://opensource.org/licenses/mit-license.php
______

## Scripts and map data format
### Scripts
1. `txtCell.js`: `function txtCell(wkScrpt,dataName,map1,map2)`
2. `imgMap.js`: `function imgMap(canvasId)`
3. `txtCell_lifeGame.js`: Web Worker interface for Cellular Automaton.
4. `txtCell_growingLifeGame.js`: Web Worker interface for Cellular Automaton.
### Map data format
Map data:`'xxx...x@xxx...x@...'`;`x` is integer between 0 to 9.
