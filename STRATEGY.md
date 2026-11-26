# STRATEGY.md — Steady Scalper

## What the ranking rewards

Places go by **hourly Sharpe ratio** on a 6-hour pump.fun forward replay, and a
placement reward needs net PnL above holding cash (above 0 after every fee).
Sharpe punishes variance: a bot that grinds out small steady gains outranks a bot
that moons once and bleeds the rest of the window. So this bot optimises for a
smooth equity curve, not for maximum PnL: selective entries, small stakes, and
wide exits that let a few runners pay for many small losers.

## The idea

1. **Diversify into a few selective scalps.** First buy 0.10 SOL, pyramid adds
   of 0.10 SOL only into strength, at most 0.30 SOL per coin. Max 5 open
   positions, total exposure capped at 5 SOL of the 10 SOL capital. One bad
   coin can cost at most ~0.30 SOL.
2. **Enter only on broad, accelerating buying.** A curve must be 800+ slots old
   (past its launch dump), hold 5–30 SOL of real reserves, and show over the
   last 24 slots: net inflow ≥ 3 SOL, ≥ 8 buy trades, ≥ 10 distinct buyers,
   price up 15–50% and within 3% of its window high, with the second half of
   the window flowing in faster than the first. A single wallet may not account
   for more than 60% of the window's buying — that is a pump, not a crowd.
3. **Ride the runners; exits are wide on purpose.** A position is sold whole on
   the first of: stop-loss −30% vs cost, take-profit +200% vs cost, or a
   trailing stop −30% from peak (armed once up 20%). Fade, big-dump and
   time-limit exits are off. This was not assumed — it was measured: on the
   kit's dev window, tight stops (−8/−12%), fade exits and 300–900-slot time
   limits all lost money (−0.35 to −0.96 SOL), while holding with wide exits
   made +0.16 to +1.15 SOL across the whole neighbourhood of nearby settings
   (stop −25% to −40%, trail −25% to −35%, first buy 0.08–0.125 SOL), so the
   result is a flat region, not a single tuned spike. Positions otherwise ride
   until the curve completes or the replay flattens them.
4. **Guardrail pacing.** The run must end with round trips of ≥ 0.01 SOL on
   ≥ 20 distinct mints, and max drawdown ≤ 50%. When the bot's own fills or
   coins lag the pace implied by elapsed block time, it opens tiny 0.01 SOL
   probe round trips on liquid curves and sells them as soon as the buy lands.
   Probes cost a little in fees; missing the guardrail costs the ranking.
5. **Deterministic.** No clock, no environment, no randomness. Iteration only
   over insertion-ordered maps fed by the batch stream, so the grader's two
   executions produce byte-identical action logs.

## Costs per trade

Each order pays the curve fees (~0.95% protocol + ~0.30% creator on the traded
amount) plus 105,000 lamports of transaction fees (5,000 base + 100,000
priority), and ~2% of orders fail and still pay the transaction fee. A 0.10 SOL
scalp therefore needs roughly +3% just to break even — the entry filter (15%
minimum rise already in motion) only takes curves that are moving, and the
wide exits let a runner cover many small losers.

## Files

- `main.ts` — entrypoint: runs the strategy through the SDK shim.
- `strategy.ts` — the whole strategy (entry signal, exits, pyramid, probes).
- `vendor/makefun-bot.ts` — the kit's `sdk/ts/makefun-bot.ts`, byte for byte.
- `STRATEGY.md` — this dossier.

## Local backtest

Run against the kit's frozen dev window with the kit's own local simulator
(`baselines/pilot/momentum/tools/sim.ts`, the house's engine port). Numbers are
recorded in `result.json` at the parent level of this workspace (see the
coordinator's report), not in this repo: the dev window is a small sample, not a
forecast — the final window is 6 hours of fresh pump.fun data collected after
entries close.
