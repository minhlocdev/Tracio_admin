import React, { useState } from "react";
import { Table, Avatar, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useGetUsers } from "../../hooks/users/useGetUsers";
import { User } from "../../constants/models/User";
import BanReasonModal from "./BanReasonModal";

const UserPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [banModalOpen, setBanModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUsers({
    pageNumber: page,
    rowsPerPage: 10,
  });
  const navigate = useNavigate();

  const handleOpenBan = (user: User) => {
    setSelectedUser(user);
    setBanModalOpen(true);
  };

  const handleSubmitBan = (reason: string) => {
    console.log(`Banning user ${selectedUser?.userName} for:`, reason);
    setBanModalOpen(false);
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "profilePicture",
      key: "avatar",
      render: (url: string) => <Avatar src={url} />,
    },
    {
      title: "Name",
      dataIndex: "userName",
      render: (text: string, record: User) => (
        <span
          onClick={() => navigate(`/users/detail/${record.userId}`)}
          className="cursor-pointer hover:underline"
          style={{ color: !record.isActive ? "#999" : "#1890ff" }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Actions",
      render: (_: void, record: User) => (
        <Space>
          <Button
            danger={!!record.isActive}
            type="link"
            onClick={() => handleOpenBan(record)}
          >
            {!record.isActive ? "Unban" : "Ban"}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table<User>
        rowKey="userId"
        columns={columns}
        dataSource={data?.items}
        loading={isLoading}
        pagination={{
          current: data?.pageNumber,
          pageSize: data?.pageSize,
          total: data?.totalCount,
          onChange: (p) => setPage(p),
        }}
      />
      <BanReasonModal
        open={banModalOpen}
        onClose={() => setBanModalOpen(false)}
        onSubmit={handleSubmitBan}
        title={!selectedUser?.isActive ? "Unban User" : "Ban User"}
      />
    </div>
  );
};

export default UserPage;
