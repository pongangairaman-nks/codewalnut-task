import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { toast } from "sonner";
import { validateTimerForm } from "../utils/validation";
import { TimerFormData } from "../types/timer";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn()
  }
}));

describe("validateTimerForm", () => {
  beforeEach(() => {
    vi.clearAllMocks(); // Clear all mock calls before each test
  });

  afterEach(() => {
    vi.clearAllMocks(); // Clear all mock calls after each test
  });

  it("should return false and show an error if the title is empty", () => {
    const data: TimerFormData = {
      title: "",
      description: "Test description",
      hours: 1,
      minutes: 30,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("should return false and show an error if the title is too long", () => {
    const data: TimerFormData = {
      title: "A".repeat(51),
      description: "Test description",
      hours: 1,
      minutes: 30,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title must be less than 50 characters"
    );
  });

  it("should return false and show an error if any time values are negative", () => {
    const data: TimerFormData = {
      title: "Test Timer",
      description: "Test description",
      hours: -1,
      minutes: 30,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("should return false and show an error if minutes or seconds are greater than 59", () => {
    const data: TimerFormData = {
      title: "Test Timer",
      description: "Test description",
      hours: 1,
      minutes: 60,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );
  });

  it("should return false and show an error if the total time is 0", () => {
    const data: TimerFormData = {
      title: "Test Timer",
      description: "Test description",
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Please set a time greater than 0"
    );
  });

  it("should return false and show an error if the total time exceeds 24 hours", () => {
    const data: TimerFormData = {
      title: "Test Timer",
      description: "Test description",
      hours: 25,
      minutes: 0,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });

  it("should return true if the form data is valid", () => {
    const data: TimerFormData = {
      title: "Test Timer",
      description: "Test description",
      hours: 1,
      minutes: 30,
      seconds: 0
    };

    const result = validateTimerForm(data);

    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});
