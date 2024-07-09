import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS/demonhunter';
import { SpellLink } from 'interface';
import { ThresholdStyle, When } from 'parser/core/ParseResults';
import CoreAlwaysBeCasting from 'parser/shared/modules/AlwaysBeCasting';
import {
  FELBLADE_TALENT,
  THE_HUNT_TALENT,
  VENGEFUL_RETREAT_TALENT,
} from 'common/TALENTS/demonhunter';

class AlwaysBeCasting extends CoreAlwaysBeCasting {
  get suggestionThresholds() {
    return {
      actual: this.downtimePercentage,
      isGreaterThan: {
        minor: 0.15,
        average: 0.25,
        major: 0.35,
      },
      style: ThresholdStyle.PERCENTAGE,
    };
  }

  suggestions(when: When) {
    const boss = this.owner.boss;

    if (!boss || !boss.fight.disableDowntimeSuggestion) {
      when(this.suggestionThresholds).addSuggestion((suggest, actual, recommended) =>
        suggest(
          <>
            Your downtime can be improved. Try to Always Be Casting (ABC), try to reduce the delay
            between casting spells. Even if you have to move, use your movement spells like{' '}
            <SpellLink spell={SPELLS.FEL_RUSH_CAST} />, <SpellLink spell={FELBLADE_TALENT} icon />,{' '}
            <SpellLink spell={THE_HUNT_TALENT} icon />
            or <SpellLink spell={VENGEFUL_RETREAT_TALENT} icon /> to quickly get back to the boss.
          </>,
        )
          .icon('spell_mage_altertime')
          .actual(`${formatPercentage(actual)}% downtime`)
          .recommended(`<${formatPercentage(recommended)}% is recommended`),
      );
    }
  }
}

export default AlwaysBeCasting;
