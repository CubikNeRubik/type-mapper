# TypeScript TypeMapper

Inspired by [MaDEiN83](https://github.com/MADEiN83) mapper
and [MarluanEspiritusanto](https://github.com/MarluanEspiritusanto) ts-mapper

## Installation

```bash
$ npm install type-mapper
```

## Usage

### Create map

To create a mapping between two objects, you must call the object method `createMap` of the TypeMapper class.

It takes two types:

-  first type is the source type
-  second type is the destination type

So, if we have an object of type `AnimalDto` and we want a object of type `Animal`, we should create a new mapping like that:

```ts
import { TypeMapper } from "type-mapper";

export class AnimalDto {
    public id: number = 0;
    public lastname: string = '';
    public firstname: string = '';
    public age: number = 0;
}

export class Animal {
    public name: string = '';
    public color: string = '';
    public age: number = 0;
}

function Main() {
   const mapper = new TypeMapper();

   mapper.createMap(AnimalDto, Animal);
}
```

### Map fields

After we create a mapping between types all properties of objects will be mapped aotomatically.

For example, keys `AnimalDto.age` and `AnimalDto.age` will be mapped automatically.

Now we can create all mappings between all wanted properties of our objects (source & destination).

```ts
mapper.createMap<ISource, IDestination>();
   .forMember('ISourceKey', dest: IDestination => dest.key)
```

For example, if we want to map the properties `AnimalDto.firstname and AnimalDto.lastname` to `Animal.name`, we can define rule like that:

```ts
mapper.createMap(AnimalDto, Animal);
   .forMember('name', p => `${p.firstname} ${p.lastname}`)
```

You can chain your rules !

### Conditionnal mapping

`conditions` method allows you to check if the previous `forMember` will be analysed and mapped to the destination object.

Example:
We want to map the property `srcProperty` (source object) into `destProperty` (destination object) only if the property `visible` of the source object is `true`.

```ts
mapper.createMap<ISource, IDestination>();
  .forMember(src => src.srcProperty, dest => dest.destProperty)
  .conditions((s: ISource) => s.visible);
```

The `conditions` method takes two arguments:

-  the source object
-  the destination object

Examples:

```ts
mapper
   .createMap<ISource, IDestination>()
   .forMember(src => src.my_prop, dest => dest.myProp)
   .conditions((s: ISource, d: IDestination) => s.visible);

mapper
   .createMap<ISource, IDestination>()
   .forMember(src => src.my_prop, dest => dest.myProp)
   .conditions((s: ISource, d: IDestination) => s.visible !== d.visible);
```

### Fly and Casts

Sometime the source properties don't match the destination properties.

Example: `AnimalDto.age` can be a `string` and `Animal.age` is a `number`.

To work with, you can cast property by chaining the `is` method after a `forMember`.

```ts
import { TypeMapper, AutoMapperTypes } from "ts-mapper";

mapper
   .createMap<ISource, IDestination>()
   .forMember(p => p.age, p => p.age)
   .is(AutoMapperTypes.NUMBER);
```

### Execution and Mapping

Mapping to new object:
```ts
const human = new AnimalDto();
human.firstname = "Vlad";
human.lastname = "Haidei";
human.age = 18;

const animal = mapper.map(human, Animal);

console.log(animal);
// Animal {
//    name: 'Vlad Haidei',
//    color: '',
//    age: 18
// }
```

Mapping to existed object:
```ts
const human = new AnimalDto();
human.firstname = "Vlad";
human.lastname = "Haidei";
human.age = 21;

const animal = new Animal();
animal.age = 18;
animal.color = 'brown';

const result = mapper.mapTo<AnimalDto, Animal>(human, animal);

console.log(result);
// Animal {
//    name: 'Vlad Haidei',
//    color: 'brown',
//    age: 21
// }
console.log(animal);
// Animal {
//    name: 'Vlad Haidei',
//    color: 'brown',
//    age: 21
// }
console.log(result === animal);
// true
```

Map collection:
```ts
const human = new AnimalDto();
human.firstname = "Vlad";
human.lastname = "Haidei";
human.age = 18;

const dog = new AnimalDto();
dog.firstname = "Bob";
dog.lastname = "Doggy";
dog.age = 3;

const animals = mapper.mapCollection([human, dog], Animal);

console.log('animals', animals);
// [Animal {
//    name: 'Vlad Haidei',
//    color: '',
//    age: 18
// },
// Animal {
//    name: 'Bob Doggy',
//    color: '',
//    age: 3
// }]
```
