'use client';
import UserAccounMenu from '@/Components/profile/UserAccounMenu';
import ReviewHistoryList from '@/Components/my-feedback/ReviewHistoryList';
import * as React from 'react';
export default function Profile() {
    return (
        <UserAccounMenu >
            <ReviewHistoryList/>
        </UserAccounMenu>
    );
}
