interface AboutSectionProps {
    isMobile: boolean;
    isSmallMobile: boolean;
}

export function AboutSection({ isMobile, isSmallMobile }: AboutSectionProps) {
    const content = (
        <div className="space-y-6">
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                I'm a developer passionate about crafting accessible, pixel-perfect user interfaces that blend thoughtful design with robust engineering. My favorite work lies at the intersection of design and development, creating experiences that not only look great but are meticulously built for performance and usability.
            </p>
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                Currently, I'm a Senior Front-End Engineer at{' '}
                <a href="#" className="text-slate-100 hover:text-blue-400 transition-colors duration-300 font-medium">
                    Klaviyo
                </a>
                , specializing in accessibility. I contribute to the creation and maintenance of UI components that power Klaviyo's frontend, ensuring our platform meets web accessibility standards and best practices to deliver an inclusive user experience.
            </p>
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                In the past, I've had the opportunity to develop software across a variety of settings — from{' '}
                <span className="text-slate-100">advertising agencies</span> and{' '}
                <span className="text-slate-100">large corporations</span> to{' '}
                <span className="text-slate-100">start-ups</span> and{' '}
                <span className="text-slate-100">small digital product studios</span>. Additionally, I also released a{' '}
                <span className="text-slate-100">comprehensive video course</span> a few years ago, guiding learners through building a web app with the Spotify API.
            </p>
            <p className={`text-slate-400 leading-relaxed ${isSmallMobile ? 'text-xs' : 'text-sm'}`}>
                In my spare time, I'm usually climbing, playing tennis, hanging out with my wife and two cats, or running around Hyrule searching for{' '}
                <span className="text-slate-100">Korok seeds</span>.
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