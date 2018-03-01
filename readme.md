# js dependency injection container

v2

- prevents name collisions  
  throws when many services have the same name

- service name is optional  
  some services might be required via tags only - name is not needed

usage:

```js
import boot, {tag, service} from 'dic'

boot([
  {
    name: 'service name', // optional
    tags: 'foo', // optional, string|string[]
    
    factory: (dependency1, dependency2, some_tags) => {},
    dependencies: [
      service('dependency1'),
      service('dependency2'),
      tag('some_tags')
    ] // optional, Dependency|Dependency[]
  }
])
.then(container => {
  //
})

```

```js
type Injectable = {
  factory: ServiceFactory,
  requires?: Dependency|Dependency[],
};
```

builtin services
- $ready (callback: ReadyCallback)
```js
type ReadyCallback = {
  (container: Container): any;
}
```

