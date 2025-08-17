export default function BentoGrid() {
    // Lag kopier av items med unike ID-er hvis du vil gjenbruke dem
    const createUniqueItem = (originalItem: BentoItem, suffix: string): BentoItem => ({
        ...originalItem,
        id: `${originalItem.id}-${suffix}`,
    });

    return (
        <section className="relative py-24 sm:py-32 bg-white dark:bg-background/15 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Bento Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid gap-6"
                >
                    {/* Første rad */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1"
                        >
                            <BentoCard item={bentoItems[0]} />
                        </motion.div>
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-2"
                        >
                            <BentoCard item={bentoItems[1]} />
                        </motion.div>
                    </div>
                    
                    {/* Andre rad - 3 kolonner */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1"
                        >
                            <BentoCard item={bentoItems[2]} />
                        </motion.div>
                        
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1 rounded-xl overflow-hidden bg-gradient-to-b from-neutral-50/80 to-neutral-50 dark:from-neutral-900/80 dark:to-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 hover:border-neutral-400/30 dark:hover:border-neutral-600/30 hover:shadow-lg hover:shadow-neutral-200/20 dark:hover:shadow-neutral-900/20 transition-all duration-300"
                        >
                            <div className="p-5">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
                                        Voice Assistant
                                    </h3>
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 tracking-tight mb-4">
                                    Interact with our AI using natural voice
                                    commands. Experience seamless voice-driven
                                    interactions with advanced speech
                                    recognition.
                                </p>
                                <AIInput_Voice />
                            </div>
                        </motion.div>
                        
                        {/* Tredje kolonne - timeline item */}
                        <motion.div
                            variants={fadeInUp}
                            className="md:col-span-1"
                        >
                            <BentoCard item={bentoItems[3]} />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}