import React from 'react'
import Card from '../../../../../components/ui/Card'
import Button from '../../../../../components/ui/Button'
import { FiEdit, FiTrash2 } from 'react-icons/fi'

const NewsCard = ({ news, onEdit, onDelete, selected = false, onSelect, className = '' }) => {
    const handleEditClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onEdit?.(news)
    }

    const handleDeleteClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        onDelete?.(news)
    }

    return (
        <Card className={`p-4 h-full flex flex-col justify-between rounded-lg !bg-[#FFFFFF] ${className}`}>
            <div className="flex-1">
                <div className="relative">
                    <label className="absolute top-3 right-3 z-20 inline-flex items-center">
                        <input type="checkbox" checked={!!selected} onChange={(e) => { e.stopPropagation(); onSelect?.(news.id ?? news._id ?? news.newsId ?? news?.data?.id, e.target.checked) }} className="w-4 h-4" />
                    </label>
                    {news.tag && (
                        <div className="absolute top-3 left-3 z-10 rounded-md px-3 py-1 text-base font-medium text-[#0F766E] bg-[#E7F1F1]">
                            {news.tag}
                        </div>
                    )}

                    <div className="h-36 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                        {news.img ? (
                            <img
                                src={news.img}
                                alt={news.title}
                                className="w-full h-full rounded-md object-cover"
                                onError={(e) => { e.target.src = '/images/detaisPage/yoga1.jpg' }}
                            />
                        ) : (
                            <div className="text-[#000000] bg-[#D9D9D9] rounded-md p-4">Image</div>
                        )}
                    </div>
                </div>

                <h3 className="text-[#282828] font-semibold text-lg mb-2 ">{news.title}</h3>
                <div
                    className="text-base text-[#363636] mb-2 min-h-[40px]"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {news.desc}
                </div>
            </div>

            <div className="mt-2" onClick={(e) => e.preventDefault()}>
                <div className="flex gap-3">
                    <Button
                        onClick={handleEditClick}
                        className="w-1/2 rounded-lg flex items-center justify-center gap-2 !border-2 !border-[#0F766E] !bg-[#E7F1F1] !text-[#0E6B64] "
                        variant="primary"
                    >
                        <FiEdit className="w-4 h-4" /> <span>Edit</span>
                    </Button>

                    <Button
                        onClick={handleDeleteClick}
                        className="w-1/2 rounded-lg flex items-center justify-center gap-2 !border-2 !border-[#0F766E] !bg-[#E7F1F1] !text-[#0E6B64] "
                        variant="outline"
                    >
                        <FiTrash2 className="w-4 h-4" /> <span>Delete</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default NewsCard
