import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Clock, Mail, Phone } from 'lucide-react';
import ApplicationTable from './components/ApplicationTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecruitments, selectRecruitmentById, selectRecruitments } from '../../../../features/recruitment/recruitmentSlice';

const RecruitmentDetails = () => {
    const { id } = useParams();
    const { state } = useLocation();
    const [item, setItem] = useState(state?.item || null);

    const dispatch = useDispatch();
    const recruitments = useSelector(selectRecruitments);
    const recruitmentFromStore = useSelector((s) => selectRecruitmentById(s, id));
    const loading = useSelector((s) => s.recruitment.loading);
    const error = useSelector((s) => s.recruitment.error);

    useEffect(() => {
        if (recruitments.length === 0) {
            dispatch(fetchRecruitments()).catch(() => { });
        }
    }, [dispatch, recruitments.length]);

    useEffect(() => {
        console.log('State item:', state?.item);
        console.log('Recruitment from store:', recruitmentFromStore);
        console.log('All recruitments:', recruitments);

        if (state?.item) {
            setItem(state.item);
        } else if (recruitmentFromStore) {
            setItem(recruitmentFromStore);
        } else if (recruitments.length > 0) {
            // Try to find item again after data loads
            const found = recruitments.find(r => String(r.id) === String(id));
            console.log('Found item:', found);
            setItem(found || null);
        }
    }, [state, id, recruitmentFromStore, recruitments]);

    const backTarget = state?.from === 'recruitment' ? '/coach/recruitment' : '/coach/recruitment';

    // Show loading first, before checking if item exists
    if (loading) return <div className="dashboardPy">Loading recruitment...</div>;
    if (error) return <div className="dashboardPy text-red-600">Error: {error}</div>;
    if (!item) return <div className="dashboardPy">Recruitment not found.</div>;

    return (
        <div className=" dashboardPy dashboardSpaceY  text-gray-800">
            {/* Back Button */}
            <div className="mb-4">
                <Link to={backTarget} className="inline-flex items-center text-sm font-medium text-teal-600 hover:text-teal-700">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </Link>
            </div>

            {/* Main Content Wrapper */}
            <div className="">

                {/* Hero Image */}
                <div className="w-full h-64 md:h-[820px] relative rounded-xl overflow-hidden mb-6">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                </div>


                {/* Left Column: Details */}
                <div className="lg:col-span-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                    </h1>

                    <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line mb-8">
                        {item.description}
                    </div>

                    {/* Date & Time Section */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-700">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span className="font-medium">{item.time}</span>
                        </div>
                    </div>

                    {/* Event Attributes (Age, Sport, Skill, Deadline) */}
                    <div className="space-y-4 text-sm text-gray-800 mb-8">
                        <div>
                            <span className="font-bold block text-gray-900">Skill Level:</span>
                            <span>{item.skillLevel || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Age Group:</span>
                            <span>{item.ageGroup || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Sport Type:</span>
                            <span>{item.sportType || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Last Date to Register:</span>
                            <span>{item.lastDateToRegister || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Training Frequency:</span>
                            <span>{item.trainingFrequency || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Session Format:</span>
                            <span>{item.sessionFormat || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Season Duration:</span>
                            <span>{item.seasonDuration || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Head Coach:</span>
                            <span>{item.headCoach || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Coaching Style:</span>
                            <span>{item.coachingStyle || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Trial Location:</span>
                            <span>{item.trialLocation || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Posted By:</span>
                            <span>{item.postedBy || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Contact Email:</span>
                            <span>{item.contactEmail || 'N/A'}</span>
                        </div>
                        <div>
                            <span className="font-bold block text-gray-900">Phone:</span>
                            <span>{item.phone || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Applicants Table */}
                    <div className="mb-8">
                        <ApplicationTable applicants={item.applicants || []} perPage={9} />
                    </div>
                </div>

            </div>
        </div>
    );
}


export default RecruitmentDetails
