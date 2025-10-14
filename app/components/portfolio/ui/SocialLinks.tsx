import { Github, Linkedin, Package, Instagram, BookOpen } from 'lucide-react';

export function SocialLinks() {
    return (
        <div className="flex gap-6 text-slate-400">
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
                <Github size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
                <Linkedin size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
                <Package size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
                <Instagram size={24} />
            </a>
            <a href="#" className="hover:text-slate-100 transition-colors duration-300">
                <BookOpen size={24} />
            </a>
        </div>
    );
}