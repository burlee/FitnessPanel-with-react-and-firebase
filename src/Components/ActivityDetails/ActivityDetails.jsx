import React from 'react'
import PanelWrapper from '../../UI/PanelWrapper/PanelWrapper'
import Aux from '../../HOC/aux_x'
import ActivityDetailsTable from './ActivityDetailsTable/ActivityDetailsTable'

const ActivityDetails = () => {

  return (
    <Aux>
        <PanelWrapper>
              <ActivityDetailsTable/>
        </PanelWrapper>
    </Aux>
  )
}

export default ActivityDetails;

