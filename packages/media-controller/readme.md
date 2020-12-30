Web Component Analyzer analyzing 1 file...
# vwc-media-controller

Displays controllers for media playback. Includes play/pause button and a scrub bar

## Methods

| Method         | Type                         | Description                                      |
|----------------|------------------------------|--------------------------------------------------|
| `setPlayState` | `(isPlaying: boolean): void` | Sets the component's play state<br /><br />**isPlaying**: A boolean stating whether the component is playing or not (displayed pause/play buttons respectively). |
| `setPosition`  | `(position: number): void`   | Sets the scrubber's position<br /><br />**position**: The relative position of the scrubber (a value between 0-1). |

## Events

| Event                  | Type     | Description                                      |
|------------------------|----------|--------------------------------------------------|
| `userPlayPauseRequest` | `number` | Fires when the user clicks the play/pause button, the "detail" event field will contain a number between zero and one describing the user's relative selected position. |
| `userScrubRequest`     |          | Fires while the user modifies the scrubber's knob location. |

