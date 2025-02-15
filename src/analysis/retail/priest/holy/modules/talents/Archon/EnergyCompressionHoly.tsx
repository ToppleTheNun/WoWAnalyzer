import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';
import { Options } from 'parser/core/Module';
import Combatants from 'parser/shared/modules/Combatants';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import TalentSpellText from 'parser/ui/TalentSpellText';
import ItemPercentHealingDone from 'parser/ui/ItemPercentHealingDone';
import ItemPercentDamageDone from 'parser/ui/ItemPercentDamageDone';
import { TALENTS_PRIEST } from 'common/TALENTS';
import Events, { DamageEvent, HealEvent } from 'parser/core/Events';
import { calculateEffectiveDamage, calculateEffectiveHealing } from 'parser/core/EventCalculateLib';
import SPELLS from 'common/SPELLS';
import SpellLink from 'interface/SpellLink';
import PRIEST_TALENTS from 'common/TALENTS/priest';
import { ENERGY_COMPRESSION_AMP } from './ArchonValues';

class EnergyCompressionHoly extends Analyzer {
  static dependencies = {
    combatants: Combatants,
  };

  protected combatants!: Combatants;

  totalEnergyCompressionHealing = 0;
  totalArchonHaloDamage = 0;

  constructor(options: Options) {
    super(options);

    this.active = this.selectedCombatant.hasTalent(TALENTS_PRIEST.ENERGY_COMPRESSION_TALENT);

    this.addEventListener(
      Events.heal.by(SELECTED_PLAYER).spell(SPELLS.HALO_HEAL),
      this.handleHaloHealing,
    );

    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER).spell(SPELLS.HALO_DAMAGE),
      this.handleHaloDamage,
    );
  }

  handleHaloHealing(event: HealEvent) {
    this.totalEnergyCompressionHealing += calculateEffectiveHealing(event, ENERGY_COMPRESSION_AMP);
  }

  handleHaloDamage(event: DamageEvent) {
    this.totalArchonHaloDamage += calculateEffectiveDamage(event, ENERGY_COMPRESSION_AMP);
  }

  get energyCompressionDamage() {
    return this.totalArchonHaloDamage;
  }

  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL(99)}
        size="flexible"
        category={STATISTIC_CATEGORY.HERO_TALENTS}
        tooltip={
          <>
            <small>
              This number is included in the <SpellLink spell={PRIEST_TALENTS.DIVINE_HALO_TALENT} />
              /<SpellLink spell={PRIEST_TALENTS.POWER_SURGE_TALENT} /> results already.
            </small>
          </>
        }
      >
        <TalentSpellText talent={TALENTS_PRIEST.ENERGY_COMPRESSION_TALENT}>
          <div>
            <ItemPercentHealingDone amount={this.totalEnergyCompressionHealing} />
          </div>
          <div>
            <ItemPercentDamageDone amount={this.energyCompressionDamage} />{' '}
          </div>
        </TalentSpellText>
      </Statistic>
    );
  }
}

export default EnergyCompressionHoly;
