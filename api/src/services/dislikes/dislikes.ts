import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'

import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const dislikes = () => {
  return db.dislike.findMany()
}

export const dislike = ({ id }: Prisma.DislikeWhereUniqueInput) => {
  return db.dislike.findUnique({
    where: { id },
  })
}

interface CreateDislikeArgs {
  input: Prisma.DislikeCreateInput
}

export const createDislike = ({ input }: CreateDislikeArgs) => {
  return db.dislike.create({
    data: { ...input, userId: context.currentUser.sub },
  })
}

interface UpdateDislikeArgs extends Prisma.DislikeWhereUniqueInput {
  input: Prisma.DislikeUpdateInput
}

export const updateDislike = ({ id, input }: UpdateDislikeArgs) => {
  return db.dislike.update({
    data: input,
    where: { id },
  })
}

export const deleteDislike = ({ id }: Prisma.DislikeWhereUniqueInput) => {
  return db.dislike.delete({
    where: { id },
  })
}

interface DidUserDislikePostArgs {
  postId: string
}

export const didUserDislikePost = ({ postId }: DidUserDislikePostArgs) => {
  return db.dislike.findFirst({
    where: { postId, userId: context.currentUser?.sub },
  })
}

export const Dislike = {
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof dislike>>) =>
    db.dislike.findUnique({ where: { id: root.id } }).post(),
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof dislike>>) =>
    db.dislike.findUnique({ where: { id: root.id } }).user(),
}
