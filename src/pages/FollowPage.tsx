import React from 'react';
import MainLayout from '../layouts/MainLayout';
import FollowUpsTable from '../components/followUps/FollowUpsTable';

const FollowPage: React.FC = () => {
    return (
        <MainLayout>
            <div>
                <FollowUpsTable />
            </div>
        </MainLayout>
    );
};

export default FollowPage;
