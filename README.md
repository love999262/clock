### A simple plugin of clock,support dial mode and digital mode.

[repertory](https://github.com/love999262/clock)

[Demo](https://love999262.github.io/clock/demo/index.html)

- Install

NPM
```
$npm install kaguya-clock 
```
or
```
<script type="text/javascript" src="/dist/clock.js"></script>
```

- API

| key                  | value                            | description  |
| -------------------- |:--------------------------------:| ------------:|
| selector             | '.clock'                         | the root node
| type                 | 'dial'/'digital'                 | mode type
| renderType           | 'css'/'canvas'                   | render type
| color                | '#fff'/'rgba(255,255,255,1)'     | the stroke color
| bgColor              | '#fff'/'rgba(255,255,255,1)'     | the bgcolor
| dial.hasTimeLabel    | true/false                       | set TimeLabel
| dial.hasTimeLabel    | true/false                       | set broder   
| digital              | object                           | digital config       
| digital.fontSize     | 12                               | fontsize of digital         

```javascript
const clock = new Clock({
    selector: '.clock',
    type: 'dial',
    renderType: 'css',
    color: '#fff',
    bgColor: 'rgba(0, 0, 0, .35)',
    dial: {
        hasTimeLabel: true,
        hasBorder: true,
    },
    digital: {
        fontSize: 12,
    },
}); 
```
- warn

the dial css type force hide the timeLabel while the container's size less than 80px, if you want to show it change the condition in dial.js.

- TODO List
 - <del>canvas mode</del>
 - <del>timelabel mode</del>
 - show week and month
 - performance optimization
 - drag mode

### if you want to contribute code view [build](./build.md)