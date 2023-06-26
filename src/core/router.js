import history from '#core/history';
import UniversalRouter from 'universal-router';
import { until } from 'lit/directives/until.js';

export class RouterController {
  host;

  constructor(host, routes) {
    (this.host = host).addController(this);

    this.router = new UniversalRouter(routes);

    this.navigate();
  }

  async navigate(path) {
    this.outlet = () => until(this.router.resolve(path || history.location));
    this.host.requestUpdate();
  }
}
