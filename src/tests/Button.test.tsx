import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";
import { describe, it, expect, vi } from "vitest";

describe("Button component", () => {
  it("should render button with children content", () => {
    render(<Button className="bg-blue-500">Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it('should use default type "button" when no type is provided', () => {
    render(<Button className="bg-blue-500">Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should apply provided className", () => {
    render(<Button className="bg-red-500">Click Me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-red-500");
  });

  it("should trigger onClick callback when clicked", async () => {
    const handleClick = vi.fn();
    render(
      <Button className="bg-blue-500" onClick={handleClick}>
        Click Me
      </Button>
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not trigger onClick callback if not provided", () => {
    const handleClick = vi.fn();
    render(<Button className="bg-blue-500">Click Me</Button>);
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });
});
