import { useQueryString } from 'useQueryString/hooks/useQueryString'

export const Pagination = ({
  perPage = 10,
  pageRange = 5,
  total,
}: {
  perPage?: number
  pageRange?: number
  total: number
}) => {
  const { queryObject, updateQuery } = useQueryString({ page: 1 })
  const currPage = Number(queryObject.page)
  const lastPage = Math.ceil(total / perPage)
  const nextCount = Math.ceil(currPage / pageRange) - 1

  const handlePage = (page: number) => {
    if (1 > page || page > lastPage) return
    updateQuery({ page })
  }

  return (
    <div id="pagination">
      <button onClick={() => handlePage(currPage - 1)}>&lt;</button>
      {[...new Array(pageRange)].map((_, idx) => {
        const startPage = nextCount * pageRange
        if (startPage + (idx + 1) > lastPage) return
        return (
          <button
            key={idx}
            className={currPage - 1 === startPage + idx ? 'active' : ''}
            onClick={() => {
              handlePage(startPage + (idx + 1))
            }}
          >
            {startPage + (idx + 1)}
          </button>
        )
      })}
      <button onClick={() => handlePage(currPage + 1)}>&gt;</button>
    </div>
  )
}
