import type { Prisma } from '@prisma/client'
import type { ResolverArgs, BeforeResolverSpecType } from '@redwoodjs/api'
import { context } from '@redwoodjs/api'

import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

// Used when the environment variable REDWOOD_SECURE_SERVICES=1
export const beforeResolver = (rules: BeforeResolverSpecType) => {
  rules.add(requireAuth)
}

export const likes = () => {
  return db.like.findMany()
}

export const like = ({ id }: Prisma.LikeWhereUniqueInput) => {
  return db.like.findUnique({
    where: { id },
  })
}

interface CreateLikeArgs {
  input: Prisma.LikeCreateInput
}

export const createLike = ({ input }: CreateLikeArgs) => {
  return db.like.create({
    data: { ...input, userId: context.currentUser.sub },
  })
}

interface UpdateLikeArgs extends Prisma.LikeWhereUniqueInput {
  input: Prisma.LikeUpdateInput
}

export const updateLike = ({ id, input }: UpdateLikeArgs) => {
  return db.like.update({
    data: input,
    where: { id },
  })
}

export const deleteLike = ({ id }: Prisma.LikeWhereUniqueInput) => {
  return db.like.delete({
    where: { id },
  })
}

interface DidUserLikePostArgs {
  postId: string
}

export const didUserLikePost = ({ postId }: DidUserLikePostArgs) => {
  return db.like.findFirst({
    where: { postId, userId: context.currentUser?.sub },
  })
}

export const Like = {
  post: (_obj, { root }: ResolverArgs<ReturnType<typeof like>>) =>
    db.like.findUnique({ where: { id: root.id } }).post(),
  user: (_obj, { root }: ResolverArgs<ReturnType<typeof like>>) =>
    db.like.findUnique({ where: { id: root.id } }).user(),
}
