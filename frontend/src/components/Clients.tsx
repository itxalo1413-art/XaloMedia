const Clients = () => (
    <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-5">
            <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold">Our Client</h2>
                <p className="text-[#888] max-w-[200px] text-right text-[0.8rem]">The description about the client that we have cooperated.</p>
            </div>
            <div className="grid grid-cols-3 gap-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className="h-40 bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg"></div>
                ))}
            </div>
        </div>
    </section>
)

export default Clients;
