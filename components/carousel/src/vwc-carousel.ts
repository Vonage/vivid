import {
  customElement,
  LitElement,
  html,
  query,
  CSSResult,
  TemplateResult,
} from 'lit-element';
import { style } from './vwc-carousel.css';
import Swiper from 'swiper';

declare global {
  interface HTMLElementTagNameMap {
    'vwc-carousel': VWCCarousel;
  }
}

/**
 * This component is a carousel
 */
@customElement('vwc-carousel')
export class VWCCarousel extends LitElement {
  static get styles(): CSSResult {
    return style;
  }

  @query('.swiper-container')
  private swiperContainer?: Element;

  @query('.swiper-button-next')
  private swiperButtonNext?: Element;

  @query('.swiper-button-prev')
  private swiperButtonPrev?: Element;

  @query('.swiper-pagination')
  private swiperPagination?: Element;

  firstUpdated(): void {
    try {
      // const mySwiper =
      this.swiperize(this.swiperContainer as HTMLElement, this.swiperOptions);
    } catch (e) {
      console.log(e);
    }
  }

  private get swiperOptions(): any {
    return {
      // Optional parameters
      // direction: "horizontal",
      loop: true,

      autoplay: {
        delay: 2500,
        disableOnInteraction: true,
      },

      cssMode: true,
      navigation: {
        nextEl: this.swiperButtonNext as HTMLElement,
        prevEl: this.swiperButtonPrev as HTMLElement,
      },
      pagination: {
        el: this.swiperPagination as HTMLElement,
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      mousewheel: true,
      keyboard: true,
    };
  }

  private swiperize(el: HTMLElement, options: any) {
    return new Swiper(el, options);
  }

  render(): TemplateResult {
    return html`<!-- Slider main container -->
      <div class="swiper-container">
        <!-- Additional required wrapper -->
        <ol class="swiper-wrapper">
          <!-- Slides -->
          <slot></slot>
        </ol>
        <!-- If we need pagination -->
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <!--     <div class="swiper-scrollbar"></div> -->
      </div>`;
  }
}
