import { Suspense, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        mutations: {
          // onError: (error) => {
          //   console.error(error)
          // },
        },
      },
      queryCache: new QueryCache({
        // onError: () => {},
        // onSuccess: () => {},
      }),
    }),
  )

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary fallback={<div>클라이언트 에러 페이지</div>}>
          <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>
        </ErrorBoundary>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
