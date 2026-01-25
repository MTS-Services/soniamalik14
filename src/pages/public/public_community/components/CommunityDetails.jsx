import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../../../../components/layout/Container';
import SectionHeader from '../../../../components/ui/SectionHeader';
import CategorySidebar from './CategorySidebar';
import Button from '../../../../components/ui/Button';
import { FiSend } from 'react-icons/fi';
import NewDiscussionModal from './NewDiscussionModal';

const CommunityDetails = () => {
    const [isLoggedIn] = useState(true);
    const [reply, setReply] = useState('');
    const [showNewDiscussion, setShowNewDiscussion] = useState(false);

    const topic = {
        id: 1,
        author: 'Ralph Edwards',
        avatar: '/images/login/image_2.jpg',
        title: 'Training Tips & Daily Practice',
        content: `This thread is dedicated to helping women footballers build strong, consistent training habits both on and off the field. Share your daily practice routines, skill drills, warm-up exercises, fitness plans, and recovery methods that help you perform better in matches.

Whether you are a beginner learning the basics or an experienced player refining your technique, this space is for exchanging practical advice, asking questions, and learning from each other's experiences. Discuss topics like ball control, passing accuracy, shooting drills, endurance training, speed and agility, and match preparation.`,
    };

    const replies = [
        { id: 1, author: 'Ralph Edwards', text: 'I usually train for 45–60 minutes a day, focusing on ball control and passing. Even simple drills help a lot when done consistently.' },
        { id: 2, author: 'Ralph Edwards', text: 'Morning stretching and light cardio have really improved my flexibility and reduced muscle soreness.' },
        { id: 3, author: 'Ralph Edwards', text: 'I watch professional women’s matches to learn positioning and decision-making. It helps me understand the game better.' },
        { id: 4, author: 'Ralph Edwards', text: 'I practice shooting accuracy at home using cones and targets. It has helped me stay sharp even on busy days.' }
    ];

    const handleSend = () => {
        if (!reply.trim()) return;
        // placeholder: add send logic
        setReply('');
    };

    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 py-4 lg:py-8">
            <Container>
                {/* Mobile: stacked layout */}
                <div className="space-y-3 mb-4 lg:hidden">
                    <button onClick={() => navigate('/community')} className="flex items-center gap-2 text-sm text-btn-primary hover:underline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                    </button>
                    
                    <div className="flex items-start justify-between gap-4">
                        <SectionHeader
                            title="Community Forum"
                            description="Connect, chat, and support each other."
                            align="left"
                        />
                        <Button variant="primary" className="rounded-md shrink-0" onClick={() => setShowNewDiscussion(true)}>New Discussion</Button>
                    </div>
                </div>

                {/* Desktop: Back and Button at top, Header below */}
                <div className="hidden lg:block mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => navigate('/community')} className="flex items-center gap-2 text-sm text-btn-primary hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            Back
                        </button>
                        
                    </div>
                    <div className='flex justify-between items-center lg:flex-row flex-col'>
                        <SectionHeader
                        title="Community Forum"
                        description="Connect, chat, and support each other."
                        align="left"
                    />
                    <Button variant="primary" className="rounded-md" onClick={() => setShowNewDiscussion(true)}>New Discussion</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="hidden lg:block lg:col-span-1">
                        <CategorySidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <div className="bg-white border border-gray-200 rounded-lg p-4 lg:p-6 mb-3 lg:mb-6">
                            <div className="flex items-start gap-3 mb-3">
                                <img src={topic.avatar} alt={topic.author} className="w-8 h-8 rounded-full object-cover" />
                                <div>
                                    <div className="text-xs text-gray-500">{topic.author}</div>
                                    <h2 className="subtitle text-cardTitle font-semibold mt-1">{topic.title}</h2>
                                </div>
                            </div>

                            <div className="prose max-w-none text-sm text-gray-700 mb-4 whitespace-pre-line">
                                {topic.content}
                            </div>

                            <div className="text-sm text-gray-500 font-medium mb-3">Reply</div>

                            <div className="space-y-2 lg:space-y-3">
                                {replies.map((r) => (
                                    <div key={r.id} className="bg-gray-50 border border-gray-200 rounded-md p-3 shadow-sm">
                                        <div className="flex items-start gap-3 mb-2">
                                            <div className="bg-amber-100 rounded-full p-1">
                                                <img src="/images/login/image_2.jpg" alt={r.author} className="w-6 h-6 rounded-full object-cover" />
                                            </div>
                                            <div className="text-sm font-medium text-gray-700">{r.author}</div>
                                        </div>
                                        <div className="text-sm text-gray-600">{r.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Separate box for input */}
                        <div className="bg-white border border-gray-200 rounded-lg p-3 lg:p-4">
                            <div className="flex gap-2 lg:gap-3 items-start">
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Write your reply"
                                    className="flex-1 rounded-md border border-gray-200 p-3 resize-none h-12  text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="bg-btn-primary text-white rounded-md flex items-center justify-center h-12 w-12"
                                >
                                    <FiSend />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
            <NewDiscussionModal
                open={showNewDiscussion}
                onClose={() => setShowNewDiscussion(false)}
                onSubmit={(data) => {
                    // placeholder: handle new thread creation (send to API or state)
                    console.log('New thread submitted', data);
                }}
            />
        </div>
    );
};

export default CommunityDetails;