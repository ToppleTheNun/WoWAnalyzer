import { useCallback, useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import handleApiError from 'interface/report/handleApiError';
import { setReport } from 'interface/actions/report';
import { useDispatch } from 'react-redux';
import { makeAnalyzerUrl } from 'interface/index';
import { LogNotFoundError } from 'common/fetchWclApi';
import { captureException } from 'common/errorLogger';

const RouterErrorBoundary = () => {
  const error = useRouteError() as Error;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onError = useCallback(() => {
    dispatch(setReport(null));
    navigate(makeAnalyzerUrl());
  }, [dispatch, navigate]);

  useEffect(() => {
    const isCommonError = error instanceof LogNotFoundError;
    if (!isCommonError) {
      captureException(error);
    }
  }, [error]);

  return handleApiError(error, onError);
};

export default RouterErrorBoundary;
