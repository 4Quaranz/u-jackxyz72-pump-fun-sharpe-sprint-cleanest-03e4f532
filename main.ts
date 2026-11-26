// Steady Scalper — a risk-first paper-trading bot for the pump.fun Sharpe Sprint.
//
// The grader runs `node /bot/main.ts` with this directory mounted at /bot. The strategy
// lives in strategy.ts; the SDK shim is the kit's sdk/ts/makefun-bot.ts, vendored byte
// for byte under vendor/. Paper trading only: the replay uses market data, never real
// funds. See STRATEGY.md for the full reasoning.

import { runBot } from './vendor/makefun-bot.ts';
import { createScalper, DEFAULT_PARAMS } from './strategy.ts';

await runBot(createScalper(DEFAULT_PARAMS));
