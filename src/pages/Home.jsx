import React from 'react'
import Search from '../components/Home/Search'
import AddItem from '../components/Home/AddItem'
import Table from '../components/Home/Table'

const Home = () => {
    return (
        <div>
            <div className='flex justify-center items-center space-x-2'>
                <Search />
                <AddItem />
            </div>

            <div className='mt-10'>
                <Table />
            </div>
        </div>
    )
}

export default Home