import { Surface } from './interfaces/surface';

interface Button extends Surface {}

export class ButtonPrimary implements Button {
  background: string;
  foreground: string;
}
