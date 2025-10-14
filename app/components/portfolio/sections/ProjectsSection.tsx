interface ProjectsSectionProps {
    isMobile: boolean;
    isSmallMobile: boolean;
}

const projectsData = [
    {
        title: 'Build a Spotify Connected App →',
        description: 'Video course that teaches how to build a web app with the Spotify API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, and more.',
        tech: ['React', 'Express', 'Spotify API', 'Node'],
    },
    {
        title: 'Spotify Profile →',
        description: 'Web app for visualizing personalized Spotify data. View your top artists, tracks, and playlists, see detailed audio information, and create and save new playlists.',
        tech: ['React', 'Express', 'Styled Components', 'Spotify API'],
    },
    {
        title: 'Halcyon Theme →',
        description: 'A minimal, dark blue theme for VS Code, Sublime Text, Atom, and more. Available on Visual Studio Marketplace, Package Control, and Atom Package Manager.',
        tech: ['VS Code', 'Sublime Text', 'Theme'],
    },
];

export function ProjectsSection({ isMobile, isSmallMobile }: ProjectsSectionProps) {
    const listItems = projectsData.map((project) => (
        <div key={project.title} className="group relative transition-all duration-300 hover:bg-slate-800/50 p-4 md:p-6 rounded-lg">
            <div className="flex flex-col">
                <h3 className="text-slate-100 font-medium mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                </h3>
                <p className={`text-slate-400 ${isSmallMobile ? 'text-xs' : 'text-sm'} leading-relaxed mb-4`}>
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-3 py-1 bg-blue-400/10 text-blue-400 rounded-full text-xs">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    ));

    if (isMobile) {
        return (
            <section id="projects" className="min-h-screen p-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-100 mb-8">Projects</h2>
                    <div className="space-y-6">{listItems}</div>
                    <div className="mt-8">
                        <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                            View Full Project Archive
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
                <h2 className="text-sm font-bold text-slate-100 uppercase tracking-widest mb-8">Projects</h2>
                <div className="flex-1 overflow-y-auto pr-4 space-y-6">{listItems}</div>
                <div className="mt-8">
                    <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium text-sm inline-flex items-center group">
                        View Full Project Archive
                        <span className="ml-2 group-hover:ml-3 transition-all duration-300">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
}