import React, { useState } from "react";
import { Avatar, Button, Image, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetChallenges } from "@hooks/challenges";
import { Challenge } from "@models";
import { useNavigate } from "react-router-dom";
import ChallengeFormModal, { ChallengeFormValues } from "./ChallengeFormModal";
import dayjs from "dayjs";

const { Search } = Input;

const ChallengePage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const pageSize = 5;
  const navigate = useNavigate();
  const { data, isLoading } = useGetChallenges({
    pageNumber: page,
    rowsPerPage: pageSize,
    filterField: filterValue ? "title" : undefined,
    filterValue: filterValue || undefined,
  });

  const handleSearch = (value: string) => {
    setPage(1);
    setFilterValue(value.trim());
  };
  const handleCreateChallenge = (form: ChallengeFormValues) => {
    console.log("Submitted challenge:", form);
    // TODO: call API to create
  };

  const columns: ColumnsType<Challenge> = [
    {
      title: "Thumbnail",
      dataIndex: "challengeThumbnail",
      render: (url) => <Avatar shape="square" src={url} size={48} />,
    },
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <span
          onClick={() => navigate(`/challenges/detail/${record.challengeId}`)}
          style={{ color: "#1890ff", cursor: "pointer" }}
          className="hover:underline"
        >
          {text}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "challengeType",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Goal",
      render: (_, record) => `${record.goalValue} ${record.unit}`,
    },
    {
      title: "Creator",
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Avatar src={record.creatorAvatarUrl} size={24} />
          <span>{record.creatorName}</span>
        </div>
      ),
    },
    {
      title: "Occupied Date",
      key: "occupiedDate",
      render: (_, record) => {
        const format = "MMM DD, YY hh:mmA";
        const start = dayjs(record.startDate).format(format);
        const end = dayjs(record.endDate).format(format);

        return (
          <div className="flex flex-col">
            <span>
              <strong>Start:</strong> {start}
            </span>
            <span>
              <strong>End:</strong> {end}
            </span>
          </div>
        );
      },
    },
    {
      title: "Reward",
      render: (_, record) =>
        record.challengeRewardMappings?.[0]?.imageUrl ? (
          <Image
            width={60}
            src={record.challengeRewardMappings?.[0]?.imageUrl}
          />
        ) : (
          "No Reward"
        ),
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Challenge List</h2>
        <div className="ms-auto flex gap-x-3">
          <Search
            placeholder="Search by title"
            allowClear
            onSearch={handleSearch}
            style={{ maxWidth: 300 }}
          />
          <Button type="primary" onClick={() => setModalOpen(true)}>
            + Create Challenge
          </Button>
        </div>
      </div>

      <Table<Challenge>
        rowKey="challengeId"
        columns={columns}
        dataSource={data?.items}
        loading={isLoading}
        pagination={{
          current: data?.pageNumber,
          total: data?.totalCount,
          pageSize: data?.pageSize,
          onChange: (p) => setPage(p),
        }}
      />
      <ChallengeFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateChallenge}
      />
    </div>
  );
};

export default ChallengePage;
