# js dependency injection container


Usage:

```javascript
import boot from 'js-dic'

boot({
  thing: {
    factory: (config) => new Thing(config),
    dependencies: ['config']
  },
  config: () => ({foo: 'bar'}),
}).then(container => {
  console.log('container ready!')
  const thing = container.get('thing');
  thing.stuff(); // do stuff
})
```
