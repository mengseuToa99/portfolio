import { useState } from 'react';

interface ExperienceSectionProps {
    isMobile: boolean;
    isSmallMobile: boolean;
}

const experienceData = [
    {
        period: 'before — present',
        title: 'Information Technology Engineering Student · Rupp →',
        description: 'I have developed several projects showcasing my skills across different technologies. These include Python projects for data analysis and machine learning, a React website integrated with Firebase, a Next.js website connected to a Laravel backend, and a full-featured Laravel website using Livewire. These projects demonstrate my ability to work across both frontend and backend technologies, and my interest in applying modern frameworks and tools to build practical, real-world applications.Owned and maintained the internal reporting system for HR, Sales, Accounting, Customer Service, and Inventory modules. Developed and maintained full-stack applications using Laravel, following MVC architecture and leveraging Eloquent ORM for efficient data management. Designed optimized SQL queries, improving database performance through indexing and query restructuring. Collaborated with cross-functional teams to implement new features and resolve bugs efficiently. Experienced in basic Linux administration, including file system navigation, permissions, and process management, as well as Windows.',
        tech: ['Laravel', 'JQuery', 'Mysql', 'Tailwind Css', 'Datatable'],
    },
    {
        period: '2024 — Present',
        title: 'Web Developer -laravel, Data & Reporting · yeaksa →',
        description: 'Owned and maintained the internal reporting system for HR, Sales, Accounting, Customer Service, and Inventory modules. Developed and maintained full-stack applications using Laravel, following MVC architecture and leveraging Eloquent ORM for efficient data management. Designed optimized SQL queries, improving database performance through indexing and query restructuring. Collaborated with cross-functional teams to implement new features and resolve bugs efficiently. Experienced in basic Linux administration, including file system navigation, permissions, and process management, as well as Windows.',
        tech: ['Laravel', 'JQuery', 'Mysql', 'Tailwind Css', 'Datatable'],
    },
];

export function ExperienceSection({ isMobile = false, isSmallMobile = false }: ExperienceSectionProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const listItems = experienceData.map((job, index) => {
        const isHovered = hoveredIndex === index;
        const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

        return (
            <div
                key={job.title}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                className={`group relative transition-all duration-500 ease-in-out hover:bg-slate-800/50 p-4 md:p-6 rounded-lg ${
                    !isMobile && isOtherHovered ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
                }`}
                style={!isMobile ? {
                    maxHeight: isHovered ? '800px' : isOtherHovered ? '120px' : '200px',
                    overflow: 'hidden',
                } : {}}
            >
                <div className="flex flex-col gap-4">
                    <div className="text-xs text-slate-500 uppercase tracking-wide">{job.period}</div>
                    <div>
                        <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            {job.title}
                        </h3>
                        <p
                            className={`text-slate-400 ${isSmallMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-4 transition-all duration-500`}
                            style={!isMobile ? {
                                display: '-webkit-box',
                                WebkitLineClamp: isHovered ? 'unset' : isOtherHovered ? '2' : '3',
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                            } : {}}
                        >
                            {job.description}
                        </p>
                        <div className={`flex flex-wrap gap-2 transition-opacity duration-300 ${!isMobile && isOtherHovered ? 'opacity-0' : 'opacity-100'}`}>
                            {job.tech.map((tech) => (
                                <span key={tech} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    if (isMobile) {
        return (
            <section id="experience" className="min-h-screen p-6 bg-slate-900">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-100 mb-8">Experience</h2>
                    <div className="space-y-6">{listItems}</div>
                    <div className="mt-8">
                        <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                            View Full Resume
                            <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full bg-slate-900 p-8 min-h-screen">
            <div className="max-w-4xl mx-auto h-full flex flex-col">
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-8">Experience</h2>
                <div className="flex-1 overflow-y-auto pr-4 space-y-6">{listItems}</div>
                <div className="mt-8">
                    <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                        View Full Resume
                        <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}