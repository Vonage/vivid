# vwc-card

Cards contain content and actions about a single subject.

## Usage

```
<vwc-card heading="Hello Card!"
         icon="home"
         badge-content="This is the badge content"
       >
   <div slot="media">Some media</div>
   <div>This is my content</div>
   <vwc-button slot="actions">Action Button</vwc-button>
</vwc-card>
```

## API


### Properties/Attributes


|name|attr/prop/reflected|type|description|
|--- |--- |--- |--- |
|`heading`|reflected|string|The heading text|
|`header-icon`|reflected|string|A valid vivid icon type|
|`badge-content`|reflected|string|A content to show in a badge (for info and CTA modes)|
|`layout`|reflected|`large` | `basic`|Sets large or basic heading and header icon. Basic is the default.|

### Slots

|name|description|
|--- |--- |
|`graphics`|Content to show in the header icon section. If exists, overrides the `icon` attribute’s definition|
|`actions`|Content to show in the actions section. If exists, overrides the `action-icon` and `action-text` attributes definitions|
|`media`|Slot to add anything inside the `media` area|

