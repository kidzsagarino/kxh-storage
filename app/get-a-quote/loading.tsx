export default function QuoteLoading() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="border-b border-slate-200 bg-white py-14">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-10 max-w-xl animate-pulse rounded bg-slate-200" />
                    <div className="mt-4 h-6 max-w-2xl animate-pulse rounded bg-slate-200" />
                </div>
            </section>

            <section className="py-12">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="h-[500px] animate-pulse rounded-3xl border border-slate-200 bg-white" />
                </div>
            </section>
        </main>
    );
}