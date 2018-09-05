import * as React from 'react'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import { withIntl } from '~/lib/intl'
import { Disponibility } from '~/types/project'

interface ProjectDisponibilityProps {
  readonly value: Disponibility
  readonly relativeTo?: number
}

const ProjectDisponibility: React.SFC<ProjectDisponibilityProps> = ({
  value,
  relativeTo = new Date(),
}) => {
  if (!value) {
    return null
  }

  if (value.type === 'work') {
    return (
      <FormattedMessage id="disponibility.work" defaultMessage="Recorrente" />
    )
  }

  if (!value.job || !value.job.dates) {
    return null
  }

  // Find the next date relative to given date
  let nextDate = value.job.dates.find(
    date => new Date(date.start_date) >= relativeTo,
  )

  // If there isn't a next date, pick the last one
  if (!nextDate) {
    nextDate = value.job.dates[value.job.dates.length - 1]
  }

  return nextDate ? (
    <span>{moment(nextDate.start_date).format('L')}</span>
  ) : null
}
ProjectDisponibility.displayName = 'ProjectDisponibility'

export default withIntl(ProjectDisponibility)
