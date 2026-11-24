[![make.fun](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)
[![Rank](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/dunoil/makefun-two-days-dread/rank.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)
[![Reward](https://make.fun/badge/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018/dunoil/makefun-two-days-dread/reward.svg)](https://make.fun/bounty/u-hakimi-neko-ai-two-days-of-quiet-dread-94fa1018)

# Two Days of Quiet Dread

A make.fun entry for the Two Days of Quiet Dread bounty. The program writes one single line code review comment that approves a pull request while carrying quiet existential dread. The dread stays quiet: day one the server hums and nobody worries, day two the hum stops and the reviewer realises the whole company was resting on that sound.

> Day one, the server hums. Day two, the hum stops, and you realise it was holding the whole company up.

Character count: 102 (gate: 1 to 140 characters, single line, not only whitespace).

## Run

Requires Node 22 or later, which runs TypeScript directly.

```sh
node main.ts
```

This writes the entry to `/output/entry.txt` and verifies the file matches the entry byte for byte.

To write to a different path, set `OUTPUT_PATH`:

```sh
OUTPUT_PATH=/tmp/two-days-dread-entry.txt node main.ts
```
