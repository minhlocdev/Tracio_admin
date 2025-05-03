import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, message } from "antd";
import clsx from "clsx";
import { PostSubscriptionModel } from "@services/subscriptions";
import { usePostSubscription } from "@hooks/subscriptions";

const durationOptions = [{ label: "1 Month", value: 30 }];

const SubscriptionForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostSubscriptionModel>();

  const { mutate: createSubscription, isPending } = usePostSubscription();
  const nameValue = watch("name", "");

  const onSubmit = (data: PostSubscriptionModel) => {
    createSubscription(data, {
      onSuccess: (subscription) => {
        message.success(`Created subscription: ${subscription.name}`);
        reset();
      },
      onError: (err) => {
        message.error(
          (err as Error).message || "Failed to create subscription"
        );
      },
    });
  };

  // Format VND input (adds dots for thousands)
  const formatVND = (value: string) => {
    const raw = value.replace(/\D/g, "");
    return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-md shadow max-w-md"
    >
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <Controller
          name="name"
          control={control}
          disabled={isPending}
          rules={{
            required: "Name is required",
            maxLength: { value: 50, message: "Max 50 characters" },
          }}
          render={({ field }) => (
            <>
              <Input {...field} maxLength={50} placeholder="Plan name" />
              <div className="text-xs text-gray-500 text-right mt-1">
                {nameValue.length}/50
              </div>
            </>
          )}
        />
        {errors.name && (
          <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Price (VND)</label>
        <Controller
          name="price"
          control={control}
          disabled={isPending}
          rules={{
            required: "Price is required",
            validate: (value) => value >= 1000 || "Minimum price is 1.000 VND",
          }}
          render={({ field }) => (
            <Input
              addonAfter="VND"
              value={formatVND(field.value?.toString() ?? "")}
              onChange={(e) => {
                const rawValue = e.target.value.replace(/\D/g, "");
                field.onChange(Number(rawValue));
              }}
              placeholder="Enter price"
            />
          )}
        />
        {errors.price && (
          <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Duration</label>
        <Controller
          name="duration"
          control={control}
          disabled={isPending}
          rules={{ required: "Please select a duration" }}
          render={({ field }) => (
            <div className="flex gap-2">
              {durationOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={clsx(
                    "px-4 py-1 rounded-full border",
                    field.value === option.value
                      ? "bg-blue-500 text-white border-blue-500"
                      : "text-gray-600 border-gray-300"
                  )}
                  onClick={() => field.onChange(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        />
        {errors.duration && (
          <p className="text-xs text-red-500 mt-1">{errors.duration.message}</p>
        )}
      </div>

      <Button
        htmlType="submit"
        type="primary"
        className="w-full"
        disabled={isPending}
      >
        Submit
      </Button>
    </form>
  );
};

export default SubscriptionForm;
