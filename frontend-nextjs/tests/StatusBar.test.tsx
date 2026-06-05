import { render, screen } from "@testing-library/react";
import StatusBar from "@/components/StatusBar";
import { ApiStatus } from "@/lib/api";

const mockStatus: ApiStatus = { status: "ok", version: "1.0.0", timestamp: "2025-05-27T10:00:00Z", service: "JobListingsAPI", redis: "connected" };

describe("StatusBar", () => {
  it("shows online when status provided", () => { render(<StatusBar status={mockStatus} />); expect(screen.getByText("online")).toBeInTheDocument(); });
  it("shows offline when null",           () => { render(<StatusBar status={null} />);       expect(screen.getByText("offline")).toBeInTheDocument(); });
  it("shows service name",               () => { render(<StatusBar status={mockStatus} />); expect(screen.getByText(/JobListingsAPI/)).toBeInTheDocument(); });
});
