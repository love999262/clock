### A simple plugin of clock,support dial mode and digital mode.

- build

```
$ npm run build
```

- developer

```
$ npm run dev
```

API

```javascript
const clock = new Clock({
    selector: '.clock',
    type: 'digital',
    renderType: 'css',
    color: '#fff',
    bgColor: '#000',
    prefix: 'syg-clock',
    dial: {},
    digital: {
        fontSize: 12,
    },
}); 
```

- TODO List
 - canvas mode
 - timelabel
 - show week and month
 - performance optimization

Q&A

Q: how i use clock with timeable now?

A: you can set a background with timelabel with panel.