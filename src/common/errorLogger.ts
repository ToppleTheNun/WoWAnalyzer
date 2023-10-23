export function captureException(
  exception: Error,
  options?: {
    extra?: Record<string, unknown>;
    contexts?: { react: { componentStack: unknown } };
  },
) {
  if (import.meta.env.PROD) {
    console.error('An error occurred and was sent to Sentry.', exception);
    window.Sentry?.withScope((scope) => {
      if (options && options.extra) {
        scope.setExtras(options.extra);
      }
      window.Sentry?.captureException(exception);
    });
  } else {
    throw exception;
  }
}
