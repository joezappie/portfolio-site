import deepEqual from 'deep-equal';
import { createBrowserHistory } from 'history';
import parse from 'url-parse';

const history = createBrowserHistory();

const _push = history.push;

history.push = function (path, state, ...args) {
  const parsedPath = parse(path);
  const { location } = history;
  if (
    parsedPath.pathname === location.pathname &&
    parsedPath.query === location.search &&
    parsedPath.hash === location.hash &&
    deepEqual(state, location.state)
  ) {
    return;
  }

  args.splice(0, 2);
  _push.apply(history, [path, state, ...args]);
};

export default history;
