import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { appConfig } from 'common/constants/appConfig'

type AxiosOptionsType<T> = AxiosRequestConfig & {
  processor?: (data: unknown) => T
  messages?: { [status: number]: string }
  disabledAlert?: boolean
  messageOnly?: boolean
}

const defaultMessages: Record<number | string, string> = {
  400: '잘못된 요청입니다.',
  401: '로그인 세션이 만료되었습니다.',
  403: '접근 권한이 없습니다.',
  404: '요청하신 정보를 찾을 수 없습니다.',
  500: '서버 오류가 발생했습니다.',
  file: '파일 업로드 중 오류가 발생하였습니다.',
  common: '잠시 후 다시 시도해 주세요.',
}

const errorNotify = <ResponseData>(error: AxiosError) => {
  console.error(error)
  const options = error.config as AxiosOptionsType<ResponseData>
  const notify = (message: string) => {
    if (options?.messageOnly) return String
    const notifyType = options?.disabledAlert ? console.log : alert
    notifyType(message)
    return Promise.reject(error)
  }
  const response = error?.response
  const isAxiosError = error instanceof AxiosError
  const isNetworError = !isAxiosError || !response
  if (isNetworError) return notify(defaultMessages[500])

  const { status, data } = response
  const customMessage = options?.messages?.[status]
  const serverMessage = (data as { message?: string })?.message
  if (customMessage) return notify(customMessage)
  if (serverMessage) return notify(serverMessage)
  return notify(defaultMessages[status] ?? defaultMessages.common)
}

const apiClient = axios.create({
  baseURL: appConfig.SERVER_URL,
  withCredentials: true,
})

apiClient.interceptors.request.use(
  (request) => request,
  (error) => errorNotify(error),
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => errorNotify(error),
)

export const http = async <ResponseData>(
  url: string,
  options: AxiosOptionsType<ResponseData>,
): Promise<ResponseData> => {
  const res = await apiClient.request({ url, ...options })
  return options.processor ? options.processor(res.data) : res.data
}
