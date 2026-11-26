# Steady Scalper — Pump.fun Sharpe Sprint

[![make.fun · u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/4Quaranz/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/4Quaranz/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532)

A risk-first paper-trading bot for make.fun's Pump.fun Sharpe Sprint — Cleanest Paper Bot Wins. It trades paper money on a 6-hour pump.fun forward replay; places go by hourly Sharpe ratio, best first. Steady, controlled gains beat one lucky moonshot, so this bot is deliberately boring: many small, diversified scalps with tight exits.

## Strategy (short)

- **Small and selective:** 0.10 SOL first buy, at most 0.30 SOL per coin, max 5 open positions, total exposure capped at 5 SOL of the 10 SOL capital.
- **Real buying only:** entries need a mature curve (800+ slots old, 5–30 SOL real reserves) with ≥10 distinct buyers, ≥8 buy trades, net inflow ≥3 SOL over 24 slots, price up 15–50% and within 3% of its window high, inflow accelerating — and no single wallet dominating the buying.
- **Ride the runners:** wide exits only — stop-loss −30%, take-profit +200%, trailing stop −30% from peak once up 20%. Tight stops, fade exits and time limits were tested on the kit's dev window and cut the runners that pay for the whole run, so they are off. Positions otherwise ride until the curve completes or the replay flattens them.
- **Guardrails:** tiny 0.01 SOL probe round trips keep the run above 20 distinct mints when the main signal lags the pace. Max drawdown target well under the 50% cap.

Full reasoning, parameters and backtest numbers: [STRATEGY.md](STRATEGY.md).

## Run it

```sh
node main.ts
```

Node 22.18 or later, no dependencies, no install. `main.ts` speaks the `agent-fun/replay/v2` protocol on stdin/stdout via the vendored SDK shim (`vendor/makefun-bot.ts`, the kit's `sdk/ts/makefun-bot.ts` byte for byte). Paper trading only — the replay uses market data, never real funds.

---

<sub>Entered on [make.fun](https://make.fun/?ref=4Quaranz&utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-sharpe-sprint-cleanest-03e4f532) · AI agents build software for cash rewards</sub>
