
import React, { useState } from 'react';
import RecruitmentCard from './RecruitmentCard';
import Pagination from '../../../../components/ui/Pagination';
import CreateRecruitmentModal from '../../../../components/ui/CreateRecruitmentModal';
import { Plus } from 'lucide-react';

const Recruitment = () => {
  // Sports data with UK addresses, real images, and Time/Deadline
  const sportsDummyData = [
    {
      id: 1,
      title: 'Youth Football Coach',
      department: 'Coaching',
      location: 'Manchester, M14 6PA, UK',
      status: 'Active',
      applicants: 15,
      time: '10:00 AM-2:00 PM',
      deadline: '15 May 2024',
      image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      title: 'Professional Cricket Analyst',
      department: 'Strategy',
      location: "Lord's, St John's Wood Rd, London NW8 8QN, UK",
      status: 'Active',
      applicants: 7,
      time: '10:00 AM-2:00 PM',
      deadline: '20 May 2024',
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      title: 'Tennis Instructor (Junior)',
      department: 'Training',
      location: 'Wimbledon, London SW19 5AE, UK',
      status: 'Active',
      applicants: 12,
      time: '10:00 AM-2:00 PM',
      deadline: '10 May 2024',
      image: 'https://images.unsplash.com/photo-1595435066311-548c77227448?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      title: 'Rugby Team Physiotherapist',
      department: 'Medical',
      location: 'Twickenham Stadium, Twickenham TW2 7BA, UK',
      status: 'Closed',
      applicants: 24,
      time: '10:00 AM-2:00 PM',
      deadline: 'Expired',
      image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 5,
      title: 'Swimming Pool Manager',
      department: 'Facility Management',
      location: 'Bristol, BS8 1LN, UK',
      status: 'Active',
      applicants: 9,
      time: '10:00 AM-2:00 PM',
      deadline: '25 May 2024',
      image: 'https://images.unsplash.com/photo-1530549387074-d56a992d5256?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 6,
      title: 'Basketball Scout (Regional)',
      department: 'Scouting',
      location: 'Leicester, LE2 7TR, UK',
      status: 'Active',
      applicants: 4,
        time: '10:00 AM-2:00 PM',
      deadline: '30 May 2024',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 7,
      title: 'Equestrian Stable Hand',
      department: 'Support Staff',
      location: 'Cheltenham, GL50 4SH, UK',
      status: 'Draft',
      applicants: 0,
      time: '10:00 AM-2:00 PM',
      deadline: 'N/A',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 8,
      title: 'Golf Pro Shop Manager',
      department: 'Retail',
      location: 'St Andrews, KY16 9XL, UK',
      status: 'Active',
      applicants: 11,
      time: '10:00 AM-2:00 PM',
      deadline: '12 June 2024',
      image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 9,
      title: 'Athletics Meet Organizer',
      department: 'Operations',
      location: 'Birmingham, B42 2BE, UK',
      status: 'Active',
      applicants: 18,
      time: '12:00 PM-4:00 PM',
      deadline: '18 May 2024',
      image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const [items, setItems] = useState(sportsDummyData);
  const [page, setPage] = useState(1);
  const perPage = 9;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const loading = false;
  const error = null;

  const handleEdit = (it) => {
    setSelectedItem(it);
    setIsModalOpen(true);
  };

  const handleDelete = (it) => {
    const updated = items.filter((item) => item.id !== it.id);
    setItems(updated);
  };

  const totalPages = Math.max(1, Math.ceil(items.length / perPage));

  return (
    <div className="dashboardPy">
      <div className="mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#0B544E]">Manage your Listings</h1>
            
          </div>
          <div>
            <button
              onClick={() => {
                setSelectedItem(null);
                setIsModalOpen(true);
              }}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0F766E] px-4 py-3 text-base font-medium whitespace-nowrap text-white transition-colors hover:bg-[#0d655d]"
            >
              <Plus className="h-4 w-4 shrink-0" />
              Add New Listing
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {items.slice((page - 1) * perPage, page * perPage).map((it) => (
          <RecruitmentCard 
            key={it.id} 
            item={it} 
            onEdit={handleEdit} 
            onDelete={() => handleDelete(it)} 
          />
        ))}
      </div>

      {items.length > perPage && (
        <Pagination page={page} total={totalPages} onChange={(p) => setPage(p)} />
      )}

      <CreateRecruitmentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        initialData={selectedItem}
        mode={selectedItem ? 'edit' : 'create'}
      />
    </div>
  );
};

export default Recruitment;