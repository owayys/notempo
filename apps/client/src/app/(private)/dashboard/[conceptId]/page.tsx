import { DashboardContainer } from "@/views/dashboard/dashboard-container";

const Dashboard = async ({ params }: { params: { conceptId: string } }) => {
  const { conceptId } = await params;

  return <DashboardContainer selectedConceptId={conceptId} />;
};

export default Dashboard;
