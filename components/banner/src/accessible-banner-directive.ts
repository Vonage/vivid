import { html, TemplateResult } from 'lit-element';
import { render } from 'lit-html';
import { AsyncDirective } from 'lit-html/async-directive.js';
import {
	ChildPart, directive, DirectiveParameters, PartInfo, PartType
} from 'lit-html/directive.js';

class AccessibleBannerDirective extends AsyncDirective {
  protected labelEl: HTMLElement|null = null;
  protected timerId: number|null = null;
  protected previousPart: ChildPart|null = null;

  constructor(partInfo: PartInfo) {
  	super(partInfo);

  	if (partInfo.type !== PartType.CHILD) {
  		throw new Error('AccessibleBannerDirective only supports child parts.');
  	}
  }

  override update(part: ChildPart, [
  	message, open
  ]: DirectiveParameters<this>) {
  	if (!open) {
  		return;
  	}

  	if (this.labelEl === null) {
  		const wrapperEl = document.createElement('div');
  		const messageTemplate =
          html`<div class="message" role="status" aria-live="polite"></div>`;

  		render(messageTemplate, wrapperEl);

  		const labelEl = wrapperEl.firstElementChild! as HTMLElement;
  		labelEl.textContent = message;

      part.endNode?.parentNode!.insertBefore(labelEl, part.endNode);
      this.labelEl = labelEl;
      return labelEl;
  	}

  	const messageEl = this.labelEl;
  	messageEl.setAttribute('aria-live', 'off');
  	messageEl.textContent = '';

  	const spaceSpan = document.createElement('span');
  	spaceSpan.style.display = 'inline-block';
  	spaceSpan.style.width = '0';
  	spaceSpan.style.height = '1px';
  	spaceSpan.textContent = '\u00A0'; // U+00A0 is &nbsp;
  	messageEl.appendChild(spaceSpan);
  	messageEl.setAttribute('message-text', message);

  	if (this.timerId !== null) {
  		clearTimeout(this.timerId);
  	}

  	this.timerId = window.setTimeout(() => {
  		this.timerId = null;
  		messageEl.setAttribute('aria-live', 'polite');
  		messageEl.removeAttribute('message-text');
  		messageEl.textContent = message;
  		this.setValue(this.labelEl);
  	}, 1000);

  	return messageEl;
  }

  render(message: string, isOpen: boolean): TemplateResult {
  	if (!isOpen) {
  		return html``;
  	}

  	return html`
	  <div class="message" role="status" aria-live="polite">${message}</div>`;
  }
}

export const accessibleBannerDirective = directive(AccessibleBannerDirective);
