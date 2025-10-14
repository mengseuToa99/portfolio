interface AboutSectionProps {
    isMobile: boolean;
    isSmallMobile: boolean;
}

export function AboutSection({ isMobile, isSmallMobile }: AboutSectionProps) {
    const content = (
        <div className="space-y-6">
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
               I’m a passionate developer who loves exploring new technologies and applying them to solve real-world problems. I’m highly motivated by curiosity and enjoy experimenting with new tools to create better solutions. I take pride in writing code that makes users happy — even the smallest fix that improves their experience matters to me. I’m also deeply driven by debugging; finding and solving bugs inspires me and gives me great satisfaction.
            </p>
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                Currently working as a Web Developer at{' '}
                <a href="https://arimako.com/" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium">
                    yeaksa
                </a>
                , specializing in developing and managing company-wide reporting systems. I design and implement effective, data-driven reports using interactive data tables to solve operational challenges and improve decision-making. My responsibilities include building and maintaining reports for sales, purchases, expenses, staff management (attendance, leave), delivery tracking, and customer management. I ensure data accuracy and consistency across the system to support business analysis and future predictions.
            </p>
            {/* <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                In the past, I've had the opportunity to develop software across a variety of settings — from{' '}
                <span className="text-slate-100">advertising agencies</span> and{' '}
                <span className="text-slate-100">large corporations</span> to{' '}
                <span className="text-slate-100">start-ups</span> and{' '}
                <span className="text-slate-100">small digital product studios</span>. Additionally, I also released a{' '}
                <span className="text-slate-100">comprehensive video course</span> a few years ago, guiding learners through building a web app with the Spotify API.
            </p> */}
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
               Beyond Laravel, I have hands-on experience with React and Next.js for frontend development, as well as practical knowledge of Git, GitHub, GitLab, and hosting services. I’m passionate about leveraging technology to solve real-world problems and continuously improving through learning and experimentation.
                
            </p>
        </div>
    );

    if (isMobile) {
        return (
            <section id="about" className="min-h-screen p-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-100 mb-8">About</h2>
                    {content}
                </div>
            </section>
        );
    }

    return (
        <section className="w-1/3 flex-shrink-0 p-3 sm:p-4 md:p-8 lg:p-12 xl:p-20 h-screen overflow-hidden">
            <div className="h-full flex flex-col justify-center">{content}</div>
        </section>
    );
}