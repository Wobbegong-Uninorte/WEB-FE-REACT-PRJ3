import StatusPieChart from "../components/StatusPieChart";
import BusinessLinePieChart from "../components/BusinessLinePieChart";
import MainLayout from "../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-7">
            <StatusPieChart />
            <BusinessLinePieChart />
          </div>
        </div>
    </MainLayout>
  );
};

export default Dashboard;
