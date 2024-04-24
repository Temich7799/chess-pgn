import { Text } from '@/components/atoms/Text/Text';
import { Friend } from '@/ts/FriendInterface';
import React from 'react';

type FriendsListProps = {
    friends: Friend[];
}

const FriendsList: React.FC<FriendsListProps> = ({ friends }) => {
    return (
        <div>
            <Text tag='h2'>My friends</Text>
            <ul>
                {friends.map((friend) => (
                    <li key={friend.id}>{friend.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default FriendsList;
