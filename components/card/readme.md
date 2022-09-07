# vwc-card

Cards contain content and actions about a single subject.

## Usage

```
<vwc-card heading="Hello Card!" icon="home">
   <div slot="media">Some media</div>
   <vwc-button slot="footer">Action Button</vwc-button>
</vwc-card>
```

## API

### Properties/Attributes

| name   |attr/prop/reflected|type| description                   |
|--------|--- |--- |-------------------------------|
| `heading` |reflected|string| The heading text              |
| `subtitle` |reflected|string| The sub-heading text          |
| `text` |reflected|string| The card text                 |
| `icon` |reflected|string| A valid vivid icon type       |
| `elevation` |reflected|string| control the card elevation dp |

### Slots

| name      | description                                                                                                |
|-----------|------------------------------------------------------------------------------------------------------------|
| `graphic` | Content to show in the header icon section. If exists, overrides the `header-icon` attribute’s definition  |
| `meta`    | Slot for action content in the card header                                                                 |
| `media`   | Slot to add anything inside the `media` area                                                               |
| `footer`  | Slot for action content placed the card footer                                                             |
| `main`    | Slot for content of the card. If exist, overrides the `heading`, `subtitle`, `card-text` and `header-icon` |

## Styling tips

### Setting card's width

The width of the card is set via its wrapper's width.  Hence, if you wrap a card like this:

```html
<div class="card-wrapper">
 <vwc-card></vwc-card>
</div>
```

Then your style should have:

```css
.card-wrapper {
 width: 300px;
}
```

### Using the cards in a grid

Please see this example: [Grid Example](https://vivid.vonage.com?path=/story/alpha-components-card--in-a-grid)

## CSS Custom Properties

| Property                       | Default                                          | Description                                      |
|--------------------------------|--------------------------------------------------|--------------------------------------------------|
| `--title-line-clamp` | none | Controls the number of lines of the title that will be present before trim & ellipsis |
| `--subtitle-line-clamp` | none | Controls the number of lines of the sub-title that will be present before trim & ellipsis |
