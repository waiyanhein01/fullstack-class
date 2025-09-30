import Card from "@/components/Card";
import Link from "next/link";
import React from "react";

const Notification = () => {
  return (
    <Card>
      <h1 className="">Archived Notification</h1>
      <Link href="/complex-dashboard" className="text-blue-500 underline">
        Default
      </Link>
    </Card>
  );
};

export default Notification;
