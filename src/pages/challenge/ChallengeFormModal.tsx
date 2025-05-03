// components/challenges/ChallengeFormModal.tsx
import React from "react";
import { Modal, Form, Input, DatePicker, InputNumber, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export interface ChallengeFormValues {
  title: string;
  description: string;
  challengeType: string;
  unit: string;
  goalValue: number;
  startDate: string;
  endDate: string;
  rewardId: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ChallengeFormValues) => void;
}

const ChallengeFormModal: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<ChallengeFormValues>();

  const handleFinish = (values: ChallengeFormValues) => {
    onSubmit(values);
    reset();
    onClose();
  };

  return (
    <Modal
      title="Create Challenge"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(handleFinish)}
      destroyOnClose
    >
      <Form layout="vertical">
        <Form.Item label="Title">
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Description">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea rows={3} {...field} />}
          />
        </Form.Item>

        <Form.Item label="Challenge Type">
          <Controller
            name="challengeType"
            control={control}
            render={({ field }) => (
              <Select {...field} options={[
                { label: "Distance", value: "Distance" },
                { label: "TimeBased", value: "TimeBased" },
              ]} />
            )}
          />
        </Form.Item>

        <Form.Item label="Unit">
          <Controller
            name="unit"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>

        <Form.Item label="Goal Value">
          <Controller
            name="goalValue"
            control={control}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>

        <Form.Item label="Start & End Date">
          <Controller
            name="startDate"
            control={control}
            render={({ field: startField }) => (
              <Controller
                name="endDate"
                control={control}
                render={({ field: endField }) => (
                  <RangePicker
                    showTime
                    style={{ width: "100%" }}
                    value={[startField.value ? dayjs(startField.value) : null, endField.value ? dayjs(endField.value) : null]}
                    onChange={(dates) => {
                      startField.onChange(dates?.[0]?.toISOString());
                      endField.onChange(dates?.[1]?.toISOString());
                    }}
                  />
                )}
              />
            )}
          />
        </Form.Item>

        <Form.Item label="Reward ID">
          <Controller
            name="rewardId"
            control={control}
            render={({ field }) => <InputNumber {...field} min={0} style={{ width: "100%" }} />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChallengeFormModal;
