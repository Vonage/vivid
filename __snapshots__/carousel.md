# `carousel`

## `init flow`

####   `should have the required elements`

```html
<vwc-carousel
  autoplay=""
  id="carousel-a"
  tabindex="0"
>
  <div class="upper-pane">
    <div
      aria-disabled="true"
      aria-label="Previous slide"
      class="swiper-button-disabled swiper-button-prev swiper-nav"
      role="button"
      tabindex="-1"
    >
      <vwc-icon type="left">
      </vwc-icon>
    </div>
    <div class="swiper-container swiper-container-horizontal swiper-container-initialized">
      <div class="swiper-wrapper">
      </div>
      <span
        aria-atomic="true"
        aria-live="assertive"
        class="swiper-notification"
      >
      </span>
    </div>
    <div
      aria-disabled="true"
      aria-label="Next slide"
      class="swiper-button-disabled swiper-button-next swiper-nav"
      role="button"
      tabindex="-1"
    >
      <vwc-icon type="right">
      </vwc-icon>
    </div>
  </div>
  <div class="lower-pane swiper-pagination">
  </div>
</vwc-carousel>

```

