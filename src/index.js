import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { GraphQLError } from 'graphql/error'
import isUuid from 'is-uuid'

export default new GraphQLScalarType({
  name: 'UUID',
  description: `UUID scalar type for [graphql-tools](https://github.com/apollographql/graphql-tools)`,
  serialize (value) {
    if (isUuid.anyNonNil(value)) {
      return value
    }
    return null
  },
  parseValue (value) {
    if (isUuid.anyNonNil(value)) {
      return value
    }
    throw new GraphQLError('', [])
  },
  parseLiteral (ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(`Type should be "String", found ${ast.kind}.`, [ast])
    }
    if (isUuid.anyNonNil(ast.value)) {
      return ast.value
    }
    throw new GraphQLError(`Invalid UUID literal.\n${ast.value} is not UUID.`, [ast])
  }
})
