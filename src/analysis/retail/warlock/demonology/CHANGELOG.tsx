import { change, date } from 'common/changelog';
import SPELLS from 'common/SPELLS';
import { TALENTS_WARLOCK } from 'common/TALENTS';
import { Arlie, dodse, Jonfanz, Mae, Meldris, Sharrq, ToppleTheNun, Zeboot } from 'CONTRIBUTORS';
import { SpellLink } from 'interface';

export default [
  change(date(2023, 7, 31), <>Add support for Aberrus 2set CDR on <SpellLink spell={TALENTS_WARLOCK.GRIMOIRE_FELGUARD_TALENT} /></>, Arlie),
  change(date(2023, 7, 31), 'Update CDR on Dark Pact and Unending Resolve', Arlie),
  change(date(2023, 7, 8), 'Update SpellLink usage.', ToppleTheNun),
  change(date(2023, 7, 8), "Removed Demonic Circle use tracker in utility and defensive spells", Meldris),
  change(date(2023, 6, 29), "Updated ABOUT with current guide links", Meldris),
  change(date(2023, 3, 9), "Update Soul Conduit to take into account being a 2 rank talent and different scaling", dodse),
  change(date(2023, 1, 4), "Add support for Shadow's Bite and Dread Calling talents", Mae),
  change(date(2022, 12, 29), 'Add support for Fel Covenant and 4 piece set bonus', Mae),
  change(date(2022, 12, 15), 'Fix crash caused by no Power Siphon casts being present in a log.', ToppleTheNun),
  change(date(2022, 10, 18), 'Update spec for Dragonflight', Jonfanz),
  change(date(2022, 7, 22), <>Add tracker for number of <SpellLink spell={SPELLS.DEMONIC_CIRCLE_SUMMON} /> created.</>, ToppleTheNun),
  change(date(2020, 10, 18), 'Converted legacy listeners to new event filters', Zeboot),
  change(date(2020, 10, 15), 'Updated Spellbook and added Conduit, Legendary, and Covenant Spell IDs', Sharrq),
  change(date(2020, 10, 2), 'Deleted Azerite Traits, Updated Statistic Boxes and added Integration Tests.', Sharrq),
];
