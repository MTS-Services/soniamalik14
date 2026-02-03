import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../../../../components/ui/PageHeader'
import Table from '../../../../components/ui/Table'
import TablePagination from '../../../../components/ui/TablePagination'
import { Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { fetchServiceAnalytics } from '../../../../features/service/serviceApi'
import { selectServiceAnalytics, selectAnalyticsLoading } from '../../../../features/service/serviceSlice'

const ServiceAnalytics = () => {
    const dispatch = useDispatch();
    const perPage = 6
    const [page, setPage] = useState(1)

    const data = useSelector(selectServiceAnalytics);
    const loading = useSelector(selectAnalyticsLoading);

    useEffect(() => {
        dispatch(fetchServiceAnalytics());
    }, [dispatch]);

    const total = data.length
    const totalPages = Math.max(1, Math.ceil(total / perPage))
    const startIndex = (page - 1) * perPage
    const pageData = data.slice(startIndex, startIndex + perPage)

    const columns = ['Service Name', 'Service Type', 'Phone', 'ACTIONS']

    const renderRow = (item) => {
        return (
            <>
                <td className="px-4 py-4">
                    <div className="flex items-center gap-4">

                        <div className="text-sm">
                            <div className="font-semibold text-cardTitle">{item.name}</div>
                        </div>
                    </div>
                </td>

                <td className="px-4 py-4 text-cardTitle">{item.type}</td>
                <td className="px-4 py-4 text-cardTitle">{item.phone}</td>
                <td className="px-8 py-4">

                    <Eye className="w-4 h-4" />

                </td>
            </>
        )
    }

    if (loading) {
        return (
            <div className='dashboardPy dashboardSpaceY'>
                <PageHeader title="Service List" />
                <div className="flex justify-center items-center h-64">
                    <p className="text-cardTitle">Loading service analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className='dashboardPy dashboardSpaceY'>
            <PageHeader title="Service List" />

            <div className="mt-4">
                <Table columns={columns} data={pageData} renderRow={renderRow} />
                <TablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    totalResults={total}
                    resultsPerPage={perPage}
                    onPageChange={(p) => setPage(Math.max(1, Math.min(totalPages, p)))}
                />
            </div>
        </div>
    )
}

export default ServiceAnalytics
