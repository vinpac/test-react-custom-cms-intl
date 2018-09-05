import moment from 'moment'
import { defineMessages } from 'react-intl'
import { Disponibility } from '~/types/project'

const { work } = defineMessages({
  work: {
    id: 'disponibility.work',
    defaultMessage: 'Recorrente',
  },
})

export function formatDisponibility(
  disponibility: Disponibility,
  intl: any,
  relativeTo: Date = new Date(),
): string {
  if (disponibility.type === 'work') {
    return intl.formatMessage(work)
  }

  if (!disponibility.job || !disponibility.job.dates) {
    return ''
  }

  // Find the next date relative to given date
  let nextDate = disponibility.job.dates.find(
    date => new Date(date.start_date) >= relativeTo,
  )

  // If there isn't a next date, pick the last one
  if (!nextDate) {
    nextDate = disponibility.job.dates[disponibility.job.dates.length - 1]
  }

  return nextDate ? moment(nextDate.start_date).format('L') : ''
}
