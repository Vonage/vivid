import '@vonage/vwc-menu/vwc-menu.js';
import '@vonage/vwc-list/vwc-list-item.js';
import '@vonage/vwc-icon';
import '@vonage/vwc-button/vwc-button.js';
import '@vonage/vwc-fab/vwc-fab.js';
import { withA11y } from '@storybook/addon-a11y';

export default {
	title: 'Atoms/Menu',
	component: 'vwc-menu',
	decorators: [withA11y]
}

export { basic } from './menu-basic.js';

// export { cascading } from './menu-cascading.js';