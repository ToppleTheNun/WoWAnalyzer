import ErrorBoundary from 'interface/ErrorBoundary';
import NavigationBar from 'interface/NavigationBar';
import { LoaderFunction, Outlet, useLoaderData, useParams } from 'react-router-dom';
import { fetchFights } from 'common/fetchWclApi';
import { Report, WCLReport } from 'parser/core/Report';
import { useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { setReport } from 'interface/actions/report';
import DocumentTitle from 'interface/DocumentTitle';
import { ReportProvider } from './context/ReportContext';
import { ReportExpansionContextProvider } from 'interface/report/ExpansionContext';
import PatchChecker from 'interface/report/PatchChecker';

// During peak traffic we might want to disable automatic refreshes to avoid hitting the rate limit.
// During regular traffic we should enable this as the fight caching is confusing users.
// Actually leaving this disabled for now so we can continue to serve reports when WCL goes down and high traffic to a specific report page doesn't bring us down (since everything would be logged). To solve the issue of confusion, I'll try improving the fight selection text instead.
const REFRESH_BY_DEFAULT = false;

export const reportLoader: LoaderFunction = ({ params: { reportCode } }) =>
  fetchFights(reportCode ?? '', REFRESH_BY_DEFAULT);

const ReportLayout = () => {
  const { reportCode: code = '' } = useParams();
  const wclReport = useLoaderData() as WCLReport;
  const report: Report = useMemo(() => {
    const isAnonymous = code.startsWith('a:');
    return { ...wclReport, isAnonymous, code };
  }, [code, wclReport]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setReport(report));
  }, [dispatch, report]);

  return (
    <>
      <DocumentTitle title={wclReport.title} />
      <NavigationBar />
      <ErrorBoundary>
        <ReportProvider
          report={report}
          refreshReport={() => {
            /* */
          }}
        >
          <ReportExpansionContextProvider>
            <PatchChecker>
              <Outlet />
            </PatchChecker>
          </ReportExpansionContextProvider>
        </ReportProvider>
      </ErrorBoundary>
    </>
  );
};

export default ReportLayout;
