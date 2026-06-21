import { mergeTests } from '@playwright/test';
import { test as loginTest } from './login.fixture';

/**
 * Combines every per-module fixture into one `test`.
 * Use this only when a spec genuinely needs more than one module
 * (e.g. logging in, then asserting on the inventory page). For
 * single-module specs, import that module's fixture directly —
 * no need to drag every page object along for the ride.
 */
export const test = mergeTests(loginTest);
export { expect } from '@playwright/test';
