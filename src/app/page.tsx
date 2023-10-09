import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default function Home() {
    return (
        <main className="bg-gradient-to-tl from-blue-600 flex flex-col justify-start items-center min-h-screen">
            <Header />
            <Dashboard />
        </main>
    );
}
