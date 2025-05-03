import React, { useState } from "react";
import { Modal, Input, Select, message } from "antd";

interface BanReasonModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, template: string, severity: string) => void;
  title?: string;
}

const templates = [
  "Spamming",
  "Harassment",
  "Inappropriate content",
  "Fake profile",
  "Hate speech",
];

const severities = ["Minor", "Moderate", "Severe"];

const BanReasonModal: React.FC<BanReasonModalProps> = ({
  open,
  onClose,
  onSubmit,
  title = "Ban User",
}) => {
  const [reason, setReason] = useState("");
  const [template, setTemplate] = useState<string | undefined>(undefined);
  const [severity, setSeverity] = useState<string | undefined>(undefined);

  const handleOk = () => {
    Modal.confirm({
      title: "Are you sure you want to proceed?",
      content: (
        <>
          <p>
            <strong>Template:</strong> {template}
          </p>
          <p>
            <strong>Severity:</strong> {severity}
          </p>
          <p>
            <strong>Custom Note:</strong> {reason || "(none)"}
          </p>
        </>
      ),
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        onSubmit(reason, template!, severity!);
        setReason("");
        setTemplate(undefined);
        setSeverity(undefined);
        message.success(`${title} confirmed.`);
      },
    });
  };

  return (
    <Modal
      title={title}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okButtonProps={{ disabled: !template || !severity }}
    >
      <p>Select a reason template:</p>
      <Select
        placeholder="Choose a reason"
        value={template}
        onChange={setTemplate}
        options={templates.map((t) => ({ label: t, value: t }))}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <p>Severity level:</p>
      <Select
        placeholder="Select severity"
        value={severity}
        onChange={setSeverity}
        options={severities.map((s) => ({ label: s, value: s }))}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <p>Optional notes:</p>
      <Input.TextArea
        rows={4}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Add extra details (optional)..."
      />
    </Modal>
  );
};

export default BanReasonModal;
