import { likes, like, createLike, updateLike, deleteLike } from './likes'
import type { StandardScenario } from './likes.scenarios'

describe('likes', () => {
  scenario('returns all likes', async (scenario: StandardScenario) => {
    const result = await likes()

    expect(result.length).toEqual(Object.keys(scenario.like).length)
  })

  scenario('returns a single like', async (scenario: StandardScenario) => {
    const result = await like({ id: scenario.like.one.id })

    expect(result).toEqual(scenario.like.one)
  })

  scenario('creates a like', async (scenario: StandardScenario) => {
    const result = await createLike({
      input: {
        postId: scenario.like.two.postId,
        userId: scenario.like.two.userId,
      },
    })

    expect(result.postId).toEqual(scenario.like.two.postId)
    expect(result.userId).toEqual(scenario.like.two.userId)
  })

  scenario('updates a like', async (scenario: StandardScenario) => {
    const original = await like({ id: scenario.like.one.id })
    const result = await updateLike({
      id: original.id,
      input: { postId: scenario.like.two.postId },
    })

    expect(result.postId).toEqual(scenario.like.two.postId)
  })

  scenario('deletes a like', async (scenario: StandardScenario) => {
    const original = await deleteLike({ id: scenario.like.one.id })
    const result = await like({ id: original.id })

    expect(result).toEqual(null)
  })
})
