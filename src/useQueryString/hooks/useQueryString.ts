import qs from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type ParamsObejctType = Record<string, string | (string | number)[] | number>

export const useQueryString = <T extends object>(defaultParams?: T) => {
  const [params, setParams] = useSearchParams(
    defaultParams ? qs.stringify(defaultParams) : undefined,
  )

  const [searchValue, setSearchValue] = useState('')

  const queryString = useMemo(() => params.toString(), [params])

  const queryObject = useMemo(
    () => qs.parse(params.toString()),
    [params],
  ) as ParamsObejctType & T

  const updateQuery = useCallback(
    (newParams: ParamsObejctType, deleteParams?: string[]) => {
      const updateParams = { ...queryObject, ...newParams }
      if (deleteParams) deleteParams.forEach((key) => delete updateParams[key])
      setParams(stringifyValues(updateParams))
    },
    [params],
  )

  const replaceQuery = useCallback((newParams: ParamsObejctType) => {
    setParams(stringifyValues(newParams))
  }, [])

  const updateArrayQuery = useCallback(
    (fieldName: string, value: string | number) => {
      const updateParams = { ...queryObject }
      if (!Array.isArray(updateParams[fieldName])) return
      let updateField = [...updateParams[fieldName]]
      if (!updateField.includes(value)) updateField.push(value)
      else updateField = updateField.filter((el) => el !== value)
      setParams(stringifyValues({ ...updateParams, [fieldName]: updateField }))
    },
    [params],
  )

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement> | string) => {
      if (typeof e === 'string') return setSearchValue(e)
      setSearchValue(e.target.value)
    },
    [],
  )

  const onSearch = useCallback(() => {
    updateQuery({ search: searchValue, page: 1 })
  }, [searchValue])

  return {
    defaultParams,
    queryString,
    queryObject,
    updateQuery,
    updateArrayQuery,
    replaceQuery,
    search: {
      value: searchValue,
      onChange: onSearchChange,
      onSubmit: onSearch,
    },
  }
}

const stringifyValues = (obj: ParamsObejctType) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      if (Array.isArray(value)) return [key, value.map(String)]
      else return [key, String(value)]
    }),
  )
}
