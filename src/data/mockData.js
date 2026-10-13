/**
 * Demo sessions, shown on Insights only until the user completes a real one.
 * The shape matches the real session documents.
 */
import { dateKey } from '../utils/stats'

const at = (daysAgo, hour, minute = 0) => {
  const d = new Date()
  d.setDate(d.getDate() - daysAgo)
  d.setHours(hour, minute, 0, 0)
  return d
}

// [daysAgo, number of work sessions that day]
const PLAN = [
  [13, 4], [12, 6], [11, 3], [10, 0], [9, 5], [8, 7], [7, 4],
  [6, 8], [5, 5], [4, 2], [3, 6], [2, 9], [1, 7], [0, 5],
]

function buildSessions() {
  const sessions = []
  let id = 0

  for (const [daysAgo, workCount] of PLAN) {
    let hour = 9
    for (let i = 0; i < workCount; i++) {
      const start = at(daysAgo, hour, 0)
      sessions.push({
        id: `demo-${id++}`,
        type: 'work',
        startTime: start.toISOString(),
        endTime: at(daysAgo, hour, 25).toISOString(),
        duration: 25 * 60,
        date: dateKey(start),
        completed: true,
      })

      // Real people skip some breaks
      if ((i + daysAgo) % 5 !== 4) {
        const isLong = (i + 1) % 4 === 0
        const breakMin = isLong ? 15 : 5
        const breakStart = at(daysAgo, hour, 25)
        sessions.push({
          id: `demo-${id++}`,
          type: isLong ? 'long break' : 'short break',
          startTime: breakStart.toISOString(),
          endTime: at(daysAgo, hour, 25 + breakMin).toISOString(),
          duration: breakMin * 60,
          date: dateKey(breakStart),
          completed: true,
        })
      }

      hour += 1
    }
  }

  return sessions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
}

export const mockSessions = buildSessions()
