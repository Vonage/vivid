import { createElementVariations as vwcAudioTests } from './vwc-audio';
import { createElementVariations as vwcBadgeTests } from './vwc-badge';

const wrapper = document.createElement('div');
document.body.appendChild(wrapper);

vwcAudioTests(wrapper);
vwcBadgeTests(wrapper);
