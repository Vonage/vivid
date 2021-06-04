### vwc-datepicker

`vwc-datepicker` component is an extension of [flatpickr](https://flatpickr.js.org/).

#### Date Formatting Tokens

| Character           | Description                                                 | Example                                                         |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| `d`                 | `Day of the month, 2 digits with leading zeros`             | `01 to 31`                                                      |
| `D`                 | `A textual representation of a day`                         | `Mon through Sun`                                               |
| `l (lowercase 'L')` | `A full textual representation of the day of the week`      | `Sunday through Saturday`                                       |
| `j`                 | `Day of the month without leading zeros`                    | `1 to 31`                                                       |
| `J`                 | `Day of the month without leading zeros and ordinal suffix` | `1st, 2nd, to 31st`                                             |
| `w`                 | `Numeric representation of the day of the week`             | `0 (for Sunday) through 6 (for Saturday)`                       |
| `W`                 | `Numeric representation of the week`                        | `0 (first week of the year) through 52 (last week of the year)` |
| `F`                 | `A full textual representation of a month`                  | `January through December`                                      |
| `m`                 | `Numeric representation of a month, with leading zero`      | `01 through 12`                                                 |
| `n`                 | `Numeric representation of a month, without leading zeros`  | `1 through 12`                                                  |
| `M`                 | `A short textual representation of a month`                 | `Jan through Dec`                                               |
| `U`                 | `The number of seconds since the Unix Epoch`                | `1413704993`                                                    |
| `y`                 | `A two digit representation of a year`                      | `99 or 03`                                                      |
| `Y`                 | `A full numeric representation of a year, 4 digits`         | `1999 or 2003`                                                  |
| `Z`                 | `ISO Date format`                                           | `2017-03-04T01:23:43.000Z`                                      |

#### Time Formatting Tokens

| Character | Description                          | Example    |
| --------- | ------------------------------------ | ---------- |
| `H`       | `Hours (24 hours)`                   | `00 to 23` |
| `h`       | `Hours`                              | `1 to 12`  |
| `G`       | `Hours, 2 digits with leading zeros` | `1 to 12`  |
| `i`       | `Minutes`                            | `00 to 59` |
| `S`       | `Seconds, 2 digits`                  | `00 to 59` |
| `s`       | `Seconds`                            | `1 to 59`  |
| `K`       | `AM/PM`                              | `AM or PM` |
