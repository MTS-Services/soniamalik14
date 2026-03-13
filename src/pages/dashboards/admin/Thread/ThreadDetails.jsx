import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FiSend } from 'react-icons/fi';

export default function AdminThreadDetails() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [reply, setReply] = useState('');

    const thread = location.state?.thread || {
        id,
        author: 'Ralph Edwards',
        title: 'Training Tips & Daily Practice',
        description: 'This thread is dedicated to helping women footballers build strong, consistent training habits both on and off the field. Share your daily practice routines, skill drills, warm-up exercises, fitness plans, and recovery methods that help you perform better in matches.\n\nWhether you are a beginner learning the basics or an experienced player refining your technique, this space is for exchanging helpful tips and learning from each other\'s experiences. Discuss topics like ball control, passing accuracy, shooting techniques, defensive training, speed and agility, and match preparation.\n\nYou can also talk about balancing training with daily life, staying motivated, preventing injuries, and maintaining discipline during the season. Support fellow players, celebrate small progress, and grow together through shared football community.',
    };

    // Sample replies - in future, fetch real replies by thread id
    const [replies, setReplies] = useState([
        { id: 1, author: 'Ralph Edwards', content: 'I usually train for 40â€“45 minutes a day, focusing on ball control and passing. Even simple drills help a lot when done consistently.' },
        { id: 2, author: 'Ralph Edwards', content: 'Morning stretching and light cardio have really improved my flexibility and reduced muscle soreness after matches.' },
        { id: 3, author: 'Ralph Edwards', content: 'I watch professional women\'s matches to learn positioning and decision-making. It helps me understand the game better.' },
        { id: 4, author: 'Ralph Edwards', content: 'I practice shooting accuracy at home using cones and targets. It has helped me stay sharp even on busy days.' }
    ]);

    const handleSend = () => {
        if (reply.trim()) {
            const newReply = {
                id: replies.length + 1,
                author: 'You',
                content: reply
            };
            setReplies([...replies, newReply]);
            setReply('');
        }
    };

    return (
        <div className="dashboardPy dashboardSpaceY">
            <div className="">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-teal-600 text-base mb-4"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back
                </button>

                {/* Thread Content */}
                <div className="bg-white rounded-lg p-6 shadow-sm mb-6 w-full lg:max-w-2xl">
                    <div className="text-xs font-medium text-gray-500 mb-2">{thread.author}</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{thread.title}</h1>
                    <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
                        {thread.description}
                    </p>
                </div>

                {/* Reply Section */}
                <div className="bg-white rounded-lg p-6 shadow-sm w-full lg:max-w-2xl mb-6">
                    <h3 className="text-lg font-semibold mb-4">Reply</h3>
                    <div className="space-y-4 mb-4">
                        {replies.map((r) => (
                            <div key={r.id} className="bg-[#F4F4F4] border border-gray-100 rounded p-4">
                                <div className="text-xs font-medium text-gray-500 mb-2">{r.author}</div>
                                <div className="text-base text-gray-700">{r.content}</div>
                            </div>
                        ))}
                    </div>


                </div>
                {/* Reply Input */}
                <div className="bg-white w-full lg:max-w-2xl border border-gray-200 rounded-lg p-3 lg:p-4">
                    <div className="flex gap-2 lg:gap-3 items-start">
                        <textarea
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            placeholder="Write your reply"
                            className="flex-1 rounded-md border border-gray-200 bg-[#F4F4F4] p-3 resize-none h-12 text-base"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-btn-primary text-white rounded-md flex items-center justify-center h-12 w-12"
                        >
                            <FiSend  />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
