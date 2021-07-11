import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.PostCreateArgs>({
  post: {
    one: { title: 'String', user: { create: { email: 'String6061402' } } },
    two: { title: 'String', user: { create: { email: 'String5890546' } } },
  },
})

export type StandardScenario = typeof standard
