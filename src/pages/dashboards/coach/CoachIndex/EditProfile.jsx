import React, { useState, useRef } from 'react'
import PageHeader from '../../../../components/ui/PageHeader'
import Card from '../../../../components/ui/Card'
import { Camera } from 'lucide-react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const EditProfile = () => {
    const [form, setForm] = useState({
        clubName: '',
        about: '',
        email: '',
        phone: '',
        location: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [avatar, setAvatar] = useState('/coachindex.jpg');
    const [avatarFile, setAvatarFile] = useState(null);
    const fileRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    };

    const handleAvatarPick = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const url = URL.createObjectURL(file);
            setAvatar(url);
        }
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        // Basic validation example
        if (form.newPassword && form.newPassword !== form.confirmPassword) {
            alert('New password and confirm password do not match');
            return;
        }

        const payload = {
            ...form,
            avatarFileName: avatarFile?.name || null,
        };
        console.log('Save profile payload:', payload);
        // show toast using react-toastify
        toast.success('Profile saved');
    };



    return (
        <div className='dashboardPy dashboardSpaceY'>
            
            <PageHeader title="Settings" description="Manage your account settings and preferences" ctaText="Save" onCtaClick={handleSubmit} />

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="mt-6">
                <div className="rounded-xl bg-[#91C0BC] p-6">
                    <div className="">
                        <h3 className="text-2xl font-semibold mb-4">Personal Details</h3>

                        <Card className="p-6">

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="flex-shrink-0">
                                    <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gray-100 ">
                                        <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => fileRef.current?.click()}
                                            className="absolute bottom-2 right-2 z-10 bg-white p-2 rounded-full shadow-md border"
                                            title="Change avatar"
                                            aria-label="Change avatar"
                                        >
                                            <Camera className="h-4 w-4 text-gray-700" />
                                        </button>
                                        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
                                    </div>
                                </div>
                                <div className="flex items-start gap-6">


                                    <div className="flex-1">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Club Name</label>
                                                <input name="clubName" value={form.clubName} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">About Club</label>
                                                <textarea name="about" value={form.about} onChange={handleChange} rows={5} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Email</label>
                                                <input name="email" value={form.email} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Phone Number</label>
                                                <input name="phone" value={form.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Location</label>
                                                <input name="location" value={form.location} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Old Password</label>
                                                <input name="oldPassword" type="password" value={form.oldPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">New Password</label>
                                                <input name="newPassword" type="password" value={form.newPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>

                                            <div>
                                                <label className="block text-base text-gray-700 mb-1">Confirm New Password</label>
                                                <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} className="w-full border border-gray-300 rounded-md px-3 py-2" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
