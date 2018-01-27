import { expect } from 'chai'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'

import UUID from '../src'

import uuidv1 from 'uuid/v1'
import uuidv3 from 'uuid/v3'
import uuidv4 from 'uuid/v4'
import uuidv5 from 'uuid/v5'

const MY_NAMESPACE = uuidv1()
const whiteList = [
  uuidv1(),
  uuidv3('hello.example.com', uuidv3.DNS),
  uuidv3('http://example.com/hello', uuidv3.URL),
  uuidv3('Hello, World!', MY_NAMESPACE),
  uuidv4(),
  uuidv5('hello.example.com', uuidv5.DNS),
  uuidv5('http://example.com/hello', uuidv5.URL),
  uuidv5('Hello, World!', MY_NAMESPACE)
]

const blackList = [
  123,
  'foo',
  [],
  {},
  '00000000-0000-0000-0000-000000000000'
]

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

describe('UUID', () => {
  describe('serialize', () => {
    it('valid value should pass', () => {
      for (let uuid of whiteList) {
        expect(UUID.serialize(uuid)).to.be.equal(uuid)
      }
    })
    it('invalid value should return null', () => {
      for (let uuid of blackList) {
        expect(UUID.serialize(uuid)).to.be.equal(null)
      }
    })
  })

  describe('parseValue', () => {
    it('valid value should pass', async () => {
      for (let uuid of whiteList) {
        let { data } = await graphql(
          schema,
          `query ($uuid: UUID) {
            value(uuid: $uuid)
          }`,
          null,
          null,
          { uuid }
        )
        expect(data.value).to.be.equal(uuid)
      }
    })
    it('invalid value should return errors', async () => {
      for (let uuid of blackList) {
        let data = await graphql(
          schema,
          `query ($uuid: UUID) {
            value(uuid: $uuid)
          }`,
          null,
          null,
          { uuid }
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })

  describe('parseLiteral', () => {
    it('valid value should pass', async () => {
      for (let uuid of whiteList) {
        let { data } = await graphql(
          schema,
          `query { value(uuid: ${JSON.stringify(uuid)}) }`
        )
        expect(data.value).to.be.equal(uuid)
      }
    })
    it('invalid value should return errors', async () => {
      for (let uuid of blackList) {
        let data = await graphql(
          schema,
          `query { value(uuid: ${JSON.stringify(uuid)}) }`
        )
        expect(data.data).to.be.equal(undefined)
        // expect(data.data.value).to.be.equal(undefined)
        expect(data.errors).to.be.an('array')
      }
    })
  })
})
