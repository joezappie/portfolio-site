import { AppContainer } from '#components/app-container';

import '@fontsource/roboto/100.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';

import '#themes/default.css';
import '#themes/light.css';
if (true) {
  console.log('hey');
}
document.body.append(new AppContainer());
