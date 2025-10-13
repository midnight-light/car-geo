import { withErrorBoundary } from './with-error-boundary';
import { withQuery } from './with-query';
import { withRouter } from './with-router';
import { withStore } from './with-store';
import compose from 'compose-function';

export const withProviders = compose(withErrorBoundary, withQuery, withStore, withRouter);
