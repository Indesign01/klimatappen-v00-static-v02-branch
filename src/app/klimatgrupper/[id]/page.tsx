import GroupDetails from '@/components/groups/GroupDetails';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/lib/constants';

interface GroupPageProps {
  params: { id: string };
}



// Generate static paths for all possible group IDs
export async function generateStaticParams() {
  // Define all the group IDs that exist in your app
  // Adjust these based on your actual group data
  const groupIds = ['1', '2', '3', '4', '5']; // Add all your group IDs here
  
  return groupIds.map((id) => ({
    id: id,
  }));
}



export default function GroupPage({ params }: GroupPageProps) {
  return (
    <PageLayout
      showBackButton
      customBackRoute={ROUTES.GROUPS}
      breadcrumbs={[
        { label: 'Klimatgrupper', href: ROUTES.GROUPS },
        { label: `Grupp ${params.id}` }
      ]}
    >
      <GroupDetails groupId={params.id} />
    </PageLayout>
  );
}