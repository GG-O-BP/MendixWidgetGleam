#!/usr/bin/env node
import { main } from "../src/index.mjs";

await main(process.argv.slice(2));
