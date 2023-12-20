export const SHARE_DISTRIBUTION_CONFIG = [
  {
    key: "APP_SHARE",
    label: "App Share",
    unit: "%",
    description: "Payment share for the KWK app (percentage of the total)",
  },
  {
    key: "DRIVER_SHARE",
    label: "Driver Share",
    unit: "%",
    description: "Payment share for the driver (percentage of the total)",
  },
  {
    key: "DRIVER_SHARE_FIXED",
    label: "Driver Share Fixed",
    unit: "USD",
    description: "Payment share for the driver (Fixed amount)",
  },
];

export const PAYMENTS_CONFIG = [
  {
    key: "CHECKR_FEE",
    label: "Checkr Fee",
    unit: "USD",
    description: "Checkr fee for background check of the driver",
  },
  {
    key: "EARLY_PAYOUT",
    label: "Early Payout",
    unit: "%",
    description: "Early payout fee for the driver and seller",
  },
  {
    key: "BUYER_CREDIT",
    label: "Credit Evaluation",
    unit: "%",
    description:
      "Credit evaluation for the buyer \n. Percentage of the total order amount that will be added to buyer credit after a successful order",
  },
];

export const DELIVERY_CONFIG = [
  {
    key: "DELIVERY_FEE",
    label: "Delivery Fee",
    unit: "USD",
    description: "Delivery fee for the driver",
  },
  {
    key: "DRIVER_RADIUS",
    label: "Driver Radius",
    unit: "Miles",
    description: "Default Radius in which the driver can accept orders",
  },
  {
    key: "MAX_RADIUS",
    label: "Max Radius",
    unit: "Miles",
    description: "Max Radius in which the driver can accept orders",
  },
  {
    key: "NON_FAVOURITE_DRIVER_DELAY",
    label: "Non Favourite Driver Delay",
    unit: "Seconds",
    description: "Delay for non favourite driver to get the order Notification",
  },
  {
    key: "ORDER_PREPARATION_TIME",
    label: "Order Preparation Time",
    unit: "Minutes",
    description: "Default Order preparation time for the seller",
  },
  {
    key: "ETA_MUlTIPLIER",
    label: "ETA Multiplier",
    unit: "Minutes/Miles",
    description:
      "ETA Multiplier for the order. The order distance will be multiplied by this value to get the estimted ETA",
  },
];
