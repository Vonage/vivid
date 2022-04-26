# Vonage Spring-Hack Best UI

###### 25/04/2022

Charge your spring-hack project with **Vivid**’s unified UI, pre-configured a11y standards & industry best practices. oh and, **get REWARDED for it!** :trophy: 

_"Be the best version of your-app"_

## How you’ll be judged? 

Projects will be scored by the following criteria:

- **Quality & semantics**
  - use components that clearly fit a purpose or role (e.g. [_Menu_](https://vivid.vonage.com/?path=/story/components-menu-introduction--introduction) to offer a list of actionable choices to the user), thus result in high quality UX
  - Build with accessibility in mind (use tools like [accessibility insights](https://accessibilityinsights.io/docs/en/web/overview/) or [WAVE](https://wave.webaim.org/extension/))
- **Variety** - use as many vivid components as you can stomache
- **Interface only** - avoid the use of CSS and other practices to reshape UI elements. sticking to the public API is a best practice
- **Use _alpha_ components** - help shaping the future of new components by _"field testing"_ & feedback

### What’s in it for you? 🫵

Getting to know our awesome design system can help you with your day-to-day work, easily creating product UI’s with Vonage unified look & feel... 
And **you can get a special tech prize!!!**

## Getting started

Familiarize yourself with some concepts that you will to encounter when working with Vivid.

### Connotation colors

Colors have assigned meanings and are used consistently throughout Vivid components to set expectations of meaning for users. Color is used sparingly and intentionally to reinforce hierarchies and to create clear modes of communication.

![connotation](https://user-images.githubusercontent.com/67224525/162247250-1860087e-b154-4fb1-bcb6-b7c7ce3f7841.png)

### Vivid’s tips of the week

Here are a few tips to get you up and running:

- [vwc-text](https://vonage.slack.com/archives/C013F0YKH99/p1647250051448129)
- [vwc-accordion](https://vonage.slack.com/archives/C013F0YKH99/p1647849457477329)
- [vwc-layout](https://vonage.slack.com/archives/C013F0YKH99/p1648458616961079)
- [vwc-elevation](https://vonage.slack.com/archives/C013F0YKH99/p1649060648690219)
- [vwc-tooltip](https://vonage.slack.com/archives/C013F0YKH99/p1649671238530569)

Follow the [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) Slack channel for more weekly tips

### Walkthrough

https://user-images.githubusercontent.com/15140652/162237746-ede60abe-f76c-480b-a1f1-2e9a65918069.mov

External validation is very important to us, hence, we try to make developer experience as efficient, safe, fast and smooth as possible.

## Usage example

![usage_examples](https://user-images.githubusercontent.com/67224525/162247167-e3df09f2-90f3-4ebc-85ad-5da10c3026c3.svg)

### Templates

- [Cards gallery](https://codesandbox.io/s/layout-card-tbgzpr?file=/sandbox.config.json)
- [Angular Dashboard](https://codesandbox.io/s/vivid-spring-hack-angular-demo-vcnn9p)
- [React Dashboard](https://codesandbox.io/s/vivid-spring-hack-react-example-c3x0tk)
- [Vue Dashboard](https://codesandbox.io/s/vivid-spring-hack-vue-demo-2q6mqu)

### Useful links

![useful links](https://user-images.githubusercontent.com/67224525/162243636-079264f5-9595-4a8d-836e-8d0d014acfe6.svg)

**To help you start your journey**

- [Vivid storybook](https://vivid.vonage.com)
- [Icon gallery](https://icons.vivid.vonage.com)
- [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) Slack channel

<hr>

Good luck! 🍀

<hr>

## Grab & Code
### toggle button group

![image](https://user-images.githubusercontent.com/7512792/165079245-089f1c30-caae-46c9-b358-b86e896b366b.png)

```
<vwc-button-toggle-group enlarged shape="pill">
  <vwc-button label="Home" selected enlarged layout="filled" type="submit"></vwc-button>
  <vwc-button label="Standard"  enlarged layout="filled" type="submit"></vwc-button>
  <vwc-button label="Hybrid"  enlarged layout="filled" type="submit"></vwc-button>
  <vwc-button label="Satellite"  enlarged layout="filled" type="submit"></vwc-button>
</vwc-button-toggle-group>
```


### Card
![image](https://user-images.githubusercontent.com/7512792/165087799-6b548c79-ed2d-44c0-8af0-74bdffe39cc9.png)
```
<vwc-card heading="Card with all options" icon="chat-line" subtitle="Subtitle" text="Use the 'footer' slot in order to add actionable items.">
  <img slot="media" src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor by Gustavo Pedrosa">
  <vwc-icon-button-toggle onicon="more-vertical-solid" officon="more-vertical-solid" slot="meta"></vwc-icon-button-toggle>
  <vwc-button slot="footer" shape="pill" layout="outlined" label="Action Button" type="submit" outlined=""></vwc-button>
</vwc-card>
```

### Expansion-panel
![image](https://user-images.githubusercontent.com/7512792/165090809-b03d5748-0914-4f8d-a76a-8bd9a138ed6e.png)
```
<vwc-expansion-panel header="Campaign Details" meta="meta-data" icon="chat-solid" open>
  <div>you can insert here whatever you need :)</div>
</vwc-expansion-panel>
```

### Fixed Top App Bar
![image](https://user-images.githubusercontent.com/7512792/165092295-ecc431e4-9e1c-4ab9-a6d7-4b0013724ddc.png)
```
<vwc-top-app-bar-fixed alternate="true">
  <vwc-icon-button slot="navigationIcon" icon="menu-line"></vwc-icon-button>
  <span slot="title">Top App Bar</span>
  <vwc-icon-button slot="actionItems" icon="twitter-mono"></vwc-icon-button>
  <vwc-icon-button slot="actionItems" icon="facebook-mono"></vwc-icon-button>
  <vwc-icon-button slot="actionItems" icon="heart-solid"></vwc-icon-button>
  <vwc-theme-switch slot="actionItems"></vwc-theme-switch>
</vwc-top-app-bar-fixed>
```

#### For more components see our docs: [Vivid storybook](https://vivid.vonage.com)

#### Have a question or not sure how to use one or more component - contact us in [#ask-vivid](https://vonage.slack.com/archives/C013F0YKH99) Slack channel

