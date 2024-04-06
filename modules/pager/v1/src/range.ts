/**
 * Pagination algorithm
 *
 * Based on ideas from: https://gist.github.com/kottenator/9d936eb3e4e3c3e02598
 */

const getRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((v, i) => i + start)
}

export const generatePageRange = (currentPage, totalPages) => {
  let delta

  if (totalPages <= 7) {
    // delta === 7: [1 2 3 4 5 6 7]
    delta = 7
  } else {
    // delta === 2: [1 ... 4 5 6 ... 10]
    // delta === 4: [1 2 3 4 5 ... 10]
    delta = currentPage > 4 && currentPage < totalPages - 3 ? 2 : 4
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  }

  if (range.start - 1 === 1 || range.end + 1 === totalPages) {
    range.start += 1
    range.end += 1
  }

  let pages =
    currentPage > delta
      ? getRange(
          Math.min(range.start, totalPages - delta),
          Math.min(range.end, totalPages)
        )
      : getRange(1, Math.min(totalPages, delta + 1))

  const dots = '...' // '&hellip;' or '…'
  const withDots = (value, pair) =>
    pages.length + 1 !== totalPages ? pair : [value]

  if (pages[0] !== 1) {
    pages = withDots(1, [1, dots]).concat(pages)
  }

  if (pages[pages.length - 1] < totalPages) {
    pages = pages.concat(withDots(totalPages, [dots, totalPages]))
  }

  return pages
}

// Quick test
// for (let i = 1, l = 10; i <= l; i++)
//   console.log(`Selected page ${i}:`, generatePageRange(i, l));
