import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import Button from './Button';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const EventCard = ({ item = {}, editLink, onEdit, onDelete, className = '' }) => {
    return (
        <Card
            className={`p-4 h-full flex flex-col  justify-between rounded-lg border !border-[#B5D5D2] bg-white ${className}`}
        >
            <div>
                <div className="relative">
                    {item.type && (
                        <div className="absolute top-3 left-3 bg-secondary text-btn-primary rounded-full px-3 py-1 text-sm font-semibold">{item.type}</div>
                    )}

                    <div className="h-44 bg-gray-200 rounded-md mb-4 overflow-hidden flex items-center justify-center">
                        {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover rounded-md" />
                        ) : (
                            <div className="text-gray-400">Image</div>
                        )}
                    </div>
                </div>

                <h3 className="text-[#282828] font-semibold text-lg mb-2">{item.title}</h3>

                <div className="text-sm text-[#363636] mb-3 flex items-start gap-2 flex-col">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#363636]" /> <span className="text-sm">{item.day}</span></div>
                </div>

                <div className="text-sm text-[#363636] mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#363636]" />
                    <span className="text-sm">{item.location}</span>
                </div>


            </div>

            <div className="mt-2">
                <div className="flex gap-3">
                    {editLink ? (
                        <Link to={editLink} className="w-1/2">
                            <Button className="w-full rounded-lg flex items-center justify-center gap-2" variant="primary">
                                <FiEdit className="w-4 h-4" /> <span>Edit</span>
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={onEdit} className="w-1/2 rounded-lg flex items-center justify-center gap-2" variant="primary">
                            <FiEdit className="w-4 h-4" /> <span>Edit</span>
                        </Button>
                    )}

                    <Button onClick={onDelete} className="w-1/2 rounded-lg flex items-center justify-center gap-2" variant="outline">
                        <FiTrash2 className="w-4 h-4" /> <span>Delete</span>
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default EventCard;
