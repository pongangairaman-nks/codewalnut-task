import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect, beforeEach, afterEach } from "vitest";
import { TimerItem } from "./TimerItem";
import { Timer } from "../types/timer";
import { useTimerStore } from "../store/useTimerStore";
import { useToast } from "../hooks/useToast";
import { TimerAudio } from "../utils/audio";

// Mock hooks and utilities
vi.mock("../store/useTimerStore");
vi.mock("../hooks/useToast");
vi.mock("../utils/audio");

// Timer mock data
const mockTimer: Timer = {
  id: "1",
  title: "Sample Timer",
  description: "This is a test timer",
  duration: 300,
  remainingTime: 300,
  isRunning: false,
  createdAt: Date.now()
};

// Define mock store and toast return types
type MockTimerStore = {
  toggleTimer: jest.Mock;
  deleteTimer: jest.Mock;
  updateTimer: jest.Mock;
  restartTimer: jest.Mock;
};

type MockToast = {
  showToast: jest.Mock;
};

// Mock store actions
const toggleTimer = vi.fn();
const deleteTimer = vi.fn();
const updateTimer = vi.fn();
const restartTimer = vi.fn();

// Mock toast action
const showToast = vi.fn();

// Mock TimerAudio globally
const playMock = vi.fn(() => Promise.resolve());
const stopMock = vi.fn();

TimerAudio.getInstance = vi.fn(() => {
  const instance = Object.create(TimerAudio.prototype);
  instance.play = playMock;
  instance.stop = stopMock;
  instance.initializeAudioContext = vi.fn();
  instance.cleanup = vi.fn();
  return instance;
});

describe("TimerItem Component", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    // Provide specific types for mock implementations
    (useTimerStore as jest.Mock).mockReturnValue({
      toggleTimer,
      deleteTimer,
      updateTimer,
      restartTimer
    } as unknown as MockTimerStore);

    (useToast as jest.Mock).mockReturnValue({
      showToast
    } as unknown as MockToast);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders timer details correctly", () => {
    render(<TimerItem timer={mockTimer} />);

    expect(screen.getByText(mockTimer.title)).toBeInTheDocument();
    expect(screen.getByText(mockTimer.description)).toBeInTheDocument();
    expect(screen.getByText("05:00")).toBeInTheDocument(); // Assuming formatTime formats 300 as "05:00"
  });

  it("calls toggleTimer when the toggle button is clicked", () => {
    render(<TimerItem timer={mockTimer} />);

    const toggleButton = screen.getByTestId("timer-toggle-button"); // Adjust according to actual button text
    fireEvent.click(toggleButton);

    expect(toggleTimer).toHaveBeenCalledWith(mockTimer.id);
  });

  it("calls restartTimer when the restart button is clicked", () => {
    render(<TimerItem timer={mockTimer} />);

    const restartButton = screen.getByTitle("Restart Timer");
    fireEvent.click(restartButton);

    expect(restartTimer).toHaveBeenCalledWith(mockTimer.id);
  });

  it("calls deleteTimer when the delete button is clicked", () => {
    render(<TimerItem timer={mockTimer} />);

    const deleteButton = screen.getByTitle("Delete Timer");
    fireEvent.click(deleteButton);

    expect(deleteTimer).toHaveBeenCalledWith(mockTimer.id);
  });

  it("opens edit modal when edit button is clicked", () => {
    render(<TimerItem timer={mockTimer} />);

    // Click the edit button to open the modal
    const editButton = screen.getByTitle("Edit Timer"); // Adjust the title or selector as necessary
    fireEvent.click(editButton);

    // Optionally, check for a button or input inside the modal
    const saveButton = screen.getByRole("button", { name: /save changes/i });
    expect(saveButton).toBeInTheDocument();
  });

  it("shows a toast notification when the timer ends", () => {
    render(
      <TimerItem timer={{ ...mockTimer, isRunning: true, remainingTime: 1 }} />
    );

    // Simulate the timer ending
    vi.advanceTimersByTime(1000);

    expect(showToast).toHaveBeenCalledWith(
      expect.objectContaining({
        message: `Timer "${mockTimer.title}" has ended!`
      })
    );
  });

  it("plays audio when the timer ends", () => {
    render(
      <TimerItem timer={{ ...mockTimer, isRunning: true, remainingTime: 1 }} />
    );

    // Simulate the timer ending
    vi.advanceTimersByTime(1000);

    expect(playMock).toHaveBeenCalled();
  });
});
