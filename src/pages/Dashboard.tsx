import StatusPieChart from "../components/graphics/StatusPieChart";
import BusinessLinePieChart from "../components/graphics/BusinessLinePieChart";
import MainLayout from "../layouts/MainLayout";
import { KeyMetrics } from "../components/graphics/key-metrics"
import { Barchart } from "../components/graphics/Barchart";

const Dashboard = () => {
  return (
    <MainLayout>
    <div className="min-h-screen">
      <div className="flex">
        <main className="flex-1 p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
            <KeyMetrics />
            <Barchart />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              <StatusPieChart />
              <BusinessLinePieChart />
            </div>
          </main>
          </div>
        </div>
    </MainLayout>
  );
};

export default Dashboard;
