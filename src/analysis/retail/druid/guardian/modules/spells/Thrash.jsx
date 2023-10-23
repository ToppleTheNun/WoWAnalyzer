import { defineMessage } from '@lingui/macro';
import { formatPercentage } from 'common/format';
import SPELLS from 'common/SPELLS';
import { SpellLink, SpellIcon } from 'interface';
import Analyzer from 'parser/core/Analyzer';
import Enemies from 'parser/shared/modules/Enemies';
import BoringValueText from 'parser/ui/BoringValueText';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';

class Thrash extends Analyzer {
  static dependencies = {
    enemies: Enemies,
  };

  suggestions(when) {
    const thrashUptimePercentage =
      this.enemies.getBuffUptime(SPELLS.THRASH_BEAR_DOT.id) / this.owner.fightDuration;

    when(thrashUptimePercentage)
      .isLessThan(0.95)
      .addSuggestion((suggest, actual, recommended) =>
        suggest(
          <span>
            {' '}
            Your <SpellLink spell={SPELLS.THRASH_BEAR_DOT} /> uptime was{' '}
            {formatPercentage(thrashUptimePercentage)}%, unless you have extended periods of
            downtime it should be near 100%. <br />
            Thrash applies a bleed which buffs the damage of{' '}
            <SpellLink spell={SPELLS.MANGLE_BEAR} /> by 20%. Thrash uptime is especially important
            if you are talented into <SpellLink spell={SPELLS.REND_AND_TEAR_TALENT} />, since it
            buffs the rest of your damage and gives you extra damage reduction.
          </span>,
        )
          .icon(SPELLS.THRASH_BEAR.icon)
          .actual(
            defineMessage({
              id: 'druid.guardian.suggestions.thrash.uptime',
              message: `${formatPercentage(thrashUptimePercentage)}% uptime`,
            }),
          )
          .recommended(`${Math.round(formatPercentage(recommended))}% is recommended`)
          .regular(recommended - 0.05)
          .major(recommended - 0.15),
      );
  }

  statistic() {
    const thrashUptimePercentage =
      this.enemies.getBuffUptime(SPELLS.THRASH_BEAR_DOT.id) / this.owner.fightDuration;

    return (
      <Statistic position={STATISTIC_ORDER.CORE(11)} size="flexible">
        <BoringValueText
          label={
            <>
              <SpellIcon spell={SPELLS.THRASH_BEAR} /> Thrash uptime{' '}
            </>
          }
        >
          {`${formatPercentage(thrashUptimePercentage)}%`}
        </BoringValueText>
      </Statistic>
    );
  }
}

export default Thrash;
