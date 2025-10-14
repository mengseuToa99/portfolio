interface NavigationProps {
    activeSection: string;
    scrollToSection: (index: number) => void;
}

export function Navigation({ activeSection, scrollToSection }: NavigationProps) {
    return (
        <nav className="mb-16">
            <ul className="space-y-4">
                {['about', 'experience', 'projects'].map((section) => (
                    <li key={section}>
                        <button
                            onClick={() => {
                                const sectionIndex = ['about', 'experience', 'projects'].indexOf(section);
                                scrollToSection(sectionIndex);
                            }}
                            className="group flex items-center gap-4 text-sm uppercase tracking-widest"
                        >
                            <span
                                className={`h-px transition-all duration-300 ${activeSection === section
                                        ? 'w-16 bg-slate-100'
                                        : 'w-8 bg-slate-600 group-hover:w-16 group-hover:bg-slate-300'
                                    }`}
                            />
                            <span
                                className={`transition-colors duration-300 ${activeSection === section ? 'text-slate-100' : 'text-slate-500 group-hover:text-slate-100'
                                    }`}
                            >
                                {section}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}