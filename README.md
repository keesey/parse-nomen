# parse-nomen

A [Node.js](https://nodejs.org) module for parsing biological names.

## Installation

### npm

```sh
npm install parse-nomen --save
```

### yarn

```sh
yarn add parse-nomen
```

## Usage

### Importing

To import in JavaScript:

```javascript
const { parseNomen, NOMEN_PART_CLASSES } = require("parse-nomen")
```

To import in TypeScript:

```typescript
import { parseNomen, NOMEN_PART_CLASSES } from "parse-nomen"
import type { NomenPart, NomenPartClass } from "parse-nomen"
```

### Example Usage

(JavaScript or TypeScript, after importing the function)

```javascript
// List all nomen part classes.
console.log(JSON.stringify(NOMEN_PART_CLASSES))
// Parsing
console.log(JSON.stringify(parseNomen("Homo")))
console.log(JSON.stringify(parseNomen("Homo sapiens")))
console.log(JSON.stringify(parseNomen("Homo sapiens Linnaeus 1758")))
console.log(JSON.stringify(parseNomen("Balæna maximus borealis Knox (of Hamilton not Lesson) 1838")))
console.log(JSON.stringify(parseNomen("Homo sapiens + Praeanthropus afarensis")))
console.log(JSON.stringify(parseNomen("Homonœa fornicata NEWMAN Edward, 1842")))
console.log(JSON.stringify(parseNomen("Yersinia pestis (Lehmann and Neumann 1896) van Loghem, 1944")))
console.log(JSON.stringify(parseNomen("Herpestes fuscus ssp. fuscus Waterhouse, 1838")))
// Getting just the scientific part of the name.
console.log(
    parseNomen("Herpestes fuscus ssp. fuscus Waterhouse, 1838")
        .filter(part => part.class === "scientific")
        .map(part => part.text)
        .join(" "),
)
// Converting to HTML.
console.log(
    parseNomen("Homo sapiens Linnaeus 1758")
        .map(part => `<span class="${part.class}">${part.text}</span>`)
        .join(" "),
)
```

Output:

```sh
> ["citation","comment","operator","rank","scientific","vernacular"]
> [{"text":"Homo","class":"scientific"}]
> [{"text":"Homo sapiens","class":"scientific"}]
> [{"text":"Homo sapiens","class":"scientific"},{"text":"Linnaeus 1758","class":"citation"}]
> [{"text":"Balæna maximus borealis","class":"scientific"},{"text":"Knox (of Hamilton not Lesson) 1838","class":"citation"}]
> [{"text":"Homo sapiens","class":"scientific"},{"text":"+","class":"operator"},{"text":"Praeanthropus afarensis","class":"scientific"}]
> [{"text":"Homonœa fornicata","class":"scientific"},{"text":"NEWMAN Edward, 1842","class":"citation"}]
> [{"text":"Yersinia pestis","class":"scientific"},{"text":"(Lehmann and Neumann 1896) van Loghem, 1944","class":"citation"}]
> [{"text":"Herpestes fuscus","class":"scientific"},{"text":"ssp.","class":"rank"},{"text":"fuscus","class":"scientific"},{"text":"Waterhouse, 1838","class":"citation"}]
> Herpestes fuscus fuscus
> <span class="scientific">Homo sapiens</span> <span class="citation">Linnaeus 1758</span>
```

## Testing

```sh
yarn test
```
