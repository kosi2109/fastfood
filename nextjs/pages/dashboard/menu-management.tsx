import React from 'react'
import ContentWrapper from '../../components/dashboard/ContentWrapper'
import Table from '../../components/dashboard/Table'
import DashboardLayout from '../../components/Layouts/DashboardLayout'

function MenuManagement() {
  return (
    <DashboardLayout>
        <ContentWrapper name="Menu Management">
            <Table/>
        </ContentWrapper>
    </DashboardLayout>
  )
}

export default MenuManagement