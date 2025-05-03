import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Descriptions, Avatar, Card, Spin, Button } from "antd";
import { useGetUserById } from "@hooks/users";
import { User } from "@models";
import BanReasonModal from "./BanReasonModal";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userId = Number(id);

  const [banModalOpen, setBanModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: user, isLoading } = useGetUserById(userId);

  if (isLoading) return <Spin size="large" />;
  if (!user) return <div>User not found.</div>;

  const handleOpenBan = (user: User) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleSubmitBan = (reason: string) => {
    console.log(`Banning user ${selectedUser?.userName} for:`, reason);
    setBanModalOpen(false);
  };

  return (
    <Card
      title={user.userName}
      extra={<Avatar size={56} src={user.profilePicture} />}
      className="max-w-4xl mx-auto"
    >
      <Button
        danger={user.isActive}
        onClick={() => handleOpenBan(user)}
        style={{ marginBottom: "16px" }}
      >
        {user.isActive ? "Ban User" : "Unban User"}
      </Button>

      <div style={{ opacity: !user.isActive ? 0.5 : 1 }}>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">
            {user.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label="City">{user.city}</Descriptions.Item>
          <Descriptions.Item label="District">
            {user.district}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{user.gender}</Descriptions.Item>
          <Descriptions.Item label="Birth Date">
            {user.birthDate}
          </Descriptions.Item>
          <Descriptions.Item label="Public Profile">
            {user.isPublic ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Active">
            {user.isActive ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Bio" span={2}>
            {user.bio}
          </Descriptions.Item>
          <Descriptions.Item label="Followers">
            {user.followers}
          </Descriptions.Item>
          <Descriptions.Item label="Following">
            {user.followings}
          </Descriptions.Item>
          <Descriptions.Item label="Blogs">{user.totalBlog}</Descriptions.Item>
          <Descriptions.Item label="Routes">
            {user.totalRoute}
          </Descriptions.Item>
          <Descriptions.Item label="Total Distance">
            {user.totalDistance} km
          </Descriptions.Item>
          <Descriptions.Item label="Total Duration">
            {Math.floor(user.totalDuration / 3600)} hrs
          </Descriptions.Item>
          <Descriptions.Item label="Day Streak">
            {user.dayStreak}
          </Descriptions.Item>
          <Descriptions.Item label="Max Day Streak">
            {user.maxDayStreak}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {user.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {user.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </div>

      <BanReasonModal
        open={banModalOpen}
        onClose={() => setBanModalOpen(false)}
        onSubmit={handleSubmitBan}
        title={user.isActive ? "Ban User" : "Unban User"}
      />
    </Card>
  );
};

export default UserDetail;
