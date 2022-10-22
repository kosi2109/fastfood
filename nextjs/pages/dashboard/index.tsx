import React, { useState } from 'react'
import Table from '../../components/dashboard/Table'
import DashboardLayout from '../../components/Layouts/DashboardLayout'
import Modal from '../../components/Modal/Modal'

const testData = {
    colNames : [
        {
            name : 'Item Name',
            key : 'name'
        },
        {
            name : 'Age',
            key : 'age'
        },
    ],
    data : [
        {
            id : 1,
            name : 'Win Win',
            age : 21
        },
        {
            id : 2,
            name : 'Sithu Htet',
            age : 23
        },
    ],
    action : true,
    checkBox : false
}
    const MainDialog = ({data} : any)=> {
        const [formData, setFormData] = useState(data);

        const changeHandaler = (e : any)=> {
            setFormData({
                ...formData,
                [e.target.name] : e.target.value
            })
        }

        return <Modal title="Add New Menu">
            <form className='flex flex-col'>
                <input value={formData.name} onChange={changeHandaler} type="text" name='name' />
                <input value={formData.age} onChange={changeHandaler} type="text" name='age' />
                <button>Submit</button>
            </form>
        </Modal>
    }

const index = ()=> {
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState(null);
    
    console.log(data);
    
  return (
    <DashboardLayout>
        <button onClick={() => setOpenDialog(true)}>Add</button>
        {openDialog && <MainDialog />}
        {data && <MainDialog data={data}/>}
        <Table data={testData} onDataEmmit={setData} />
    </DashboardLayout>
  )
}

export default index