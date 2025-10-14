import { Github, Linkedin, BookOpen, Phone, Send } from 'lucide-react';
import { useState } from 'react';

export function SocialLinks() {
    const [showToast, setShowToast] = useState(false);

    const handlePhoneClick = async () => {
        const phoneNumber = "+1234567890"; // Replace with your actual phone number

        try {
            await navigator.clipboard.writeText(phoneNumber);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
        } catch (err) {
            console.error("Failed to copy phone number: ", err);
            // You could show an error toast here too
        }
    };

    return (
        <>
            <div className="flex gap-6 text-slate-400">
                <a href="https://github.com/mengseuToa99" className="hover:text-slate-100 transition-colors duration-300">
                    <Github size={24} />
                </a>
                <a href="https://www.linkedin.com/in/mengseu-tai-b9733b320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-slate-100 transition-colors duration-300">
                    <Linkedin size={24} />
                </a>
                <a href="https://t.me/taimengseu" className="hover:text-slate-100 transition-colors duration-300">
                    <Send size={24} />
                </a>
                <button
                    onClick={handlePhoneClick}
                    className="hover:text-slate-100 transition-colors duration-300 cursor-pointer bg-transparent border-none p-0"
                    title="Copy phone number"
                >
                    <Phone size={24} />
                </button>
                <a href="https://www.facebook.com/share/1GZjU9isVJ/" className="hover:text-slate-100 transition-colors duration-300">
                    <BookOpen size={24} />
                </a>
            </div>

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 ease-in-out z-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Phone number copied to clipboard!</span>
                </div>
            )}
        </>
    );
}