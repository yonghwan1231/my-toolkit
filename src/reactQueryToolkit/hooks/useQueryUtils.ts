import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeyFactory } from 'reactQueryToolkit/constants/queryKeyFactory'

export const useQueryUtils = () => {
  const queryClient = useQueryClient()
  const [queryKeys] = useState(queryKeyFactory)

  const getQueryData = (queryKey: string[]) => {
    return queryClient.getQueryData(queryKey)
  }

  const invalidateQueries = (...queryKeys: string[][]) => {
    queryKeys.forEach((queryKey) => {
      queryClient.invalidateQueries({
        queryKey,
      })
    })
  }

  return {
    queryKeys,
    getQueryData,
    invalidateQueries,
  }
}
