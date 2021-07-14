import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.DislikeCreateArgs>({
  dislike: {
    one: {
      post: {
        create: { title: 'String', user: { create: { email: 'String' } } },
      },
      user: { create: { email: 'String' } },
    },
    two: {
      post: {
        create: { title: 'String', user: { create: { email: 'String' } } },
      },
      user: { create: { email: 'String' } },
    },
  },
})

export type StandardScenario = typeof standard
