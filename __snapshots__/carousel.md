# `carousel`

## `init flow`

####   `should have the required elements`

```html
<vwc-carousel
  autoplay=""
  tabindex="0"
>
  <div class="upper-pane">
    <div class="swiper-button-disabled swiper-button-lock swiper-button-prev swiper-nav">
      <vwc-icon type="left">
      </vwc-icon>
    </div>
    <div class="swiper-backface-hidden swiper-container swiper-horizontal swiper-initialized">
      <div class="swiper-wrapper">
      </div>
    </div>
    <div class="swiper-button-disabled swiper-button-lock swiper-button-next swiper-nav">
      <vwc-icon type="right">
      </vwc-icon>
    </div>
  </div>
  <div class="lower-pane swiper-pagination">
  </div>
</vwc-carousel>

```

