# graphql-tools-type-uuid

UUID scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)

## Usage

```js
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
