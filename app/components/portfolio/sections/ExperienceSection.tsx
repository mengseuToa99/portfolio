interface ExperienceSectionProps {
    isMobile: boolean;
    isSmallMobile: boolean;
}

const experienceData = [
    {
        period: '2024 — Present',
        title: 'Senior Frontend Engineer, Accessibility · Klaviyo →',
        description: 'Build and maintain critical components used to construct Klaviyo\'s frontend, across the whole product. Work closely with cross-functional teams to implement accessible UI patterns and ensure WCAG compliance throughout the platform.',
        tech: ['React', 'TypeScript', 'Accessibility', 'Design Systems'],
    },
    {
        period: '2018 — 2024',
        title: 'Senior Frontend Engineer · Upstatement →',
        description: 'Delivered high-quality, robust production code for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, and more.',
        tech: ['JavaScript', 'React', 'Vue', 'SCSS', 'WordPress'],
    },
    {
        period: '2016 — 2018',
        title: 'Frontend Developer · MullenLowe →',
        description: 'Collaborated with creative and development teams to create custom advertising solutions and engaging digital experiences for major brand campaigns.',
        tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    },
    {
        period: '2015 — 2016',
        title: 'Web Developer · Starry →',
        description: 'Worked on a team responsible for building the front-end of Starry\'s customer-facing web app. Developed and styled interactive web pages using ES6, Handlebars, and CSS.',
        tech: ['JavaScript', 'HTML', 'CSS', 'Handlebars'],
    },
];

export function ExperienceSection({ isMobile, isSmallMobile }: ExperienceSectionProps) {
    const listItems = experienceData.map((job) => (
        <div key={job.title} className="group relative transition-all duration-300 hover:bg-slate-800/50 p-4 md:p-6 rounded-lg">
            <div className="flex flex-col gap-4">
                <div className="text-xs text-slate-500 uppercase tracking-wide">{job.period}</div>
                <div>
                    <h3 className="text-slate-100 font-medium mb-2 group-hover:text-blue-400 transition-colors duration-300">
                        {job.title}
                    </h3>
                    <p className={`text-slate-400 ${isSmallMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-4`}>
                        {job.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {job.tech.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    ));

    if (isMobile) {
        return (
            <section id="experience" className="min-h-screen p-6">
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
        <section className="w-1/3 flex-shrink-0 p-3 sm:p-4 md:p-8 lg:p-12 xl:p-20 h-screen overflow-hidden">
            <div className="h-full flex flex-col">
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