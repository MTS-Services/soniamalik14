import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecruitments, selectRecruitmentById, selectRecruitments } from '../../../../features/recruitment/recruitmentSlice';

import HeroBanner from './components/HeroBanner';
import TitleCoachInfo from './components/TitleCoachInfo';
import SessionDetailsCard from './components/SessionDetailsCard';
import SessionOverview from './components/SessionOverview';
import VenueInformation from './components/VenueInformation';
import ContactOrganiser from './components/ContactOrganiser';
import BookingsTable from './components/BookingsTable';
import RegisteredInterestTable from './components/RegisteredInterestTable';
import EnquiriesTable from './components/EnquiriesTable';

const RecruitmentDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [item, setItem] = useState(state?.item || null);

    const dispatch = useDispatch();
    const recruitments = useSelector(selectRecruitments);
    const recruitmentFromStore = useSelector((s) => selectRecruitmentById(s, id));
    const loading = useSelector((s) => s.recruitment?.loading);
    const error = useSelector((s) => s.recruitment?.error);

    useEffect(() => {
        if (recruitments.length === 0) {
            dispatch(fetchRecruitments()).catch(() => { });
        }
    }, [dispatch, recruitments.length]);

    useEffect(() => {
        if (state?.item) {
            setItem(state.item);
        } else if (recruitmentFromStore) {
            setItem(recruitmentFromStore);
        } else if (recruitments.length > 0) {
            const found = recruitments.find(r => String(r.id) === String(id));
            setItem(found || null);
        }
    }, [state, id, recruitmentFromStore, recruitments]);

    const backTarget = state?.from === 'recruitment' ? '/coach/recruitment' : '/coach/recruitment';

    // Mock Data
    const bookingsData = [
        { name: 'Marvin McKinney', phone: '(704) 555-0127', email: 'willie.jennings@example.com' },
        { name: 'Eleanor Pena', phone: '(702) 555-0122', email: 'jessica.hanson@example.com' },
        { name: 'Jacob Jones', phone: '(302) 555-0107', email: 'alma.lawson@example.com' },
        { name: 'Annette Black', phone: '(603) 555-0123', email: 'nevaeh.simmons@example.com' },
        { name: 'Dianne Russell', phone: '(219) 555-0114', email: 'dolores.chambers@example.com' },
        { name: 'Albert Flores', phone: '(406) 555-0120', email: 'jackson.graham@example.com' },
    ];

    const registeredInterestData = [
        { name: 'Marvin McKinney', phone: '(704) 555-0127', email: 'willie.jennings@example.com' },
        { name: 'Eleanor Pena', phone: '(702) 555-0122', email: 'jessica.hanson@example.com' },
        { name: 'Jacob Jones', phone: '(302) 555-0107', email: 'alma.lawson@example.com' },
    ];

    const enquiriesData = [
        { name: 'Devon Lane', phone: '(405) 555-0128', email: 'jackson.graham@example.com', msg: 'Aliquam porta nisl dolor, molestie pellentesque elit...', date: '12 Mar 26' },
        { name: 'Marvin McKinney', phone: '(704) 555-0127', email: 'michael.mitc@example.com', msg: 'In a laoreet purus. Integer turpis quam...', date: '12 Mar 26' },
    ];

    if (loading) return <div className="p-8 font-sans">Loading recruitment...</div>;
    if (error) return <div className="p-8 font-sans text-red-600">Error: {error}</div>;
    if (!item) return <div className="p-8 font-sans">Recruitment not found.</div>;

    return (
        <div className="bg-[#F8FAFB] min-h-screen p-4 md:p-8 text-[#1F2937] font-sans">
            <div className="space-y-8">

                {/* Back Button */}
                <div>
                    <Link to={backTarget} className="inline-flex items-center text-sm font-semibold text-[#0F766E] hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back
                    </Link>
                </div>

                {/* Hero Banner */}
                <HeroBanner item={item} />

                {/* Title & Coach Info */}
                <TitleCoachInfo item={item} />

                {/* Session Details Card */}
                <SessionDetailsCard item={item} />

                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    <SessionOverview item={item} />
                    <VenueInformation item={item} />
                    <ContactOrganiser />
                </div>

                {/* Tables Section */}
                <BookingsTable data={bookingsData} />
                <RegisteredInterestTable data={registeredInterestData} />
                <EnquiriesTable data={enquiriesData} />

            </div>
        </div>
    );
}

export default RecruitmentDetails;