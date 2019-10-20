# reactvue-loader

write css in react like vue

- [x] css langs (sass less)
- [x] loader configs
- [ ] css modules
- [ ] scoped
  
### example

```
// main.react.vue
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <div>react</div>
}
ReactDOM.render(<App />, document.getElementById('root'));
<style lang="scss">
  body {
  color: $color;
}
</style>
```

### webpack config

```
rules: [
  {
    test: /\.reactvue$/,
    loader: 'reactvue-loader'
  }
  ....
  ],
plugins: [
    new ReactVueLoaderPlugin(),
    ....
  ],
```