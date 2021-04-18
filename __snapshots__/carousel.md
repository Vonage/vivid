# `carousel`

## `init flow`

####   `should have the required elements`

```html
<vwc-carousel
  autoplay=""
  tabindex="0"
>
  <div class="upper-pane">
    <div class="swiper-button-disabled swiper-button-prev swiper-nav">
      <vwc-icon
        size="medium"
        type="left"
      >
      </vwc-icon>
    </div>
    <div class="swiper-container swiper-container-horizontal swiper-container-initialized swiper-container-pointer-events">
      <div class="swiper-wrapper">
      </div>
    </div>
    <div class="swiper-button-disabled swiper-button-next swiper-nav">
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

