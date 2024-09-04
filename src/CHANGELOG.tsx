import { change, date } from 'common/changelog';
import ITEMS from 'common/ITEMS';
import SPELLS from 'common/SPELLS';
import CLASSIC_SPELLS from 'common/SPELLS/classic';
import {
  Abelito75,
  Arbixal,
  Arlie,
  Awildfivreld,
  Bigsxy,
  dub,
  Earosselot,
  emallson,
  Ethelis,
  HerzBlutRaffy,
  jazminite,
  Jundarer,
  Lapideas,
  LucasLevyOB,
  nullDozzer,
  Pilsung,
  Putro,
  Seriousnes,
  Sref,
  Tialyss,
  ToppleTheNun,
  Trevor,
  Vohrr,
  Vollmer,
  ZiayaKens,
  Zyer,
} from 'CONTRIBUTORS';
import { ItemLink } from 'interface';
import SpellLink from 'interface/SpellLink';

// prettier-ignore
export default [
  change(date(2024, 9, 3), 'Remove AbilitiesMissing module.', ToppleTheNun),
  change(date(2024, 8, 30), 'Update Classic Spells, Potions, and Trinkets for Cata Disc Priest.', jazminite),
  change(date(2024, 8, 28), "Update rating to percentage conversions for stats for The War Within.", Putro),
  change(date(2024, 8, 26), <>Add <SpellLink spell={CLASSIC_SPELLS.FLEXWEAVE_UNDERLAY} /> support to Cataclysm Classic specs.</>, jazminite),
  change(date(2024, 8, 25), 'Remove Redux reducer that stored the entire report under analysis.', ToppleTheNun),
  change(date(2024, 8, 22), 'Update Druid spells for Classic Cataclysm', jazminite),
  change(date(2024, 8, 13), 'Add patch 11.0.2.', ToppleTheNun),
  change(date(2024, 8, 10), <>Implement buffAndNextCastChannelSpec for channeling normalizer</>, Vollmer),
  change(date(2024, 8, 9), <>Fix the haste bonus of <SpellLink spell={SPELLS.BERSERKING.id} /> in Classic Cataclysm.</>, emallson),
  change(date(2024, 8, 7), 'Prepare for cleanup of Dragonflight items.', ToppleTheNun),
  change(date(2024, 8, 6), 'Update Priest spells for Classic Cataclysm', jazminite),
  change(date(2024, 8, 3), 'Update Engineering items for Classic Cataclysm', jazminite),
  change(date(2024, 8, 1), 'Load routes asynchronously.', ToppleTheNun),
  change(date(2024, 8, 1), 'Add Classic Cataclysm Phase 1 trinkets.', jazminite),
  change(date(2024, 7, 31), 'Fixed an issue where pre-pull channels could cause wildly incorrect Active Time value', Sref),
  change(date(2024, 7, 31), 'Fixed an issue with AlwaysBeCasting over counting channels.', Vollmer),
  change(date(2024, 7, 29), 'Fixed handling of not-found and private logs.', emallson),
  change(date(2024, 7, 27), "Fixed an issue where fully supported specs on spec list weren't displaying their maintainer.", Sref),
  change(date(2024, 7, 25), 'Fix partial support indication on spec list.', ToppleTheNun),
  change(date(2024, 7, 22), 'Update Paladin spells for Classic Cataclysm', Ethelis),
  change(date(2024, 7, 19), 'Update Racials for Classic Cataclysm', jazminite),
  change(date(2024, 7, 18), 'Clean up padding on specs with core support', emallson),
  change(date(2024, 7, 16), 'Fixed an issue where naturally regenerating resources were not showing correctly on resource graphs', Sref),
  change(date(2024, 7, 16), 'Update Shaman spells for Classic Cataclysm', jazminite),
  change(date(2024, 7, 15), 'Significantly improve loading time for M+ logs', emallson),
  change(date(2024, 7, 15), 'Migrate to pnpm instead of yarn v1.', ToppleTheNun),
  change(date(2024, 7, 15), 'Replace react-helmet with react-helmet-async.', ToppleTheNun),
  change(date(2024, 7, 10), 'Improve debugging information for Global Cooldown tracking', emallson),
  change(date(2024, 7, 8), 'Rewrite Premium page in TypeScript.', ToppleTheNun),
  change(date(2024, 7, 7), 'Add NPC abilities on the timeline module', ZiayaKens),
  change(date(2024, 7, 6), 'Update Foundation Guides to use div instead of p (DOM warnings)', jazminite),
  change(date(2024, 7, 5), <>Update Haste and GCD tracking for Classic.</>, emallson),
  change(date(2024, 7, 4), 'Update Mage spells for Classic Cataclysm', jazminite),
  change(date(2024, 6, 21), <>Add <SpellLink spell={CLASSIC_SPELLS.SYNAPSE_SPRINGS} /> support to Cataclysm Classic specs.</>, emallson),
  change(date(2024, 6, 17), 'Add some TWW patch data.', ToppleTheNun),
  change(date(2024, 6, 16), <>Add T32 tier set ids</>, Trevor),
  change(date(2024, 6, 16), <>Add hero talents statistic category</>, Trevor),
  change(date(2024, 6, 14), <>Update max mana in Core ManaTracker</>, Vohrr),
  change(date(2024, 6, 8), <>Include the channel of <SpellLink spell={SPELLS.RAGE_OF_FYRALATH_1} /> in timelines and reflect uptime better.</>, nullDozzer),
  change(date(2024, 6, 7), 'Update Classic Potions for Cataclysm', jazminite),
  change(date(2024, 6, 6), 'Temporary workaround for talent breakage on the character parses page. Talents have been disabled for the moment.', emallson),
  change(date(2024, 6, 5), 'Update Classic Food Buffs for Cataclysm', jazminite),
  change(date(2024, 6, 3), 'Update Classic Flasks for Cataclysm', jazminite),
  change(date(2024, 6, 3), 'Update event meta usage.', ToppleTheNun),
  change(date(2024, 5, 31), 'Update Classic Enchants for Cataclysm', jazminite),
  change(date(2024, 5, 31), "Add Cataclysm patch 4.4.0.", Putro),
  change(date(2024, 5, 28), 'Add Cataclysm boss images and raid zones', emallson),
  change(date(2024, 5, 22), 'Update k-values for Dragonflight S4.', ToppleTheNun),
  change(date(2024, 5, 22), 'Update GitHub Actions versions.', ToppleTheNun),
  change(date(2024, 5, 6), 'Add patch 10.2.7.', ToppleTheNun),
  change(date(2024, 5, 6), <>Add simple damage mitigated statistic for <ItemLink id={ITEMS.ENDURING_DREADPLATE.id} />.</>, ToppleTheNun),
  change(date(2024, 5, 3), 'Improve behavior of "Refresh" button', emallson),
  change(date(2024, 5, 3), 'Second pass at cleaning up dead code using knip', Putro),
  change(date(2024, 5, 2), 'Fix issue with boss detection', emallson),
  change(date(2024, 4, 26), 'Actually fix friendly/enemy determination', emallson),
  change(date(2024, 4, 22), 'Improve display of dense performance boxes', emallson),
  change(date(2024, 4, 24), 'Bump for season 4 start.', ToppleTheNun),
  change(date(2024, 4, 22), 'Clean up dead code using knip', Putro),
  change(date(2024, 4, 20), 'Fix friendly/enemy determination', emallson),
  change(date(2024, 4, 17), 'Add 10.2.7 patch.', ToppleTheNun),
  change(date(2024, 4, 12), 'Fix mana level chart', emallson),
  change(date(2024, 4, 10), 'Update paths used by Sentry.', ToppleTheNun),
  change(date(2024, 4, 10), 'Update dependencies.', ToppleTheNun),
  change(date(2024, 4, 9), 'Swap to Vite instead of create-react-app and use the WCL V2 API.', [ToppleTheNun, emallson]),
  change(date(2024, 4, 8), 'Fix handling of character parse lookup for Classic', emallson),
  change(date(2024, 4, 6), 'Update Channel normalizer to properly handle Empowers.', Vollmer),
  change(date(2024, 4, 5), 'Fix events tab omitting some events.', ToppleTheNun),
  change(date(2024, 3, 30), 'Update Nymue spellids and make Channeling normalizer normalize fabricated Prepull events.', Vollmer),
  change(date(2024, 3, 27), 'Rewrite events tab in TypeScript.', ToppleTheNun),
  change(date(2024, 3, 26), 'Add patch 10.2.6.', ToppleTheNun),
  change(date(2024, 3, 26), 'Add Dragonflight season 4 M+ dungeons and zone.', ToppleTheNun),
  change(date(2024, 3, 26), 'Remove support for Shadowlands tier sets.', ToppleTheNun),
  change(date(2024, 3, 26), 'Add tier set IDs for Dragonflight season 4.', ToppleTheNun),
  change(date(2024, 3, 22), 'Update Channeling normalizer to attach fabricated channel events to their associated cast events.', Vollmer),
  change(date(2024, 3, 17), <>Implement buffSoonPresent APL condition and fix chain cast issues with APL check.</>, Vollmer),
  change(date(2024, 3, 14), 'Correct getBuffStacks method to return the stacks at the given timestamp', Earosselot),
  change(date(2024, 3, 14), 'Fix overflow on cooldown bars while using the phase selector.', ToppleTheNun),
  change(date(2024, 3, 14), 'Bump opacity on phase selector to 75% from 40%.', ToppleTheNun),
  change(date(2024, 3, 13), 'Bump opacity on muted text to 75% from 47%.', ToppleTheNun),
  change(date(2024, 3, 2), 'Correct an issue with the Power Word: Radiance icon.', emallson),
  change(date(2024, 3, 2), 'Correct incorrect tertiary stat scaling above 25% raw and 19% character sheet rating', Putro),
  change(date(2024, 2, 26), <>Added checklist support for <ItemLink id={ITEMS.IRIDAL_THE_EARTHS_MASTER.id} />, <ItemLink id={ITEMS.DREAMBINDER_LOOM_OF_THE_GREAT_CYCLE.id} />, <ItemLink id={ITEMS.BELORRELOS_THE_SUNCALLER.id} />, <ItemLink id={ITEMS.NYMUES_UNRAVELING_SPINDLE.id} /></>, Zyer),
  change(date(2024, 2, 26), 'Switch icon source to the WCL CDN.', emallson),
  change(date(2024, 2, 18), <>Fix crash in QualitativePerformance</>, Trevor),
  change(date(2024, 2, 17), 'Add a missed realm for Classic.', Putro),
  change(date(2024, 2, 7), 'Inspect more stack trace lines for external script sources.', ToppleTheNun),
  change(date(2024, 2, 7), 'Mark 10.2.0 as an old patch.', ToppleTheNun),
  change(date(2024, 2, 7), 'Fix a crash caused by bad ads.', ToppleTheNun),
  change(date(2024, 1, 19), 'Fix Dreaming Devotion showing as a cheap enchant.', emallson),
  change(date(2024, 1, 17), 'Simplify raid types and fix M+ S3 icons not showing on fight selection.', ToppleTheNun),
  change(date(2024, 1, 16), 'Add Ruby Sanctum raid and images for Classic WotLK.', jazminite),
  change(date(2024, 1, 16), 'Add patch 10.2.5.', ToppleTheNun),
  change(date(2024, 1, 11), <>Add <ItemLink id={ITEMS.POTION_OF_WITHERING_DREAMS_R3.id} /> to healing potion list.</>, ToppleTheNun),
  change(date(2024, 1, 11), 'Update k-values for 10.2.', ToppleTheNun),
  change(date(2024, 1, 9), <>Add <ItemLink id={ITEMS.DREAMWALKERS_HEALING_POTION_R3.id} /> to healing potion list.</>, dub),
  change(date(2024, 1, 7), <>Add checklist support for <ItemLink id={ITEMS.FYRALATH.id} />.</>, ToppleTheNun),
  change(date(2024, 1, 4), <>Add statistics for <ItemLink id={ITEMS.ECHOING_TYRSTONE.id} />.</>, Arbixal),
  change(date(2024, 1, 2), 'Remove Shadowlands food and augment rune support.', ToppleTheNun),
  change(date(2023, 12, 31), <>Add resource initialization and granularity support for ResourceTracker module.</>, Vollmer),
  change(date(2023, 12, 30), 'Fix errors caused by ESLint update.', ToppleTheNun),
  change(date(2023, 12, 28), 'Improve internal handling of phases', emallson),
  change(date(2023, 12, 21), <>Mark <ItemLink id={ITEMS.ENCHANT_WEAPON_DREAMING_DEVOTION_R3.id} /> as a max rank enchant.</>, ToppleTheNun),
  change(date(2023, 12, 20), 'Bring over the ESLint config from the vite migration branch.', ToppleTheNun),
  change(date(2023, 12, 20), 'Bump i18n dependency version.', ToppleTheNun),
  change(date(2023, 12, 20), 'Mark 10.1.5 as an old patch.', ToppleTheNun),
  change(date(2023, 12, 20), 'Bring over a few of the changes from the vite migration branch.', ToppleTheNun),
  change(date(2023, 12, 5), 'Update Classic Mana Values to activate based on config role.', jazminite),
  change(date(2023, 12, 3), 'Convert GlobalCooldown to TS', Seriousnes),
  change(date(2023, 12, 3), <>Refactor MajorCooldown to support procs such as Enhancement's Hot Hand & Ascendance</>, Seriousnes),
  change(date(2023, 11, 28), 'Bump Node version to 20.x LTS.', ToppleTheNun),
  change(date(2023, 11, 28), 'Actually populate Sentry releases.', ToppleTheNun),
  change(date(2023, 11, 28), 'Update Sentry release naming.', ToppleTheNun),
  change(date(2023, 11, 28), 'Remove deprecated Shadowlands combatantinfo that was breaking the Holy Priest analyzer.', emallson),
  change(date(2023, 11, 27), <>Fix inaccurate tooltip for <ItemLink id={ITEMS.ELEMENTAL_LARIAT.id} />.</>, Trevor),
  change(date(2023, 11, 27), 'Change trinket obj structure and add Classic WotLK trinkets', jazminite),
  change(date(2023, 11, 25), <>Change range check shortcut from 'less than' to 'less than or equal to'</>, Seriousnes),
  change(date(2023, 11, 23), 'Refactor Code Smell Missing Union Type.', LucasLevyOB),
  change(date(2023, 11, 19), 'Improve error reporting integration.', ToppleTheNun),
  change(date(2023, 11, 19), 'Remove warning for 10.2 logs.', ToppleTheNun),
  change(date(2023, 11, 18), 'Regenerate talents.', ToppleTheNun),
  change(date(2023, 11, 15), 'i18n: Translation to Portuguese of the pages News, Specs, Premium, and About.', LucasLevyOB),
  change(date(2023, 11, 15), 'Refactor Code Smell Any Type.', LucasLevyOB),
  change(date(2023, 11, 15), 'Add backgrounds for Dawn of the Infinites, Everbloom, and Throne of the Tides.', ToppleTheNun),
  change(date(2023, 11, 13), <>Add stat tracking and statistics for <ItemLink id={ITEMS.ELEMENTAL_LARIAT.id} />.</>, nullDozzer),
  change(date(2023, 11, 7), 'Fix Classic class / spec ranking ids.', jazminite),
  change(date(2023, 11, 7), 'Add warning for 10.2 logs.', ToppleTheNun),
  change(date(2023, 11, 1), 'Add support for Dragonflight Season 3 dungeons.', Arlie),
  change(date(2023, 10, 27), 'Change the actions and reducers into slices.', Arlie),
  change(date(2023, 10, 26), 'Fix an issue when getting damage/healing contribution from crit effects for certain effects that affect total damage', Putro),
  change(date(2023, 10, 26), 'Add background images for Amirdrassil bosses.', ToppleTheNun),
  change(date(2023, 10, 26), <>Correct <SpellLink spell={SPELLS.MIGHT_OF_THE_MOUNTAIN} /> to work with pets and count them twice as the effect is effectively doubled in-game.</>, Putro),
  change(date(2023, 10, 22), 'Disable specs broken by talent regeneration for 10.2.', ToppleTheNun),
  change(date(2023, 10, 22), 'Regenerate talents for 10.2.', ToppleTheNun),
  change(date(2023, 10, 22), 'Rename all .js files to .jsx.', ToppleTheNun),
  change(date(2023, 10, 22), 'Remove articles.', ToppleTheNun),
  change(date(2023, 10, 22), 'Fix statistic ordering on the stats page.', emallson),
  change(date(2023, 10, 20), <>Refactor <ItemLink id={ITEMS.VOICE_OF_THE_SILENT_STAR.id} /> module to correcly grant and steal the correct stats depending on your current stats.</>, nullDozzer),
  change(date(2023, 10, 20), <>Add stat tracking and statistics for all Dragonflight Weapon Enchants such as <SpellLink spell={SPELLS.WAFTING_DEVOTION_ENCHANT} /> and <SpellLink spell={SPELLS.SPORE_TENDER_ENCHANT} />.</>, nullDozzer),
  change(date(2023, 10, 16), 'Fix some variable capitalizations', Trevor),
  change(date(2023, 10, 14), 'Paginate data loading, allowing M+ to be re-enabled for most specs', emallson),
  change(date(2023, 10, 12), <>Make ICC the default Classic zone.</>, emallson),
  change(date(2023, 10, 12), 'Simplify checking if a fight is M+.', ToppleTheNun),
  change(date(2023, 10, 9), 'Add Amirdrassil raid data.', ToppleTheNun),
  change(date(2023, 10, 9), 'Remove Burning Crusade raid data.', ToppleTheNun),
  change(date(2023, 10, 9), 'Bump retail version to 10.1.7.', ToppleTheNun),
  change(date(2023, 10, 9), 'Add T31 set IDs.', ToppleTheNun),
  change(date(2023, 10, 8), 'Improve spell auto-detection to hopefully include talents.', ToppleTheNun),
  change(date(2023, 10, 7), <>Add support for ICC bosses.</>, emallson),
  change(date(2023, 10, 3), <>Refactor code for related event retrieval.</>, Seriousnes),
  change(date(2023, 10, 1), <>Improve code for coloring texts and backgrounds by <span className='Paladin'>player</span> <span className='Warrior'>classes</span>.</>, nullDozzer),
  change(date(2023, 10, 1), <>Refactor of effects that grant "Primary Stat" such as <ItemLink id={ITEMS.ELEMENTAL_POTION_OF_ULTIMATE_POWER_R3.id} /> and <ItemLink id={ITEMS.DRACONIC_AUGMENT_RUNE.id} /> to only provide current stat and thus match logged values better.</>, nullDozzer),
  change(date(2023, 9, 30), "Removed `shownSpell` from Ability type as it's no longer used.", Putro),
  change(date(2023, 9, 25), 'Reset scrollposition to top of window when navigating within app except when switching tabs. This fixes a scenario where you would end up staring at the pages footer after clicking a spec on the Specs page.', nullDozzer),
  change(date(2023, 9, 25), 'Fix broken drilldown link in always be casting module that is used my multiple specs', nullDozzer),
  change(date(2023, 9, 25), 'Fix Patreon / GitHub login buttons', emallson),
  change(date(2023, 9, 24), 'Fix lots of react rendering errors', nullDozzer),
  change(date(2023, 9, 24), 'Change to e2e tests to fail explicitly when there are unexpected errors in the console.', nullDozzer),
  change(date(2023, 9, 23), 'Make sure that the Shadowflame Wreathe icon can be displayed.', ToppleTheNun),
  change(date(2023, 9, 17), 'CooldownGraphSubsection now takes an optional parameter "description", which will be used instead of the default one if given.', Awildfivreld),
  change(date(2023, 9, 17), 'Introduce hover tooltip in resource tracker graphs, and optional wasted resources line.', Awildfivreld),
  change(date(2023, 9, 12), 'Disable M+ logs containing Augmentation Evokers temporarily.', ToppleTheNun),
  change(date(2023, 9, 6), "Reworked getRepeatedTalentCount to use getTalentRank behind the scenes, and renamed it to getMultipleTalentRanks.", Putro),
  change(date(2023, 9, 5), 'Add Classic Guild page', jazminite),
  change(date(2023, 9, 5), 'Update talent data for patch 10.1.7', emallson),
  change(date(2023, 9, 4), <>Add module for tracking of <ItemLink id={ITEMS.ACCELERATING_SANDGLASS.id} />.</>, nullDozzer),
  change(date(2023, 9, 2), 'Refactor haste buffs to be more understandable. Implements some haste buffs that were non-functional.', nullDozzer),
  change(date(2023, 9, 2), 'Fix some spec links not working in some scenarions', nullDozzer),
  change(date(2023, 8, 30), 'Update SpellLinks to automatically support talents.', ToppleTheNun),
  change(date(2023, 8, 27), 'Fixed broken Warcraft Logs link on the character page.', Bigsxy),
  change(date(2023, 8, 24), 'Stop showing warning of limited support while developing locally', nullDozzer),
  change(date(2023, 8, 23), 'Revert upgrade of charting library to fix area charts.', emallson),
  change(date(2023, 8, 19), 'Add support for Warcraft Logs\' phase data in new logs.', emallson),
  change(date(2023, 8, 18), 'Update dependencies.', ToppleTheNun),
  change(date(2023, 8, 16), 'Add Classic buffs that effect haste rating', jazminite),
  change(date(2023, 8, 12), 'Add Classic character parse page', jazminite),
  change(date(2023, 8, 9), 'Fix combatant count in M+.', ToppleTheNun),
  change(date(2023, 8, 9), 'Disable Augmentation Evoker analysis in M+.', ToppleTheNun),
  change(date(2023, 8, 8), 'Fix bug in EventLinkNormalizer', Trevor),
  change(date(2023, 8, 8), 'Deduplicate the dependencies of the project', Putro),
  change(date(2023, 8, 7), 'Remove some deprecated code.', ToppleTheNun),
  change(date(2023, 8, 1), 'Add Irideus Fragment and Mirror of Fractured Tomorrows trinkets.', Vollmer),
  change(date(2023, 8, 2), 'Add support for buffRemaining in the APL modules.', Putro),
  change(date(2023, 7, 31), <>Add enchantment check for <ItemLink id={ITEMS.SHADOWED_BELT_CLASP_R3.id} />.</>, ToppleTheNun),
  change(date(2023, 7, 29), 'Fix another issue loading parses using character search', emallson),
  change(date(2023, 7, 29), 'Fix an issue loading parses using character search', Putro),
  change(date(2023, 7, 27), 'Add Sarkareth haste buff', Awildfivreld),
  change(date(2023, 7, 27), 'Fix i18n in suggestions.', ToppleTheNun),
  change(date(2023, 7, 25), 'Improve consistency when fetching talents for tables.', ToppleTheNun),
  change(date(2023, 7, 25), 'Fix crash when using certain i18n functions.', ToppleTheNun),
  change(date(2023, 7, 23), 'Tooltip on Timeline Improvements', Abelito75),
  change(date(2023, 7, 22), 'Update i18n library version.', [ToppleTheNun, emallson]),
  change(date(2023, 7, 22), 'Update Classic Enchants', jazminite),
  change(date(2023, 7, 21), 'Add scrollability to Buff count graphs', Vollmer),
  change(date(2023, 7, 19), 'Update NameSearch to swap between Retail and Classic Realm lists', jazminite),
  change(date(2023, 7, 17), 'Update spell registration to use `satisfies` keyword', ToppleTheNun),
  change(date(2023, 7, 17), 'Remove MappedEvent', Tialyss),
  change(date(2023, 7, 17), 'Make patch incompatibility warning more clear.', ToppleTheNun),
  change(date(2023, 7, 17), 'Add ability to support talents that cost resources per second; regenerate talents.', ToppleTheNun),
  change(date(2023, 7, 14), 'Updates for Classic Realms', jazminite),
  change(date(2023, 7, 13), 'Mark 10.1.5 as the active patch.', ToppleTheNun),
  change(date(2023, 7, 10), 'Regenerate talents for 10.1.5.', ToppleTheNun),
  change(date(2023, 7, 10), 'Update remaining SpellLink usage.', ToppleTheNun),
  change(date(2023, 7, 9), 'Update SpellLink usage for all classic specs.', ToppleTheNun),
  change(date(2023, 7, 7), 'Add missing encounters to S2 M+.', ToppleTheNun),
  change(date(2023, 7, 7), 'Add patch 10.1.5 details.', ToppleTheNun),
  change(date(2023, 7, 3), 'Fix an issue causing cast efficiency for spells to be artificially inflated', Putro),
  change(date(2023, 6, 30), 'Regenerate talents.', ToppleTheNun),
  change(date(2023, 6, 28), 'Update retail realms for US, EU, TW, and KR.', ToppleTheNun),
  change(date(2023, 6, 26), 'Improve ability to have custom ESLint rules.', ToppleTheNun),
  change(date(2023, 6, 25), <>Correctly hide <ItemLink id={ITEMS.VOICE_OF_THE_SILENT_STAR.id} /> if it isn't equipped.</>, Putro),
  change(date(2023, 6, 25), 'Added many Aberrus DoTs to the ignore list for tank hit tracking', emallson),
  change(date(2023, 6, 22), 'Added Thousandbone Tongueslicer to list of high tier foods.', Sref),
  change(date(2023, 6, 22), 'Remove ESLint disable from probability module.', ToppleTheNun),
  change(date(2023, 6, 19), <>Implement <ItemLink id={ITEMS.VOICE_OF_THE_SILENT_STAR.id} /> stat tracking</>, Jundarer),
  change(date(2023, 6, 18), 'Add Vessel, Spoils and Wafting Devotion haste buffs and update item scaling data.', Jundarer),
  change(date(2023, 6, 17), 'Update core directories to use new spell link format.', ToppleTheNun),
  change(date(2023, 6, 17), 'Update articles to use new spell link format.', ToppleTheNun),
  change(date(2023, 5, 31), <>Implement <ItemLink id={ITEMS.CALL_TO_DOMINANCE.id} /> module for Monk, Shaman, and Warlock</>, Trevor),
  change(date(2023, 5, 29), 'Add missing Balance Druid haste buffs.', Jundarer),
  change(date(2023, 5, 21), 'Refactor raid buff tracking and support tracking Windfury Totem.', ToppleTheNun),
  change(date(2023, 5, 21), <>Fix <ItemLink id={ITEMS.HISSING_RUNE_R3.id} /> showing as a weak enhancement.</>, Trevor),
  change(date(2023, 5, 21), <>Fix <ItemLink id={ITEMS.LAMBENT_ARMOR_KIT_R3.id} /> showing as a weak enchantment.</>, ToppleTheNun),
  change(date(2023, 5, 20), <>Add support for <ItemLink id={ITEMS.ENCHANT_WEAPON_SHADOWFLAME_WREATHE_R3.id} />, <ItemLink id={ITEMS.ENCHANT_WEAPON_SPORE_TENDER_R3.id} />, and <ItemLink id={ITEMS.LAMBENT_ARMOR_KIT_R3.id} />.</>, ToppleTheNun),
  change(date(2023, 5, 17), 'Fix issue with negative Haste values.', emallson),
  change(date(2023, 5, 11), 'Fix multi-rank talent tooltip links.', ToppleTheNun),
  change(date(2023, 5, 10), 'Add Classic Character Thumbnails to PlayerSelection page.', jazminite),
  change(date(2023, 5, 10), 'Speed up e2e tests.', ToppleTheNun),
  change(date(2023, 5, 10), 'Fix Echo of Nelthation display.', ToppleTheNun),
  change(date(2023, 5, 10), 'Add season 2 dungeon backgrounds.', ToppleTheNun),
  change(date(2023, 5, 10), 'Fix Kazzara displaying as Magmorax.', ToppleTheNun),
  change(date(2023, 5, 9), 'Changed default zone for character parses to Aberrus', emallson),
  change(date(2023, 5, 8), 'Add Classic Realm data to scripts/realms.', jazminite),
  change(date(2023, 5, 8), 'Add Trial of the Grand Crusader raid and images for Classic WotLK.', jazminite),
  change(date(2023, 5, 8), 'Update leech rating per 1% to 10.1 values', Putro),
  change(date(2023, 5, 7), 'Add DebuffUptime module + Updates to AlwaysBeCasting and CancelledCasts.', jazminite),
  change(date(2023, 5, 5), 'Fix Playwright tests.', ToppleTheNun),
  change(date(2023, 5, 4), 'Add 10.1 patch.', ToppleTheNun),
  change(date(2023, 5, 2), 'Bumped game version to 10.1', emallson),
  change(date(2023, 4, 24), 'Add ability to filter M+ analysis by dungeon pulls.', ToppleTheNun),
  change(date(2023, 4, 24), 'Additions and updates for Classic Potions (guide and checklist).', jazminite),
  change(date(2023, 4, 23), 'Add Performance Label component to use with UptimeBarSubStatistic.', jazminite),
  change(date(2023, 4, 20), 'Add M+ season 2 images.', ToppleTheNun),
  change(date(2023, 4, 19), 'Add Aberrus raid images.', ToppleTheNun),
  change(date(2023, 4, 17), 'Update Classic WotLK Priest spells.', jazminite),
  change(date(2023, 4, 16), 'Ported Major Defensive guide sections to core code so other tank specs can use it.', emallson),
  change(date(2023, 4, 16), 'Ported Shuffle chart to core code so other tank specs can use it.', emallson),
  change(date(2023, 4, 15), 'Add Classic WotLK Raid Buffs to Fight Report page.', jazminite),
  change(date(2023, 4, 8), 'Improve support for older browsers', emallson),
  change(date(2023, 4, 2), 'Add Healthstone Checker for Classic WotLK.', jazminite),
  change(date(2023, 4, 1), 'Classic WotLK - Add phases to Ulduar bosses.', jazminite),
  change(date(2023, 4, 1), 'Remove unnecessary console log.', ToppleTheNun),
  change(date(2023, 3, 31), 'Refactor SpellLink props to use "spell" instead of "id".', ToppleTheNun),
  change(date(2023, 3, 31), 'Add Dragonflight season 1 M+ dungeon images.', ToppleTheNun),
  change(date(2023, 3, 30), 'Add ability to use PTR tooltips based on report zone.', ToppleTheNun),
  change(date(2023, 3, 29), 'Mark 10.0.5 logs as not current.', ToppleTheNun),
  change(date(2023, 3, 28), 'Refactor cast breakdown components to make them less noisy.', ToppleTheNun),
  change(date(2023, 3, 23), 'Add Hardmode difficulty for classic.', HerzBlutRaffy),
  change(date(2023, 3, 21), 'Add Ulduar raid and images for Classic WotLK.', jazminite),
  change(date(2023, 3, 21), 'Add patch info for 10.0.7.', ToppleTheNun),
  change(date(2023, 3, 20), 'Fix an issue where APL rules could mistakenly mismatch, causing weird UI issues.', emallson),
  change(date(2023, 3, 18), 'Add T30 set IDs.', ToppleTheNun),
  change(date(2023, 3, 18), 'Add Classic WotLK Rogue spells', jazminite),
  change(date(2023, 3, 17), 'Added Ulduar enchants and fixed cloak enchant for Classic', Arbixal),
  change(date(2023, 3, 16), 'TypeProp removal P1.', Abelito75),
  change(date(2023, 3, 13), 'Fixed Cooldown Tracker.', Abelito75),
  change(date(2023, 3, 15), "Add prettier to the CI", Putro),
  change(date(2023, 3, 8), 'Add Classic WotLK P2 trinkets.', jazminite),
  change(date(2023, 3, 6), 'Fix combatants not being dispatched to the Redux store.', ToppleTheNun),
  change(date(2023, 3, 4), 'Add Playwright tests for validating application behavior.', ToppleTheNun),
  change(date(2023, 3, 3), 'Fix "leech" event throwing errors during development for classic logs.', ToppleTheNun),
  change(date(2023, 2, 25), 'Add Role Support for Classic Player Loader.', HerzBlutRaffy),
  change(date(2023, 2, 25), 'Fix development issue with CastEfficiency dumping large errors in the console.', emallson),
  change(date(2023, 2, 25), 'Fix spell ID for classic Bloodthirst.', ToppleTheNun),
  change(date(2023, 2, 21), 'Add Classic Warrior spells', Pilsung),
  change(date(2023, 2, 20), 'Fixed missing food buffs for WotLK Classic.', Arbixal),
  change(date(2023, 2, 19), 'Added a workaround for handling of combatantinfo on Algalon, Yogg-Saron, and Hodir in WotLK Classic.', emallson),
  change(date(2023, 2, 9), <>Add <ItemLink id={ITEMS.POTION_OF_SHOCKING_DISCLOSURE_R3.id} /> to combat potion list.</>, ToppleTheNun),
  change(date(2023, 2, 6), 'Rewrite test utilities in TypeScript.', ToppleTheNun),
  change(date(2023, 2, 3), 'Remove old Classic Spec data for unsupported specs.', jazminite),
  change(date(2023, 1, 31), 'Add raid specific haste buffs for Classic WotLK (Ulduar).', jazminite),
  change(date(2023, 1, 30), 'Lookup Classic spec by talent tree IF the icon is generic. Generic icons occur when the player changes talents during raid.', jazminite),
  change(date(2023, 1, 30), 'Update retail talent data', emallson),
  change(date(2023, 1, 30), <>Fixed potion checker for <SpellLink spell={ITEMS.POTION_OF_CHILLED_CLARITY_R3} /></>, Trevor),
  change(date(2023, 1, 30), "Correct an issue with accessing undefined values in GetRelatedEvents, HasRelatedEvent and AddRelatedEvent", Putro),
  change(date(2023, 1, 26), 'Update performance box rows to use CSS grid instead of flexbox.', ToppleTheNun),
  change(date(2023, 1, 25), 'Bump retail patch to 10.0.5.', ToppleTheNun),
  change(date(2023, 1, 24), "Fixed an issue where Guide pages weren't showing by default", Sref),
  change(date(2023, 1, 20), <>Adjust maximum combat potion usages to account for <SpellLink spell={SPELLS.ALACRITOUS_ALCHEMIST_STONE} />.</>, ToppleTheNun),
  change(date(2023, 1, 18), 'Add missing 3* weapon enhancements.', ToppleTheNun),
  change(date(2023, 1, 17), 'Add ability to generate PTR talents and add documentation on how to do so.', ToppleTheNun),
  change(date(2023, 1, 17), 'Add 10.0.5 patch information.', ToppleTheNun),
  change(date(2023, 1, 16), 'Refactor result page rendering.', ToppleTheNun),
  change(date(2023, 1, 16), 'Remove remaining references to Shadowlands spells except for foods.', ToppleTheNun),
  change(date(2023, 1, 15), 'Overhauls enchants recommendations (removing gloves, adding bracers & boots).', Lapideas),
  change(date(2023, 1, 14), "Fixed an issue where the Events tab wouldn't load", Sref),
  change(date(2023, 1, 7), 'Update dependencies.', ToppleTheNun),
  change(date(2023, 1, 7), 'Remove support for Wowdb tooltips.', ToppleTheNun),
  change(date(2023, 1, 5), 'Make weapon enhancement suggestions more readable.', ToppleTheNun),
  change(date(2023, 1, 5), 'Fix changelogs showing some contributors as invalid.', ToppleTheNun),
  change(date(2023, 1, 1), 'Add Pull Request template.', jazminite),
];
