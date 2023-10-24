import { describe, expect, it } from 'vitest';
import { ApplyBuffEvent, EventType, RemoveBuffEvent } from 'parser/core/Events';
import { Info } from 'parser/core/metric';

import buffUptimeDistinct from './buffUptimeDistinct';

const applyBuffEvent = (spellId: number, others?: Partial<ApplyBuffEvent>): ApplyBuffEvent => ({
  type: EventType.ApplyBuff,
  ability: {
    guid: spellId,
    name: 'test',
    type: 1,
    abilityIcon: 'test',
  },
  sourceID: 1,
  sourceIsFriendly: true,
  targetID: 2,
  targetIsFriendly: false,
  timestamp: 0,
  ...others,
});
const removeBuffEvent = (spellId: number, others?: Partial<RemoveBuffEvent>): RemoveBuffEvent => ({
  type: EventType.RemoveBuff,
  ability: {
    guid: spellId,
    name: 'test',
    type: 1,
    abilityIcon: 'test',
  },
  sourceID: 1,
  sourceIsFriendly: true,
  targetID: 2,
  targetIsFriendly: false,
  timestamp: 0,
  ...others,
});

describe('buffUptimeDistinct', () => {
  const info: Pick<Info, 'playerId' | 'fightStart' | 'fightEnd'> = {
    playerId: 1,
    fightStart: 0,
    fightEnd: 1000,
  };

  it('starts at zero', () => {
    expect(buffUptimeDistinct([], info, 1)).toEqual(0);
  });
  it('ignores other buffs', () => {
    expect(buffUptimeDistinct([applyBuffEvent(2)], info, 1)).toEqual(0);
  });
  it('calculates the duration for a single application', () => {
    expect(
      buffUptimeDistinct(
        [applyBuffEvent(1, { timestamp: 200 }), removeBuffEvent(1, { timestamp: 350 })],
        info,
        1,
      ),
    ).toEqual(150);
  });
  it('calculates distinct stacked time', () => {
    expect(
      buffUptimeDistinct(
        [
          applyBuffEvent(1, { timestamp: 200 }),
          applyBuffEvent(1, { timestamp: 200, targetID: 3 }),
          removeBuffEvent(1, { timestamp: 350 }),
          removeBuffEvent(1, { timestamp: 350, targetID: 3 }),
        ],
        info,
        1,
      ),
    ).toEqual(150);
    expect(
      buffUptimeDistinct(
        [
          applyBuffEvent(1, { timestamp: 180 }),
          applyBuffEvent(1, { timestamp: 200, targetID: 3 }),
          removeBuffEvent(1, { timestamp: 350 }),
          removeBuffEvent(1, { timestamp: 370, targetID: 3 }),
        ],
        info,
        1,
      ),
    ).toEqual(190);
  });
  it('treats the fight end as buff end if removebuff event is missing', () => {
    expect(buffUptimeDistinct([applyBuffEvent(1, { timestamp: 200 })], info, 1)).toEqual(800);
  });
  it('treats the fight start as buff start if applybuff event is missing', () => {
    expect(buffUptimeDistinct([removeBuffEvent(1, { timestamp: 800 })], info, 1)).toEqual(800);
  });
});
