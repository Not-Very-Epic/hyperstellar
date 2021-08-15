# Hyperstellar

Hyperstellar is a TypeScript and JavaScript library that allows for building stars, planets, stellar systems. (And hopefully soon to be much more.)

## Building and testing

First of all, just like any other npm project, you will need to run `npm install`.

`npm run build` should generate build files in `build/`. `npm run test` should run some basic tests using Jest.

## Goals

### Already implemented

- Star temperature and luminosity
- Planets calculate temperature based on luminosity and distance of parent star

### Partially implemented

- Planet atmospheres
- Planet orbits

### Not yet implemented

- Multiple star systems
- Star and planet rotation
- Comets, asteroids, and asteroid belts
- "Civilised" planets with a population, countries, cultures, trade routes, etc
- Interstellar trade routes
- Procedural star and planet maps
- Galaxies

## Contributing

It would be extremely helpful if people could contribute and make this repository cleaner and better! My code looks like a dumpster fire and another little part of me dies inside every time I look at it, so if people could assist with cleaning my code, that'd be great.

[ESLint][eslint] and [Prettier][prettier] are used to enforce code conventions and style in this repository. Hopefully you won't have to worry too much though, as [Husky][husky] should be able to format your code upon commit.

## Credits

- Khalil Stemmler for his [absolutely amazing repository template][sts]

[eslint]: https://eslint.org
[prettier]: https://prettier.io
[husky]: https://typicode.github.io/husky
[sts]: https://github.com/stemmlerjs/simple-typescript-starter