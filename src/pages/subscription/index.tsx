import React, { useState } from "react";
import { Button, Drawer } from "antd";
import SubscriptionTable from "./SubscriptionTable";
import SubscriptionForm from "./SubscriptionForm";
import { useGetSubscriptions } from "@hooks/subscriptions";

const SubscriptionPage = () => {
  const [params, setParams] = useState({
    keyword: "",
    pageNumber: 1,
    pageSize: 10,
  });

  const [openDrawer, setOpenDrawer] = useState(false);
  const { data, isLoading } = useGetSubscriptions(params);

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-4">
      {/* Header with button */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Subscriptions</h1>
        <Button type="primary" onClick={() => setOpenDrawer(true)}>
          Create Subscription
        </Button>
      </div>

      {/* Table */}
      <SubscriptionTable
        data={data?.items ?? []}
        loading={isLoading}
        onSearch={(keyword) =>
          setParams((prev) => ({ ...prev, keyword, pageNumber: 1 }))
        }
        pagination={{
          current: params.pageNumber,
          pageSize: params.pageSize,
          total: data?.totalCount ?? 0,
        }}
        onChange={(pagination) =>
          setParams((prev) => ({
            ...prev,
            pageNumber: pagination.current ?? 1,
            pageSize: pagination.pageSize ?? 10,
          }))
        }
      />

      {/* Drawer for form */}
      <Drawer
        title="Create Subscription Plan"
        placement="right"
        width={400}
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        destroyOnClose
      >
        <SubscriptionForm />
      </Drawer>
    </div>
  );
};

export default SubscriptionPage;
