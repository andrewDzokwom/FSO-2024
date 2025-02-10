const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper.js')

describe('blogs', () => {
  test('for any array length it returns 1', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('Total likes', () => {
  test(' for empty array return zero(0)', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('for one element return the likes of the element', () => {
    const blogs = [{ id: 1, title: "Post 1", likes: 10 }]
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 10)
  })
  
  test('for bigger list is calculated right', () => {
    const blogs =  [
      { id: 1, title: "Post 1", likes: 10 },
      { id: 2, title: "Post 2", likes: 25 },
      { id: 3, title: "Post 3", likes: 15 }
  ]
  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 50)
  })
})

describe('fav blog', () => {
  test('empty array return empty object', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, {})
  })

  test('for bigger  array return the blog with hisghest  votes/likes', () => {
    const blogs =  [
      { id: 1, title: "Post 1", likes: 10 },
      { id: 2, title: "Post 2", likes: 25 },
      { id: 3, title: "Post 3", likes: 15 }
    ]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1])
  })
})