# `carousel`

## `init flow`

####   `should have the required elements`

```html
<vwc-carousel
  autoplay=""
  tabindex="0"
>
  <div class="upper-pane">
    <button class="swiper-button-prev swiper-nav">
      <vwc-icon
        size="medium"
        type="left"
      >
      </vwc-icon>
    </button>
    <div class="swiper-container swiper-container-horizontal swiper-container-initialized swiper-container-pointer-events">
      <div class="swiper-wrapper">
      </div>
    </div>
    <div class="swiper-button-next swiper-nav">
      <vwc-icon
        size="medium"
        type="right"
      >
      </vwc-icon>
    </div>
  </div>
  <div class="lower-pane swiper-pagination">
  </div>
</vwc-carousel>

```

