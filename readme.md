# js dependency injection container

## Basic usage:

```js
import boot from 'dic'

boot({
  // service definitions
  config: () => {
    return {
      foo: 'bar'
    }
  },
  app: {
    factory: (config) => createApp(config),
    dependencies: ['config'],
  }
})
  .then((container) => {
    // container ready
    container.service('app').start();
  })
```

## exports

```js
import boot from 'dic'
import {serviceReference, tagReference} from 'dic'
```

- *boot*  
  boot (services: ServiceDefinitions) => Promise<ServiceContainer>  
  promises a booted ServiceContainer
- *serviceReference*  
  casts string to Dependency object (service). eg. `'foo' => '{name: 'foo', type: 'service'}'`
- *tagReference*  
  casts string to Dependency object (tag). eg. `'foo' => '{name: 'foo', type: 'tag'}'`
  
- ServiceDefinitions
  object of `alias: ServiceDefinition`
- ServiceDefinition = ServiceObjectDefinition|ServiceFactory
- ServiceFactory `(...args: any[]): any`
  simple service w/o dependencies
- ServiceObjectDefinition
  ```
  {
    factory: ServiceFactory;
    tags?: string[];
    dependencies?: Array<Dependency|string>;
  }
  ```
  service w/ dependencies. Can also register tags.
- dependencies `Array<Dependency|string>`
  string is a shortcut for service dependency / reference
  can be used to inject services or tags[]
- tags
  service can register itself as one or many tags
  which can be later used via `tagReference(tagname: string)` in other service dependencies
  
## Injecting dependencies

dependencies are injected in the order they are defined in ServiceObjectDefinition

## Circular dependencies
Circular dependencies are prevented via Error when booting

## Internal dependencies
These can be inserted into ServiceObjectDefinition in dependencies
- $get `(dependency: Dependency|string)`
  *throws if container is not booted*
  resolves a Dependency
- $inject `method: () => any, dependencies: ?Array<Dependency|string>, thisArg?: any`
  *throws if container is not booted*
  calls a method with resolved dependencies
- $ready `(callback: (container: ServiceContainer): any)`
  callback is fired after container is ready / booted
