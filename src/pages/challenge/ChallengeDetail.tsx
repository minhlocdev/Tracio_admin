import React from "react";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Avatar, Tag, Button, Image } from "antd";
import dayjs from "dayjs";
import { useGetChallengeById } from "@hooks/challenges";

const ChallengeDetail: React.FC = () => {
  const { id } = useParams();
  const challengeId = Number(id);

  const { data: challenge, isLoading } = useGetChallengeById(challengeId);

  if (isLoading) return <div>Loading...</div>;
  if (!challenge) return <div>Challenge not found.</div>;

  const format = "MMM DD, YY hh:mmA";

  return (
    <div className="max-w-5xl mx-auto">
      <Card title={challenge.title}>
        <div className="flex items-center gap-4 mb-4">
          <Avatar src={challenge.creatorAvatarUrl} />
          <span className="font-semibold">{challenge.creatorName}</span>
          <Tag color="blue">{challenge.challengeType}</Tag>
          <Tag color="green">{challenge.unit}</Tag>
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Description">
            {challenge.description}
          </Descriptions.Item>
          <Descriptions.Item label="Goal">
            {challenge.goalValue} {challenge.unit}
          </Descriptions.Item>
          <Descriptions.Item label="Start Date">
            {dayjs(challenge.startDate).format(format)}
          </Descriptions.Item>
          <Descriptions.Item label="End Date">
            {dayjs(challenge.endDate).format(format)}
          </Descriptions.Item>
          <Descriptions.Item label="Public">
            {challenge.isPublic ? "Yes" : "No"}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {dayjs(challenge.createdAt).format(format)}
          </Descriptions.Item>
        </Descriptions>

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Reward</h3>

          {challenge.challengeRewardMappings?.length > 0 ? (
            <Card
              type="inner"
              title={challenge.challengeRewardMappings[0].name}
              extra={<Button type="link">Edit Reward</Button>}
            >
              <p>{challenge.challengeRewardMappings[0].description}</p>
              <Image
                width={160}
                src={challenge.challengeRewardMappings[0].imageUrl}
              />
            </Card>
          ) : (
            <Button type="primary">+ Create Reward</Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ChallengeDetail;
