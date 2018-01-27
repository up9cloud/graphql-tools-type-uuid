# graphql-tools-type-uuid

[![Build Status](https://travis-ci.org/up9cloud/graphql-tools-type-uuid.svg?branch=master)](https://travis-ci.org/up9cloud/graphql-tools-type-uuid)
[![Coverage Status](https://coveralls.io/repos/github/up9cloud/graphql-tools-type-uuid/badge.svg?branch=master)](https://coveralls.io/github/up9cloud/graphql-tools-type-uuid?branch=master)

UUID scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools'
import UUID from 'graphql-tools-type-uuid'

let typeDefs = [`
scalar UUID
type Query {
  value(uuid: UUID): UUID
}`
]
let resolvers = {
  UUID,
  Query: {
    value: (root, { uuid }) => uuid
  }
}
let schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
```

## Minimum module files

```console
$ tree ./node_modules/graphql-tools-type-uuid
./node_modules/graphql-tools-type-uuid
├── README.md
├── dist
│   └── index.js
└── package.json

1 directory, 3 files
```
