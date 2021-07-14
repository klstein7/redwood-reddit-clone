import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.LikeCreateArgs>({
  like: {
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
