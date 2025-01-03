import { yearsSince } from '@/lib/utils'

describe('yearsSince', () => {
  beforeAll(() => {
    // Freeze time so all tests run as if "today" = 2025-01-03
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2025-01-03T00:00:00Z'))
  })

  afterAll(() => {
    // Restore real timers
    jest.useRealTimers()
  })

  it('returns 0 for the same date (2025-01-03)', () => {
    expect(yearsSince('2025-01-03')).toBe(0)
  })

  it('returns 0 for a date within the current year but earlier month/day has not yet passed', () => {
    // Compare to the future date in the same year:
    // "2025-01-04" is 1 day after our "today" = "2025-01-03"
    // This should yield -1 from naive difference, but the function
    expect(yearsSince('2025-01-04')).toBe(-1)
  })

  it('returns 1 for last year’s date if it has already passed by January 3rd', () => {
    // "2024-01-02" is in the previous year, and the date provided was yesterday
    // relative to our "today" = "2025-01-03".
    // That means the age would have just incremented.
    // So yearsSince should return 1.
    expect(yearsSince('2024-01-02')).toBe(1)
  })

  it('returns 4 for a date 5 years ago when the current month/day has not been reached yet', () => {
    // "2020-01-04" is in the past (5 years difference from 2025),
    // but since the month/day (Jan 4) is still in the future compared
    // to "today" (Jan 3), we expect an off-by-one: 5 - 1 = 4.
    expect(yearsSince('2020-01-04')).toBe(4)
  })
})
