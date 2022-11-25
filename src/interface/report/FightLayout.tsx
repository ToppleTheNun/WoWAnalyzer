import { Link, Outlet, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DocumentTitle from 'interface/DocumentTitle';
import { useReport } from './context/ReportContext';
import { getFightFromReport } from 'interface/selectors/fight';
import Tooltip from 'interface/Tooltip';
import { t, Trans } from '@lingui/macro';
import makeAnalyzerUrl from 'interface/makeAnalyzerUrl';
import Toggle from 'react-toggle';
import { isUnsupportedClassicVersion } from 'game/VERSIONS';
import ClassicLogWarning from 'interface/report/ClassicLogWarning';
import ReportDurationWarning, { MAX_REPORT_DURATION } from 'interface/report/ReportDurationWarning';
import FightSelectionPanel from 'interface/report/FightSelectionPanel';
import getFightName from 'common/getFightName';
import { FightProvider } from 'interface/report/context/FightContext';

const FightLayout = () => {
  const { fightId: fightIdRaw = '' } = useParams();
  const fightParts = fightIdRaw.split('-');
  const fightId = fightParts.length > 0 ? Number(fightParts[0]) : null;
  const [killsOnly, setKillsOnly] = useState(false);
  const { report, refreshReport } = useReport();
  const reportDuration = report.end - report.start;

  useEffect(() => {
    // Scroll to top of page on initial render
    window.scrollTo(0, 0);
  }, []);

  const fight = fightId && getFightFromReport(report, fightId);

  if (!fightId || !fight) {
    return (
      <div className="container offset fight-selection">
        <div className="flex wrapable" style={{ marginBottom: 15 }}>
          <div className="flex-main" style={{ position: 'relative' }}>
            <div className="back-button">
              <Tooltip
                content={t({
                  id: 'interface.report.fightSelection.tooltip.backToHome',
                  message: `Back to home`,
                })}
              >
                <Link to="/">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                  <label>
                    {' '}
                    <Trans id="interface.report.fightSelection.tooltip.home">Home</Trans>
                  </label>
                </Link>
              </Tooltip>
            </div>
            <h1 style={{ lineHeight: 1.4, margin: 0 }}>
              <Trans id="interface.report.fightSelection.fightSelection">Fight selection</Trans>
            </h1>
            <small style={{ marginTop: -5 }}>
              <Trans id="interface.report.fightSelection.fightSelectionDetails">
                Select the fight you wish to analyze. If a boss or encounter is missing, or the list
                below is empty, press the Refresh button above to re-pull the log from Warcraft
                Logs. Additionally, please note that due to the way combat logs work, we are unable
                to evaluate Target Dummy logs.
              </Trans>
            </small>
          </div>
          <div className="flex-sub">
            <div>
              <Tooltip
                content={
                  <Trans id="interface.report.fightSelection.tooltip.refreshFightsList">
                    This will refresh the fights list which can be useful if you're live logging.
                  </Trans>
                }
              >
                <Link to={makeAnalyzerUrl(report)} onClick={refreshReport}>
                  <span className="glyphicon glyphicon-refresh" aria-hidden="true" />{' '}
                  <Trans id="interface.report.fightSelection.refresh">Refresh</Trans>
                </Link>
              </Tooltip>
              <span className="toggle-control" style={{ marginLeft: 5 }}>
                <Toggle
                  checked={killsOnly}
                  icons={false}
                  onChange={(event) => setKillsOnly(event.currentTarget.checked)}
                  id="kills-only-toggle"
                />
                <label htmlFor="kills-only-toggle">
                  {' '}
                  <Trans id="interface.report.fightSelection.killsOnly">Kills only</Trans>
                </label>
              </span>
            </div>
          </div>
        </div>

        {isUnsupportedClassicVersion(report.gameVersion) && <ClassicLogWarning />}

        {reportDuration > MAX_REPORT_DURATION && (
          <ReportDurationWarning duration={reportDuration} />
        )}

        {!isUnsupportedClassicVersion(report.gameVersion) && (
          <FightSelectionPanel report={report} killsOnly={killsOnly} />
        )}
      </div>
    );
  }

  return (
    <>
      <DocumentTitle
        title={
          fight
            ? t({
                id: 'interface.report.fightSelection.documentTitle',
                message: `${getFightName(report, fight)} in ${report.title}`,
              })
            : report.title
        }
      />
      <FightProvider fight={fight}>
        <Outlet />
      </FightProvider>
    </>
  );
};

export default FightLayout;
