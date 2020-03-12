Hitori (ひとりにしてくれ)
========

### [Play Now &rarr;](https://m4d4rchy.github.io/hitori/)

![](img/1.png)


How to play?
------------------
Hitori is played with a grid of squares or cells, with each cell initially containing a number. The game is played by eliminating squares/numbers and this is done by blacking them out. 

The objective is to transform the grid to a state wherein all three following rules are true:

1. No row or column can have more than one occurrence of any given number.
2. Black cells cannot be adjacent, although they can be diagonal to one another.
3. The remaining numbered cells must be all connected to each other, horizontally or vertically.


Game modes
------------------
Semi-random: Three grids already written in the code and one is taken randomly.

Full-random: Every cells of the grid are generated randomly (My algorithm is very basic so you could get unachievable grid)

Import custom grid
------------------
Use ```grid_template.txt``` as example

```
# Numbers on the grid(size=5x5)
3344545132342145354152543

# Solution
0101000000100010010010010
```
