import integrationTest from 'parser/core/tests/integrationTest';
import path from 'path';

import CombatLogParser from '../CombatLogParser';

describe(
  'Havoc Demon Hunter integration test',
  integrationTest(CombatLogParser, path.resolve(__dirname, 'havoc-demon-hunter-example.zip')),
);
